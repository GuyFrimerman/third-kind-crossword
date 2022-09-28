export const BOARD_SIZE = 7;
export enum Axis {
    X = BOARD_SIZE ** 0,
    Y = BOARD_SIZE ** 1,
    Z = BOARD_SIZE ** 2,
};

export const AXES = [ Axis.X, Axis.Y, Axis.Z ];

export enum Plane {
    YZ = Axis.X as number,
    XZ = Axis.Y as number,
    XY = Axis.Z as number,
}

export type Cell = string | null
export type IndexedCell = {value: Cell, index: number}
export type IndexedLegalCell = {value: string, index: number}
export type RawBoard = Cell[]
export type IndexedBoard = IndexedCell[]

const BLACK_CUBES = [11, 16, 24, 33, 41, 55, 61, 66, 72, 76, 78, 80, 95, 102, 107, 113, 119, 122, 130, 132, 135, 138, 146, 154, 158, 166, 170, 172, 174, 178, 183, 189, 194, 201, 205, 210, 213, 216, 218, 222, 226, 228, 237, 241, 247, 255, 258, 264, 270, 273, 274, 279, 283, 289, 294, 298, 302, 311, 315, 320, 324, 329, 333, 335, 337, 339];

export function getEmptyBoard(): RawBoard{
  return Array.from(Array(BOARD_SIZE ** 3)).map((_, index) => BLACK_CUBES.includes(index + 1) ? null : '');
}

export function getBoard(allData: RawBoard, plane: Plane, layer: number) : IndexedBoard{
  if (layer < 1 || layer > BOARD_SIZE) {
    throw RangeError("Invalid Layer");
  }

  return allData
    .map((value, index) => ({index, value}))
    .filter(({index}) => Math.floor(index / plane) % BOARD_SIZE === (layer - 1))
    .map(({value, index}) =>({value, index: index + 1}));
}