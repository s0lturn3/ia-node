import express from 'express';
import OpenAI from "openai";
import zod from 'zod';

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
    input: req.body.message,
    store: true,
    max_output_tokens: 100,
  })
  .then(result => {
    res.json({ message: result.output_text });
  });

});

/** Gera uma resposta utilizando a estrutura 'completions.create' */
app.post("/generate/completion", async (req, res) => {

  client.chat.completions.create({
    model: 'gpt-4o-mini',
    max_completion_tokens: 100,

    // Garante que a estrutura virá em um JSON válido
    // ...porém não garante que esteja formatado da forma que queremos, para isso usamos o 'z.object'
    // É importante saber também que é OBRIGATÓRIO utilizar o termo "JSON" em um dos prompts caso utilize o "response_format: { type: 'json_object' }"
    response_format: { type: 'json_object' },

    messages: [
      { role: 'developer', content: 'Liste cinco produtos que atendam à necessidade do usuário. Responda em JSON no formato { produtos: string[] }' },
      { role: 'user', content: req.body.message }
    ],
  })
  .then(completion => {
    const output = JSON.parse(completion.choices[0].message.content ?? '');

    const schema = zod.object({
      produtos: zod.array(zod.string()),
    });

    const result = schema.safeParse(output);
    if (!result.success) {
      res.status(500).end();
      return;
    }

    res.json(output);
  });

});


export default app;
