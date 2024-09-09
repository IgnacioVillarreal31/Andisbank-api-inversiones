const investments = [
    { id: '1', name: 'Stock A', amount: 1000 },
    { id: '2', name: 'Bond B', amount: 500 }
  ];
  
  const resolvers = {
    investments: () => investments,
    investment: ({ id }) => investments.find(inv => inv.id === id),
    addInvestment: ({ name, amount }) => {
      const id = String(investments.length + 1);
      const newInvestment = { id, name, amount };
      investments.push(newInvestment);
      return newInvestment;
    },
    updateInvestment: ({ id, name, amount }) => {
      const investment = investments.find(inv => inv.id === id);
      if (investment) {
        if (name !== undefined) investment.name = name;
        if (amount !== undefined) investment.amount = amount;
        return investment;
      }
      return null;
    },
    deleteInvestment: ({ id }) => {
      const index = investments.findIndex(inv => inv.id === id);
      if (index !== -1) {
        investments.splice(index, 1);
        return true;
      }
      return false;
    }
  };
  
  module.exports = resolvers;
  