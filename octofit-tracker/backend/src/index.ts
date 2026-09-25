import express from 'express';
import cors from 'cors';
import './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API' });
});

app.listen(PORT, () => {
  console.log(`OctoFit Tracker API listening on port ${PORT}`);
});
