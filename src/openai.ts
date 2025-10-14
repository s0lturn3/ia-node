import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import OpenAI from "openai";
import { ChatCompletionTool } from 'openai/resources';
import zod from 'zod';
import { getProdutosEmEstoque, getProdutosEmFalta } from './database';


// INICIALIZAÇÕES E CONFIGURAÇÕES
const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// DEFINIÇÕES DE VALORES
export const tools: ChatCompletionTool[] = [
  {
    type: 'function', // Definimos o tipo de ferramenta, nesse caso uma 'function'
    function: {
      name: 'produtos_em_estoque',  // Nome descritivo da função, não é o mesmo nome do método que vai ser chamado
      description: 'Lista os produtos que estão em estoque.',
      parameters: { // Lista de parâmetros, mesmo que o método não tenha nenhum deve ser passado dessa forma
        type: 'object',
        properties: { },
        additionalProperties: false
      },
      strict: true  // Informa para o agente que o uso deve ser estrito, sem fugir do que é dito na descrição do developer
    }
  },
  {
    type: 'function', // Definimos o tipo de ferramenta, nesse caso uma 'function'
    function: {
      name: 'produtos_em_falta',  // Nome descritivo da função, não é o mesmo nome do método que vai ser chamado
      description: 'Lista os produtos que estão em falta.',
      parameters: { // Lista de parâmetros, mesmo que o método não tenha nenhum deve ser passado dessa forma
        type: 'object',
        properties: { },
        additionalProperties: false
      },
      strict: true  // Informa para o agente que o uso deve ser estrito, sem fugir do que é dito na descrição do developer
    }
  },
];


// APIs

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

/** Gera uma resposta utilizando a estrutura 'completions.create' */
export const generateCompletion = async (message: string) => {

  client.chat.completions.create({
    model: 'gpt-4o-mini',
    max_completion_tokens: 100,
    response_format: { type: 'json_object' },
    tools: tools,
    messages: [
      { role: 'developer', content: 'Liste cinco produtos que atendam à necessidade do usuário. Responda em JSON no formato { produtos: string[] }' },
      { role: 'user', content: message }
    ],
  })
  .then(completion => {
    const output = JSON.parse(completion.choices[0].message.content ?? '');

    const schema = zod.object({
      produtos: zod.array(zod.string()),
    });

    const parsed = schema.safeParse(output);
    if (!parsed.success) throw new Error('A resposta foi recebida em um formato inválido.');


    const { tool_calls } = completion.choices[0].message;
    if (tool_calls) {
      const [ tool_call ] = tool_calls;

      const toolsMap = {
        produtos_em_estoque: getProdutosEmEstoque,
        produtos_em_falta: getProdutosEmFalta,
      }

      const functionToCall = toolsMap[tool_call.function.name];
      if (!functionToCall) throw new Error('Função não encontrada.');

      const result = functionToCall(tool_call.function.parsed_arguments);
    }


    return output;
  });

}
