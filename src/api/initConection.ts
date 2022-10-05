import { TelegramClient } from 'telegram'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import input from 'input'
import { Config } from './config'

export const initBotConnection = async () => {
  Config.telegramClient = new TelegramClient(Config.stringSession, Config.telegramApiId, Config.telegramApiHash, {
    connectionRetries: 5,
  })

  await Config.telegramClient.start({
    botAuthToken: Config.telegramBotToken,
  })

  console.log('Telegram bot session: ', Config.telegramClient.session.save())
}

export const initUserConnection = async () => {
  console.log('Loading interactive example...')

  Config.telegramClient = new TelegramClient(Config.stringSession, Config.telegramApiId, Config.telegramApiHash, {
    connectionRetries: 5,
  })

  if (Config.stringSession) {
    await Config.telegramClient.start({
      phoneNumber: async () => await input.text('number ?'),
      password: async () => await input.text('password?'),
      phoneCode: async () => await input.text('Code ?'),
      onError: err => console.log(err),
    })
  }

  console.log('You should now be connected.')
  const session = Config.telegramClient.session.save()

  console.log('Telegram user session: ', session)
  await Config.telegramClient.sendMessage('me', { message: 'Successfully connected to TDT Telegram sniffer.' })
  await Config.telegramClient.sendMessage('me', { message: `Current session: ${session}` })
}
