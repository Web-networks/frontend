const express = require('express');
const config = require('config');
const log4js = require('log4js');
const morgan = require('morgan');

const logger = log4js.getLogger();
logger.level = 'debug';

const app = express();
app.listen(config.get('port'), () => {
    logger.info(`Frontend node is on ${config.get('frontendHost')}`);
});

app.use('/bundles', express.static('bundles'));
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.end(getTemplate());
});

function getTemplate() {
    return `
    <!DOCTYPE html5>
    <html>
        <head>
            <meta charset="UTF-8">
            <link href="${config.get('staticURL')}/favicon.ico" rel="icon">
            <title>Neural networks IDEA</title>
            <script src="${config.get('staticURL')}/index.js"></script>
        </head>
        <body>
            <div id="root"></div>
        </body>
    </html>
    `;
}