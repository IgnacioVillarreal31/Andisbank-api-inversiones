import { Request, Response } from 'express';
import { IAdminInvestment } from '../models/IAdminInvestment';
import { IUserInvestment } from '../models/IUserInvestment';
import amqp from 'amqplib/callback_api'; 

const sendMessageToQueue = (queue: string, message: any) => {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            const msg = JSON.stringify(message);

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });

        setTimeout(() => {
            connection.close();
        }, 500);
    });
};

export const postBuyInvestmentUser = (req: Request, res: Response): void => {
    const { idInvestment, username, amount } = req.body;
    const message = {
        idInvestment,
        username,
        amount,
        isBuy: true
    };

    sendMessageToQueue('investment_queue', message);

    res.json({ message: 'Buy order sent to the queue' });
};