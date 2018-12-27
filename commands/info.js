const fetch = require('isomorphic-fetch');
const KEY = process.env.ITAD_KEY;

async function gameInfo(key, game) {

	const url = `https://api.isthereanydeal.com/v01/game/info/?key=${key}&plains=${game}`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

function fmt(response, args) {
	// once the promise is resolved, do this
	const data = response.data[args[0]];
	const steam = data.reviews.steam.perc_positive;
	const page = data.urls.game;
	const fmt_string = `Game: ${args[0]}
Steam positive percentage: ${steam} %
Url: ${page}`;
	return fmt_string;
}

module.exports = {
	name: 'info',
	description: 'Get info about a game specified by its name.',
	execute(message, args) {
		gameInfo(KEY, args)
			.then(data => message.channel.send((fmt(data, args))))
			.catch(err => console.log(err));
	},
};