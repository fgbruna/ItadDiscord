const fetch = require('isomorphic-fetch');
const KEY = process.env.ITAD_KEY;

async function gameDeal(key, game) {
	const url = `https://api.isthereanydeal.com/v01/game/prices/?key=${key}&plains=${game}&region=eu2`;
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

function fmt(response, args) {
	// once the promise is resolved, do this
	const raw_data = response.data[args[0]];
	const data = (raw_data.list)[0];
	const shop = data.shop.name;
	const price = data.price_new;
	const cut = data.price_cut;
	const url = raw_data.urls.game;
	const fmt_string = `Game: ${args[0]}
Current price: ${price}
Cut: ${cut}%
Shop: ${shop}
Url: ${url}`;
	return fmt_string;
}

module.exports = {
	name: 'deal',
	description: 'Get lowest current price and store for a given game',
	execute(message, args) {
		gameDeal(KEY, args)
			.then(data => message.channel.send((fmt(data, args))))
			.catch(err => console.log(err));
	},
};