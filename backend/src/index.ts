import express, { Response } from 'express';
import OpenAI from 'openai';

main();

function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const port = 3000;

    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

    app.use('/public', express.static('public'));

    app.post(
        '/sample',
        async (req: Request<SampleRequest>, res: Response<SampleResponse>) => {
            const answer = await openai.chat.completions.create({
                messages: [{ role: 'user', content: req.body.content }],
                model: 'gpt-3.5-turbo',
            });
            answer.choices[0].message;
            res.send({ answer: answer.choices[0].message.content || '' });
        },
    );

    app.listen(port, () => {
        console.log(`express start. listen on port ${port}`);
    });
}

export interface Request<T> extends Express.Request {
    body: T;
}

export interface SampleRequest {
    content: string;
}

export interface SampleResponse {
    answer: string;
}
