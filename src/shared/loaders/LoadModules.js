import React from 'react';
import useFetch from 'fetch-suspense';

import { ModuleContext, useModuleConfig, actions as ModuleActions } from '../../context/Module';

import {useModuleUrl} from '../path';

function LoadModules({ studentId, children }) {

    const { dispatch } = React.useContext(ModuleContext);
    const modules = useFetch(useModuleUrl(studentId), { method: 'GET', credentials: 'include' });
    React.useEffect(() => {
        dispatch({ type: ModuleActions.LOAD_MODULE_CONFIGURATION_SUCCESS, payload: modules });
    }, [modules, dispatch]);

    const config = useModuleConfig();

    return <React.Fragment>{config ? children : null}</React.Fragment>;
}

export default LoadModules;