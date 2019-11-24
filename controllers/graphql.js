const Currency = require('../models/currency');
const MyCurrency = require('../models/myCurrency');

const resolvers = {

  Query: {
    currencys() {
      return Currency.find()
    },
    date(parent, args) {
      if (!args.date) {
        throw new Error('id is required')
      }
      return Currency.findOne({
        date: args.date
      })
    },
    history(parent, args) {
      if (!args.item) {
        throw new Error('id is required')
      }
      return Currency.find(
          {"exchangeRate.currency": `${args.item}`},
          {exchangeRate: {$elemMatch: {currency: args.item}}})
    },
    userCurrency(parent, args) {
      if (!args.email) {
        throw new Error('id is required')
      }
      return MyCurrency.find({
        email: args.email
      })
    }
  }
};

module.exports = resolvers;