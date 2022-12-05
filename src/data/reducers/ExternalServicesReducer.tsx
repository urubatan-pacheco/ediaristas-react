import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { ApiService } from 'data/services/ApiService';
import produce from 'immer';
import React, { useEffect, useReducer } from 'react';

export const initialState = {
    externalServices: [] as ApiLinksInterface[],
};

export type InitialStateType = typeof initialState;
export type ExternalServiceActionType = {
    type: string;
    payload?: unknown;
};

export interface ExternalServicesReducerInterface {
    externalServicesState: InitialStateType;
    externalServicesDispatch: React.Dispatch<ExternalServiceActionType>;
}

const reducer = (
    state: InitialStateType,
    action: ExternalServiceActionType
): InitialStateType => {
    const nextState = produce(state, (draftState) => {
        switch (action.type) {
            case 'UPDATE':
                draftState.externalServices =
                    action.payload as ApiLinksInterface[];
                break;
        }
    });
    return nextState;
};

export function useExternalServicesReducer(): ExternalServicesReducerInterface {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        ApiService.get<{ links: ApiLinksInterface[] }>('/api', {
            headers: { Authorization: '' },
        }).then(({ data }) => {
            dispatch({ type: 'UPDATE', payload: data.links });
        });
    }, []);

    return {
        externalServicesState: state,
        externalServicesDispatch: dispatch,
    };
}
