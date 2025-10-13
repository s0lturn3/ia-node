# API Express com Node.js e Integração ChatGPT

Este projeto é uma API construída com Express e Node.js para integrar o ChatGPT via API.
Baseado em um curso da Rocketseat.

## Instalação

```bash
npm i
```

## Uso

```bash
npm run dev
```

## Exemplo de código (`src/app.ts`)

```typescript
import express from 'express';

const app = express();
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: '<projeto>'
});


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


export default app;
```

## Licença

MIT
