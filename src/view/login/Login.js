import React from 'react';

import { Form, FormGroup, Label, Card, CardBody, Input, Button } from 'reactstrap';

import { authenticate } from '../../service/Auth';

import { withRouter, useParams } from 'react-router-dom';
import { useLoginUrl } from '../../shared/path';


function Login({ history }) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const loginPath = useLoginUrl()

    const authenticateAndRedirect = (username, password) => {



        //if ok... then good, if not... bla
        authenticate(username, password, loginPath)
            .then( ( response ) => response.text() )
                .then( (response) => {
                    if (response==="OK") {
                        console.log("login ok");
                        window.location.assign("/admin/tenants");
                    } 
                    else {
                        console.log("failed login");
                        console.log("response", response);
                    }
                })   

    }    

    return (
        <div className="login-view h-100">
            <div className="d-flex justify-content-center align-items-top">
                <Card className="w-33 mt-4 ml-50">
                    <CardBody>
                        <h3>Administrator Login</h3>
                        <hr />
                        <Form>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text"
                                    name="username"
                                    id="username"
                                    placeholder="username"
                                    value={username}
                                    onChange={(ev) => setUsername(ev.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    onChange={(ev) => setPassword(ev.target.value)} />
                            </FormGroup>
                        </Form>
                        <Button onClick={() => authenticateAndRedirect(username, password)}>Sign In</Button>
                        <Button color="link">Cancel</Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default withRouter(Login);