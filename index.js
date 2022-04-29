// add code in here to create an API with ExpressJS
const express = require('express');
const app = express();

// import the dataset to be used here
const garments = require('./garments.json');
// enable the static folder...
app.use(express.static('public'));

// enable the req.body object - to allow us to use HTML forms
// when doing post requests
// put this before you declare any routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


  app.post('/api/garments', (req, res) => {

	// get the fields send in from req.body
	const {
		description,
		img,
		gender,
		season,
		price
	} = req.body;

	// add some validation to see if all the fields are there.
	// only 3 fields are made mandatory here
	// you can change that

	if (!description || !img || !price) {
		res.json({
			status: 'error',
			message: 'Required data not supplied',
		});
	} else {

		// you can check for duplicates here using garments.find
		
		// add a new entry into the garments list
		garments.push({
			description,
			img,
			gender,
			season,
			price
		});

		res.json({
			status: 'success',
			message: 'New garment added.',
		});
	}

});
;
  
app.get('/api/garments', function(req, res){

    const gender = req.query.gender;
    const season = req.query.season;

    const filteredGarments = garments.filter(garment => {
        // if both gender & season was supplied
        if (gender != 'All' && season != 'All') {
            return garment.gender === gender 
                && garment.season === season;
        } else if(gender != 'All') { // if gender was supplied
            return garment.gender === gender
        } else if(season != 'All') { // if season was supplied
            return garment.season === season
        }
        return true;
    });

    // note that this route just send JSON data to the browser
    // there is no template
    res.json({ 
        garments : filteredGarments
    });
});
// import the dataset to be used here

app.get('/api/garments/price/:price', function(req, res){
    const maxPrice = Number(req.params.price);
    const filteredGarments = garments.filter( garment => {
        // filter only if the maxPrice is bigger than maxPrice
        if (maxPrice > 0) {
            return garment.price <= maxPrice;
        }
        return true;
    });

    res.json({ 
        garments : filteredGarments
    });
});
app.post('/api/posts', verifyToken, (req,res)=>{
	jwt.verify(req.token, 'secretkey', (err,authData) =>{
		if(err){
			res.sendStatus(403)
		}else{
		 res.json({
			 message: 'Post created...',
			 authData
		 })
		}
	})
	 
 });

app.post('/api/login',(req,res) => {
    const { user } = req.body
    jwt.sign({user}, 'secretkey',{expiresIn: '24hr'} ,(err, token) => {
        res.json({
            token
        })
    })
});

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
if(typeof bearerHeader !== 'undefined'){
const bearer = bearerHeader.split(' ')
const bearerToken = bearer[1];
req.token = bearerToken;
next();
}else{
    res.sendStatus(403)
}
}

const PORT = process.env.PORT || 4017;

// API routes to be added here

app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});