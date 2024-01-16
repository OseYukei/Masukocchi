import express, { Response } from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import { ChatRequest, ChatResponse } from '../../common/types/chat';

main();

function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const port = 3000;

  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

  app.use('/public', express.static('public'));

  // メッセージ履歴
  let messageHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  // チャットGPT
  app.post('/chat', async (req: Request<ChatRequest>, res: Response<ChatResponse>) => {
    messageHistory.push({ role: 'user', content: req.body.content });

    const answer = await openai.chat.completions.create({
      messages: messageHistory,
      model: 'gpt-3.5-turbo',
    });

    messageHistory.push(answer.choices[0].message);

    res.send({ answer: answer.choices[0].message.content || '' });
  });

  // メッセージ履歴をリセット
  app.post('/reset', (req, res) => {
    messageHistory = [];
    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.log(`express start. listen on port ${port}`);
  });
}

export interface Request<T> extends Express.Request {
  body: T;
}
