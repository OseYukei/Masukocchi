import cors from 'cors';
import express, { Response } from 'express';
import OpenAI from 'openai';
import { CharacterRegistRequest, CharacterRegistResponse } from '../../common/types/character';
import { DiscussionRequest, DiscussionResponse } from '../../common/types/discussion';
import { Character, GetSettingResponse } from '../../common/types/setting';
import { UserRegistRequest, UserRegistResponse } from '../../common/types/user';

main();

function main() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const port = 3000;

  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

  app.use('/public', express.static('public'));

  // ユーザデータ
  let userData: UserData[] = [];

  // 選択したキャラクター
  let selectedCharacter: Character = "裁判官";

  // 質疑応答内容
  let discussionData: Discussion;

  // プロンプト
  let promptData = "";
  let sendPrompt: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

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
  app.post('/character', async (req: Request<CharacterRegistRequest>, res: Response<CharacterRegistResponse>) => {
    selectedCharacter = req.body.character;
    switch (selectedCharacter) {
      case "裁判官":
        promptData = "あなたは裁判官です。以下の情報を元に、裁判の判決を下し、その理由を詳細に教えてください。判決については、「勝訴」「敗訴」のどちらかを必ず決定してください。また、以下のフォーマットでまとめてください。・判決：判決に至った経緯を具体的にまとめる ・判決理由：判決の理由を箇条書きでまとめる ・判決結果：原告であるユーザAの主張が成り立つ可能性が高いと判断されるため、「原告に設定された名前」の「勝訴・敗訴」とします。 裁判についての情報「議題：reason 二人の関係性：relationship 原告：userA 性別：userAGender 年齢：userAAge 性格：userAPersonality 主張：userAOpinion 被告：userB 性別：userBGender 年齢：userBAge 性格：userBPersonality 主張：userBOpinion 」";
        break;
      case "オネエ":
        promptData = "あなたはオネエバーで働くオネエです。以下の情報を元に、喧嘩を仲裁してください。話し方は口調と性格に倣い、ですます調は使わないでください。また、会話形式ではなく、オネエの一人語りにしてください。自己紹介は不要です。オネエの特徴は以下の通りです。 一人称：あたし 年齢：43歳 性格：常にハイテンションで話し上手。ため口で会話する。 口調：オカマ、ため口。相手のことをちゃん付けして呼ぶ。 喧嘩の原因：reason 二人の関係性：relationship 一人目：userA 性別：userAGender 年齢：userAAge 性格：userAPersonality 主張：userAOpinion 二人目：userB 性別：userBGender 年齢：userBAge 性格：userBPersonality 主張：userBOpinion";
        break;
      case "全肯定マン":
        promptData = "あなたは全肯定マンという名前のスーパーヒーローです。以下の情報を元に、両者の主張をすべて肯定してください。話し方は口調と性格に倣ってください。また会話形式ではなく全肯定マンの一人語りにしてください。自己紹介は不要です。全肯定マンの特徴は以下の通りです。 一人称：私 性格：すべての意見を肯定する。とても気前がいい。明るい性格で主人公のような感じ。 口調：スーパーヒーローみたいにはつらつしている。相手のことを君付けして呼ぶ。 喧嘩の原因：reason 二人の関係性：relationship 一人目：userA 性別：userAGender 年齢：userAAge 性格：userAPersonality 主張：userAOpinion 二人目：userB 性別：userBGender 年齢：userBAge 性格：userBPersonality 主張：userBOpinion";
        break;
      case "全否定マン":
        promptData = "あなたは全否定マンという名前のヴィランです。以下の情報を元に、両者の主張をすべて否定してください。話し方は口調と性格に倣ってください。また会話形式ではなく全否定マンの一人語りにしてください。自己紹介は不要です。全否定マンの特徴は以下の通りです。 一人称：俺様 性格：すべての意見を否定する。とても性格が悪い。悪役のような感じ。 口調：見下したような感じ。ため口。相手のことを呼び捨て、あるいは貴様と呼ぶ。 喧嘩の原因：reason 二人の関係性：relationship 一人目：userA 性別：userAGender 年齢：userAAge 性格：userAPersonality 主張：userAOpinion 二人目：userB 性別：userBGender 年齢：userBAge 性格：userBPersonality 主張：userBOpinion";
        break;
      default:
    }

    res.send({ isSuccess: true });
  });

  // フロント側にユーザデータと選択されたキャラクタデータを送信
  app.post('/setting', (req, res: Response<GetSettingResponse>) => {
    res.send({ character: selectedCharacter, nameA: userData[0].userName, nameB: userData[1].userName })
  });

  // 質疑応答
  app.post('/discussion', async (req: Request<DiscussionRequest>, res: Response<DiscussionResponse>) => {
    discussionData = {
      relationship: req.body.relationship,
      reason: req.body.reason,
      opinionA: req.body.opinionA,
      opinionB: req.body.opinionB
    }

    // プロンプト内にデータを埋め込み
    promptData = promptData.replace("reason", discussionData.reason);
    promptData = promptData.replace("relationship", discussionData.relationship);
    promptData = promptData.replace("userA", userData[0].userName);
    promptData = promptData.replace("userAGender", userData[0].gender);
    promptData = promptData.replace("userAAge", String(userData[0].age));
    promptData = promptData.replace("userAPersonality", userData[0].personality);
    promptData = promptData.replace("userAOpinion", discussionData.opinionA);
    promptData = promptData.replace("userB", userData[1].userName);
    promptData = promptData.replace("userBGender", userData[1].gender);
    promptData = promptData.replace("userBAge", String(userData[1].age));
    promptData = promptData.replace("userBPersonality", userData[1].personality);
    promptData = promptData.replace("userBOpinion", discussionData.opinionB);

    sendPrompt.push({ role: 'user', content: promptData });

    const answer = await openai.chat.completions.create({
      messages: sendPrompt,
      model: 'gpt-3.5-turbo',
    });

    // 確認用ログ
    console.log(promptData);

    res.send({ answer: answer.choices[0].message.content || '' })
  });

  // メッセージ履歴をリセット
  app.post('/reset', (req, res) => {
    userData = [];
    sendPrompt = [];
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
