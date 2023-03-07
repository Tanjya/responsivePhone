const loadPhoneNumber = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
    console.log(phones);
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";

    //! display 10 phones only
    const showALL = document.getElementById("show-all");
    if (dataLimit && phones.length > 6) {
        phones = phones.slice(0, 6);
        //const showALL = document.getElementById("show-all");
        showALL.classList.remove("d-none");
    }
    else {
        showALL.classList.add("d-none");
    }
    //phones = phones.slice(0, 10);

    //! display no phone found
    const noPhoneFound = document.getElementById("not-found");
    if (phones.length === 0) {
        noPhoneFound.classList.remove("d-none");

    }
    else {
        noPhoneFound.classList.add("d-none");
    }

    //! display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
        <div class="card p-5">
            <img src="${phone.image}" class="card-img-top" alt="phone">
            <div class="card-body">
                <h5 class="card-title">"${phone.phone_name}"</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    //! stop spinner loader
    toggleSpinner(false);
}

//! common function for load button and show all  
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhoneNumber(searchText, dataLimit);
}

//! handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
    //! start loader
    processSearch(9);
});

//! js input field enter key handler
document.getElementById("search-field").addEventListener("keypress", function onEvent(event) {
    // console.log(event.key);
    if (event.key === "Enter") {
        processSearch(9);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
        loaderSection.classList.remove("d-none");
    }
    else {
        loaderSection.classList.add("d-none");
    }
};

// this is not the best solution to load Show All but we are doing for now because we have limitation with API
document.getElementById("btn-show-all").addEventListener("click", function () {
    processSearch();
})

//! show all: loadPhoneDetails
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    //! showing the title
    const modalTitle = document.getElementById("phoneDetailModalLabel");
    modalTitle.innerText = phone.name;

    //! for the image
    const gettingImage = phone.image;
    const imageTag = document.getElementById("image");
    //! clear the image field 
    imageTag.innerHTML = '';
    const img = document.createElement("img");
    img.src = gettingImage;
    imageTag.appendChild(img);

    //! we don't have to append because we are not crest any tag
    const phoneDetails = document.getElementById("phone details");
    phoneDetails.innerHTML = `
    <p>ChipSet: "${phone.mainFeatures ? phone.mainFeatures.chipSet : "No Info Found"}"</p>
    <p>DisplaySize: "${phone.mainFeatures ? phone.mainFeatures.displaySize : "No Info Found"}"</p>
    <p>Memory: "${phone.mainFeatures ? phone.mainFeatures.memory : "No Info Found"}"</p>
    <p>Storage: "${phone.mainFeatures ? phone.mainFeatures.storage : "No Info Found"}"</p>

    <p>Released Date: "${phone.releaseDate ? phone.releaseDate : "No Released Date Found."}"</p>
    <p>Bluetooth: "${phone.others ? phone.others.Bluetooth : "No Bluetooth info found."}"</p>
    <p>GPS: "${phone.others ? phone.others.GPS : "No GPS info found."}"</p>
    <p>Radio: "${phone.others ? phone.others.Radio : "No Radio info found."}"</p>
    <p>NFC: "${phone.others ? phone.others.NFC : "No NFC info found."}"</p>
    
    `
}


loadPhoneNumber("iphone");