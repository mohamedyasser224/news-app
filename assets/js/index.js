
function updateNavbarHeight() {
    const navbar = document.querySelector('nav');
    const height = navbar.offsetHeight + "px";
    document.documentElement.style.setProperty('--navbar-height', height);
}
updateNavbarHeight();
window.addEventListener('resize', updateNavbarHeight);

const btn = document.querySelector('button');
const placeHolderImage = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommunity.softr.io%2Ft%2Frequest-for-adding-placeholder-image-functionality-in-list-views%2F4013&psig=AOvVaw2OL1XLYuiuwkEl-5W56U6O&ust=1748107028104000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKD7vKiMuo0DFQAAAAAdAAAAABAE'
let imgs;
const newsContainer = document.querySelector('.news-container');
const countryList = document.querySelectorAll('nav ul a');
const categoryList = document.querySelectorAll('aside ul a');
let countryCode = 'eg';
let categoryCode = 'business';

async function getNews(country, category){
    let response = await fetch(`https://newsdata.io/api/1/latest?apikey=pub_9990ba9e09f542baa99c24323df0f8e8&country=${country}&category=${category}`)
    let data = await response.json()
    console.log(data.results);
    await displayArticels(data.results)
}
getNews('eg','business')

function displayArticels(arr){
    newsContainer.innerHTML='';
    for(let i=0; i < arr.length ; i++){
        newsContainer.innerHTML +=`
        <div class="col-md-4">
          <article class="inner border-3 border rounded-2">
            <img src="${arr[i].image_url || placeHolderImage}" class="rounded-2">
            <div class="article-body p-2">
              <h2 class="h5">${arr[i].title}</h2>
              <p>${arr[i].description}</p>
              <button class="btn btn-primary">Read more</button>
            </div>
          </article>
        </div>
        `
    }
    imgs = document.querySelectorAll('main img')
    function openImage(url){
        window.open(url,'_blank')
    }
    for(let i=0; i<imgs.length ; i++){
        imgs[i].addEventListener('click',function(e){
            openImage(e.target.src);
        })
    }
    
}

for(let i = 0 ; i< countryList.length ; i++){
    countryList[i].addEventListener('click', function(e){
        let activeLink = document.querySelector('nav .active');
        activeLink.classList.remove('active');
        e.target.classList.add('active');
        countryCode = e.target.getAttribute('data-country');
        getNews(countryCode,categoryCode)  
        
    })
}
for(let i = 0 ; i< categoryList.length ; i++){
    categoryList[i].addEventListener('click', function(e){
        let activeLink = document.querySelector('aside .active');
        activeLink.classList.remove('active');
        e.target.classList.add('active');
        categoryCode = e.target.getAttribute('data-category');
        getNews(countryCode,categoryCode)  
        
    })
}