'use-strict';

const rp = require('request-promise');

const { JSDOM} = require("jsdom");
const { promiseSerial, priceExtractor, textExtractor, textFormatter } = require('./utils');


rp('https://irodai-forgoszek.arukereso.hu/noblechairs/epic-nbl-pu-p342158138/')
  .then(function(html){
    const parsed = new JSDOM(html);
    const shops = [].slice.call(parsed.window.document.querySelectorAll('div[itemprop="offers"] > a'))
      .map( offer => offer.href)
      .map( offerUrl => {
        return {
          'uri':offerUrl,
          headers:{
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
          }
        }
      })


    const requestPromises = shops.map( url => () => rp(url));

    promiseSerial(requestPromises)
      .then( results => {
        var test = results
          .map( data => {
            return data.replace(/<style>[^>]*<\/style>/g, '');
          })         
          .map( data => new JSDOM(data))
          .map( html => priceExtractor(html.window.document))
          .filter( priceTag => priceTag !== null)
          .map(tag => textExtractor(tag))
          .map(text => textFormatter(text))
          .sort( (a,b) => a-b)[0];
          
        console.log('Best price: '+ test + 'Ft');
      })
      .catch( err => {
        console.log(err);
      });

  })
  .catch(err => {
    console.log(err);
  })
