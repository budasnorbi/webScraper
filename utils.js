const promiseSerial = funcs =>
    funcs.reduce((promise, func) =>
        promise.then(result => func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([]))

const priceExtractor = doc => {
    var result = 
        doc.querySelector('*[itemprop="price"]')
        || doc.querySelector('span[class="c-product-card__cart__price ng-star-inserted"]')
        || doc.querySelector('.discount_price')
        || doc.getElementById('2__brutto_ar')
        || doc.querySelector('span[class="new"]')
        || doc.querySelector('p[class="termek-adatlap-brutto-ar"]')
        || doc.querySelector('.price')
        || doc.querySelector('div[id="poduct_current_price"]')
        || doc.querySelector('#priceandcart i');
    return result;
}

const textExtractor = tag => {
    return tag.textContent === '' ? tag.content : tag.textContent;
}

const textFormatter = text => {
    return parseInt(text.replace(/\D/g,''));
}

module.exports = {
    promiseSerial,
    priceExtractor,
    textExtractor,
    textFormatter
    
}