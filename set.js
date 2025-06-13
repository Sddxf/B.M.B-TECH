const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVBjUjEyRWZoU3RLOGRvZUlFZUtiWk5WYlJDNys3b0ZWeWpVdHJkY3pVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM2gvaE1ENDhNM1RNNVpxRkgxSC9ucnE3OGJQWW5TSXhoMVlpWEsveDVoTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrQk5NSzVFdkVsTU54ZlFpQlkwVmY3NTRpRUUvTUx5TzIxZ2xRdEIzeWswPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQTXpmbUl6ODNXcWcrak1FUDgrL1FPbzBHdVVyMHU4OHZjNzZlN2gxdDF3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRFMktCZFozakFsREI1SjZ5Q2VQQ3RwNCsrUEtiUGJoQWNEOWFTL21zR0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBJTEJ5cW9FNkxINll4cTFjLzBhcjh6T29FNWptd29QL0U2MGJ6QjBBakE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUtFZ2o1VWRTaVBLMGN5QUFTTkZvY0wwUzM3OFJDTEJWSkIxcy81aEtWZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2pPWCtXd2RzUnVwU2lmKzZRNWZ6Tk1YMGJJb1ZKbklKWTFCZVQwTGN6dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJNZCtYMGJpZjkvSnZsb1BoTlFUZFhXM2lIR2ZtNUxYeG1iS0QvT1I0Z1dZZ05CZ3A1MVVMVEx1eFh5UGw3TmVCWHZnUFNzc3piRUYzOHR0ZzNJbkJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTgsImFkdlNlY3JldEtleSI6IlBWUUhKU01MZ2hUN0kvOEt1aWNld2JtV0I5eFZmY1V0SGhwNXhVZUt3V1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NjUyMzk4NjE0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNBMjk0MDFEMzcwQTkxNzdBM0IxQkYwMDUzNzBFRTI2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk4MDQ2NzR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY1MjM5ODYxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCQjUyOTU2MzZDNTVFMEMzNEI1OUY3NUZDNDg2MUQyMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5ODA0Njc3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJBOVFSTVlGOSIsIm1lIjp7ImlkIjoiMjU1NjUyMzk4NjE0OjYwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTA1MjUzMDg5MzMzMjc1OjYwQGxpZCIsIm5hbWUiOiJOaWNvbGF1cyBEYW5pZWwgMiDwn5iI8J+YiPCfmIgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0wyWGxxa0RFTkxNcjhJR0dCSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRqMWgrVU13NmE3OGU2UTNWem5HVTRDa3ZGelBaRUtWZWc5NUtGeWlkZ289IiwiYWNjb3VudFNpZ25hdHVyZSI6IlRaZjFBQ1lWbFdFV3BxQnN1UEk3cjY5UU5SN3lJZjFJUC9WenBtQlpSa0Q5UW5vTkgyYURFdi9ZdDV4NkRnUmF3QVpyRWpEYjU5alFmdElFai9paUJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIya3dUNThLcG4wZzhIMUVUVE5OSHBQdUNWQU5JeG5RTEx4MXdndUpJL1FUUWl1WEFDVXI2OVNUNVRKZFlFWG1sK010cHRuY1A3NWdVU0xaNTFZdXZDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY1MjM5ODYxNDo2MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYWTlZZmxETU9tdS9IdWtOMWM1eGxPQXBMeGN6MlJDbFhvUGVTaGNvbllLIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDk4MDQ2NDAsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSjhIIn0=',
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

