import { TextChannel, ThreadChannel } from "discord.js";
import { config } from "../../config";
import Command from "../classes/Command";
import SupportModalLayout from "../SupportModalLayout";

export default new Command({
  commandName:"create",
  subCommandGroup:"tickets",
    execute(interaction){
      // 1-90 char only
      let supportRoleOnly = interaction.options.data.find(o => o.name == "private")?.value == true  || false;
      let threadStarter = interaction.member.user.id;
      let topic = {
        value:interaction.options.getString("topic")
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