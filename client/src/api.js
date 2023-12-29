const express = require('express');
const rabbit_queue = require('../../api_rabbitmq/exchanger');
route = express.Router();

route.post('/receive-msg', async (req, res) => {

    setTimeout(async () => {
        console.log("Waiting for reponse M1");
    }, 5000);

    try {

        const provider = new rabbit_queue("amqp://localhost:5672");
        provider.connect()
            .then(async () => {

                await provider.set_queue('test-queue');
                const data = await provider.receive_message('test-queue', 'M2');
                res.send(data);
                setTimeout(async () => {
                    await provider.close();
                }, 5000);

            })
            .catch((err) => {
                console.error('Error: ', err);
            });

        console.log("Message was sent!");

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');

    }

})

route.post('/send-msg', (req, res) => {

    try {
        // const req_data = req.body;
        const data =
        {
            title: 'data',
            author: 'M2',
            message: '10',
        }


        const provider = new rabbit_queue("amqp://localhost:5672");
        provider.connect()
            .then(async () => {

                await provider.set_queue('test-queue');
                await provider.send_message(data, 'test-queue');


                setTimeout(async () => {
                    await provider.close();
                }, 5000);

            })
            .catch((err) => {
                console.error('Error: ', err);
            });


        res.send("Message has been sent!");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');

    }

})

module.exports = route;