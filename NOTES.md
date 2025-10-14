# Guia de Trechos de Código do Projeto

Este documento serve como referência rápida para entender e lembrar o significado e o uso de trechos específicos do projeto.

---

## 1. `response_format: { type: 'json_object' }`

```js
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'user', content: 'Me envie os dados em JSON.' }
  ],
  response_format: { type: 'json_object' }
});
```

**Explicação:**
O parâmetro `response_format: { type: 'json_object' }` instrui a API a retornar a resposta no formato de objeto JSON.

**Quando usar:**
Utilize este parâmetro quando você precisa garantir que a resposta da API seja estruturada como JSON, facilitando o processamento automático dos dados retornados. É especialmente útil em integrações onde o formato dos dados é importante para o fluxo do sistema.

---

## 2. Exemplo de chamada padrão sem formatação de resposta

```js
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'user', content: 'Me envie os dados.' }
  ]
});
```

**Explicação:**  
Sem o parâmetro `response_format`, a resposta pode vir em texto livre, não necessariamente em JSON.

**Quando usar:**  
Use quando não há necessidade de estruturação específica dos dados retornados, ou quando espera uma resposta textual.

---

## 3. Definindo o modelo

```js
model: 'gpt-4'
```

**Explicação:**
Define qual modelo de IA será utilizado para gerar a resposta.

**Quando usar:**
Sempre que precisar especificar o modelo desejado para a consulta.

---

## 4. Estrutura de mensagens

```js
messages: [
  { role: 'user', content: 'Olá, IA!' }
]
```

**Explicação:**
Define o histórico de mensagens da conversa, sendo cada objeto uma mensagem enviada pelo usuário ou pelo sistema.  

**Quando usar:**
Sempre que for necessário enviar instruções ou perguntas para a IA.

---

## 5. Await para chamadas assíncronas

```js
const response = await client.chat.completions.create({...});
```

**Explicação:**
Utiliza `await` para aguardar a resposta da API antes de prosseguir.

**Quando usar:**
Em funções assíncronas, para garantir que o resultado da chamada esteja disponível antes de executar os próximos passos.

---

## 6. Inicialização do Client da OpenAI

```js
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Chave de API gerada pelo portal de APIs da OpenAI
  project: '<projeto>'
});
```

**Explicação:**
Inicializa o objeto de client base que será usado por toda implementação dos métodos.

**Quando usar:**
No início do arquivo para inicializar o client corretamente.
É importante que seja colocado após o trecho `dotenv.config()` para que possa utilizar as variáveis de ambiente corretamente.

---

## 7. `max_output_tokens`

```js
client.responses.create({
  // ...
  max_output_tokens: 100,
  // ...
})
```

**Explicação:**
Limita quantos tokens podem ser gerados em uma mesma resposta, incluindo tokens de resposta visívies e tokens de razão (reasoning).

**Quando usar:**
Serve para limitar explicitamente a quantidade de tokens gerados, útil para evitar gastos indesejados ou reduzir a complexidade da resposta.

---

Consulte este documento sempre que precisar relembrar o significado ou uso de algum trecho específico do projeto.
