const client = require('../Bot');

module.exports = class Command {
    /**
    * @param {client} client
    * @param {string} name
    * @param {string} description
    * @param {string[]} aliases
    * @param {string} category
    * @param {string} dirname
    */
    constructor({
        name = null,
        description = null,
        aliases = [],
        category = null,
        dirname = null,
    }, client) {
        this.client = client
        this.name = name
        this.description = description
        this.aliases = aliases
        this.category = category
        this.dirname = dirname
    }
}