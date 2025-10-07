const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot 1 is alive');
});

app.listen(PORT, () => {
  console.log(`anyad.js server running on port ${PORT}`);
});
