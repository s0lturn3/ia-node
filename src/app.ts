import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { generateCompletion, generateResponse } from './openai';


// INICIALIZAÇÕES E CONFIGURAÇÕES
const app = express();
app.use(express.json());


// APIs

/** Gera uma resposta utilizando a estrutura 'responses.create' */
app.post("/generate/response", async (req, res) => {
  
  try {
    const response = await generateResponse(req.body.message);
    res.json(response);
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

/** Gera uma resposta utilizando a estrutura 'completions.create' */
app.post("/generate/completion", async (req, res) => {

  try {
    const response = await generateCompletion(req.body.message);
    res.json(response);
  }
  catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

export default app;
