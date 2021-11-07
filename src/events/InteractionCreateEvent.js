const Event = require("../structures/Event");
const Discord = require("discord.js");

module.exports = class InteractionCreateEvent extends Event {
    constructor(client) {
        super(client, "interactionCreate", __dirname)
    }

    /**
     * 
     * @param {Discord.Interaction} interaction 
     */
    async run(interaction) {
        if(interaction.isButton()) {
            if(interaction.customId == "notify_giveaway") {
                if(interaction.member.roles.cache.has(this.client.config.giveaway_role)) {
                    await interaction.member.roles.remove(this.client.config.giveaway_role);
                    interaction.reply({
                        content: "Que pena que você não quer mais receber notificações de quando tiver um sorteio novo, mas já que você quer isso, eu removi seu cargo de notificação <:SapoOk:794008844950044675>.",
                        ephemeral: true
                    }).catch(() => {})
                } else {
                    await interaction.member.roles.add(this.client.config.giveaway_role);
                    interaction.reply({
                        content: "<:Kawaiicheer:812073188750131250> Parece que você quer testar sua sorte em nossos sorteios, pois bem, você ira receber notificação de todos os novos sorteios, boa sorte!",
                        ephemeral: true
                    }).catch(() => {})
                }
            }
        }
    }
}