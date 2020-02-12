import React from 'react';
import { Card, CardBody, CardDeck } from 'reactstrap';

import { useSelectedStudent } from '../../../context/Course';
import { useModuleConfig } from '../../../context/Module';

import DataModule from '../../../charts/DataModule';

import StudentInfo from './StudentInfo';

import { useStudentDisplayMode } from '../../../context/Student';
import StudentCharts from '../../../charts/configuration/StudentCharts';
import Spinner from '../../../components/Spinner';


export function StudentDetail() {
    const student = useSelectedStudent();
    const configuration = useModuleConfig();
    const view = useStudentDisplayMode();
    const charts = (
        configuration.sort((a, b) => a.order < b.order ? -1 : 1).map(line =>
            <section className="mt-3" key={line.id} id={line.id}>
                <div className="d-flex flex-lg-row flex-column chart-card-deck">
                    {line.Modules.map((module, index) =>
                        <Card key={ module.id } className={ `w-100 ${ index > 0 ? 'ml-lg-4' : '' } mt-xs-4 mt-lg-0` }>
                            <CardBody>
                                <React.Suspense fallback={<Spinner />}>
                                    <DataModule module={module} uiConfig={StudentCharts[module.id]} view={view}></DataModule>
                                </React.Suspense>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </section>
        )
    );

    return (
        <div className="d-flex flex-column mt-3">
            {student ?
                <React.Fragment>
                    <StudentInfo />
                    {charts}
                </React.Fragment>
                : ''}
        </div>
    );
}

export default StudentDetail;