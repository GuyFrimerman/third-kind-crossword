import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistCombineReducers, PersistConfig, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import undoable from 'redux-undo';
import { getBoard } from '../data';
import { board, boardReducer } from './board';
import { cursor } from './cursor';
import { definitionsApi } from './definitions';
import { viewBoard } from './view';

const persistConfig : PersistConfig<any>= {
    key: 'root',
    storage,
};

const rootReducer = persistCombineReducers(persistConfig, {
    [definitionsApi.reducerPath]: definitionsApi.reducer,
    [board.name]: boardReducer,
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
    return getBoard(state.board.present, plane, layer)
});
