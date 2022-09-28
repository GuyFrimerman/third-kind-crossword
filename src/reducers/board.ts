import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { getEmptyBoard } from "../data";

export const boardApi = createSlice({
  name: 'board',
  initialState: getEmptyBoard(),
  reducers: {
    setCube: (state, _ref) => {
      let {
        payload: {
          index,
          value
        }
      } = _ref;
      state[index] = value;
      return state;
    },
    resetBoard: () => getEmptyBoard()
  }
});

export const {
  resetBoard,
  setCube
} = boardApi.actions;

export const useRawBoard = () => useSelector((state: RootState) => state.board)