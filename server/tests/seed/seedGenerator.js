const {populateUsers, populateTodos} = require('./seed');

beforeEach(populateUsers);
beforeEach(populateTodos);