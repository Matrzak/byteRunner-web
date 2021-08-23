const JWT_TOKEN = "cC32wGs2eKrWhSR6";
const pool = require('../pools/levelsPool')
const jwt = require('jsonwebtoken');
const path = require('path');

function checkFlag(req, res, flag) {
    const cookie = req.cookies.runnerSession;
    if(cookie === undefined){
        return false;
    }

    const decoded = jwt.verify(cookie, JWT_TOKEN);
    if(decoded.flags === undefined) {
        return false;
    }


    if(!decoded.flags.includes(flag)) {
        return false;
    }

    return true;
}

function saveLevel(req, res, level, flagToSave=undefined) {
    const cookie = req.cookies.runnerSession;
    if(cookie !== undefined){
        try {
            
            const decoded = jwt.verify(cookie, JWT_TOKEN);
            const foundLevel = pool.find(l => l.session === decoded.session);
            const index = pool.indexOf(foundLevel);

            if(index >= level)
                return;

            const flags = decoded.flags !== undefined ? decoded.flags : [];
            if(flagToSave !== undefined && !flags.include(flagToSave)) {
                flags.push(flagToSave);
            }
            
            const session = pool[level].session;
            const token = jwt.sign({ session, flags }, JWT_TOKEN);
            res.cookie('runnerSession', token, { httpOnly: true })
        
        } catch (error) {
            return;
        }
    }

}

function loadLevel(req, res){
    const cookie = req.cookies.runnerSession;
    if(cookie === undefined) {
        res.sendFile(path.join(__dirname, '../levels/pages/introduction.html'))
        return false;
    }

    const decoded = jwt.verify(cookie, JWT_TOKEN);
    const cookieSession = decoded.session;
    const level = pool.find(l => l.session === cookieSession);
    res.redirect(level.url);
    return true;
}

module.exports = {
    saveLevel,
    loadLevel,
    checkFlag
};