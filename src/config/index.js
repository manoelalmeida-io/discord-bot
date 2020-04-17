let token;

if (process.env.TOKEN) {
	token = process.env.TOKEN;
}
else {
	 token = require('./auth.json').token;
}

module.exports = { 
  token
}