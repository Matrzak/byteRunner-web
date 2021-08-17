const path = require('path');
const express = require('express');

module.exports = (app) => {

    app.get('/', (req, res) => {
       res.sendFile(path.join(__dirname, '../levels/introduction.html'))
    });

    app.get('/badbrowser', (req, res) => {
        res.sendFile(path.join(__dirname, '../levels/badbrowser.html'))
    });

}