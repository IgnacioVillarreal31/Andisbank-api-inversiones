const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./adminInvestment.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const adminInvestmentProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let adminInvestments = [
    { idInvestment: "1", shares: 100, priceByShare: 50.25, name: "Tech Corp" },
    { idInvestment: "2", shares: 200, priceByShare: 75.50, name: "Health Inc." }
];

server.addService(adminInvestmentProto.AdminInvestmentService.service, {
    GetAdminInvestments: (_, callback) => {
        callback(null, { adminInvestment: adminInvestments });
    },
    GetAdminInvestment: (call, callback) => {
        const id = call.request.idInvestment;
        const investment = adminInvestments.find(inv => inv.idInvestment === id);

        if (investment) {
            callback(null, investment);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Investment not found",
            });
        }
    },
    PostAdminInvestment: (call, callback) => {
        const idInvestment = call.request.idInvestment;
        const shares = call.request.shares;
        const priceByShare = call.request.shares;
        const name = call.request.shares;
        
        isCorrect = adminInvestments.find(inv => inv.idInvestment === idInvestment)
        if (isCorrect == undefined){
            adminInvestments.push({
                idInvestment: idInvestment,
                shares: shares,
                priceByShare: priceByShare,
                name: name
            })
            callback(null, true);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Investment error",
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