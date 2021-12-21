const Discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs')
let config = require("../../configRole.json")
const { Permissions } = require('discord.js');
module.exports = {
	  name: 'create',
    description: 'role command',
    args: true,

	execute(message, args, client) {

        
        if(message.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)){
          //message.delete();

          //* First argument  
          let role = args[1];
          if(!role){          
            return message.channel.send("Brak nazw ról");
          }else //if(role.constains(","))
          {
            role = role.split(',');     
          }
          
          // if(role = " "){
          //   return message.channel.send("argumenty są puste")
          // }
          //* Seccond argument
          let emoji = args[2];
          
          if(!emoji){  
            return message.channel.send("Brak emoji")
          }else if(!emoji.match(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi)){
            return message.channel.send(`Podany argument (**${emoji}**) to nie jest Emoji`)
          }else //if(emoji.constains(","))
          {
            emoji = emoji.split(',');     
          }       
        
          //*send possible roles && Create roles
          
          for (let i = 0; i < emoji.length; i++) {

          let grole = message.guild.roles.cache.find(x => x.name === role[i]);
          
            if (grole == undefined) {       

              message.guild.roles.create({
                  name: role[i],
              })

            }else{
              //console.log("Role istnieją")
            }

              message.channel.send(emoji[i] + " " + role[i])

            }
        
          //* set reactions
          message.channel.send("\n React to get these roles.").then(function (message){
          for (let i = 0; i < emoji.length; i++) {
            message.react(emoji[i])

            //* Define the role 
            let grole = message.guild.roles.cache.find(x => x.name === role[i]);

            //* Define the emoji 
            //let gemoji = client.emojis.find(emoji => emoji.name === emoji[i]) 
            //console.log(gemoji);

            
            //* Write JSON File
            
            if (config['msgLayout'].length >= 2) {
              config['msgLayout']= 
              [
              ]
              console.log(chalk.magenta("Reseting msgLayout"))
            }
            config['msgLayout'].push(
              //gemoji.id +" "+ 
              grole.id +" "+ emoji[i] +" "+ role[i]
            );

            const stringifiedrequest = JSON.stringify(config, null, 4,'\t');
            fs.writeFileSync("./configRole.json", stringifiedrequest)
            }

          //* Define the ID of the msg
          let id = message.id;
          //console.log(id);
          config['msgID']= id;
          const stringifiedrequest = JSON.stringify(config, null, 4,'\t');
          fs.writeFileSync("./configRole.json", stringifiedrequest)
        });

        }else return message.channel.send("Nie masz Permisji");
        

        // let emoji = interaction.options.getString('emojis').split(',');
        // let role = interaction.options.getString('roles').split(',')
        // let msg;
        
        // console.log(emoji);
        // console.log(role)
        // for (let i = 0; i < emoji.length; i++) {

        //   msg = emoji[i] + role[i];
        //   console.log(chalk.magenta(msg) + "//");
          
        // }

        // interaction.reply({ 
        //   content:  "working" 
        // }); 
        
	},
};

