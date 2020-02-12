import Moment from 'moment';
import { extendMoment } from 'moment-range';

export const moment = extendMoment(Moment);

export function getMoment(d) {
    const parsed = Array.isArray(d) ? { y: d[0], M: d[1] - 1, d: d[2] } : new Date(d);
    return moment(parsed);
}

export function normalizeDate(d) {
    return getMoment(d).format();
}