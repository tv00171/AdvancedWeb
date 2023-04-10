import app from './app';
import dotenv from 'dotenv'


// Load in .env to process.env
dotenv.config();

(async () => {
    app.listen(5555, () => {
        console.log(`Example app listening on port 5555`)
    });
})()
