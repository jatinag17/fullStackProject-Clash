import express,{Application,Request,Response} from 'express';
import "dotenv/config"
 
import Routes  from './routes/index.js';
const app: Application = express();
import ejs from "ejs";
const PORT = process.env.PORT || 7000;
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(appLimitter);

//* set View engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));

//* Routes

app.use(Routes);
app.get('/',async (req: Request,res: Response) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {name: "Jatin Agrawal"})
    await emailQueue.add(emailQueueName, {to:"sedod75013@sectorid.com", subject:"Testing queue email",body:"html"});
     res.json({msg:"Email send successfully"});
});

//* Queues

import "./jobs/EmailJob.js";
import { emailQueue, emailQueueName } from './jobs/EmailJob.js';
import { appLimitter } from './config/rateLimit.js';

 app.listen(PORT,() =>console.log(`Server is running on PORT ${PORT}`));
