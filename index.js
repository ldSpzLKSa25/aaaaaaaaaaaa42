const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const keep_alive = require('./anyad.js');
const keep_alive2 = require('./anyad2.js');

const accounts = [
  {
    username: process.env.username,
    password: process.env.password,
    shared_secret: process.env.shared,
    games: [10, 359550, 252490, 381210, 730, 550, 240, 440],
    status: 1,
  },
  {
    username: process.env.username2,
    password: process.env.password2,
    shared_secret: process.env.shared2,
    games: [440, 438100, 359550],
    status: 1,
  },
  {
    username: process.env.username3,
    password: process.env.password3,
    shared_secret: process.env.shared3,
    games: [730],
    status: 1,
  },
  {
    username: process.env.username4,
    password: process.env.password4,
    shared_secret: process.env.shared4,
    games: [730],
    status: 1,
  },
];

function loginAccount(account, index) {
  if (!account.username || !account.password || !account.shared_secret) {
    console.error(`❌ Account ${index + 1} is missing credentials. Skipping.`);
    return;
  }

  const user = new SteamUser();

  user.on('loggedOn', () => {
    console.log(`✅ Account ${index + 1} logged in as ${user.steamID}`);
    user.setPersona(account.status);
    user.gamesPlayed(account.games);
  });

  user.on('error', (err) => {
    console.error(`❌ Account ${index + 1} error:`, err.message);
  });

  try {
    user.logOn({
      accountName: account.username,
      password: account.password,
      twoFactorCode: SteamTotp.generateAuthCode(account.shared_secret),
    });
  } catch (err) {
    console.error(`❌ Account ${index + 1} failed to log in:`, err.message);
  }
}

accounts.forEach((account, index) => {
  loginAccount(account, index);
});
