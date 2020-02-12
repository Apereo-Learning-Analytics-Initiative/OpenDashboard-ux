import React from 'react';
import * as d3 from 'd3';
import moment from 'moment';

export function EventBubbles ({ events, color, maxEvents, timeScale, height, showToolTip, onBubbleClick }) {

    const circlesSvg = React.useRef();

    React.useEffect(() => {
        const svgTimeOverview = d3.select(circlesSvg.current);

        svgTimeOverview
            .attr('class', 'overview-svg')
            .attr('height', height)
            .attr('width', '100%');

        const overviewPlot = svgTimeOverview.select('g')
            .attr('class', 'plot')
            .attr('transform', 'translate(0,' + height / 2 + ')');

        overviewPlot.selectAll('circle').remove();
        overviewPlot
            .selectAll('circle')
            .data(events)
            .enter()
            .append('circle')
            .attr('r', (d) => d.eventCount * 100 / maxEvents / 10 + 1)
            .attr('cx', d => timeScale(moment(d.date)))
            .attr('class', 'dot')
            .attr('opacity', 0.5)
            .style('fill', color)
            .on('mouseover', (d) => showToolTip({
                x: d3.event.pageX,
                y: d3.event.pageY,
                date: moment(d.date),
                events: d.eventCount
            }))
            .on('mouseout', (d) => {
                showToolTip(null);
            })
            .on('click', (d) => {
                if (onBubbleClick) {
                    onBubbleClick(d.date);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {

        d3.select(circlesSvg.current).selectAll('.dot')
            .transition()
            .duration(750)
            .attr('cx', function (d, index) {
                var placement = timeScale(moment(d.date));
                return placement;
            });
    }, [timeScale]);

    return (
        <svg ref={circlesSvg}>
            <g></g>
        </svg>
    );
}