#!/usr/bin/env node
import 'dotenv/config'
import * as fs from 'fs'
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { Config } from './api/config'
import { getMessages } from './api/getMessages'
import { initUserConnection } from './api/initConection'
import server from './server'
import { storeMessagesData } from './utils'

const nodePath = resolve(process.argv[1])
const modulePath = resolve(fileURLToPath(import.meta.url))
const isCLI = nodePath === modulePath

export default async function main() {
  if (isCLI) {
    server.init()
  }

  await initUserConnection();
  storeMessagesData(await getMessages());

  setInterval(async () => {
    storeMessagesData(await getMessages());
  }, Config.messagesPoolInterval)
}

if (isCLI) {
  main()
}
