const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
require('dotenv').config(); // Load .env variables (optional if using Render env panel)

// Optional HTTP keep-alive server if needed on platforms like Replit
try {
  require('./anyad.js');
  require('./anyad2.js');
} catch (_) {
  // ignore if not used
}

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

const steamUsers = [];

function loginAccount(account, index) {
  if (!account.username || !account.password || !account.shared_secret) {
    console.error(`❌ Account ${index + 1} is missing credentials. Skipping.`);
    return;
  }

  const user = new SteamUser({
    autoRelogin: false,       // ❌ Prevent auto reconnect
    promptSteamGuardCode: false,
    dataDirectory: null,      // ❌ No session file storage
  });

  user.on('loggedOn', () => {
    console.log(`✅ Account ${index + 1} logged in as ${user.steamID}`);
    user.setPersona(account.status);
    user.gamesPlayed(account.games);
  });

  user.on('error', (err) => {
    console.error(`❌ Account ${index + 1} error: ${err.message}`);
  });

  user.on('disconnected', (eresult, msg) => {
    console.warn(`⚠️ Account ${index + 1} disconnected: ${msg} (${eresult})`);
  });

  try {
    const twoFactorCode = SteamTotp.generateAuthCode(account.shared_secret);

    user.logOn({
      accountName: account.username,
      password: account.password,
      twoFactorCode: twoFactorCode,
    });

    steamUsers.push(user);
  } catch (err) {
    console.error(`❌ Account ${index + 1} failed to log in:`, err.message);
  }
}

// 🔁 Login all accounts
accounts.forEach((account, index) => {
  loginAccount(account, index);
});

// ⏳ Countdown Timer - Logs every minute until restart
const totalMinutes = 8 * 60;
let remainingMinutes = totalMinutes;

const countdownInterval = setInterval(() => {
  remainingMinutes--;

  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  console.log(`⏳ ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''} until restart...`);

  if (remainingMinutes <= 0) {
    clearInterval(countdownInterval);
  }
}, 60 * 1000); // Every minute

// ⏱ Shutdown after 8 hours
setTimeout(() => {
  console.log('🕒 8 hours passed. Logging off all accounts...');

  steamUsers.forEach((user, i) => {
    try {
      user.logOff();
      console.log(`👋 Account ${i + 1} logged off.`);
    } catch (e) {
      console.error(`⚠️ Error logging off account ${i + 1}: ${e.message}`);
    }
  });

  // Wait 5 seconds before exit to allow clean logout
  setTimeout(() => {
    console.log('🔁 Restarting bot by exiting with code 1...');
    process.exit(1); // ⚠️ Force restart on Render
  }, 5000);
}, totalMinutes * 60 * 1000); // 8 hours
