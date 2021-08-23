const path = require('path');
const saveLevel = require('../helpers/levelHelper').saveLevel;
const loadLevel = require('../helpers/levelHelper').loadLevel;
const checkFlag = require('../helpers/levelHelper').checkFlag;
const basicAuth = require('express-basic-auth')

module.exports = (app) => {

    app.get('/', (req, res) => loadLevel(req, res));

    app.get('/reset', (req, res) => {
        res.clearCookie('runnerSession');
        res.sendFile(path.join(__dirname, '../levels/pages/introduction.html'))
    })

    app.get('/rules', (req, res) => res.sendFile(path.join(__dirname, '../levels/pages/rules.html')));

    app.get('/welcometruthseeker', (req, res) => {
        saveLevel(req, res, 0);
        res.sendFile(path.join(__dirname, '../levels/pages/level0.html'))
    });

    app.get('/close/vision', (req, res) => {
        saveLevel(req, res, 1);
        res.sendFile(path.join(__dirname, '../levels/pages/level1.html'))
    });

    app.get('/close/scumbags', (req, res) => {
        saveLevel(req, res, 2);
        res.sendFile(path.join(__dirname, '../levels/pages/level2.html'))
    });

    app.use('/worthy', basicAuth({ users: { 'bohemian': 'groove' }, challenge: true, }))
    app.get('/worthy', (req, res) => {
        saveLevel(req, res, 3);
        res.sendFile(path.join(__dirname, '../levels/pages/level3.html'))
    })

    app.get('/worthytruth.htm', (req, res) => {
        res.send('<center>not everything can be saw</center>')
    });

    app.get('/unworthy', (req, res) => {
        res.send('<center>prolly u are with those guesses c:</center>')
    });

    app.get('/unworthy2017', (req, res) => {
        saveLevel(req, res, 4);
        res.sendFile(path.join(__dirname, '../levels/pages/level4.html'))
    });

    app.get('/open/vision', (req, res) => {
        res.send('<center>so clever :)</center>')
    });

    app.get('/i/will/find/you', (req, res) => {
        saveLevel(req, res, 5);
        res.sendFile(path.join(__dirname, '../levels/cutscenes/cutscene1.html'));
    })

    app.get('/blackwindow', (req, res) => {
        saveLevel(req, res, 6);
        res.sendFile(path.join(__dirname, '../levels/cutscenes/1/checkdoors.html'))
    })

    app.get('/whitewindow', (req, res) => {
       saveLevel(req, res, 6);
    });

    app.get('/badbrowser', (req, res) => res.sendFile(path.join(__dirname, '../levels/pages/badbrowser.html')));

}