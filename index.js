const steamUser = require('steam-user');
const steamTotp = require('steam-totp');
const keep_alive = require('./keep_alive.js')

var username = process.env.username;
var password = process.env.password;
var shared_secret = process.env.shared;

var games = [493340, 730, 440, 570, 945360, 10, 40970, 1238080, 397900, 822240, 1222670, 80, 240, 220, 320, 380, 420, 340, 360, 400, 16700, 100, 223710, 232090, 1250, 1407200, 1269260, 35420, 489630, 304930, 578080, 438100];  // Enter here AppIDs of the needed games
var status = 1;  // 1 - online, 7 - invisible


user = new steamUser();
user.logOn({"accountName": username, "password": password, "twoFactorCode": steamTotp.generateAuthCode(shared_secret)});
user.on('loggedOn', () => {
	if (user.steamID != null) console.log(user.steamID + ' - Successfully logged on');
	user.setPersona(status);               
	user.gamesPlayed(games);

 });

var username2 = process.env.username2;
var password2 = process.env.password2;

var games2 = [578080, 730, 240, 440, 1085660, 220, 320, 340, 1507190, 304930, 489630, 1180660];  // Enter here AppIDs of the needed games
var status2 = 1;  // 1 - online, 7 - invisible


user2 = new steamUser();
user2.logOn({"accountName": username2, "password": password2});
user2.on('loggedOn', () => {
 	if (user2.steamID != null) console.log(user2.steamID + ' - Successfully logged on');
 	user2.setPersona(status2);               
 	user2.gamesPlayed(games2);
 });

//var username3 = process.env.username3;
//var password3 = process.env.password3;
// var shared_secret3 = process.env.shared3;

// var games3 = [730, 440, 570, 304930];  // Enter here AppIDs of the needed games
// var status3 = 1;  // 1 - online, 7 - invisible


// user3 = new steamUser();
// user3.logOn({"accountName": username3, "password": password3, "twoFactorCode": steamTotp.generateAuthCode(shared_secret3)});
// user3.on('loggedOn', () => {
// 	if (user3.steamID != null) console.log(user3.steamID + ' - Successfully logged on');
// 	user2.setPersona(status3);               
// 	user2.gamesPlayed(games3);
// });
