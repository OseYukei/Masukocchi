import express, { Response } from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import { ChatRequest, ChatResponse } from '../../common/types/chat';
import { Character, GetSettingResponse } from '../../common/types/setting';
import { UserRegistRequest, UserRegistResponse } from '../../common/types/user';
import { CharacterRegistRequest } from '../../common/types/character'
import { DiscussionRequest, DiscussionResponse } from '../../common/types/discussion';

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

  // ユーザデータ
  let userData: UserData[] = [];

  // 選択したキャラクター
  let selectedCharacter: Character = "裁判官";

  // 質疑応答内容
  let discussionData: Discussion;

  // プロンプト
  let prompt = "";
  // ユーザーのキャラクリエイト
  app.post('/user', async (req: Request<UserRegistRequest>, res: Response<UserRegistResponse>) => {
    const user = { userName: req.body.name, gender: req.body.gender, age: req.body.age, personality: req.body.personality };
    userData.push(user);
    if (userData.length == 1) {
      res.send({ result: "next" });
    } else {
      res.send({ result: "complete" });
    }
  });

  // 遊ぶキャラクター選択
  // このタイミングで使用するプロンプトも決定
  app.post('/character', async (req: Request<CharacterRegistRequest>, res) => {
    selectedCharacter = req.body.character;
    switch (selectedCharacter) {
      case "裁判官":
        prompt = "あなたは裁判官です。以下の情報を元に、判決とその理由を教えてください。判決結果については、「勝訴」「敗訴」のどちらかを必ず決定してください。また、判決結果は以下のフォーマットでまとめてください。・判決：判決に至った経緯を具体的にまとめ・判決理由：判決の理由を箇条書き・判決結果：原告であるユーザAの主張が成り立つ可能性が高いと判断されるため、「原告に設定された名前」の「勝訴・敗訴」とします。議題：reason 二人の関係性：relationship 原告：userA 性別：userAGender 年齢：userAAge 性格：userAPersonality 主張：userAOpinion 被告：userB 性別：userBGender 年齢：userBAge 性格：userBPersonality 主張：userBOpinion";
        break;
      case "オネエ":
        prompt = "あなたはオネエです。以下の情報を元に、オネエの口調で喧嘩を仲裁してください。議題：reason 二人の関係性：relationship 原告：userA 性別：userAGender 年齢：userAAge 性格：userAPersonality 主張：userAOpinion 被告：userB 性別：userBGender 年齢：userBAge 性格：userBPersonality 主張：userBOpinion";
        break;
      case "全肯定マン":
        prompt = "あなたは全肯定マンという名前のスーパーヒーローです。以下の情報を元に、スーパーヒーローのような口調で両者の主張をすべて肯定してください。議題：reason 二人の関係性：relationship 原告：userA 性別：userAGender 年齢：userAAge 性格：userAPersonality 主張：userAOpinion 被告：userB 性別：userBGender 年齢：userBAge 性格：userBPersonality 主張：userBOpinion";
        break;
      case "全否定マン":
        prompt = "あなたは全否定マンという名前のスーパーヒーローです。以下の情報を元に、スーパーヒーローのような口調で両者の主張をすべて否定してください。議題：reason 二人の関係性：relationship 原告：userA 性別：userAGender 年齢：userAAge 性格：userAPersonality 主張：userAOpinion 被告：userB 性別：userBGender 年齢：userBAge 性格：userBPersonality 主張：userBOpinion";
        break;
      default:
    }
  });

  // フロント側にユーザデータと選択されたキャラクタデータを送信
  app.post('/setting', (req, res: Response<GetSettingResponse>) => {
    res.send({ character: selectedCharacter, nameA: userData[0].userName, nameB: userData[1].userName })
  });

  // 質疑応答
  app.post('/discussion', (req: Request<DiscussionRequest>, res: Response<DiscussionRequest>) => {
    const discussion = { relationship: req.body.relationship, reason: req.body.reason, opinionA: req.body.opinionA, opinionB: req.body.opinionB };
    discussionData.relationship = req.body.relationship;
    discussionData.reason = req.body.reason;


    prompt.replace("reason", discussionData.reason);
    prompt.replace("relationship", discussionData.relationship);
    // res.send({ answer: "" })
  });

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
    userData = [];
    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.log(`express start. listen on port ${port}`);
  });
}

export interface Request<T> extends Express.Request {
  body: T;
}

interface UserData {
  userName: string;
  gender: string;
  age: number;
  personality: string;
}

interface Discussion {
  relationship: string;
  reason: string;
  opinionA: string;
  opinionB: string;
}
