import React from 'react';

import
ChartComponent,
{
    Bubble,
    Doughnut,
    Pie,
    Line,
    Bar,
    HorizontalBar,
    Radar,
    Polar,
    Scatter
} from 'react-chartjs-2';

export const ChartTypes = Object.freeze({
    Bubble,
    Pie,
    Doughnut,
    Line,
    Bar,
    HorizontalBar,
    Radar,
    Polar,
    Scatter
});

function useChartComponent(type) {
    if (ChartTypes.hasOwnProperty(type)) {
        return ChartTypes[type];
    }
    return ChartComponent;
}


function Chart({ data, configuration, ...props }) {
    const Component = useChartComponent(configuration.type);

    return (
        <Component data={data} options={configuration.options} { ...props } />
    );
}

export default Chart;