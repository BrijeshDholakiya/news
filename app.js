const api = {
  key: "05071f9c6d7647d991cf76bb01d9c963",
  base: "https://newsapi.org/v2/",
}
let newsAccordian = document.getElementById("newsAccordian");
const searchFrom = document.querySelector(".searchFrom");
const input = document.querySelector(".input");


if (searchFrom.onsubmit == null) {
  var urlLink = (`${api.base}top-headlines?country=in&apiKey=${api.key}`);
  fetchData(urlLink);
} 
searchFrom.addEventListener("submit", ((e)=> {
  e.preventDefault();
  let topic = input.value;
  var urlLink = (`${api.base}everything?q=${topic}&apiKey=${api.key}`);
  fetchData(urlLink);
  searchFrom.reset();
}));


async function fetchData(url) {
  var req = new Request(url);
 await fetch(req)
    .then(response => response.json())
    .then((data) => {
      let newsData = "";
      data.articles.forEach((article, index) => {
        let items = ` <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${index}">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                      <strong>Breaking News ${index + 1}</strong> &nbsp ${article["title"]}
                      </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        ${article["content"]} <a href="${article["url"]}" target="_blank">Read More here</a>
                    </div>
                  </div>
                </div>
                    `
        newsData += items;
      });
      newsAccordian.innerHTML = newsData;
    });
}