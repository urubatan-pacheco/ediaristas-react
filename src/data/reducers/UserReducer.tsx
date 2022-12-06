import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import {
    CidadeInterface,
    EnderecoInterface,
} from 'data/@types/EnderecoInterface';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { ApiService } from 'data/services/ApiService';
import produce from 'immer';
import React, { useEffect, useReducer } from 'react';

export const initialState = {
    user: {
        nome_completo: '',
        nascimento: '',
        cpf: '',
        foto_usuario: '',
        telefone: '',
        tipo_usuario: UserType.Cliente,
        reputacao: 0,
        chave_pix: '',
    } as UserInterface,
    addressList: [] as CidadeInterface[],
    userAddress: {
        logradouro: '',
        bairro: '',
        complemento: '',
        cep: '',
        cidade: '',
        estado: '',
        numero: '',
        codigo_ibge: '',
    } as EnderecoInterface,
    isLogging: false,
};

type UserAction =
    | 'SET_USER'
    | 'SET_LOGGING'
    | 'SET_ADDRESS_LIST'
    | 'SET_USER_ADDRESS';

export type InitialStateType = typeof initialState;
export type UserActionType = {
    type: UserAction;
    payload?: unknown;
};

export interface UserReducerInterface {
    userState: InitialStateType;
    userDispatch: React.Dispatch<UserActionType>;
}

const reducer = (
    state: InitialStateType,
    action: UserActionType
): InitialStateType => {
    const nextState = produce(state, (draftState) => {
        switch (action.type) {
            case 'SET_USER':
                draftState.user = action.payload as UserInterface;
                break;
            case 'SET_ADDRESS_LIST':
                draftState.addressList = action.payload as CidadeInterface[];
                break;
            case 'SET_USER_ADDRESS':
                draftState.userAddress = action.payload as EnderecoInterface;
                break;
            case 'SET_LOGGING':
                draftState.isLogging = action.payload as boolean;
                break;
        }
    });
    return nextState;
};

export function useUserReducer(): UserReducerInterface {
    const [state, dispatch] = useReducer(reducer, initialState);

    return {
        userState: state,
        userDispatch: dispatch,
    };
}
