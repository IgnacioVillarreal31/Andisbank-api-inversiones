const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./investment.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const investmentProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let Investments = [
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

let UserInvestments = [
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

server.addService(investmentProto.InvestmentService.service, {
    GetInvestments: (_, callback) => {
        callback(null, { investments: Investments });
    },
    GetInvestment: (call, callback) => {
        const id = call.request.idInvestment;
        const investment = Investments.find(inv => inv.idInvestment === id);

        if (investment) {
            callback(null, investment);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Investment not found",
            });
        }
    },
    PostInvestment: (call, callback) => {
        const idInvestment = call.request.idInvestment;
        const shares = call.request.shares;
        const priceByShare = call.request.priceByShare;
        const name = call.request.name;
        
        isCorrect = Investments.find(inv => inv.idInvestment === idInvestment)
        if (isCorrect == undefined){
            Investments.push({
                idInvestment: idInvestment,
                shares: shares,
                priceByShare: priceByShare,
                name: name
            })
            callback(null, { isCorrect: true });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Investment error",
            });
        }
    },
    PostBuyInvestment: (call, callback) => {
        const username = call.request.username;
        const idInvestment = call.request.idInvestment;
        const amount = call.request.amount;
        
        isCorrect = UserInvestments.find(inv => inv.idInvestment === idInvestment && inv.username === username)
        if (isCorrect == undefined){
            UserInvestments.push({
                username: username,
                idInvestment: idInvestment,
                amount: amount,
                isBuy: true
            })
            Investments.forEach(i => {
                if (i.idInvestment == idInvestment) {
                    i.shares -= amount/i.priceByShare;
                }
            });
            callback(null, { isCorrect: true });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Investment error",
            });
        }
    },
    PostSellInvestment: (call, callback) => {
        const username = call.request.username;
        const idInvestment = call.request.idInvestment;
        const amount = call.request.amount;
        
        isCorrect = UserInvestments.find(inv => inv.idInvestment === idInvestment && inv.username === username)
        if (isCorrect == undefined){
            UserInvestments.push({
                username: username,
                idInvestment: idInvestment,
                amount: amount,
                isBuy: false
            })
            Investments.forEach(i => {
                if (i.idInvestment == idInvestment) {
                    i.shares += amount/i.priceByShare;
                }
            });
            callback(null, { isCorrect: true });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Investment error",
            });
        }
    },
    DeleteInvestment: (call, callback) => {
        const idInvestment = call.request.idInvestment;
        
        isCorrect = Investments.find(inv => inv.idInvestment === idInvestment)
        if (isCorrect != undefined){
            Investments = Investments.filter(e => e.idInvestment !== idInvestment);
            callback(null, { isCorrect: true });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Investment error",
            });
        }
    },
    PutInvestment: (call, callback) => {
        const idInvestment = call.request.idInvestment;
        const shares = call.request.shares;
        const priceByShare = call.request.shares;
        const name = call.request.shares;
        
        isCorrect = Investments.find(inv => inv.idInvestment === idInvestment)
        if (isCorrect != undefined){
            Investments.forEach(i => {
                if (i.idInvestment == idInvestment) {
                    i.name = name,
                    i.shares = shares,
                    i.priceByShare = priceByShare
                }
            });
            callback(null, { isCorrect: true });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Investment error",
            });
        }
    },
    GetUserInvestment: (call, callback) => {
        const username = call.request.username;
        const userInvestments = UserInvestments.find(inv => inv.username === username);

        if (userInvestments) {
            callback(null, { userInvestments: [userInvestments] });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Investment not found",
            });
        }
    },
});

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://127.0.0.1:50051");
        server.start();
    }
);