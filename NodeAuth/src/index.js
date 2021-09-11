const Application = require('./app');
require('./config/passport'); 
require('./config/database');

const app = new Application();

const PORT = '5656';

app.expressApp.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
});