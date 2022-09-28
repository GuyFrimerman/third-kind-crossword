import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, useAppSelector } from ".";
import { getEmptyBoard, IndexedLegalCell } from "../data";


export const boardApi = createSlice({
  name: 'board',
  initialState: getEmptyBoard(),
  reducers: {
    setCube: (state, {payload: {index, value}}: PayloadAction<IndexedLegalCell>) => {
      state[index - 1] = value;
      return state;
    },
    resetBoard: () => getEmptyBoard()
  }
});

export const {
  resetBoard,
  setCube
} = boardApi.actions;

export const useRawBoard = () => useAppSelector((state: RootState) => state.board)