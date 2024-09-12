const investments = [
    { id: '1', name: 'Stock A', amount: 1000 },
    { id: '2', name: 'Bond B', amount: 500 }
  ];
  
  let deletedIds = [];

  const resolvers = {
    investments: () => investments,
    investment: ({ id }) => investments.find(inv => inv.id === id),
    addInvestment: ({ name, amount }) => {
    let newId;
    if (deletedIds.length > 0) {
      newId = deletedIds.pop();
    } else {
      newId = String(investments.length + 1);
    }
    const newInvestment = { id: newId, name, amount };
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
        deletedIds.push(id);
        return true;
      }
      return false;
    }
  };
  
  module.exports = resolvers;
  