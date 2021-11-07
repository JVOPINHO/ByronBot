const Event = require("../structures/Event");

module.exports = class ReadyEvent extends Event {
    constructor(client) {
        super(client, "ready", __dirname);
    }

    async run() {
        console.log(`${this.client.user.tag} is ready!`);
    }
}