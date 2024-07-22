import { configureStore } from "@reduxjs/toolkit";

// Заглушка редьюсера
const dummyReducer = (state = {}, action: any) => state;

const store = configureStore({
    reducer: {
        dummy: dummyReducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

