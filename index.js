const Discord = require('discord.js')

const client = new Discord.Client()

const config = require('./config.json')

client.on('ready', () => {
    console.log(`${client.user.tag} is online!`)
})

client.on('message', async message => {

    let args = message.content.slice(config.prefix.length).trim().split(/ +/)
    let command = args.shift().toLowerCase()


    let questions = {
        firstQuestion: "Yaşın kaçtır?",
        secondQuestion: "Bize kendin hakkında kısaca bilgi verir misin?",
        thirdQuestion: "Herhangi bir deneyimin veya tecbüren var mı? Varsa nedir?",
        fourthQuestion: "Günde aktif olabileceğin saatler?",
        fifthQuestion: "Peki, neden seni diğerleri yerine işe almalıyız?"
    }


    if (!message.content.startsWith(config.prefix) || message.author.bot) return
    if (command === "kabul") {
        message.channel.send("DM'lerinizde bu süreci başlattım. İptal etmek için ***iptal*** yazın")
         message.author.send(questions.firstQuestion).then(msg => {
            const filter1 = m => m.author.id === message.author.id
            msg.channel.awaitMessages(filter1, {
                time: 5 * 60000,
                max: 1
            }).then(messages => {
                let msg1 = messages.first().content
                if(msg1.toLowerCase() === "cancel") return message.author.send("Tamam, bu işlemi iptal ettim")
                message.author.send(questions.secondQuestion).then(msg => {
                    const filter1 = m => m.author.id === message.author.id
                    msg.channel.awaitMessages(filter1, {
                        time: 5 * 60000,
                        max: 1
                    }).then(messages => {
                        let msg2 = messages.first().content
                        if(msg2.toLowerCase() === "cancel") return message.author.send("Tamam, bu işlemi iptal ettim")
                        message.author.send(questions.thirdQuestion).then(msg => {
                            const filter1 = m => m.author.id === message.author.id
                            msg.channel.awaitMessages(filter1, {
                                time: 5 * 60000,
                                max: 1
                            }).then(messages => {
                                let msg3 = messages.first().content
                                if(msg3.toLowerCase() === "cancel") return message.author.send("Tamam, bu işlemi iptal ettim")
                                message.author.send(questions.fourthQuestion).then(msg => {
                                    const filter1 = m => m.author.id === message.author.id
                                    msg.channel.awaitMessages(filter1, {
                                        time: 5 * 60000,
                                        max: 1
                                    }).then(messages => {
                                        let msg4 = messages.first().content
                                        if(msg4.toLowerCase() === "cancel") return message.author.send("Tamam, bu işlemi iptal ettim")
                                        message.author.send(questions.fifthQuestion).then(msg => {
                                            const filter1 = m => m.author.id === message.author.id
                                            msg.channel.awaitMessages(filter1, {
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg5 = messages.first().content
                                                if(msg5.toLowerCase() === "cancel") return message.author.send("Tamam, bu işlemi iptal ettim")
                                                message.author.send("Başvuru Gönderildi!").then(msg => {
                                                    message.client.channels.cache.get(config.applicationChannel).send(
                                                        new Discord.MessageEmbed()
                                                            .setTitle('Başvuru Gönderildi')
                                                            .setDescription(`Bu başvuru tarafından gönderildi${message.author.tag} (${message.author.id}).\nHesap Oluşturma Tarihi: ${message.author.createdAt}`)
                                                            .addField(questions.firstQuestion, "Soru: " + msg1)
                                                            .addField(questions.secondQuestion, "Soru: " + msg2)
                                                            .addField(questions.thirdQuestion, "Soru: " + msg3)
                                                            .addField(questions.fourthQuestion, "Soru: " + msg4)
                                                            .addField(questions.fifthQuestion, "Soru: " + msg5)
                                                    )
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    if(command === "iptal"){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Komutu Kullanabilmek için yeterli yetkin yok.")
        let User = message.mentions.users.first()
        if(!User) return message.channel.send("Lütfen iptal etmem için bir kullanıcı sağlayın")
        User.send("Başvurunuz᲼" + message.guild.name + "᲼sunucusunda᲼" + message.author.tag + "᲼tarafından iptal edildi.")
    }

    if(command === "kabul-et"){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Komutu Kullanabilmek için yeterli yetkin yok.")
        let User = message.mentions.users.first()
        if(!User) return message.channel.send("Lütfen kabul etmem için bir kullanıcı sağlayın")
        User.send(":tada: Başvurunuz᲼" + message.guild.name + "᲼sunucusunda᲼" + message.author.tag + "᲼tarafından kabul edildi.")
    }
})

client.login(config.token)