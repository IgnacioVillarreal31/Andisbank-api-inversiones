import { Request, Response } from 'express';
import { IAdminInvestment } from '../models/IAdminInvestment';
import { IUserInvestment } from '../models/IUserInvestment';

let investments: IAdminInvestment[] = [];
let userInvestments: IUserInvestment[] = [];


export const getInvestments = (req: Request, res: Response): void => {
    res.json(investments);
};

export const getInvestment = (req: Request, res: Response): void => {
    const { idInvestment } = req.body;
    const response = investments.find((e: IAdminInvestment) => {
        e.idInvestment == idInvestment;
    })
    res.json(response);
};

export const postInvestmentAdmin = (req: Request, res: Response): void => {
    const { idInvestment, shares, priceByShare, name } = req.body;
    const existsInvestment: IAdminInvestment | undefined = investments.find((e: IAdminInvestment) => {
        e.idInvestment == idInvestment;
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
        e.idInvestment == idInvestment;
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
        e.idInvestment == idInvestment;
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
    const { idInvestment } = req.body;
    const response = investments.find((e: IAdminInvestment) => {
        e.idInvestment == idInvestment;
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
        e.idInvestment == idInvestment;
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