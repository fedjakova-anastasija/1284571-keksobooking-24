import {createNotice} from './data.js';
import {showOffers} from './popup.js';
import './user-form.js';

const SIMILAR_NOTICE_COUNT = 10;

const similarNotices = Array.from({length: SIMILAR_NOTICE_COUNT}, createNotice);

showOffers(similarNotices[0]);
