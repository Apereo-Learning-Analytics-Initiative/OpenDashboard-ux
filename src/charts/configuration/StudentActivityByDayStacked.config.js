export default {
    label: 'Activity By Day of Week',
    type: 'Line',
    table: {
        inverse: true,
        cornerHeader: 'Activity'
    },
    options: {
        legend: {
            display: true
        },
        maintainAspectRatio: true,
        scales: {
            yAxes: [
                {
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }
            ],
            xAxes: [
                {
                    stacked: true
                }
            ]
        }
    }
};