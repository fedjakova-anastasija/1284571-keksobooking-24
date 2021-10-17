import {createNotice} from './data.js';
import {showOffer} from './popup.js';

const SIMILAR_NOTICE_COUNT = 10;

const similarNotices = Array.from({length: SIMILAR_NOTICE_COUNT}, createNotice);

showOffer(similarNotices);
