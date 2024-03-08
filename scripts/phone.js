const loadPhone = async (searchText, isShowAll) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await response.json();
        console.log(data); // Log the data to the console
        const phones = data.data;
        displayPhones(phones, isShowAll);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayPhones = (phones, isShowAll) => {

    //1. jeikhane append korbo setar id nibo dom er baire jate barbar id call kora na lage

    const phoneContainer = document.getElementById('phone-container');

    //clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }


    // console.log('isShowAll', isShowAll);
    //display 1st 12 phones if not show All

    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone=>{
        // console.log(phone)
        //2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-grey-100 shadow-xl`;
        
        //3. set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <p></p>
          <div class="card-actions justify-center">
            <button id="" onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;

        //4. set append child
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner
    toggleLoadingSpinner(false);
}


const handleSearch = (isShowAll) => {

    toggleLoadingSpinner (true); //jokhon spinner add korbo tokhon eta call korbo
    
    //1. get the search field id

    const searchField = document.getElementById('searchField');
    
    //2. search box a ja e search hobe segular value show
    const searchText = searchField.value;
    console.log(searchText); 
    loadPhone(searchText, isShowAll);

}

//handle search spinner
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

//handle show detail

const handleShowDetail = async (id) => {
 
    console.log('show details', id)
    //load single phone data
 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);

    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

}

const showPhoneDetails = (phone) => {
    console.log(phone);
    //show the modal
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt=""/>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    `
    showDetailsModal.showModal();
}

const handleShowAll = ()=> {
    handleSearch(true);
}


// loadPhone();