import express from 'express';
import "dotenv/config";
import { sendEmail } from "./config/mail.js";
const app = express();
import ejs from "ejs";
const PORT = process.env.PORT || 7000;
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//* set View engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));
app.get('/', async (req, res) => {
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, { name: "Jatin Agrawal" });
    await sendEmail("sedod75013@sectorid.com", "Testing SMTP", html);
    res.json({ msg: "Email send successfully" });
});
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
