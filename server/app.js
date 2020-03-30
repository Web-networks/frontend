const express = require('express');
const config = require('config');
const log4js = require('log4js');
const morgan = require('morgan');

const logger = log4js.getLogger();
logger.level = 'debug';

const app = express();
app.use(morgan('dev'));
app.use(express.static('bundles'));
app.use('/*', express.static('bundles'));

app.listen(config.get('port'), () => {
    logger.info(`Frontend node is on ${config.get('frontendHost')}`);
});