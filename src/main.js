import FilterView from './view/filter-view.js';
import render from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const filterContainerElement = document.querySelector('.trip-controls__filters');
const mainContentElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({ boardContainer: mainContentElement });

render(new FilterView(), filterContainerElement);
boardPresenter.init();
//при переключении на ветку 2-1, Код с 1-3 не перенеосится, пытаюсь починить
