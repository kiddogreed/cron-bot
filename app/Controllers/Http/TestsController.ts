import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { message } from 'telegram/client';
//import input from "input"; // npm i input

export default class TestsController {
  public async test1({response}: HttpContextContract) {

    const schedule = require('node-schedule');

  // const job = schedule.scheduleJob('42 * * * *', function(){
  //   console.log('The answer to life, the universe, and everything!');
  // });


  const job = schedule.scheduleJob(' */1 * * * *', function(){
    const message = console.log('Time in  7:30');
    
  }); 
 
  


    const { Telegraf } = require('telegraf')

    const bot = new Telegraf("5637420751:AAGZXnOZhLdqXqizqln5RK07ZLcNAg82h-A")
    bot.start((ctx) => ctx.reply('Welcome'))
    bot.help((ctx) => ctx.reply('Send me a sticker'))
    bot.on('sticker', (ctx) => ctx.reply('👍'))
    bot.hears('mama', (ctx) => ctx.reply('Hey there'))
    bot.message.sendMessage(message)
    bot.launch()

    return response.ok("Bot is running")

  }

  public async test2({response, request}: HttpContextContract) {


      const apiId = Env.get('api_id')
      const apiHash = Env.get('api_hash')
      const stringSession = new StringSession(""); // fill this later with the value from session.save()
      const number = request.input("number")
      const password = request.input("password")
      const text = request.input("text")

      (async () => {
        console.log("Loading interactive example...");
        const client = new TelegramClient(stringSession, apiId, apiHash, {
          connectionRetries: 5,
        });
        await client.start({
          phoneNumber: async () => await number,
          password: async () => await password,
          phoneCode: async () =>
            await text,
          onError: (err) => console.log(err),
        });
        console.log("You should now be connected.");
        console.log(client.session.save()); // Save this string to avoid logging in again
        await client.sendMessage("me", { message: "Hello!" });
      })();

      return response.ok("bot is running");


  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
