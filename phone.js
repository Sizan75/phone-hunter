let hello = '';

const loadphone = async (searchText, daataLimit ) =>
{
    try{
        const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, daataLimit ); 
    }
    catch(error){
        console.log(error)
    }
    
}

const displayPhones = (phones, daataLimit) => {
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = ''
    const showallDiv= document.getElementById('showall')
    if( daataLimit && phones.length > 10){
        phones=phones.slice(0,9);
        showallDiv.classList.remove('d-none');
    }
    else{
        showallDiv.classList.add('d-none');
    }

    const nophone = document.getElementById('no-phone-message');
    if(phones.length === 0){
        nophone.classList.remove('d-none');
    }
    else{
        nophone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button class="btn btn-success" onclick="showDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneDetailModal" >Search Phone</button>
             
        </div>
      </div>
    </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });
    toggleSpinner(false);
}

const searchByBtn = (daataLimit) => {
    toggleSpinner(true);
    const searchData = document.getElementById('floatingInput');
    const searchText = searchData.value || hello 
    hello = searchData ;
    loadphone(searchText ,daataLimit);
   
}

document.getElementById('searchphone').addEventListener('click', function(){
    searchByBtn(12);
})
// spinner 
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('loader');
    if(isLoading)
    {
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}
// loadphone('iphone')

document.getElementById('btn-showall').addEventListener('click' , function(){

    searchByBtn();      
})

document.getElementById('floatingInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
     searchByBtn();
    }
});

const showDetails =async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res =await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.innerText=phone.name;
    
    const modalbody = document.getElementById('modalbody');
    modalbody.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release Date Found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth'}</p>
    `;
}