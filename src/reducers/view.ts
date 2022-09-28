import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from ".";
import { Plane } from "../data";

export type PlaneString = 'YZ' | 'XZ' | 'XY';

export type View  = {
  layer: number,
  plane: Plane
};

export const viewBoard = createSlice({
  name: 'view',
  initialState: {
    layer: 1,
    plane: Plane.XY
  },
  reducers: {
    setLayer: ({plane}, {payload: layer}) => ({ plane, layer }),
    setPlane: ({layer}, {payload: plane}: PayloadAction<String>) => ({ layer, plane: Number(plane) })
  }
});

export const { setLayer, setPlane } = viewBoard.actions;
export const useView = () => useSelector((state: RootState) => state.view);
