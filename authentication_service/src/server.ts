import app from './app';
import dotenv from 'dotenv'


// Load in .env to process.env
dotenv.config();

(async () => {
    app.listen(4444, () => {
        console.log(`Authentication service listening on port 4444`)
    });
})()
