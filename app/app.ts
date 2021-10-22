import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import routes from './routes';

export class App{
    private app;

    constructor(port?: number | string) {
        this.app = express();
        this.app.set('PORT', process.env.PORT || port || 4000);
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        const publicPath = path.resolve(__dirname, 'public');
        this.app.use(express.static(publicPath));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use(routes);
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