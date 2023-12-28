const express = require('express');
const rabbit_queue = require('../../api_rabbitmq/exchanger');
route = express.Router();



route.post('/send-msg', (req, res) => {

    try {
        // const req_data = req.body;
        const data =
        {
            title: 'data',
            author: 'Sultan',
            message: '5',
        }


        const provider = new rabbit_queue("amqp://localhost:5672");
        provider.connect();
        // .then(async () => {

        //     await provider.set_queue('test-queue');
        //     await provider.send_message(data, 'test-queue');

        //     setTimeout(async () => {
        //         await provider.close();
        //     }, 5000);

        // })
        // .catch((err) => {
        //     console.error('Error: ', err);
        // });
        // provider.set_queue('test-queue');
        // provider.send_message(data, 'test-queue');
        // provider.close();

        res.send("Message has been sent!");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');

    }

})

module.exports = route;