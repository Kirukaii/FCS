const Discord = require('discord.js');
const { MessageEmbed} = require('discord.js');
const moment = require('moment');
module.exports = {
	name: 'profile',
    description: 'profile command',
	
	execute(interaction, client) {
		
		let user = interaction.options.getUser('user');

		if (!user){
			const myProfileEmbed = new MessageEmbed()
				.setColor('#42f58a')
				.setTitle("Your Profile")
				.setThumbnail(interaction.user.displayAvatarURL())
				.addField("Username:", interaction.user.username, true)
				.addField("ID:", interaction.user.id, true)
				.addField("Nickname:", interaction.member.nickname, true)
				.addField("Roles:", `${interaction.member.roles.cache.map(r => r).join(' ').replace("@everyone", "")}`)
				.addField("Account created:", moment(interaction.user.createdAt).format("DD/MM/Y, h:mm"))
				.addField("Joined to server:", moment(interaction.member.joinedAt).format("D/MM/Y, h:mm") )
				.setTimestamp()
				.setFooter('FCS', client.user.displayAvatarURL());
			
			interaction.reply({ embeds: [myProfileEmbed] });

		}else{
			const userProfileEmbed = new MessageEmbed()
				.setColor('#42f58a')
				.setTitle("Your Profile")
				.setThumbnail(user.displayAvatarURL())
				.addField("Username:", user.username, true)
				.addField("ID:", user.id, true)
				//.addField("Nickname:", user.member.nickname, true)
				.addField("Roles:", `${interaction.member.roles.cache.map(r => r).join(' ').replace("@everyone", "")}`)
				.addField("Account created:", moment(user.createdAt).format("DD/MM/Y"))
				.addField("Joined to server:", moment(user.joinedAt).format("D/MM/Y") )
				.setTimestamp()
				.setFooter('FCS', client.user.displayAvatarURL());

				interaction.reply({ embeds: [userProfileEmbed] });
		}
	
	},
};
