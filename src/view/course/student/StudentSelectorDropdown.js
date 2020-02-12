import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import truncate from 'lodash/truncate';

function StudentSelectorDropdown({ groupId, selectedStudent, studentList }) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const classMenu = studentList.length > 1 ?
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="button" className="nav-link link-lg btn btn-link" caret>
                {selectedStudent.label}
            </DropdownToggle>
            <DropdownMenu>
                {studentList.map(student =>
                    <DropdownItem key={student.id}
                        tag={ Link }
                        to={`/courselist/${groupId}/student/${student.id}`}>
                            { truncate(student.label, 20) }
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
        :
        <a href={`/student/${selectedStudent.id}`}
            className="link-lg">{truncate(selectedStudent.label, 20)}</a>;

    return (<React.Fragment>{classMenu}</React.Fragment>);
}

export default StudentSelectorDropdown;