import {
    ExternalServicesReducerInterface,
    initialState,
    useExternalServicesReducer,
} from 'data/reducers/ExternalServicesReducer';
import React, { createContext, PropsWithChildren } from 'react';

const initialValue: ExternalServicesReducerInterface = {
    externalServicesState: initialState,
    externalServicesDispatch: () => {},
};

export const ExternalServicesContext = createContext(initialValue);

export const ExternalServicesProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const reducer = useExternalServicesReducer();
    return (
        <ExternalServicesContext.Provider value={reducer}>
            {children}
        </ExternalServicesContext.Provider>
    );
};
