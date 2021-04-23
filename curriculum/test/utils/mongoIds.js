const Joi = require('joi');
const findIndex = require('lodash/findIndex');
Joi.objectId = require('joi-objectid')(Joi);

const schema = Joi.objectId();

class MongoIds {
  constructor() {
    this.knownIds = [];
  }
  check(id, title) {
    try {
      Joi.validate(id, schema);
    } catch {
      throw new Error(`Expected a valid ObjectId for ${title}, but got ${id}`);
    }

    const idIndex = findIndex(this.knownIds, existing => id === existing);
    if (idIndex !== -1) {
      throw new Error(`
    All challenges must have a unique id.

    The id for ${title} is already assigned
    `);
    }
    this.knownIds = [...this.knownIds, id];
  }
}

module.exports = MongoIds;
