import {showOffers} from './popup.js';
import {comparePoints} from './map-filter.js';

const SIMILAR_NOTICE_COUNT = 10;
const MAX_ITEMS_COUNT = 7;
const CENTER_LAT = 35.6978;
const CENTER_LNG = 139.425;
const activeMarkers = [];
const addressInput = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    addressInput.value = `${CENTER_LAT}, ${CENTER_LNG}`;
  })
  .setView({
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  }, 8);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat.toPrecision(MAX_ITEMS_COUNT).toString();
  const lng = evt.target.getLatLng().lng.toPrecision(MAX_ITEMS_COUNT).toString();

  addressInput.value = `${lat}, ${lng}`;
});

const showPoints = (points) => {
  activeMarkers.forEach((marker) => map.removeLayer(marker));
  points
    .slice()
    .sort(comparePoints)
    .slice(0, SIMILAR_NOTICE_COUNT)
    .forEach((point) => {
      const marker = L.marker(
        {
          lat: point.location.lat,
          lng: point.location.lng,
        },
        {
          icon: pinIcon,
        });

      marker
        .addTo(map)
        .bindPopup(showOffers(point));

      activeMarkers.push(marker);
    });
};

export {showPoints, map, mainPinMarker, CENTER_LAT, CENTER_LNG};
