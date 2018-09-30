let fetch = require('isomorphic-fetch');

const util = require('util');




function gameInfo(key, game) {

    let url = util.format('https://api.isthereanydeal.com/v01/game/info/?key=%s&plains=%s', key, game);
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
}

module.exports = { gameInfo };