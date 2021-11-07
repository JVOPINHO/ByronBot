const Event = require("../structures/Event");

module.exports = class MessageCreateEvent extends Event {
    constructor(client) {
        super(client, "messageCreate", __dirname)
    }

    async run(message) {
        if(message.author.bot || message.channel.type == "dm" || message.webhookID) return;
       
        const regexp = new RegExp(`^(${`${this.client.config.prefix}`.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}|<@!?${this.client.user.id}>)( )*`, 'gi')
        if (!message.content.match(regexp)) return

        const args = message.content.replace(regexp, '').trim().split(/ +/g)
        if(!args.length) return
        const commandName = args.shift()?.toLowerCase()
        const command = this.client.commands.find(c => c.name == commandName || (Array.isArray(c.aliases) && c.aliases.includes(commandName)))
        if(!command) return

        try {
            await command.run(message, args)
        } catch(e) {
            message.reply(`Ocorreu um erro:\`\`\`js${e}\`\`\``)
        }
    }
}