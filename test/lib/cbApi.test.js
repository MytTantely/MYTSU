const CBApi = require('../../src/lib/cbApi');
let cbApi = new CBApi();

// cbApi.search();
// cbApi.searchByPrice();

// let productName = process.argv[2];
// cbApi.searchByName( productName, (err, results) => {
    
//             for(let i=0; i < results.length; i++){
//                 console.log(results[i]);
//             }
// } );

// cbApi.getProductNumber( (data) => {
//     console.log(data);
// });
// cbApi.incProductNumber( (data) => {
//     console.log(data);
// });

cbApi.upGetMatrixProductCode('name', (data) => {
    console.log(data);
});