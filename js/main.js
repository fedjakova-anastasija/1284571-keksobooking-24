import {createNotice} from './data.js';

const SIMILAR_NOTICE_COUNT = 10;

const similarNotices = Array.from({length: SIMILAR_NOTICE_COUNT}, createNotice);

similarNotices;
