import fs from 'fs'
import { Config } from './api/config'

export const storeMessagesData = (messages: string) => {
  fs.writeFile(`${Config.staticDataPath}/messages.json`, messages, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });
}
