const express = require('express');
const path = require('path');
const uaparser = require('ua-parser-js');
const cookieParser = require('cookie-parser');


const APPLICATION_PORT = 2090;
const application = express();

application.use(cookieParser());
function browserMiddleware(req, res, next) {

    if(req.url.includes('/badbrowser'))
        return next();

    const parser = new uaparser();
    const ua = req.headers['user-agent'];
    const browserName = parser.setUA(ua).getBrowser().name;
    const allowedBrowsers = ['Chrome', 'Firefox', 'Opera', 'Safari'];

    if(!allowedBrowsers.includes(browserName)){
        res.redirect('/badbrowser')
        return;
    }

    next();
}
application.all('*', browserMiddleware)

require('./controllers/levelsController')(application);

application.use('/static', express.static(path.join(__dirname, 'static')));
application.listen(APPLICATION_PORT, '0.0.0.0', start);

function start() {
    console.log('starting byteRunner');
}

module.exports.application = application;
