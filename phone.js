const loadphone = async (searchText) =>
{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data) 
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = ''
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
        </div>
      </div>
    </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });
}


document.getElementById('searchphone').addEventListener('click', function(){
    const searchData = document.getElementById('floatingInput');
    const searchText = searchData.value
    loadphone(searchText);
    searchData.value =''
})

loadphone('iphone')