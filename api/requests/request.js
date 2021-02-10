const axios = require('axios');
const config = require('../../config.json');
const fs = require('fs');

const API_BASE = 'https://cloud.iexapis.com/v1';
const API_SB = 'https://sandbox.iexapis.com/v1';

(async () => {
    try {
        let response = await axios.get(API_BASE + '/stock/twtr/intraday-prices?token=' + config.TOKEN);
        console.log(response.data);
        fs.writeFileSync('./data/twtr/intra.json', JSON.stringify(response.data, null, 4));
    } catch(e) {
        console.error(e);
    }
})();