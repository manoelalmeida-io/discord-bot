function token():string {
  if (process.env.TOKEN) {
    return process.env.TOKEN;
  }
  else {
     return require('./auth.json').token;
  }
}

export default token;