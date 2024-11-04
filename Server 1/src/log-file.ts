const { createLogger, transports, format, log } = require("winston");

export const loggerFile = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.File({ filename: "file.log" })],
});

export const loggerConsole = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console()],
});

/*export const loggerEmail = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Email({
        to: "ignavillarreal31@gmail.com",
        form: "ignavillarreal31@gmail.com",
        subject: "Logs"
    })],
});*/