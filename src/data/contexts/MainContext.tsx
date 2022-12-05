import React, { PropsWithChildren } from 'react';
import { ExternalServicesProvider } from './ExternalServicesContext';

export const MainProvider: React.FC<PropsWithChildren> = ({children}) => {
    return <>
            <ExternalServicesProvider>
                {children}
            </ExternalServicesProvider>
        </>
}