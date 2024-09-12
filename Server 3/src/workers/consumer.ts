import amqp from 'amqplib/callback_api';
import { IAdminInvestment } from '../models/IAdminInvestment';
import { IUserInvestment } from '../models/IUserInvestment';

let investments: IAdminInvestment[] = [
    // Por lo poco q entendi aca van las inversiones existentes
];

let userInvestments: IUserInvestment[] = [
    // y aca las inversiones de usuarios existentes
];

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        const queue = 'investment_queue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(`[*] Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(" [x] Received %s", msg.content.toString());
                const investmentData = JSON.parse(msg.content.toString());

                // aca manejo los datos de inversión recibidos
                console.log(investmentData);
            } else {
                console.log("Received null message.");
            }
        }, {
            noAck: true
        });
    });
});

const processBuyInvestment = (investmentData: IUserInvestment) => {
    const { idInvestment, username, amount } = investmentData;
    const existsInvestment = investments.find(e => e.idInvestment === idInvestment);

    if (existsInvestment && existsInvestment.shares * existsInvestment.priceByShare > amount) {
        userInvestments.push({
            idInvestment: idInvestment,
            username: username,
            amount: amount,
            isBuy: true
        });
        investments.forEach(i => {
            if (i.idInvestment == idInvestment) {
                i.shares -= amount / i.priceByShare;
            }
        });
        console.log('Compra procesada exitosamente');
    } else {
        console.log('Compra fallida');
    }
};