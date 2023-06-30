import TelegramBot from 'node-telegram-bot-api'
import {HomeworksModel} from "../modules/homeworks/model.js"
import { StudentsModel } from '../modules/students/model.js'
import { UsersModel } from '../modules/users/model.js'
const bot=new TelegramBot(process.env.BOT_TOKEN,{
    polling:true
})
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(
      chatId,
      {
        reply_markup: {
          keyboard: [
            [`so'ngi 10 ta baholar`],
            [`so'ngi vazifa bahosi`],
          ],
        },
      }
    )
  })
bot.on('message',async msg=>{
    console.log(msg);
    const chatId=msg.from.id
    const username=msg.from.username
    if(msg.text==`so'ngi 10 ta baholar`){
        const findUser=await UsersModel.findOne({
            where:{
                username
            },
            attributes:["user_id"]
        })
        if(findUser){
            const findStudent=await StudentsModel.findOne({
                where:{
                    user_ref_id:findUser.user_id
                }
            })
            if(findStudent){
                const baholar=await HomeworksModel.findAll({
                    where:{
                        student_ref_id:findStudent.student_id
                    },
                    raw:true
                })
                if(baholar.length>0){
                    for(let i of baholar){
                        let year= new Date(i.date).getFullYear()
                        let mont= new Date(i.date).getMonth()
                        let day= new Date(i.date).getDay()
                        bot.sendMessage(chatId,`vazifa: ${i.name}, sharh: ${i.desc}, baho: ${i.mark}, sana: ${day}/${mont}/${year}
                        `)
                    }
                }
                else{
                    bot.sendMessage(chatId,`baholar mavjud emas`)
                }
            }
            else{
                bot.sendMessage(chatId,`siz o'quvchi emassiz`)
            }
        }
        else{
            bot.sendMessage(chatId,`siz tizimda mavjud emassiz`)
        }
            
    }
    else if(msg.text=="so'ngi vazifa bahosi"){
        const findUser=await UsersModel.findOne({
            where:{
                username
            },
            attributes:["user_id"]
        })
        if(findUser){
            const findStudent=await StudentsModel.findOne({
                where:{
                    user_ref_id:findUser.user_id
                }
            })
            if(findStudent){
                const baholar=await HomeworksModel.findAll({
                    where:{
                        student_ref_id:findStudent.student_id
                    },
                    raw:true
                })
                const lastHomework=baholar[baholar.length-1]
                if(lastHomework){
                    for(let i of baholar){
                        let year= new Date(lastHomework.date).getFullYear()
                        let mont= new Date(lastHomework.date).getMonth()
                        let day= new Date(lastHomework.date).getDay()
                        bot.sendMessage(chatId,`vazifa: ${lastHomework.name}, sharh: ${lastHomework.desc}, baho: ${lastHomework.mark}, sana: ${day}/${mont}/${year}
                        `)
                    }
                }
                else{
                    bot.sendMessage(chatId,`baholar mavjud emas`)
                }
            }
            else{
                bot.sendMessage(chatId,`siz o'quvchi emassiz`)
            }
        }
        else{
            bot.sendMessage(chatId,`siz tizimda mavjud emassiz`)
        }
    }
    else{
        bot.sendMessage(chatId,'iltimos tugmalardan birini bosing')
    }
})