const puppeteer = require('puppeteer');

const pricePath = {
	'compker.hu': 'SPAN.new',
	'akta-depo.hu': '#page_artdet_price span',
	'marketworld.hu': 'DIV.listPrice',
	'firstshop.hu': 'P.price-new',
	'focuscamera.hu': 'DIV.offer > DIV.price > SPAN.price-new',
	'rbx.hu': 'P.grossPrice',
	'oaziscomputer.hu': 'DIV.prices > STRONG',
	'konzolokszervize.hu': '[id="poduct_current_price"]',
	'pcx.hu': 'SPAN.price > SPAN',
	'rufusz.hu': 'DIV.pd-price > SPAN.price-normal',
	'wincity.hu': 'SPAN.price.price_color.product_table_price',
	'zonacomputers.hu': 'P.price',
	'ipon.hu': 'DIV.product__price > DIV.shop-card__price',
	'pcland.hu': 'DIV.HMi-site-termek-adatlap-ar',
	'smartshop.hu': 'SPAN.c-product-card__cart__price.ng-star-inserted',
	'infolex.hu': 'P.termek-adatlap-brutto-ar > STRONG',
	'konzolvilag.hu': 'DIV.sidebar > DIV.price > DIV.now',
};

const offers = [
	{"url":"http://akta-depo.hu/spd/NBL-PU-RED-002/Gamer-szek-Noblechairs-EPIC-Fekete-Piros","elementPath":"#page_artdet_price span"},
	{"url":"https://compker.hu/termek/34139","elementPath":"SPAN.new"},
	{"url":"https://www.marketworld.hu/Szamitastechnika-iroda/Gamer-szek/Noblechairs-EPIC-Gamer-szek-Fekete-NBL-PU-BLA-002--p186371.html?ak=0","elementPath":"DIV.listPrice"},
	{"url":"https://firstshop.hu/noblechairs-epic-fekete-p126990","elementPath":"P.price-new"}, 
	{"url":"https://focuscamera.hu/noblechairs-epic-gamer-szek-feketekek-p435585","elementPath":"DIV.offer > DIV.price > SPAN.price-new"},
	{"url":"https://rbx.hu/noblechairs-epic-gamer-szek-fekete-kek-p422088","elementPath":"P.grossPrice"},
	{"url":"https://oaziscomputer.hu/termek/9322/noblechairs-epic-pu-leather-black-nbl-pu-bla-002","elementPath":"DIV.prices > STRONG"},
	{"url":"https://www.konzolokszervize.hu/pc/kiegeszitok/noblechairs-epic-gamer-szek-fekete","elementPath":"[id='poduct_current_price']"},
	{"url":"https://www.pcx.hu//noblechairs-epic-gcno-040-fekete-piros-jatekules-813269?referer=arukereso","elementPath":"SPAN.price > SPAN"},
	{"url":"https://www.rufusz.hu/Szek/Noblechairs-EPIC-Gaming-szek-fekete-kek--GCNO041-p64099.html?ak=0","elementPath":"DIV.pd-price > SPAN.price-normal"},
	{"url":"https://www.wincity.hu/gamer-szek-noblechairs-epic-feketepiros?utm_source=arukereso&utm_medium=cpp&utm_campaign=direct_link","elementPath":"SPAN.price.price_color.product_table_price"},
	{"url":"https://www.zonacomputers.hu/webaruhaz/shop.product_details/1702-jatekos-fotel/flypage.tpl/118517-noblechairs-epic-gaming-chair-nbl-pu-bla-002-fekete-mbr-fotel-jatekosoknak-gamer-szek/","elementPath":"P.price"},
	{"url":"https://ipon.hu/shop/termek/noble-chairs-epic-series-gaming-chair-feketepiros/1408365","elementPath":"DIV.product__price > DIV.shop-card__price"},
	{"url":"https://www.pcland.hu/noblechairs-epic-feketepiros-nbl-pu-red-002?forras=3","elementPath":"DIV.HMi-site-termek-adatlap-ar"},
	{"url":"https://smartshop.hu/noblechairs-epic-gamer-szek-fekete-kek-p7685?utm_source=arukereso","elementPath":"SPAN.c-product-card__cart__price.ng-star-inserted"},
	{"url":"http://www.infolex.hu/termekek/adatlap/46334/noblechairs-epic-gamer-szek-feketekek","elementPath":"P.termek-adatlap-brutto-ar > STRONG"},
	{"url":"https://www.konzolvilag.hu/pc/noblechairs-epic-gamer-szek-fekete/piros-nbl-pu-red-002","elementPath":"DIV.sidebar > DIV.price > DIV.now"}
];
// Test Page flow
(async () => {
	await puppeteer.launch({
		args: [
			'--disable-dev-shm-usage',
			'--unlimited-storage',
		]
	});
	const browser = await puppeteer.launch({ headless: true});
	const page = await browser.newPage();
	page.setUserAgent('Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2125.111 Safari/557.36');

	await page.goto('https://irodai-forgoszek.arukereso.hu/noblechairs/epic-nbl-pu-p342158138/');
	
	const offerLinks = [
		...await page.$$eval('#offer-block-promoted > div > a', nodes => nodes.map( node => node.href)),
		...await page.$$eval('#offer-block-paying > div > a', nodes =>  nodes.map( node => node.href) )
	];

	page.close();

	const offerRequests = offerLinks.map( offerUrl => async() => {
		const page = await browser.newPage();
		page.setUserAgent('Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2125.111 Safari/557.36');

		await page.goto(offerUrl, {timeout: 0});

		const ruleKey = new URL(page.url()).host.replace('www.','');
		const priceSelector = pricePath[ruleKey];
		const priceNode = await page.$eval(priceSelector, priceNode => priceNode.textContent);
		
		await page.close();
		return priceNode.replace(/\s/g,'').replace('Ft', '').replace(/\D+/g, '');
	});

	const prices = [];
	
	for (let i = 0; i < offerRequests.length; i++) {
		try{
			const price = await offerRequests[i]();
			console.log(price);
			prices.push(price);
		} catch(e) {

		}
	}

	

})();


/*(async () => {
	const browser = await puppeteer.launch({headless: true});
	
	const getOffPrice = async(url , selector) => {
		const page = await browser.newPage();
		page.setUserAgent('Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.2125.111 Safari/557.36');
		await page.goto(url);

		const node = await page.$eval(selector, x => x.textContent);
		return node
			.replace(/\s/g,'')
			.replace('Ft', '')
			.replace(/\D+/g, '');
	}

	const results = [];

	for(let offer of offers){
		try{
			const price = await getOffPrice(offer.url, offer.elementPath);
			if(price){
				results.push(price);
			}
		}
		catch(e){
			// console.log(e);
		}
	}
	await browser.close();

	const bestPrice = results
		.map( price => parseInt(price))
		.sort((a,b) => a - b)[0];

	console.log('A legjobb ára a terméknek: ' + bestPrice);
})();*/