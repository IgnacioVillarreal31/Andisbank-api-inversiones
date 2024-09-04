import { Request, Response } from 'express';
import { User } from '../models/user';

let users: User[] = [];

export const registerUser = (req: Request, res: Response): void => {
    const { name, email, password } = req.body;

    const user: User = {
        id: users.length + 1,
        name,
        email,
        password,
    };

    users.push(user);
    res.status(201).json(user);
};

export const getUsers = (req: Request, res: Response): void => {
    res.json(users);
};
