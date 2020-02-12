export default {
    label: 'Detail Activity Stacked',
    type: 'Bar',
    height: 75,
    table: {
        inverse: false,
        cornerHeader: 'Date'
    },
    filters: [
        {
            default: true,
            label: "7 Days",
            filter: (data) => {
                return data;
            }
        },
        {
            default: true,
            label: "30 Days",
            filter: (data) => {
                return data;
            }
        },
        {
            default: true,
            label: "90 Days",
            filter: (data) => {
                return data;
            }
        }
    ],
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