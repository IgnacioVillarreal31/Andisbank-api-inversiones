const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./adminInvestment.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const adminInvestmentService = grpc.loadPackageDefinition(packageDefinition).AdminInvestmentService;

const client = new adminInvestmentService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

client.GetAdminInvestments({}, (error, investments) => {
    if (error) {
        throw error;
    }
    console.log(investments.adminInvestment);
});

client.GetAdminInvestment({ idInvestment: "1" }, (error, investment) => {
    if (error) {
        throw error;
    }
    console.log(investment);
});

client.PostAdminInvestment({ idInvestment: "5", shares: 300, priceByShare: 100, name: "Algo R." }, (error, isCorrect) => {
    if (error) {
        throw error;
    }
    console.log(isCorrect);
});