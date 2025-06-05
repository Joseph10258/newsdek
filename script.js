const apiKey = '0af3b226f93542ee984b4eb332056a75';
document.getElementById('searchButton').addEventListener('click', function(e) {
  e.preventDefault();
  searchNews();
});
// Load default news on page load
window.onload = function() {
  loadDefaultNews();
}

function loadDefaultNews() {
  const url = `https://newsapi.org/v2/everything?q=scholarship&pageSize=12&language=enapiKey=${apiKey}`;
  fetchAndDisplay(url);
}


function searchNews() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    alert('Please enter a search term.');
    return;
  }
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles;
      const blogGrid = document.getElementById('blogContainer');
      blogGrid.innerHTML = ''; // Clear previous results
      if (articles.length === 0) {
        blogContainer.innerHTML = `<div style="text-align:center; font-size:20px; padding:20px;">😢Sorry no news found for "<strong>${query}</strong>" <br> check your spelling or try searching for something else</div>`;
        return;
      }

      articles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('blog-card');

        card.innerHTML = `
          <img src="${article.urlToImage || 'https://via.placeholder.com/600x400'}" alt="News Image">
          <h2>${article.title}</h2>
          <p>${article.description || 'No description available.'}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;

        blogContainer.appendChild(card);
      });
    })
     .catch(error => {
      console.error('Error fetching news:', error);
      document.getElementById('blogGrid').innerHTML = `<div style="text-align:center; font-size:20px; padding:20px;">⚠️ Something went wrong. Try again later.</div>`;
    });
}
document.getElementById('searchButton').addEventListener('click', searchNews);
