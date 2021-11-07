const Command = require("../../structures/Command")
const Discord = require("discord.js");

module.exports = class SendCommand extends Command {
    constructor(client) {
        super({
            name: "send",
            category: "admin",
            dirname: __dirname
        }, client)
    }

    /** 
    * @param {Discord.Message} message
    * @param {string[]} args
    */

    async run(message, args) {
        if(!this.client.config.devs.includes(message.author.id)) return 

        const type = args[0]?.toLowerCase()

        if(type == "giveaway") {
            const embed = new Discord.MessageEmbed()
            .setColor("#00FFFF")
            .setTitle("Cargo de sorteios")
            .setDescription(`:gift: Utilize o botão a baixo para receber o cargo <@&${this.client.config.giveaway_role}>, que será mencionado toda vez que começar um sorteio novo.`)

            const comp = new Discord.MessageActionRow()
            .setComponents(
                new Discord.MessageButton()
                .setLabel("Notify Sorteios")
                .setStyle("SECONDARY")
                .setCustomId("notify_giveaway")
                .setEmoji("🎁")
            )

            message.channel.send({
                embeds: [embed],
                components: [comp]
            })
        }
    }
}