let seasonFilter = 'All';
let genderFilter = 'All';

const seasonOptions = document.querySelector('.seasons');
const genderOptions = document.querySelector('.genders');
const searchResultsElem = document.querySelector('.searchResults');
const priceRangeElem = document.querySelector('.priceRange');
const showPriceRangeElem = document.querySelector('.showPriceRange');

const garmentsTemplateText = document.querySelector('.garmentListTemplate');
const garmentsTemplate = Handlebars.compile(garmentsTemplateText.innerHTML);


const loginBtn = document.querySelector('.button')
const userInput = document.querySelector('.login')
const messageFor = document.querySelector('.messageText')
loginBtn.addEventListener('click',function(){
	if(userInput.value){
		axios
		.post('/api/token/', {userInput: userInput.value})
	     .then(function(data){
console.log(data.token);
localStorage.setItem('token',token)
		 })
	}


const token = localStorage.getItem('token')
const url = `/api/name?token=${token}`
axios
    .get(url)
	 .then(function(result){
		 const { name} = result.data
		 messageFor.innerHTML = name;
	 })
	 error(function(err){
messageFor.innerHTML = err.messageFor;
	 })
	})


seasonOptions.addEventListener('click', function(evt){
	seasonFilter = evt.target.value;
	filterData();
});

genderOptions.addEventListener('click', function(evt){
	genderFilter = evt.target.value;
	filterData();
});


function myFunction() {
	// Get the snackbar DIV
	var x = document.getElementById("snackbar");
  
	// Add the "show" class to DIV
	x.className = "show";
  
	// After 3 seconds, remove the show class from DIV
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

function filterData() {
    axios
        .get(`/api/garments?gender=${genderFilter}&season=${seasonFilter}`)
        .then(function(result) {
            searchResultsElem.innerHTML = garmentsTemplate({
                garments : result.data.garments
            })
        });
}
priceRangeElem.addEventListener('change', function(evt){
	const maxPrice = evt.target.value;
	showPriceRangeElem.innerHTML = maxPrice;
	axios
		.get(`/api/garments/price/${maxPrice}`)
		.then(function(result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments : result.data.garments
			})
		});
});

filterData();

function myFunction() {
	var x = document.querySelector("missy");
	if (x.style.display === "none") {
	  x.style.display = "block";
	} else {
	  x.style.display = "none";
   }
  }