const api = {
  base: "https://newsdata.io/api/1/",
  language:"en",
  key: "pub_3012b04a8a8bf3d5aea9898ae21b3cbea977"
}

let newsAccordian = document.getElementById("newsAccordian");
const searchFrom = document.querySelector(".searchFrom");
const input = document.querySelector(".input");


if (searchFrom.onsubmit == null) {
  var urlLink = (`${api.base}news?country=in&language=${api.language}&apiKey=${api.key}`);
  fetchData(urlLink);
}
searchFrom.addEventListener("submit", ((e)=> {
  e.preventDefault();
  let topic = input.value;
  var urlLink = (`${api.base}news?q=${topic}&language=${api.language}&apiKey=${api.key}`);
  fetchData(urlLink);
  searchFrom.reset();
}));


function fetchData(url) {
  var req = new Request(url);
  fetch(req)
    .then(response => response.json())
    .then((data) => {
      let newsData = "";
      data.results.forEach((result, index) => {
        let items = (` <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${index}">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                      <strong>Breaking News ${index + 1}</strong> &nbsp ${result["title"]}
                      </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                         ${result.description ? result.description.substr(0,150) + "...[+" + Math.abs(result.description.length-150)+"chars] " : "Sorry No Description available, For read about this news in detail click on the link --> "}<a href="${result["link"]}" target="_blank">Read More here</a>
                    </div>
                    
                  </div>
                </div>
                    `);
        newsData += items;
      });
      newsAccordian.innerHTML = newsData;
    });
}