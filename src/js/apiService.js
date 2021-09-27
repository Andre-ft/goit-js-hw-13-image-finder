const API_KEY = '23458770-c93bd78e83fb2002196f13d31';
const BASE_URL = 'https://pixabay.com';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }    

    fetchArticles() {
        const QUERY_STRING = `/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        const url = `${BASE_URL}/api${QUERY_STRING}`;
  
       return fetch(url)
            .then(r => {
                return r.json();
            })
           .then(articles => {
                this.page += 1;
                return articles.hits;
            });    
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    resetPage() {
        this.page = 1;
    }
}