const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs')
let config = require("../../configRole.json")


module.exports = {
	name: 'test',
    description: 'test command',

	execute(message, args, client) {

		const emojiList = message.guild.emojis.cache.map(emoji => emoji.id).join(" ");
		message.channel.send(emojiList);

		//let gemoji = client.emojis.find(emoji => emoji.name === "bean") 
	},
};

