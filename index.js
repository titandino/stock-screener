const config = require('./config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());

app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
});

app.use('/v1', require('./api/'));

app.use((err, req, res, next) => {
    console.error(err);
    let status = err.httpCode ? err.httpCode : err.code;
    let reason = err.reason ? err.reason : err.message;
    let result = {
        'message': reason,
        'details': err.details,
    }
    res.status(status || 500).end(JSON.stringify(result));
});

(async () => {
    try {
        let server = await app.listen(config.PORT);
        console.error('Server listening on port ' + server.address().port);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();