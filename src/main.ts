#!/usr/bin/env node
import 'dotenv/config'
import { Config } from './api/config'
import { getMessages } from './api/getMessages'
import { initUserConnection } from './api/initConection'
import { storeMessagesData } from './utils'

export default async function main() {
  await initUserConnection()
  storeMessagesData(await getMessages())

  setInterval(async () => {
    storeMessagesData(await getMessages())
  }, Config.messagesPoolInterval)
}

main()
