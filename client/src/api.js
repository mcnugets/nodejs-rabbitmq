const express = require('express');
const rabbit_queue = require('../../api_rabbitmq/exchanger');
route = express.Router();

route.post('/receive-msg', async (req, res) => {

    try {
        // const req_data = req.body;

        const provider = new rabbit_queue('amqp://localhost');
        await provider.connect();
        await provider.set_queue('test-queue');
        await provider.receive_message('test-queue');
        await provider.close();

        res.send("Message has been received!");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');

    }

})
module.exports = route;