const amqp = require('amqplib');
class rabbit_queue {
    constructor(url) {
        this.url = url;
    }
    async connect() {
        try {
            this.connection = await amqp.connect(this.url);
            this.channel = await this.connection.createChannel();
            console.log("RabbitMQ connection was made!!");
        } catch (err) {
            console.log("RabbitMQ connnection failed: ", err);
            process.exit(1);

        }
    }
    async set_queue(queue_name) {
        try {
            await this.channel.assertQueue(queue_name, 'direct', { durable: false });
            console.log("RabbitMQ queue asserted: ", queue_name);
        } catch (err) {
            console.log("RabbitMQ failed to assert the queue: ", err);
            process.exit(1);


        }

    }
    async send_message(data, queue_name) {
        try {
            await this.channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(data)));

            console.log("Message was sent to queue: ", queue_name);
        } catch (err) {

        }
    }

    async receive_message(queue_name, messanger) {
        return await new Promise((resolve, reject) => {
            this.channel.consume(queue_name, (msg) => {
                if (msg) {

                    const messageContent = JSON.parse(msg.content.toString());
                    if (messanger != messageContent.author) {
                        console.log(`Received Message: ${JSON.stringify(messageContent, null, 2)}`);
                        this.channel.ack(msg);
                        resolve(messageContent);
                    }
                }
            }, { noAck: false });
        });
    }

    async close() {

        await this.channel.close();
        // await this.connection.close();
        console.log('Channel connection terminated');


    };


}



module.exports = rabbit_queue;