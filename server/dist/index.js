import express from 'express';
import "dotenv/config";
const app = express();
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
    res.render('emails/welcome', { name: "jatin agrawal" });
});
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
