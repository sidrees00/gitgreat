const dbModels = require('../../db/index.js');
const utils = require('../utils.js');

module.exports = {

  getUserByName: function(req, res, next) {
    dbModels.UsersTable.findOne({where: {name: req.params.userName}})
      .then(function(user) {
        utils.sendResponse(res, 200, 'application/json', user);
      });
  },

  addUser: function(req, res, next) {
    dbModels.UsersTable
      .create({
        name: req.body.name
      })
      .then(function(person) {
        res.send(person);
      })
      .catch(function(err) {
        console.log('Error: ', err);
      });
  }
};