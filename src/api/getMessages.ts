import * as fs from 'fs'
import { Api } from 'telegram'
import { Config } from './config.js'

interface Message {
  message: string,
  id: string,
  poster?: string,
}

// SDK initialization
export const getMessages = async () => {
  await Config.telegramClient?.connect()

  Config.telegramClient?.setParseMode('html')
  const result = await Config.telegramClient?.invoke(
    new Api.messages.GetHistory({
      peer: 'thedailyton',
      addOffset: 0,
      limit: 100,
      maxId: 0,
      minId: 0,
      // @ts-ignore
      hash: BigInt('-4156887774564'),
    }),
  )

  const messagesData = [];
  let createdImages = [];

  try {
    const prevMessageData = fs.readFileSync(`${Config.staticDataPath}/static/messages.json`)
    const stringData = prevMessageData.toString('utf-8');
    const jsonMessageData = JSON.parse(stringData)

    createdImages = jsonMessageData.createdImages || [];
  } catch (e) {
  }

  // @ts-ignore
  for (const post of result['messages']) {
    const nextMessage: Message = {
      message: post.message,
      id: post.id,
    }

    if (post.media.className === 'MessageMediaPhoto') {
      nextMessage.poster = `/images/posts/${post.id}.jpeg`;

      if (!createdImages.includes(post.id)) {
        const result = await Config.telegramClient?.downloadMedia(post.media);

        if (result) {
          try {
            fs.writeFileSync(`${Config.staticDataPath}/images/posts/${post.id}.jpeg`, result);
            createdImages.push(post.id);
          } catch (e) {
            console.log("INFO: error while writing to the storage")
          }
        }
      }
    }

    messagesData.push(nextMessage)
  }

  // @ts-ignore
  return JSON.stringify({ messages: messagesData, createdImages })
}
