console.clear();
const Discord = require('discord.js');
const {token, prefix, clientId, guildId} = require('./config.json');
const { Client, Intents, MessageEmbed } = require('discord.js');
const DiscordJS = require('discord.js');
const { readdirSync } = require('fs');
const { sep } = require("path");

// * addons
const chalk = require('chalk');
const AsciiTable  = require('ascii-table');

const client = new Client({ 
    intents: [
        'GUILDS', 
        'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS'
		
    ],
	partials: ['REACTION', 'MESSAGE'] 
});

client.commands = new Discord.Collection();
var table = new AsciiTable().setHeading('Command Name', 'Status');

const load = (dir = "./commands/") => {

	readdirSync(dir).forEach(dirs => {

		// ? Do I want this filter if I have ascii table that checks if the command is correct?
		const commandsN = readdirSync(`${dir}${sep}${dirs}${sep}`)//.filter(files => files.endsWith(".js"));
		
		for (const file of commandsN) {
		
			const command = require(`${dir}${dirs}/${file}`);

			if (command.name) {
				table.addRow(command.name, "✅")			

				if (client.commands.get(command.name) ) return console.warn(chalk.red(`Duplicated Command Name "${command.name}" w: \n ${dir}${dirs}/${file}`));
				

				client.commands.set(command.name, command)
				
			}else {
				table.addRow(file, "❌");
				continue;
			}
			
			// we check if the command has aliases, is so we add it to the collection
			// if (command.aliases && typeof (pull.aliases) === "object") {
			// 	pull.aliases.forEach(alias => {
			// 		// we check if there is a conflict with any other aliases which have same name
			// 		if (client.aliases.get(alias)) return console.warn(`${warning} Two commands or more commands have the same aliases ${alias}`);
			// 		client.aliases.set(alias, pull.name);
			// 	});
			// }
		}

	});
};
load();
console.log(table.toString())


client.on('ready', () => {
	client.user.setActivity("Sending data to Nasa"); 
	client.user.setStatus('dnd');
	console.log(chalk.green("I'm ready to work"));

	const guild = client.guilds.cache.get(guildId);
	let slashcommands;

	if (guild) {
		slashcommands = guild.commands
	} else {
		console.log("no guild id")
		//commands = client.application.commands
	}
	
	slashcommands.create({
		name: 'ping',
		description: 'Replies with pong!'
	})
	slashcommands.create({
		name: 'profile',
		description: 'Shows your or a member profile',
		options: [{
			name: 'user',
			description: 'which user profile you want to see',
			required: false,
			type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
		}]
	})
	slashcommands.create({
		name: 'roles',
		description: 'set roles to choose',
		options: [
		{
			name: 'roles',
			description: 'which role u can choose',
			required: true,
			type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
		},
		{
			name: 'emojis',
			description: 'which which emoji, these roles should have u can choose',
			required: true,
			type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
		}
		],
	})
});

// * Event for Messages
client.on("messageCreate", message => {
    //  console.log(message.content);

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.substring(prefix.length).split(/ +/);
    const cmd = args[0];
    

    const command = client.commands.find(com => com.name == cmd);
	
	if (!command) return message.reply(`**${args[0]}** to nie jest komenda!`);

	command.execute(message, args, client);
	
});

client.login(token);
// * Event for slash commands
client.on("interactionCreate", interaction => {
	
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	const command = client.commands.find(cmd => cmd.name == commandName);
	command.execute(interaction, client);
});

//const { msgID, msgLayout} = require('./configRole.json');
const config = require('./configRole.json');

let roleName = [];
let roleId = [];
let emojiName = [];
let counter = 0;




//*Adding Reactions
client.on('messageReactionAdd', (reaction, user) => {
	let msgLayout = config[reaction.message.guild.name].msg.msgLayout

	msgLayout.forEach(layout => {	
		let arr = layout.split(' ');
		roleId[counter] = arr[0];
		emojiName[counter] = arr[1];
		roleName[counter] = arr[2];
		counter++	
	});

	if(user.bot) return;

    if(reaction.message.id == config[reaction.message.guild.name].msg.msgID){

		if(emojiName.includes(reaction.emoji.name)){

			let i = emojiName.indexOf(reaction.emoji.name);
			
				let role = reaction.message.guild.roles.cache.find(x => x.name === roleName[i]);
				
				reaction.message.guild.members.fetch(user.id).then(member => {
					member.roles.add(role);
					console.log(chalk.blue("INFO") + '  | ' + chalk.green("Added") + ' role ' + roleName[i] + ' to ' + user.username); 
				});
		}
	}
});

//*Removing Reactions
client.on('messageReactionRemove', async (reaction, user) => {
		if(user.bot) return;

		if(reaction.message.id == config[reaction.message.guild.name].msg.msgID){

			if(emojiName.includes(reaction.emoji.name)){
	
				let i = emojiName.indexOf(reaction.emoji.name);

				let role = reaction.message.guild.roles.cache.find(x => x.name === roleName[i]);
					
				reaction.message.guild.members.fetch(user.id).then(member => {
					member.roles.remove(role);
					console.log(chalk.blue("INFO") + '  | ' + chalk.red("Removed") + ' role ' + roleName[i] + ' from ' + user.username);
				});
			}
		}

});

	


