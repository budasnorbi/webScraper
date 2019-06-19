const puppeteer = require('puppeteer');
const URL = require('url').URL;

const pricePath = {
	'compker': 'SPAN.new',
	'akta-depo': '#page_artdet_price span',
	'marketworld': 'DIV.listPrice',
	'firstshop': 'P.price-new',
	'focuscamera': 'DIV.offer > DIV.price > SPAN.price-new',
	'rbx': 'P.grossPrice',
	'oaziscomputer': 'DIV.prices > STRONG',
	'konzolokszervize': '[id="poduct_current_price"]',
	'pcx': 'SPAN.price > SPAN',
	'rufusz': 'DIV.pd-price > SPAN.price-normal',
	'wincity': 'SPAN.price.price_color.product_table_price',
	'zonacomputers': 'P.price',
	'ipon': 'DIV.product__price > DIV.shop-card__price',
	'pcland': 'DIV.HMi-site-termek-adatlap-ar',
	'smartshop': 'SPAN.c-product-card__cart__price.ng-star-inserted',
	'infolex': 'P.termek-adatlap-brutto-ar > STRONG',
	'konzolvilag': 'DIV.sidebar > DIV.price > DIV.now',
	'alza': '#prices > tbody td.c2 > .price_withVat',
	'mysoft': '#MainContent_LabelNagyBrutto',
	'bevachip': 'span[itemprop="price"]',
	'microstore': '#telefon_kategoriak h2.h2price',
	'kazycomputers': 'span.price.price_color.product_table_price',
	'e-tools': 'span.price-value.def_color',
	'marketpalace': 'span.price-value.def_color',
	'aqua': '.price-field .price-action i',
	'informateka': '#prPriceB span[itemprop="price"]',
	'granddigital': '.page_artdet_price_net.page_artdet_price_bigger > span',
	'220volt': '#product_info #price',
	'bestmarkt': '.productPrice[itemprop="price"]',
	'edigital': '.col-sm-6.price-wrapper-container .price-wrapper .price.price--large[itemprop="price"]',
	'eshop24': '.price.price_color.product_table_price',
	'arumania': '.price.price_color.product_table_price',
	'easy-shop':'span[itemprop="offers"] div[data-label="Bruttó"] .price',
	'notebook-alkatresz': '.product-price-big span:nth-child(1)',
	'nanotrade': 'span[id*="price_net_brutto_"]',
	'iway': '.bruttoar',
	'majorsoft': '.price.price_color.product_table_price',
	'cubeshop': '.price.price_color.product_table_price',
	'maxmarket': '.price.price_color.product_table_price',
	'bluechip': ''


};

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
	await page.setUserAgent('Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2125.111 Safari/557.36');

	await page.goto('https://www.arukereso.hu/memoria-modul-c3577/kingston/8gb-ddr3-1600mhz-kvr16n11-8-p101716926/');
	
	const offerLinks = [
		...await page.$$eval('#offer-block-promoted > div > a', nodes => nodes.map( node => node.href)),
		...await page.$$eval('#offer-block-paying > div > a', nodes =>  nodes.map( node => node.href) )
	];

	await page.close();

	const offerRequests = offerLinks.map( offerUrl => async() => {
		const page = await browser.newPage();

		page.on('error', e => {
			console.log('hiba: ' + e);
		});

		page.setUserAgent('Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2125.111 Safari/557.36');

		await page.goto(offerUrl, {timeout: 60000});

		const ruleKey = new URL(page.url()).host
			.replace('www.','')
			.replace('.hu','');

		const priceSelector = pricePath[ruleKey];

		if(!priceSelector) {
			throw new Error(`${ruleKey} is not in the rules list`);
		}

		let priceNode;
		try{
			await page.waitForSelector(priceSelector);

			priceNode = await page.$eval(priceSelector, priceNode => priceNode.textContent
				.replace(/\s/g, '')
				.replace('Ft', '')
				.replace(/\D+/g, ''));
		}
		catch(e){
			priceNode = `${ruleKey}: itt nem kapható ez a szar`;
		}

		await page.close();
		return priceNode;
	});

	const prices = [];
	
	for (let i = 0; i < offerRequests.length; i++) {
		prices.push(await offerRequests[i]());
	}
	console.log(prices);
	console.log('Szűrt oldalak száma:' + prices.length);

	await browser.close();

})();
