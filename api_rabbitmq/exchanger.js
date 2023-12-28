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
        } catch (err) {

        }
    }
    async receive_message(quque_name) {
        this.channel.consume(quque_name, (msg) => {
            if (msg) {
                console.log(`${Buffer.from(msg.content)}`);
                callback(msg.content.toString());
                this.channel.ack(msg);
            }
        });
    }

    async close() {
        setTimeout(async function () {
            await this.channel.close();
            console.log('Channel connection terminated');


        }, 500);
    }

}



// var Queue = function (name, conf) {
//     return {
//         emit: function (data, close = true) {
//             amqp.connect(`amqp://${conf.server.user}:${conf.server.pass}@${conf.server.host}:${conf.server.port}`, function (err, conn) {
//                 conn.createChannel(function (err, ch) {
//                     var msg = JSON.stringify(data);

//                     ch.assertQueue(name, conf.queue);
//                     ch.sendToQueue(name, new Buffer(msg));
//                 });
//                 if (close) {
//                     setTimeout(function () {
//                         conn.close();
//                         process.exit(0)
//                     }, 500);
//                 }
//             });
//         },
//         receive: function (callback) {
//             amqp.connect(`amqp://${conf.server.user}:${conf.server.pass}@${conf.server.host}:${conf.server.port}`, function (err, conn) {
//                 conn.createChannel(function (err, ch) {
//                     ch.assertQueue(name, conf.queue);
//                     console.log(new Date().toString() + ' Queue ' + name + ' initialized');
//                     ch.consume(name, function (msg) {
//                         console.log(new Date().toString() + " Received %s", msg.content.toString());
//                         if (callback) {
//                             callback(JSON.parse(msg.content.toString()), msg.fields.routingKey)
//                         }
//                         if (conf.consumer.noAck === false) {
//                             ch.ack(msg);
//                         }
//                     }, conf.consumer);
//                 });
//             });
//         }
//     };
// };




module.exports = rabbit_queue;