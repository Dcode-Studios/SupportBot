import { ThreadChannel } from "discord.js";
import { config } from "../../config";
import ButtonCommand from "../classes/ButtonCommand";
import SupportModalLayout from "../SupportModalLayout";

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
          components: SupportModalLayout,
          title: 'Open Support Ticket',
          custom_id: 'open_ticket_modal'
        }
      }
    }).then((err) => {
      console.log(err)
    });
  }
})