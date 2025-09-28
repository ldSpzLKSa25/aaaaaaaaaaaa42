const steamUser = require('steam-user');
const steamTotp = require('steam-totp');
const keep_alive = require('./anyad.js')
const keep_alive2 = require('./anyad2.js')

var username = process.env.username;
var password = process.env.password;
var shared_secret = process.env.shared;

var games = [10];  // Enter here AppIDs of the needed games
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
var shared_secret2 = process.env.shared2;

var games2 = [440, 438100];  // Enter here AppIDs of the needed games
var status2 = 1;  // 1 - online, 7 - invisible


user2 = new steamUser();
user2.logOn({"accountName": username2, "password": password2, "twoFactorCode": steamTotp.generateAuthCode(shared_secret2)});
user2.on('loggedOn', () => {
 	if (user2.steamID != null) console.log(user2.steamID + ' - Successfully logged on');
 	user2.setPersona(status2);               
 	user2.gamesPlayed(games2);

});

var username3 = process.env.username3;
var password3 = process.env.password3;
var shared_secret3 = process.env.shared3;

var games3 = [730];  // Enter here AppIDs of the needed games
var status3 = 1;  // 1 - online, 7 - invisible


user3 = new steamUser();
user3.logOn({"accountName": username3, "password": password3, "twoFactorCode": steamTotp.generateAuthCode(shared_secret3)});
user3.on('loggedOn', () => {
 	if (user3.steamID != null) console.log(user3.steamID + ' - Successfully logged on');
 	user3.setPersona(status3);               
 	user3.gamesPlayed(games3);

});

var username4 = process.env.username4;
var password4 = process.env.password4;
var shared_secret4 = process.env.shared4;

var games4 = [730];  // Enter here AppIDs of the needed games
var status4 = 1;  // 1 - online, 7 - invisible


user4 = new steamUser();
user4.logOn({"accountName": username4, "password": password4, "twoFactorCode": steamTotp.generateAuthCode(shared_secret4)});
user4.on('loggedOn', () => {
 	if (user4.steamID != null) console.log(user4.steamID + ' - Successfully logged on');
 	user4.setPersona(status4);               
 	user4.gamesPlayed(games4);
 });
