import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistCombineReducers, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getBoard } from '../data';
import { boardApi } from './board';
import { cursor } from './cursor';
import { definitionsApi } from './definitions';
import { viewBoard } from './view';

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = persistCombineReducers(persistConfig, {
    [definitionsApi.reducerPath]: definitionsApi.reducer,
    [boardApi.name]: boardApi.reducer,
    [viewBoard.name]: viewBoard.reducer,
    [cursor.name]: cursor.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(definitionsApi.middleware)

});

export default function reducers() {
    const persistor = persistStore(store);
    return {
        persistor,
        store
    };
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useBoard = () => useAppSelector((state: RootState) => {
    const { layer, plane } = state.view;
    return getBoard(state.board, plane, layer)
});
