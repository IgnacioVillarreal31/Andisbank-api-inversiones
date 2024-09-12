const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./investment.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const investmentService = grpc.loadPackageDefinition(packageDefinition).InvestmentService;

const client = new investmentService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

/*
client.GetInvestments({}, (error, investments) => {
    if (error) {
        throw error;
    }
    console.log(investments);
});
*/
/*
client.GetInvestment({ idInvestment: "1" }, (error, investment) => {
    if (error) {
        throw error;
    }
    console.log(investment);
});
*/
/*
client.PostInvestment({ idInvestment: "5", shares: 300, priceByShare: 100, name: "Algo R." }, (error, isCorrect) => {
    if (error) {
        throw error;
    }
    console.log(isCorrect);
});
*/
/*
client.PostBuyInvestment({ username: "Pablo Chacon", idInvestment: "1", amount: 10 }, (error, isCorrect) => {
    if (error) {
        throw error;
    }
    console.log(isCorrect);
});
*/
/*
client.PostSellInvestment({ username: "Pablo Chacon", idInvestment: "1", amount: 10 }, (error, isCorrect) => {
    if (error) {
        throw error;
    }
    console.log(isCorrect);
});
*/
/*
client.DeleteInvestment({ idInvestment: "1" }, (error, isCorrect) => {
    if (error) {
        throw error;
    }
    console.log(isCorrect);
});
*/
/*
client.PutInvestment({ idInvestment: "1", shares: 50, priceByShare: 50, name: "Algo R." }, (error, isCorrect) => {
    if (error) {
        throw error;
    }
    console.log(isCorrect);
});
*/
/*
client.GetUserInvestment({ username: "Pablo Chacon" }, (error, userInvestments) => {
    if (error) {
        throw error;
    }
    console.log(userInvestments);
});
*/