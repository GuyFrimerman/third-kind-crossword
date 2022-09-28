import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Axis } from "../data";
import { RootState, useAppSelector } from "."

export type Cursor = {
    direction: Axis,
    index: undefined | number
}

export const cursor = createSlice({
    name: "cursor",
    initialState: { direction: Axis.X } as Cursor,
    reducers: {
        setCursor: (_state, {payload}: PayloadAction<Cursor>) => {
            return payload;
        },
        setDirection: (state, {payload}: PayloadAction<Axis>) => {
            state.direction = payload;
            return state;
        },
        setIndex: (state, {payload}: PayloadAction<number|undefined>) => {
            state.index = payload;
            return state;
        }
    }
})

export const { setCursor, setIndex, setDirection } = cursor.actions
export const useCursor = () => useAppSelector((state: RootState) => state.cursor)