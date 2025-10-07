const express = require('express');
const app = express();
const PORT = process.env.PORT2 || 3001; // Use PORT2 to avoid conflict with PORT

app.get('/', (req, res) => {
  res.send('Bot 2 is alive');
});

app.listen(PORT, () => {
  console.log(`anyad2.js server running on port ${PORT}`);
});
