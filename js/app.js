const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => alert(error))
}

// Display Category 
const displayCategory = categories => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('col');
        categoryDiv.innerHTML = `
            <div onclick="categoryNews('${category.category_id}')" class="p-3 category text-size-category" style="cursor: pointer;">${category.category_name}</div>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}

// Category Id 
const categoryNews = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
        .catch(error => alert(error))
        loaderSpinner(true)
}

// News Show 
const displayCategoryNews = news => {
    // News Count 
    const newsCount = document.getElementById('news-count');
    newsCount.innerText = `${news.length} items found for category Entertainment`;

    // News Or Blog 
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    news.forEach(blog => {
        const { image_url, title, details, author, total_view, rating, _id } = blog;
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('row');
        blogDiv.classList.add('blog-news')
        blogDiv.innerHTML = `
        <div class="col-md-4">
            <img src="${image_url ? image_url : "NO Image Available"}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title ? title : "No Title Available"}</h5>
                <p class="card-text description">${details.slice(0, 250) + '...'}</p>
                <div class="container text-center">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex">
                            <div>
                                <img style="height: 50px; width: 50px; border-radius: 50px" src="${author.img ? author.img : "No Author Image Available"}" alt="">
                            </div>
                            <div class="ms-2">
                                <p style="margin: 0;" class="fw-bold">${author.name ? author.name : "Not Author Available"}</p>
                                <span class="graycolor">${author.published_date ? author.published_date : "No Date Available"}</span>
                            </div>
                        </div>
                        <div class="">
                            <i class="fa-solid fa-eye"></i>
                            <p class="d-inline fw-bold">${total_view ? total_view : "No View"}</p>
                        </div>
                        <div class="">
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        ${rating.number ? rating.number : "No rating"}
                        </div>
                        <div class="">
                            <i onclick="displayDetailsNews('${_id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsDetailsModal" style="cursor: pointer;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(blogDiv);
    });
    loaderSpinner(false);
}

const displayDetailsNews = detailsNewsId => {
    const url = `https://openapi.programming-hero.com/api/news/${detailsNewsId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetailsNewsModal(data.data[0]))
        .catch(error => alert(error))
}

// Detaile News Modal Show 
const displayDetailsNewsModal = info => {
    const { title, image_url, author, details, total_view } = info;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="newsDetailsModalLabel">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img class="img-fluid mb-2" src="${image_url}" alt="">
        <p><b>Reporter:</b> ${author.name ? author.name : "Not Repoter"}</p>
        <p><b>Publish Date:</b> ${author.published_date ? author.published_date : "Not Found"}</p>
        <p><b>Details:</b> ${details ? details : "Not Found"}</p>
        <p><b>Total Vies:</b> ${total_view ? total_view : "No View"}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;
}

// Load Spinner 
const loaderSpinner = isLoading => {
    const loading = document.getElementById('loader-spinner');
    if(isLoading){
        loading.classList.remove('d-none');
    }
    else{
        loading.classList.add('d-none');
    }
}

loadCategory();