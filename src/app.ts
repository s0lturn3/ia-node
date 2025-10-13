import express from 'express';
import OpenAI from "openai";

import dotenv from 'dotenv';
dotenv.config();


// INICIALIZAÇÕES E CONFIGURAÇÕES
const app = express();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: 'ia-node'
});

app.use(express.json());


// APIs

/** Gera uma resposta utilizando a estrutura 'responses.create' */
app.post("/generate/response", async (req, res) => {
  
  client.responses.create({
    model: "gpt-4o-mini",
    input: "Escreva uma mensagem curta explicando a diferença entre SOLID e DDD.",
    store: true,
    max_output_tokens: 100,
  })
  .then((result) => {
    console.log("Resposta: ", result.output_text);
    res.json({ message: result.output_text });
  });

});

/** Gera uma resposta utilizando a estrutura 'completions.create' */
app.post("/generate/completion", async (req, res) => {

  client.chat.completions.create({
    model: 'gpt-4o-mini',
    max_completion_tokens: 100,
    messages: [
      { role: 'developer', content: 'Responda de forma técnica, sucinta e bem direto ao ponto.' },
      { role: 'user', content: 'Escreva uma mensagem curta explicando a diferença entre SOLID e DDD.' }
    ],
  })
  .then((completion) => {
    console.log("Resposta: ", completion.choices[0].message.content);
    res.json({ message: completion.choices[0].message.content });
  });

});


export default app;
