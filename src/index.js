import css from './styles.css';
import ApiService from './js/apiService';
import { alert, error, success, Stack, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import LoadMoreBtn from './js/load-more-btn';
import articlesTpl from './templates/articles.hbs';
import * as basicLightbox from 'basiclightbox';



defaultModules.set(PNotifyMobile, {});

const apiService = new ApiService();
const element = document.getElementById('load-more-btn');
const myStack = new Stack({
    push: 'top',
    dir1: 'up',
    maxStrategy: 'close',
});
const notificationOptions = {
    animateSpeed: 'fast',
    hide: false,
    delay: 1000,
    mouseReset: true,
    closerHover: false,
    remove: true,
    destroy: true,
    autoOpen: true,
    stack: myStack,
};

// const { log } = console;

const refs = {
  searchForm: document.querySelector('.js-search-form-rest'),
  articleContainer: document.querySelector('.js-articles-container'),
}

const loadMoreBtn = new LoadMoreBtn({ selector: 'button[data-action="load-more"]' });

loadMoreBtn.hide();
alert(notificationOptions.text = 'Please input your query.')

refs.searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
refs.articleContainer.addEventListener('click', onImageClick);

function onImageClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') return;
    const imgSrc = e.target.dataset.src;
    const alt = e.target.alt;
    // log('e.target', e.target);

  const instance = basicLightbox.create(`
      <img src="${imgSrc}" alt="${alt}" />
`);
    instance.show();
}

function onSearchForm(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;

  loadMoreBtn.show();
  clearArticlesContainer();
  apiService.resetPage();
  fetchArticles();
}

function fetchArticles() {
    loadMoreBtn.disable();
  apiService.fetchArticles()
    .then(articles => {
        // log('articles', articles);
      if (articles.length === 0) {
        alert(notificationOptions.text = "Sorry, nothing to show, please specify your query.");
        // clearArticlesContainer();
        return;
      }
        appendArticlesMarkup(articles);
        loadMoreBtn.enable();
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
        success(notificationOptions.text = "12 images is loaded")
    })
    .catch(err => {
      error(notificationOptions.text = "Sorry, something went wrong :(");
      log(err);
      });
}

function appendArticlesMarkup(articles) {
  refs.articleContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articleContainer.innerHTML = '';
} 






