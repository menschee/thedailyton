import { Api } from 'telegram'
import { Config } from './config.js'

export const getMessages = async () => {
  await Config.telegramClient?.connect()

  const result = await Config.telegramClient?.invoke(
    new Api.messages.GetHistory({
      peer: 'thedailyton',
      addOffset: 0,
      limit: 100,
      maxId: 0,
      minId: 0,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      hash: BigInt('-4156887774564'),
    }),
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return JSON.stringify(result['messages'])
}
