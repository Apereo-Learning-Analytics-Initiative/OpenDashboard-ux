import useFetch from 'fetch-suspense';
import { moment } from '../shared/util/date';
import sortBy from 'lodash/sortBy';
import moize from 'moize';

export const eventColors = [
    "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c",
    "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"
];

export function useCachedData(url) {
    return useFetch(url, { credentials: 'include' }, { metadata: true, lifespan: 0 });
}

const filterEvents = moize((data, start, end, exclude) => {
    const s = moment(start);
    const e = moment(end);
    const filtered = data
        .filter(event => exclude.indexOf(event.shortVerb) < 0)
        .filter(event => start ? moment.utc(event.timestamp).isAfter(s) : true)
        .filter(event => end ? moment.utc(event.timestamp).isBefore(e) : true);
    return sortBy(filtered, 'date');
});

export function useFilteredEvents(data, start, end, exclude) {
    return filterEvents(data, start, end, exclude);
}

export function getColorsForEvents(events) {
    let index = 0;
    return events.reduce((coll, ev) => {
        const color = eventColors[index];
        index = index + 1;
        if (index > eventColors.length - 1) {
            index = 0;
        }
        return { ...coll, [ev]: color };
    }, {})
}

export const getRange = moize((data, start, end) => {
    const times = data.map(ev => ev.date);
    const s = start ? start : times && times.length ? times[0] : moment();
    const e = end ? end : times && times.length ? times[times.length - 1] : moment();
    return moment.range(s, e);
});