import { ThreadChannel } from "discord.js";
import { config } from "../../config";
import ButtonCommand from "../classes/ButtonCommand";

export default new ButtonCommand({
  customId:"open_ticket",
  checkType:"EQUALS",
  async execute(interaction){
    let threadStarter = interaction.member.user.id
    let supportRoleOnly = false;
    let threadStarterMember = await interaction.guild.members.fetch(threadStarter);
    let topic = {
      value:`${threadStarterMember.nickname || threadStarterMember.user.tag}`
    }
    if(topic.value.length > 90 || topic.value.length < 1)
      return interaction.reply({
        content:`Topic must be 1-90 characters`,
        ephemeral:true
      })
    // @ts-ignore
    interaction.client.api.interactions(interaction.id)(interaction.token).callback.post({
      data:{
        type: 9,
        data: {
          components: [
            {
              type: 1,
              components: [
                {
                  type: 4,
                  custom_id: 'question1',
                  style: 1,
                  label: 'Firmware + Atmosphere / DeepSea version',
                  placeholder: 'FW X.X.X, Atmosphere X.X.X, DeepSea X.X.X',
                  max_length:50
                }
              ]
            },
            {
              type: 1,
              components:[
                {
                  type: 4,
                  custom_id: 'question2',
                  style: 1,
                  label: 'Do you use Hekate or Fusee?',
                  placeholder: 'Hekate / Fusee',
                  min_length:5,
                  max_length:50
                }
              ]
            },
            {
              type: 1,
              components:[
                {
                  type: 4,
                  custom_id: 'question3',
                  style: 1,
                  label: 'Do you have an error code and screen?',
                  placeholder: 'Error Code 0000-0000 / Screenshot link',
                  required:false
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
              type: 1,
              components:[
                {
                  type: 4,
                  custom_id: 'question4',
                  style: 1,
                  label: 'Coming for support with SDSetup or DeepSea?',
                  placeholder: 'SDSetup / DeepSea / Something else',
                  max_length:50
                }
              ]
            },
            {
              type: 1,
              components:[
                {
                  type: 4,
                  custom_id: 'question5',
                  style: 2,
                  label: 'Describe your issue and what led up to it',
                  placeholder: 'Well, I was playing Splatoon 2 until...',
                  min_length:20
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
  }
})