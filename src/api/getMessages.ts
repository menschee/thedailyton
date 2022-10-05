import { Api } from 'telegram'
import { Config } from './config'

export const getMessages = async () => {
  await Config.telegramClient?.connect()

  const result = await Config.telegramClient?.invoke(
    new Api.messages.GetHistory({
      peer: 'thedailyton',
      addOffset: 0,
      limit: 100,
      maxId: 0,
      minId: 0,
      //@ts-ignore
      hash: BigInt('-4156887774564'),
    }),
  )

  // @ts-ignore
  return JSON.stringify(result['messages'])
}
