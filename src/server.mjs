import path from 'path';
import express from "express";
import bodyParser from "body-parser";
import { routes } from './routes.mjs';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import moment from 'moment';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', engine ({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).utc().format('DD/MM/YYYY');
        }
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'handlebars');
app.set('views', `${path.join(__dirname, 'views')}`);

app.use(routes);

app.listen(8080);
