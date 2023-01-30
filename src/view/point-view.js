import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

function createPointOffersTemplate(point) {
  if (point.pointOffers.length === 0) {
    return '<span class="event__offer-title">No additional offers</span>';
  }

  return point.pointOffers.map((pointOfferId) => {
    const pointOffer = point.allOffers.find((offer) => offer.id === pointOfferId);
    return (`<li class="event__offer">
      <span class="event__offer-title">${pointOffer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${pointOffer.price}</span>
    </li>`);
  }).join('');
}

function createPointTemplate(point) {
  const { basePrice, dateFrom, dateTo, type } = point;
  const destination = point.allDestinations.find((dest) => dest.id === point.destination);

  return (
    `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('MMM D')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateFrom).format('HH:mm')}</time>
            &mdash;
            <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${dayjs(dateTo).format('HH:mm')}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createPointOffersTemplate(point)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
    `
  );
}

export default class PointView extends AbstractView {
  #data = null;
  #point = null;
  #handleEditClick = null;

  constructor({ point, onEditClick }) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
