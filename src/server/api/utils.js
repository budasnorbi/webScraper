const { JSDOM } = require("jsdom");

const promiseSerial = funcs =>
    funcs.reduce((promise, func) =>
        promise.then(result => func().then(Array.prototype.concat.bind(result))),
		Promise.resolve([]))

const priceExtractor = doc => {
	return doc.querySelector('*[itemprop="price"]')
		|| doc.querySelector('span[class="c-product-card__cart__price ng-star-inserted"]')
		|| doc.querySelector('.discount_price')
		|| doc.getElementById('2__brutto_ar')
		|| doc.querySelector('span[class="new"]')
		|| doc.querySelector('p[class="termek-adatlap-brutto-ar"]')
		|| doc.querySelector('.price')
		|| doc.querySelector('div[id="poduct_current_price"]')
		|| doc.querySelector('#priceandcart i');
}

const clearText = text => {
    return parseInt(text.replace(/\D/g,''));
}

const getText = tag => {
    return tag.textContent === '' ? tag.content : tag.textContent;
}

const removeStyling = htmlString => {
	return htmlString.replace(/<style>[^>]*<\/style>/g, '');
}

const convertToDom = htmlString => {
	return new JSDOM(htmlString);
}

const getPrice = string => {
	var string = removeStyling(string);
	var html = convertToDom(string);
	var priceElement = priceExtractor(html.window.document);
	if(priceElement === null || priceElement === undefined){
		return;
	} 
	var priceText = getText(priceElement);
	var clearPrice = clearText(priceText);
	
	return clearPrice;
}

		
module.exports = {
	promiseSerial,
	priceExtractor,
	getPrice
};