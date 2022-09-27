import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { get_board } from '../data';
import { boardApi } from './board';
import { definitionsApi } from './definitions';
import { viewBoard } from './view';

const persistConfig = {
    key: 'root',
    storage
};

const store = configureStore({
    reducer: persistCombineReducers(persistConfig, {
        [definitionsApi.reducerPath]: definitionsApi.reducer,
        [boardApi.name]: boardApi.reducer,
        [viewBoard.name]: viewBoard.reducer
    }),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(definitionsApi.middleware)
});

export default function reducers() {
    const persistor = persistStore(store);
    return {
        persistor,
        store
    };
}

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => RootState = useDispatch;

export const useBoard = (state: RootState) => {
    const { layer, plane } = state.view;
    return { board: get_board(state.board, plane, layer), plane, layer };
};
