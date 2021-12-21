const Discord = require('discord.js');

module.exports = {
	name: 'ping',
    description: 'ping command',

	execute(interaction, client) {
        
            var yourping = Date.now() - interaction.createdTimestamp;
            var botping = Math.round(client.ws.ping);
            const pingEmbed = new Discord.MessageEmbed()
                .setColor('#6c0096')
                .setAuthor(`FCS's Ping`, client.user.displayAvatarURL())
                .setTitle(`🏓Pong.🏓\n:robot: Opóźnienie: ${yourping}ms \n:stopwatch: Opóźnienie Api: ${botping}ms`)
                .setThumbnail(client.user.displayAvatarURL())
                 
                interaction.reply({ embeds: [pingEmbed] });
                
        
	},
};