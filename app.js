const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);

}
const displayPhones = phones => {
    console.log(phones)
    const phonesContainer = document.getElementById('phone-container');
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
                    <button class="px-8 py-4 bg-emerald-500 rounded-xl text-white font-bold">Buy Now</button>
                    </div>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
}

function searchBtn(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
}

loadPhones()