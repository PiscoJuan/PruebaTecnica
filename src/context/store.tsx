import { configureStore } from '@reduxjs/toolkit';
import threeTimesReducer from "./reducers/threeTimesReducer.tsx";
import paginacionReducer from "./reducers/paginacionReducer.tsx";

const store = configureStore({
    reducer: {
        threeTimes: threeTimesReducer,
        paginacion: paginacionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
