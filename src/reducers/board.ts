import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import { RootState, useAppSelector } from ".";
import { getEmptyBoard, IndexedLegalCell, RawBoard } from "../data";
import { View } from "./view";


export const board = createSlice({
  name: 'board',
  initialState: getEmptyBoard(),
  reducers: {
    setCell: (state, {payload: {index, value}}: PayloadAction<IndexedLegalCell>) => {
      state[index - 1] = value;
      return state;
    },
    resetBoard: () => getEmptyBoard(),
    clearBoard: (state,{payload: {layer, plane}}: PayloadAction<View>) => {
        state.forEach((value, index) => {
            if ( Math.floor(index / plane) % 7 === (layer - 1) && value !== null) {
              state[index] = ''
            }
        });
        return state
    }
  }
});

export const {
  resetBoard,
  setCell,
  clearBoard
} = board.actions;

export const useRawBoard: () => RawBoard = () => useAppSelector((state: RootState) => state.board.present)

export const boardReducer = undoable(board.reducer)
export const useCanUndo = () => useAppSelector((state: RootState) => state.board.past.length > 0)