const CBApi = require('../../src/lib/cbApi');
let cbApi = new CBApi();

// cbApi.search();
// cbApi.searchByPrice();
cbApi.searchByName( (err, results) => {
    
            for(let i=0; i < results.length; i++){
                console.log(results[i]);
            }
} );

