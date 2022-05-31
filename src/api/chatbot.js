const Fetch = require("node-fetch");

module.exports = {
	async chat(msg, owner, userid) {
		if (!msg) return "No Message there"
		const res = await Fetch(encodeURI(`https://api.affiliateplus.xyz/api/chatbot?message=${msg}&botname=Cutie&ownername=${owner}&user=${userid}`)), json = await res.json()
		if (!json) return `An Error Occured.Try \`bug command\`.`
		console.log(json)
	}
}

// bot.on('message', async message => {
// const errlog =  new Discord.WebhookClient(binfo.cerrlogID, binfo.cerrlogT)

// try { 
//   const chatchannel = require('./models/chatchannel');
//     if (message.author.bot) return;
//    if (!message.guild) return 
//      const data = await chatchannel.findOne({
//         GuildID: message.guild.id
//     });

//    if(data) {
//         const channelID = data.chatchannelID;

//         if(message.channel.id !== channelID) return;

//     message.content = message.content.replace(/^<@!?[0-9]{1,20}> ?/i, '');
   
//       if (message.content.length < 2) return;
//     let content = message.content;
//     if(message.attachments.size > 0) return;
//     message.channel.startTyping(true);
//     const options = {
//         method: 'GET',
//         url: botconfig.chat.url,
//         qs: {
//             bid: botconfig.chat.bid,
//             key: botconfig.chat.key,
//             uid: `http://api.brainshop.ai/get?bid=154010&key=9Pag7cNZUmxG8DtL&uid=[${message.author.id}]&msg=[msg]`,
//             msg: message.content

//         },
//         json: true
//     };
//     let reply = await request(options);
//     message.channel.stopTyping(true);
//     if (reply) {
//         await message.reply(reply.cnt);
//     }
//   }
// }catch (err){
//     const options2 = {
//         method: 'GET',
//         url: botconfig.chat2.url,
//         qs: {
//             bid: botconfig.chat2.bid,
//             key: botconfig.chat2.key,
//             uid: `http://api.brainshop.ai/get?bid=154010&key=9Pag7cNZUmxG8DtL&uid=[${message.author.id}]&msg=[msg]`,
//             msg: message.content

//         },
//         json: true
//     };
//     let reply2 = await request(options2);
//     if (reply2) {
//      await message.reply(reply2.cnt)
//     }
//     return errlog.send(`err in chat catagory \n ${err.message}`)
//  }
// });


// bot.on('message', async message => {
   
//    if(message.content === `<@${bot.user.id}>`){

//     // if(message.mentions.has(`@+everyone`))return;
//        //if(message.mentions.has(`@+here`))return;

//          const data = await dbprefix.findOne({
//         GuildID: message.guild.id
// })
//   let pdata = data
//    if(pdata == null) pdata = botconfig;
//    let bprefix = pdata.Prefix ;

//         message.channel.send({embed:{ 
//       color: binfo.color,
//        description:`<a:annouc:770280757636759633> My prefix in this sever is [ ${bprefix} ]`}})

//    }
// });
// //const errlog =  new Discord.WebhookClient(binfo.cerrlogID, binfo.cerrlogT)

// //bot.on('error', err => 
  
// //  errlog.send(err.stack));

// //bot.on('warn', warn => 
  
//   //errlog.send(warn));

// //process.on("unhandledRejection", (err) => {
//    // const ErrCatch = new Discord.WebhookClient(binfo.cerrlogID, binfo.cerrlogT)
//     //if(!ErrCatch)return;
//     //ErrCatch.send({embed:{
//       //  description:`:worngtick: ${err.message}`,
//       //  color:binfo.color
//    // }});
//     //console.error(err);
// //});
// //process.on("uncaughtException", (err) => {
//     //const ErrCatch =new Discord.WebhookClient(binfo.cerrlogID, binfo.cerrlogT)
//     //if(!ErrCatch)return;
//     //ErrCatch.send({embed:{
//        // description:`:worngtick: ${err.message}`,
//        // color:binfo.color
//   //  }});
//     //console.error(err);
// //});


      


// bot.login(botconfig.token);
