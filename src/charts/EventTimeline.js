import React, { useEffect } from 'react';
import * as d3 from 'd3';

function getXAxis(scale, weeks) {
    return d3.axisBottom()
        .scale(scale)
        .ticks(weeks)
        .tickFormat(d3.timeFormat('%m-%d'));
}

export function EventTimeline ({ timeScale, ticks, height }) {
    const ticksSvg = React.useRef();

    useEffect(() => {
        var svgTimelineHeader = d3.select(ticksSvg.current);

        const xAxis = getXAxis(timeScale, ticks);

        svgTimelineHeader
            .attr('class', 'timeline-svg')
            .attr('height', height / 2)
            .attr('width', '100%')
            .append('g')
            .attr('class', 'xaxis')
            .call(xAxis);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const xAxis = getXAxis(timeScale, ticks);

        d3.select(ticksSvg.current).selectAll('.xaxis')
            .transition()
            .duration(750)
            .call(xAxis);
    }, [timeScale, ticks]);

    return (<svg ref={ticksSvg}></svg>);
}