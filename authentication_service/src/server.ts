import app from './app';

(async ()=>{
    app.listen(4444,() => {
        console.log(`Example app listening on port 4444`)
    });

    app.get('/', (req, res) => {
        return res.json({ message: 'Hello World this is the test' });
    });

})()
