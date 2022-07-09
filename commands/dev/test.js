const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs')
let config = require("../../configRole.json")


module.exports = {
	name: 'test',
    description: 'test command',

	execute(message, args, client) {

		
		const owner = message.guild.member.get(x => x.id == message.guild.ownerId);
		
		console.log(owner)
		
	},
};

