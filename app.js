const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones)
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    // display 10 phone only
    if(dataLimit && phones.length > 9){
        phones = phones.slice(0, 9);
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('hidden');
    }
    else{
        noPhone.classList.add('hidden'); 
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
            <div class="card w-96 bg-slate-200 shadow-xl rounded-md">
                <figure class="px-10 pt-10">
                    <img class="rounded-xl mx-auto" src="${phone.image}"/>
                </figure>
                <div class="card-body items-center text-center py-4">
                    <h2 class="card-title text-lg font-bold text-slate-800">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions">
                    
                    <label onclick="loadPhoneDetails('${phone.slug}')" for="my-modal-6" class="btn px-8 btn py-4 bg-emerald-500 rounded-xl text-white font-bold">Buy Now</label>
                    </div>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })

    // stop spinner or loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// handle search button click
function searchBtn(){
    // start loader
    processSearch(10);
}

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter') {
        processSearch(10)
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden');
    }
    else{
        loaderSection.classList.add('hidden');
    }
}

// not the best way to load show all
function showAllBtn(){
    processSearch();
}

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <img class="rounded-xl mx-auto" src="${phone.image}"/>
        <h3 class="font-bold mt-5 text-lg">Title: ${phone.name}</h3>
        <p class="py-4"> Release Date: ${phone.releaseDate ? phone.releaseDate:  'No Resease Date Found'} </p>
        <p class="py-4"> Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage information found'} </p>

        <p class="py-4">Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    `
}
loadPhones('phone')