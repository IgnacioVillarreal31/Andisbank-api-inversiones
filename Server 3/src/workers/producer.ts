import amqp from 'amqplib/callback_api';

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = 'investment_queue'; // nombre de la cola poenel
        const msg = JSON.stringify({
            idInvestment: '1',
            username: 'john_doe',
            amount: 100,
            isBuy: true
        }); // esto es lo q voy a mandar

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});