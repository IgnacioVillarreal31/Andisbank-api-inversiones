import { Request, Response } from 'express';
import { Investment } from '../models/investment';

let investments: Investment[] = [];

export const createInvestment = (req: Request, res: Response): void => {
    const { userId, type, amount } = req.body;

    const investment: Investment = {
        id: investments.length + 1,
        userId,
        type,
        amount,
        date: new Date(),
    };

    investments.push(investment);
    res.status(201).json(investment);
};

export const getInvestmentsByUser = (req: Request, res: Response): void => {
    const { userId } = req.params;
    const userInvestments = investments.filter(inv => inv.userId === parseInt(userId));
    res.json(userInvestments);
};
