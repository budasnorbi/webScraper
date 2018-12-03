/* const express = require('express');
const app = express();

app.use(express.static('dist'));

app.listen(8080, () => console.log('Listening on port 8080!')); */
const rp = require('request-promise');
var { fetchOffersLink } = require('./api/request');
var { promiseSerial, getPrice } = require('./api/utils');

fetchOffersLink('https://www.arukereso.hu/memoria-modul-c3577/kingston/8gb-ddr3-1600mhz-kvr16n11-8-p101716926/')
	.then( reqArr => {
		const promises = reqArr.map( req => () => rp(req));
		promiseSerial(promises)
			.then( response => {
				return response;
			})
			.catch( err => {
				console.log()
			});
	})
	.then( resArr => {
		const price = resArr
			.map( res => getPrice(res) )
			.filter( price => price !== undefined)
			.sort((a,b) => a-b)[0];
		return Promise.resolve(price);
	})
