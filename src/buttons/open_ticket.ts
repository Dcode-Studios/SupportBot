import { ThreadChannel } from "discord.js";
import { config } from "../../config";
import ButtonCommand from "../classes/ButtonCommand";

export default new ButtonCommand({
  customId:"open_ticket",
  checkType:"EQUALS",
  execute(interaction){
    let threadStarter = interaction.member.user.id
    let supportRoleOnly = false;
    let topic = {
      value:`${interaction.member.user.username}#${interaction.member.user.discriminator}`
    }
    if(topic.value.length > 90 || topic.value.length < 1)
      return interaction.reply({
        content:`Topic must be 1-90 characters`,
        ephemeral:true
      })
    interaction.deferReply({ephemeral:true}).then(() => {
      let currentThread = interaction.client.getSupportThreadData(threadStarter);
      if(currentThread?.active || false)
        return interaction.followUp({
          content:`You already have a ticket opened. Please use your current ticket or close your current ticket to open a new one.`,
          components:[
            {
              type:"ACTION_ROW",
              components:[
                {
                  type:"BUTTON",
                  label:"View Current Ticket",
                  style:"LINK",
                  url:`https://discord.com/channels/${interaction.guildId}/${currentThread?.threadChannelId}`
                },
                {
                  type:"BUTTON",
                  label:"Close Current Ticket",
                  style:"DANGER",
                  customId:`close_ticket_${threadStarter}`
                }
              ]
            }
          ]
        })
      interaction.client.createSupportThread({
        shortDesc:topic.value.toString(), 
        userId:threadStarter, 
        privateTicket: supportRoleOnly
      })
      .then(channel => {                
        const questions = [
          `- Your server ID (<https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID->)`,
          `- What your issue is`,
          `- What steps you take to reproduce the issue`
        ];
        (interaction.client.channels.cache.get(channel.id) as ThreadChannel).send({
          "content":`${supportRoleOnly?"\n:lock: *This is a private ticket, so only staff may reply.*":"\n:unlock: *This is a public ticket, everyone may view and reply to it..*"}\n\nHey <@${threadStarter}>, to make it easier for us and others help you with your issue, please try to tell us a few of the following things:\n\n${questions.join("\n")}`,
          "components":[
            {
              "type":1,
              "components":[
                {
                  "type":2,
                  "style":2,
                  "customId":`close_ticket_${threadStarter}`,
                  "label":"Close Ticket",
                  "emoji":"🔒"
                },
                {
                  "type":"BUTTON",
                  "style":"SECONDARY",
                  "customId":`switch_ticket_type_${threadStarter}`,
                  "label":"Switch to Private Ticket"
                }
              ]
            }
          ]
        }).then(r => {
          r.channel.awaitMessages({
            max:1,
            filter(message){
              return message.author.id == threadStarter;
            }
          }).then(async () => {
            await interaction.client.updateSupportThread({
              threadId:channel.id,
              userId:threadStarter
            });
            (interaction.client.channels.cache.get(channel.id) as ThreadChannel).send({
              "content":`Thanks! <@&${config.supportRoleId}> will be here to support you shortly.`
            })
          })
          interaction.followUp({
            content:`Ticket is ready in <#${channel.id}>`,
            ephemeral:true
          })
        })
      })
    })
  }
})