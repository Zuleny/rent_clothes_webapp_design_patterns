import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import exphbs from 'express-handlebars';
import methodOverride from 'method-override';

import routes from './routes';

export class App{
    private app;

    constructor(port?: number | string) {
        this.app = express();
        this.app.set('PORT', process.env.PORT || port || 4000);
        this.settings();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.urlencoded({ extended: false}))
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(methodOverride('_method'))
    }

    private routes(): void {
        this.app.use(routes);
    }

    private settings():void {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exphbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs',
            defaultLayout: 'layout'
        }));
        this.app.set('view engine', '.hbs');
    }

    /**
     * @public
     * Asynchronous process for port initialization with the web server
     * @returns nothing, is a void
     */
     public async listen(): Promise<void> {
        await this.app.listen(this.app.get('PORT'));
        console.log(`Server on port ${this.app.get('PORT')}`, "\x1b[0m");
     }
}