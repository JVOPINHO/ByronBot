require("dotenv").config()
const { Client } = require("discord.js")
const { readFileSync, readdirSync } = require("fs")
const { load } = require("js-yaml")
const Command = require("./structures/Command")
const Event = require("./structures/Event")

class ByronBot extends Client {
    constructor() {
        super({
            intents: 1719
        })

        this.config = load(readFileSync("config.yml", "utf8"))
        this.config.token = process.env.DISCORD_TOKEN
        
        /**
         * @type {Command[]}
         */
        this.commands = []

        /**
         * @type {Event[]}
         */
        this.events = []
    }

    loadCommands() {
        const pastas = readdirSync(__dirname + "/commands")
        this.categories = [ ...pastas ]
        for(const pasta of pastas) {
            const commands = readdirSync(__dirname + "/commands/" + pasta).filter(file => file.endsWith("Command.js"));
            for (let command of commands) {
                const base = require(`./commands/${pasta}/${command}`)
                command = new base(this)
                this.commands.push(command)
            }
        }

        return this.commands
    }

    loadEvents() {
        const events = readdirSync(__dirname + "/events").filter(file => file.endsWith("Event.js"));
        for (let event of events) {
            const base = require(`./events/${event}`)
            event = new base(this)
            this.events.push(event)
            this.on(event.type, (...args) => event.run(...args))
        }

        return this.events
    }

    async init() {
        this.loadCommands()
        this.loadEvents()
        await this.login(this.config.token)
    }
}

const client = new ByronBot()
client.init()

module.exports = client