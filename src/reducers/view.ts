import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plane } from "../data";

type PlaneString = 'YZ' | 'XZ' | 'XY';

export const viewBoard = createSlice({
  name: 'view',
  initialState: {
    layer: 1,
    plane: Plane.XY
  },
  reducers: {
    setLayer: ({plane}, {payload: layer}) => ({ plane, layer }),
    setPlane: ({layer}, {payload: plane}: PayloadAction<PlaneString>) => ({ layer, plane: Plane[plane] })
  }
});

export const { setLayer, setPlane } = viewBoard.actions;
