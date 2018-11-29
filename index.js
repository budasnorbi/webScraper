const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://irodai-forgoszek.arukereso.hu/noblechairs/epic-nbl-pu-p342158138/';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

'use-strict';

rp(url)
  .then(function(html){
    const parsed = new JSDOM(html);
    const offers = [].slice.call(parsed.window.document.querySelectorAll('div[itemprop="offers"] > a')).map( offer => offer.href);

    rp(offers[1]).then( data => {
        const parsed = new JSDOM(data);
        // marketworld;
        //const price = parsed.window.document.querySelector('div[itemprop="price"]').textContent.replace(/ /g,'');

        const price = parsed.window.document.querySelector('meta[itemprop="price"]').content;
        

        console.log(price);
    });
  });

