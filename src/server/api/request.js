const rp = require('request-promise');
const { JSDOM } = require("jsdom");

const fetchOffersLink = url => {
	return rp(url)
		.then( htmlString => {
			const parsed = new JSDOM(htmlString);
			const shops = [].slice.call(parsed.window.document.querySelectorAll('div[itemprop="offers"] > a'))
				.map( offer => ({
					url: offer.href,
					price: parseInt(offer.parentElement.children[5].children[0].children[0].textContent.replace(' Ft', '').replace(' ', '')),
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
					},
				}));

			return Promise.resolve(shops);
		});
};

const fetchOfferPrice = (url, elementIndex) => {
	const options ={
		url: url + '#html' + Math.random(),
		headers:{
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
		}
	};


	return rp(options)
		.then( htmlString => {
			const parsed = new JSDOM(htmlString);
			// parsed.window.document
			return Promise.resolve( parsed.window.document)
			/*const price = parsed.window.document.all[elementIndex]
				.replace(/\s/g,'')
				.replace('Ft', '')
				.replace(',','.');
			
			Promise.resolve(price);*/
		});
};

module.exports = {
	fetchOffersLink,
	fetchOfferPrice
};


