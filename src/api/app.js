const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// ROUTES FOR OUR API
const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: 'hooray! welcome to our api!'});
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);

// START THE SERVER
// =================
app.listen(port, () => {
    console.log('Magic happens on port ' + port);

});