import { Request, Response } from 'express';
import { IAdminInvestment } from '../models/IAdminInvestment';
import { IUserInvestment } from '../models/IUserInvestment';

let investments: IAdminInvestment[] = [
    {
        idInvestment: "1",
        shares: 100,
        priceByShare: 50.25,
        name: "Tech Corp"
    },
    {
        idInvestment: "2",
        shares: 200,
        priceByShare: 75.50,
        name: "Health Inc."
    },
    {
        idInvestment: "3",
        shares: 150,
        priceByShare: 32.10,
        name: "Green Energy"
    },
    {
        idInvestment: "4",
        shares: 250,
        priceByShare: 20.75,
        name: "Retail Group"
    }
];

let userInvestments: IUserInvestment[] = [
    {
        username: "john_doe",
        idInvestment: "1",
        amount: 50,
        isBuy: true
    },
    {
        username: "jane_smith",
        idInvestment: "2",
        amount: 100,
        isBuy: false
    },
    {
        username: "alice_wonder",
        idInvestment: "3",
        amount: 75,
        isBuy: true
    },
    {
        username: "bob_builder",
        idInvestment: "1",
        amount: 20,
        isBuy: false
    }
];

export const getInvestments = (req: Request, res: Response): void => {
    res.json(investments);
};

export const getInvestment = (req: Request, res: Response): void => {
    const { idInvestment } = req.params;
    const response: IAdminInvestment | undefined = investments.find((e: IAdminInvestment) => {
        return e.idInvestment === idInvestment;
    });    
    res.json(response);
};

export const postInvestmentAdmin = (req: Request, res: Response): void => {
    const { idInvestment, shares, priceByShare, name } = req.body;
    const existsInvestment: IAdminInvestment | undefined = investments.find((e: IAdminInvestment) => {
        return e.idInvestment === idInvestment;
    })
    if (!existsInvestment) {
        investments.push({
            idInvestment: idInvestment,
            shares: shares,
            priceByShare: priceByShare,
            name: name
        })
        res.json(true);
    }
    res.json(false);
};

export const postBuyInvestmentUser = (req: Request, res: Response): void => {
    const { idInvestment, username, amount } = req.body;
    const existsInvestment: IAdminInvestment | undefined = investments.find((e: IAdminInvestment) => {
        return e.idInvestment === idInvestment;
    })
    if (existsInvestment != undefined) {
        if(existsInvestment.shares * existsInvestment.priceByShare > amount) {
            userInvestments.push({
                idInvestment: idInvestment,
                username: username,
                amount: amount,
                isBuy: true
            })
            investments.forEach((i: IAdminInvestment) => {
                if (i.idInvestment == idInvestment) {
                    i.shares -= amount/i.priceByShare;
                }
            });
            res.json(true);
        } 
    }
    res.json(false);
};

export const postSellInvestmentUser = (req: Request, res: Response): void => {
    const { idInvestment, username, amount } = req.body;
    const existsInvestment: IAdminInvestment | undefined = investments.find((e: IAdminInvestment) => {
        return e.idInvestment === idInvestment;
    })
    if (existsInvestment != undefined) {
        userInvestments.push({
            idInvestment: idInvestment,
            username: username,
            amount: amount,
            isBuy: false
        })
        investments.forEach((i: IAdminInvestment) => {
            if (i.idInvestment == idInvestment) {
                i.shares += amount/i.priceByShare;
            }
        });
        res.json(true);
    }
    res.json(false);
};

export const deleteInvestmentAdmin = (req: Request, res: Response): void => {
    const { idInvestment } = req.params;
    const response = investments.find((e: IAdminInvestment) => {
        return e.idInvestment === idInvestment;
    })
    if (response) {
        investments = investments.filter((e: IAdminInvestment) => e.idInvestment !== idInvestment);
        res.json(true);
    }
    res.json(false);
};

export const putInvestmentAdmin = (req: Request, res: Response): void => {
    const { idInvestment, name, shares, priceByShare } = req.body;
    const response = investments.find((e: IAdminInvestment) => {
        return e.idInvestment === idInvestment;
    })
    if (response) {
        investments.forEach((i: IAdminInvestment) => {
            if (i.idInvestment == idInvestment) {
                i.name = name,
                i.shares = shares,
                i.priceByShare = priceByShare
            }
        });
        res.json(true);
    }
    res.json(false);
};

export const getUserInvestment = (req: Request, res: Response): void => {
    const { username } = req.params;
    const response: IUserInvestment[] | undefined = userInvestments.filter((e: IUserInvestment) => {
        return e.username === username;
    })
    res.json(response);
};