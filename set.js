const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0VodTJ3aVFpUmhVa3E5OURySlVlS0ZGR1dKd0RMSU0wZ1c2S2NoZ2oxND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTDdVTzB6Mjl6SlpZUndiVFVkVDB2ZUs2aHdRMkszbmtZclIxdWZJL0RIST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRzhvVUw4a3JrVkhXQmhzazZzWi82a25PcXhkaXJYN0VIN2VOUFlXK2wwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxTGVaQzF4ZDU3TksrU2R2bEJnTy9JWDRHbDF6eGVKaFdVOWJDK2dGbHhrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZGM2tYZlBPVDhUaUlUUUZzdHdTT21Ub1hNY2JEUkJrK081cC8yNGlxRm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZVMTFtRG53UVhtMmdQdEwyblhqTGUwejVtUmhIWnNmaXhzNldPbUhTR1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0g5aXpIMzFrcWFncFNYWitWcGlUWFhzb1BOVU5sdDdEV2M4dURSZSttND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNSs2OGVQWXAzL1BpWEoyRkVPUWhNT09uMHNRVXFOYVpqMzUwdzAwV1pVbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllkTHVMTU14dWcvUGtZVVhrTjAvc2JxSXpsUkFVbWVCTjlKWFNGVzVER2lzSTZXK0VndnU3ME5NRk42dzN1RmJ2Vk5yWUh2cnFvR1pBclJuWmJISUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU4LCJhZHZTZWNyZXRLZXkiOiI2dHVqT0djR0puNWlsdG5xQ0d3U3Bic2dWQkJDRHZhL0d1MmJyVUlDd2MwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY1MjM5ODYxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNzFFNDJBRkExOTg5NTU1RDk2NEJFQkE1RDUyRTgxMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5ODMyMzEyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2NTIzOTg2MTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODlBODMxMDM4OTcwQzEzN0RFODNBNEZFNTUzRUIwREUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTgzMjMyMH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiNkVOREFDWUMiLCJtZSI6eyJpZCI6IjI1NTY1MjM5ODYxNDo2MUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEwNTI1MzA4OTMzMzI3NTo2MUBsaWQiLCJuYW1lIjoiTmljb2xhdXMgRGFuaWVsIDIg8J+YiPCfmIjwn5iIIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMMlhscWtERU5ha3NjSUdHQk1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJkajFoK1VNdzZhNzhlNlEzVnpuR1U0Q2t2RnpQWkVLVmVnOTVLRnlpZGdvPSIsImFjY291bnRTaWduYXR1cmUiOiJSa3BkZnpGYkpNWVU1VDNnSWhkY0NMczJsL1RONndMaXZYWm9ncVIwRmRQZGhudkFkYzl1dE93WUpXMFh6aGoxTExOM3VNWW1FdlIwelQzSlBRZ0lDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoieDBNTFFUdnZ0Sk51Q1J3aWNTNVlEb2R0c3ZqNy9CQXZ1dmdZeFhZd3VXWXBWVUJpTlVHWTJYYlNCSkcwNUVGVUQ3N2pNYzErSU9oS2t2SWNsdnJKREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2NTIzOTg2MTQ6NjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWFk5WWZsRE1PbXUvSHVrTjFjNXhsT0FwTHhjejJSQ2xYb1BlU2hjb25ZSyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5ODMyMjkyLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo4SCJ9',
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

