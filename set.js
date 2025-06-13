const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUxSdHh1S1dadlV3dXNtNE5TRmhEN20vQlhWVXdNZDlERkNXei9LVERHUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVdHWGI2MjRiQm45b3RvVjJmSm4wQWVUclhuMmJJNWpnMHRaMGZtZVNWcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNSU5sOHZmWWd2TUFqTUdqMWpPRmZqVXEvYXFzUmZvUCtvYUFTcUpRL1dBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjcUFaUjN6Q1NMUzJKUGE4TmlwQ2JGdi9aOGtHdnVjS25EZ0ZRbzdQaERNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitPS3pjdXZYU1RoUG9aaEphdUk3dzNZMUpkako0YmVZSmVHYzlVRWxlV0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InUrOG1qOENFL0NSYUFkbjFBVW9QUjFYeUlaQzRhLzNOanlBWnNQeW5qUkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUJYU2dKM0xLRXZ3c1dLeis1cFBYbUNXSms1ME45aUZvOWpuZTF1TDhXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2FucTAwZXN6cCtjVk41OXpZdDZ5MGw3dFNjcnBXZ0JON09QRkFCWC9Xcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImkzU2w1ZUxLdWZocGNUQWh5UGlFdGVCTVR6Z3ZLdUQvVW40dWc2bDM0czZoeDZqb2RpWUFINnFuc2p4ajJNTzl4Z2lOd3VvNGZWRWxvMmZ6U2lvZ0F3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJtT0svT2pKV3ozblg3K2xjMlV0TElHUWNUVXN5ZUt1bFQxcDBjeE5LRXRjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY1MjM5ODYxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5QjQyQzI3NjVFMzUxMjlGRTFGQkU4RUIxMUNBNTQyNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5ODQ0MDM3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2NTIzOTg2MTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjQ3OEQ1NjU4MEMzNjdCMDRFRkIzMzkyQjVFRDFCNTIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTg0NDAzOX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiS1k1M1FTUzciLCJtZSI6eyJpZCI6IjI1NTY1MjM5ODYxNDo2MkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEwNTI1MzA4OTMzMzI3NTo2MkBsaWQiLCJuYW1lIjoiTmljb2xhdXMgRGFuaWVsIDIg8J+YiPCfmIjwn5iIIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMNlhscWtERUtLQXNzSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJkajFoK1VNdzZhNzhlNlEzVnpuR1U0Q2t2RnpQWkVLVmVnOTVLRnlpZGdvPSIsImFjY291bnRTaWduYXR1cmUiOiJ2MXhPU0dhNnVmMER4VlFLbE9FMjN0aElhWlF4UzBCTnpYa0tFbzJGOTJNNzlTQzVlWlgrN2g5RG43SG5vcXpwSkQvWUVFTlBNb3N2UVcxbm9DanJCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQkkxN1RuTW10dkJlQTl6TjhoWE9aQ2JqcTBnc2V3Q2F6ci9sRnZYejQ2L052cWFkZEZKNzhFbWt6dCtGNmd3ZVpDVlR3dXBmSkttNlRKa3duVWIxQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2NTIzOTg2MTQ6NjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWFk5WWZsRE1PbXUvSHVrTjFjNXhsT0FwTHhjejJSQ2xYb1BlU2hjb25ZSyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5ODQ0MDE2LCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo4UyJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Nicolaus Daniel 2😈😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255652398614",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

