import { App } from './app'

/**
 * @public
 * Web server compilation method
 * Start the HTTP service
 */
async function main(): Promise<void> {
    const app = new App(4000);
    await app.listen();
}

// execution of the main method
main();