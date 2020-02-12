import React from 'react';
import orderBy from 'lodash/orderBy';
import { Bubble } from 'react-chartjs-2';

import { Card, CardBody, CardTitle } from 'reactstrap';

import { riskColorClasses } from '../../../shared/colorClasses';
import { BubbleOptions } from '../../../shared/chartOptions';
import { useTranslation } from '../../../context/Translate';
import { useSortOn, useSortOrder } from '../../../context/Filter';
import InfoPopup from '../../../components/InfoPopup';


function getColorCodeRiskForBubble (risk) {
    
    if (isNaN(risk)) {
        return 'rgba(51, 102, 153)';
    }
    
    const colorclass = riskColorClasses.find(r => r.threshold[0] <= risk && risk <= r.threshold[1]).classname;

    switch (colorclass) {
        case 'no-risk':
            return 'rgba(127, 191, 63, 1)';
        case 'medium-risk':
            return 'rgba(246, 178, 8, 1)';
        case 'high-risk':
            return 'rgba(234, 14, 14, 1)';
        default:
            return '';
    }
}

const options = {
    ...BubbleOptions,
    legend: {
        display: false
    },
    layout: {
        padding: {
            top: 30,
            bottom: 30,
            right: 30,
            left: 20
        }
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    max: 1.2,
                    beginAtZero: true
                }
            }
        ]
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                return `${data.labels[tooltipItem.datasetIndex]}: ${tooltipItem.yLabel}`;
            }
        }
    }
};

function ClassRisk({ selectedClass, config }) {

    const sortOn = useSortOn();
    const sortOrder = useSortOrder();

    const students = React.useMemo(() => {
        return orderBy(selectedClass.students, [sortOn], [sortOrder]);
    }, [selectedClass.students, sortOn, sortOrder]);

    const eventMax = selectedClass.studentEventTotalMax;
    const data = {
        labels: students.map(s => s.label),
        datasets: students.map((student, index) => {
            const risk = parseFloat(student.risk, 10);
            const activity = parseFloat(student.activity, 10);
            const color = getColorCodeRiskForBubble(risk);
            return (
                {
                    label: [student.label],
                    data: [{
                        x: index + 1,
                        y: risk,
                        r: (activity / eventMax) * 20
                    }],
                    backgroundColor: [color],
                    borderColor: [color]
                }
            );
        })
    };
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h3">
                    {useTranslation('LABEL_PROBABILITY_CHART_TITLE')}&nbsp;
                    <InfoPopup 
                        header={useTranslation('LABEL_PROBABILITY_CHART_TITLE')}
                        body={useTranslation('LABEL_PROBABILITY_CHART_TOOLTIP')}
                        ></InfoPopup>                        
                </CardTitle>
                <Bubble data={data} options={options} height={50} />
            </CardBody>
        </Card>
    );
}

export default ClassRisk;