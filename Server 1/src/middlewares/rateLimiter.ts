import rateLimit from 'express-rate-limit';
const { RateLimiterMemory } = require("rate-limiter-flexible");

export const rateLimiterFixedWindow = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 999,
    message: 'You have exceeded the 100 requests in 24 hrs limit!',
    standardHeaders: true,
    legacyHeaders: false,
});

const slidingWindow = new RateLimiterMemory({
    points: 200,
    duration: 24 * 60 * 60,
    execEvenly: true,
    keyPrefix: 'middleware',
});

export const rateLimiterSlidingWindow = (req: any, res: any, next: any) => {
    slidingWindow.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send('Too Many Requests');
        });
};

const concurrency = new RateLimiterMemory({
    points: 10,
    duration: 1,
    blockDuration: 10,
});

export const rateLimiterConcurrency = (req: any, res: any, next: any) => {
    concurrency.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send('Too many concurrent requests!');
        });
};

const tokenBucket = new RateLimiterMemory({
    points: 100,
    duration: 60,
    blockDuration: 5,
});

export const rateLimiterTokenBucket = (req: any, res: any, next:any) => {
    tokenBucket.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send('Too many requests, please slow down.');
        });
};
