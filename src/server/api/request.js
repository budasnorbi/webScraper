const rp = require('request-promise');
const { JSDOM } = require("jsdom");

const fetchOffersLink = url => {
	return rp(url)
		.then( htmlString => {
			const parsed = new JSDOM(htmlString);
			const shops = [].slice.call(parsed.window.document.querySelectorAll('div[itemprop="offers"] > a'))
				.map( offer => offer.href)
				.map( offerUrl => {
					return {
						uri:offerUrl,
						headers:{
							'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
						}
					}
				});
			return Promise.resolve(shops);
		});
};

module.exports = {
	fetchOffersLink
};