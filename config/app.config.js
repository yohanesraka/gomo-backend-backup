require('dotenv').config();
const {URL} = process.env;

module.exports = {
  // Confihuration JSON Web Token
  jwt:{
    secret: "$2a$19$QeyGVx5HvztvllwoKJnCBea1AMJCTUAioDLPepc7fCS.Sjd.ZdD3O",
    expiresIn: 18000
  },

  // Base URL
  url: URL,

  // configuration verification email
  auth:{
    email: "gomosembada@gmail.com",
    password: "sembadabisa22",
    password_app: "jjjwoylbzudzcpkm",
    url_redirect_verify: "http://localhost:51001/verify/success-verify"
  },


  // Configuration premium account
  premiumFarm:{
    limitTernak: 20
  },

  // configuration geo location
  geocode:{
    base_url: "https://geocode.xyz/",
    auth: "928153620798657886089x85490",
    region: "ID",
    geoit: "JSON"
  }
}