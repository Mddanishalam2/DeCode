const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const runCode = require('./runCode');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/run', async (req, res) => {
  const { code, language, input } = req.body;

  try {
    const output = await runCode(code, language, input);
    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});