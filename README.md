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
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { generateCompletion, generateResponse } from './openai';


// INICIALIZAÇÕES E CONFIGURAÇÕES
const app = express();
app.use(express.json());


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


export default app;
```

## Exemplo de código (`src/openai.ts`)

```typescript
import dotenv from 'dotenv';
dotenv.config();

import OpenAI from "openai";
import { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources';

import zod from 'zod';
import { getProdutosEmEstoque, getProdutosEmFalta } from './database';


// INICIALIZAÇÕES E CONFIGURAÇÕES
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


/** Gera uma resposta utilizando a estrutura 'responses.create' */
export const generateResponse = async (message: string) => {

  client.responses.create({
    model: "gpt-4o-mini",
    input: message,
    store: true,
    max_output_tokens: 100,
  })
  .then(result => {
    return { message: result.output_text };
  });

}
```

## Licença

MIT
