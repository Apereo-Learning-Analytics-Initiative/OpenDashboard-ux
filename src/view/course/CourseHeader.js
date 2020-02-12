import React from 'react';
import { Card, CardBody } from 'reactstrap';
import {
    useSelectedClass,
    useClasses
} from '../../context/Course';
import { ClassSelectorDropdown } from './class/ClassSelectorDropdown';

export function CourseHeader({ children }) {

    const currentClass = useSelectedClass();
    const classList = useClasses();

    return (
        <Card>
            <CardBody>
                { !currentClass ? <div className="d-flex justify-content-between">
                    <ClassSelectorDropdown
                        className="d-flex justify-content-center"
                        showClasses={true}
                        classList={classList}>
                            Select a class
                    </ClassSelectorDropdown>
                </div>
                : '' }
                {children}
            </CardBody>
        </Card>
    );
}

export default CourseHeader;