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

// cbApi.upGetMatrixProductCode('spinach pies', (data) => {
//     console.log('this is the value rerturned: ' + data);
// });

// let p1 = {
//     "name": "spinach pies",
//     "code": 1,
//     "price": 7.5,
//     "category": [
//       "appetizers",
//       "salads"
//     ]
//   };

//   cbApi.updateCodeProduct(p1, (product) => {
//     console.log("Product updated: " + JSON.stringify(product));
//   });

cbApi.searchAllStore();