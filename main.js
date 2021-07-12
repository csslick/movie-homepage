const BASE_URL = 'https://api.themoviedb.org/3';
// 인기순: /discover/movie?sort_by=popularity.desc
const API_QUERY = '/discover/movie?sort_by=popularity.desc&';
const API_KEY = 'api_key=224502cedb2aea2828098f3724fd0b0c';
const API_URL = BASE_URL + API_QUERY + API_KEY
// 이미지 서버 주소
const IMG_URL = 'https://image.tmdb.org/t/p/w1280'

/*** 영화정보 가져오기 ***/
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

/*** 영화정보 표시 ***/
function showMovies(data) {
  const movies = data.results;
  const list = document.querySelector('#main .movie-list');
  list.innerHTML = ''; // 출력시 기존 리스트의 내용을 비움
  const mainVisualArr = []

  movies.forEach(function(movie, i){ 
    const title = movie.original_title;
    const text = movie.overview;
    const poster = movie.poster_path;
    const vote_average = movie.vote_average;
    const release_date = movie.release_date;

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

    // 메인 비주얼 표시용 3개의 영화 정보 저장
    i < 3 ? mainVisualArr.push(movie) : null;
  })

  showMainVisual(mainVisualArr, IMG_URL) // 메인 비쥬얼 표시
}


/*** 영화정보 가져오기 호출 ***/
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


/***  part3 메인 비주얼 ***/
function showMainVisual(mainVisualArr) {
  const idx = 0;
  const bg1 = mainVisualArr[idx].backdrop_path;
  const title = mainVisualArr[idx].original_title;
  const release_date = mainVisualArr[idx].release_date;
  const html = `
    <div 
      class='v-container' 
      style='background-image:url(${IMG_URL + bg1})'
    >
      <div class='container'>
        <div class="titleGroup">
          <h2>${title}</h2>
          <p>개봉일: ${release_date}</p>
          <a href='#' class='btn-link'>자세히 보기</a>
        </div>
      </div>  
    </div>
  `
  document.querySelector('#mainVisual').innerHTML = html;
}