const Discord = require("discord.js");
const token = require("./token.json");
const fs = require("fs");
const bdd = require("./bdd.json");

const bot = new Discord.Client();

bot.on("ready", async () =>{
    console.log("Le BOT est allumé");
    bot.user.setStatus("online");
    bot.user.setActivity("#help | dev by AYROX", {type: "WATCHING"});
    bot.user.setActivity("TEST", {type: "PLAYING"});
});

bot.on("message", message => {
    if(message.content.startsWith("#clear")){
    message.delete();
        if(message.member.hasPermission("MANAGE_MESSAGES")){

                let args = message.content.trim().split(/ +/g);

            if(args[1]){
                if(!isNaN(args[1]) && args[1] >= 1  && args[1] <= 99){

                    message.channel.bulkDelete(args[1])
                    message.channel.send(`Vous avez supprimé __**${args[1]} message(s)**__ !`)

                }
                else{
                    message.channel.send(`Vous devez indiquer une valeur entre __**1 et 99**__ !`)
                }
            }
            else{
                message.channel.send(`Vous devez indiquer un __**nombre de messages**__ a supprimer !`)
            }
        }
        else{
            message.channel.send(`Vous devez avoir la permission de __**gérér les messages**__ pour effectuer cette commande !`)
        }
    }

    if(message.content.startsWith("#mb")){
    message.delete();
        if(message.member.hasPermission("MANAGE_MESSAGES")){
            if(message.content.length > 5){
                message_bienvenue = message.content.slice(4)
                bdd["message-bienvenue"] = message_bienvenue
                Savebdd();
            }
        }
    }
})

function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}



bot.login(token.token)
