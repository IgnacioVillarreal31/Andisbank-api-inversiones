const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    investments: [Investment]
    investment(id: ID!): Investment
  }

  type Mutation {
    addInvestment(name: String!, amount: Float!): Investment
    updateInvestment(id: ID!, name: String, amount: Float): Investment
    deleteInvestment(id: ID!): Boolean
  }

  type Investment {
    id: ID!
    name: String!
    amount: Float!
  }
`);

module.exports = schema;
