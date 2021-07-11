const BASE_URL = 'https://api.themoviedb.org/3';
// 인기순: /discover/movie?sort_by=popularity.desc
const API_QUERY = '/discover/movie?sort_by=popularity.desc&';
const API_KEY = 'api_key=224502cedb2aea2828098f3724fd0b0c';
const API_URL = BASE_URL + API_QUERY + API_KEY

function getMovies(url) {
  fetch(url)
    .then(function(res) {
      return res.json()
    })
    .then(function(movies) {
      // 데이터(검색 결과)가 없으면
      if(movies.results.length === 0) {
        document.querySelector('#main .movie-list').innerHTML = `
          <p>자료가 존재하지 않습니다.</p>
        `
        return
      }
      showMovies(movies)
    })
}

function showMovies(data) {
  const movies = data.results;
  const list = document.querySelector('#main .movie-list');
  list.innerHTML = ''; // 출력시 기존 리스트의 내용을 비움

  movies.forEach(function(movie){
    const title = movie.original_title;
    const text = movie.overview;
    const poster = movie.poster_path;
    const vote_average = movie.vote_average;
    const release_date = movie.release_date;
    // 이미지 서버 주소
    const IMG_URL = 'https://image.tmdb.org/t/p/w500/'
    // li 요소 생성
    const html_li = document.createElement('li')

    html_li.innerHTML =  `
        <figure>
          <img src='${IMG_URL + poster}' alt='${title}' />
        </figure>  
        <h4>${title}</h4>
        <div class='info'>
          <span class='vote'>평점: ${vote_average}</span>
          <span class='release-date'>개봉일: ${release_date}</span>
        </div>  
    `
    list.appendChild(html_li);
  })
}

getMovies(API_URL)



/*** Part2.검색 ***/
const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const searchValue = document.getElementById('search').value;
  console.log(searchValue)
  const searchURL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${searchValue}`;

  // 검색 데이터가 있으면 조회
  if(searchValue) {
    document.querySelector('#main h2').innerHTML = 'Search Result';
    getMovies(searchURL)
  }
})