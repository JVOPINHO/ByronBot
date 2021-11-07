const client = require("../Bot")

module.exports = class Event {
    /**
     * 
     * @param {client} client 
     * @param {string} type 
     * @param {string} dirname 
     */
    constructor(client, type = null, dirname = null) {
        this.client = client
        this.type = type
        this.dirname = dirname
    }
}