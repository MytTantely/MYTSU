const CBRestAPI = require('../../src/api/cbRestAPI');

let v = new CBRestAPI();

const loc = {
    lat: 51.0,
    lon: -114.0
};

// v.search('tea', loc, 2);
v.search('tea', (res) => {
    console.log(res);
});