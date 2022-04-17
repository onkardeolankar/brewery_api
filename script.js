const searchBtn = document.getElementById('search-btn');
const breweryList = document.getElementById('brewery');
const breweryDetailsContent = document.querySelector('.brewery-details-content');
const itemsCloseBtn = document.getElementById('items-close-btn');


searchBtn.addEventListener('click', getBreweryList);
breweryList.addEventListener('click', getBreweryItems);
itemsCloseBtn.addEventListener('click', () => {
    breweryDetailsContent.parentElement.classList.remove('showRecipe');
});



function getBreweryList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.openbrewerydb.org/breweries?by_name=cooper${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.brewery){
            data.brewery.forEach(brewery => {
                html += `
                    <div class = "brewery-item" data-id = "${brewery.idBrewery}">
                        <div class = "brewery-img">
                            <img src = "${brewery.strBreweryThumb}" alt = "food">
                        </div>
                        <div class = "brewery-name">
                            <h3>${brewery.strBrewery}</h3>
                            <a href = "#" class = "items-btn">Get Items</a>
                        </div>
                    </div>
                `;
            });
            breweryList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any brewery!";
            breweryList.classList.add('notFound');
        }

        breweryList.innerHTML = html;
    });
}



function getBreweryItems(e){
    e.preventDefault();
    if(e.target.classList.contains('items-btn')){
        let BreweryItem = e.target.parentElement.parentElement;
        fetch(`https://api.openbrewerydb.org/breweries?page=15${breweryItem.dataset.id}`)
        .then(response => response.json())
        .then(data => breweryItemsModal(data.brewery));
    }
}


function breweryItemsModal(brewery){
    console.log(brewery);
    brewery = brewery[0];
    let html = `
        <h2 class = "items-title">${brewery.strBrewery}</h2>
        <p class = "items-category">${brewery.strCategory}</p>
        <div class = "items-instruct">
            <h3>Instructions:</h3>
            <p>${brewery.strInstructions}</p>
        </div>
        <div class = "items-brewery-img">
            <img src = "${brewery.strBreweryThumb}" alt = "">
        </div>
        <div class = "items-link">
            <a href = "${brewery.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    breweryDetailsContent.innerHTML = html;
    breweryDetailsContent.parentElement.classList.add('showRecipe');
}