import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { get_empty_board } from "../data";

export const boardApi = createSlice({
  name: 'board',
  initialState: get_empty_board(),
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
    resetBoard: () => get_empty_board()
  }
});

export const {
  resetBoard,
  setCube
} = boardApi.actions;

export const useRawBoard = () => useSelector((state: RootState) => state.board)