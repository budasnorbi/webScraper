const puppeteer = require('puppeteer');

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

(async () => {
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
			results.push(
				await getOffPrice(offer.url, offer.elementPath)
			);
		}
		catch(e){
			console.log(e);
		}
	}

	const bestPrice = results
		.map( price => parseInt(price))
		.sort((a,b) => a - b)[0];

	console.log('A legjobb ára a terméknek: ' + bestPrice);
	console.log(results.length);

  await browser.close();
})();