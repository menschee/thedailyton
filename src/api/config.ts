import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'

interface IConfig {
  port: number
  telegramApiId: number
  stringSession: StringSession
  telegramApiHash: string
  telegramBotToken: string
  messagesPoolInterval: number
  telegramClient?: TelegramClient
}

export const Config: IConfig = {
  port: parseInt(process.env.PORT || '8080'),
  telegramApiId: Number(process.env.API_ID),
  telegramBotToken: String(process.env.TELEGRAM_BOT_TOKEN),
  telegramApiHash: String(process.env.API_HASH),
  // TODO: remove later
  stringSession: new StringSession(process.env.SESSION || '',),
  messagesPoolInterval: Number(process.env.MESSAGES_POOL_INTERVAL || 60000)
}

if (!Config.telegramBotToken) {
  throw new Error('Please provide new token')
}

if (!Config.telegramApiId) {
  throw new Error('Please provide telegram API ID')
}

if (!Config.telegramApiHash) {
  throw new Error('Please provide telegram api hash')
}
