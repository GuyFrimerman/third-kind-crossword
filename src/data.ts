export const BOARD_SIZE = 7;
export enum Axis {
    X = BOARD_SIZE ** 0,
    Y = BOARD_SIZE ** 1,
    Z = BOARD_SIZE ** 2,
};

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

const black_cubes = [11, 16, 24, 33, 41, 55, 61, 66, 72, 76, 78, 80, 95, 102, 107, 113, 119, 122, 130, 132, 135, 138, 146, 154, 158, 166, 179, 172, 174, 178, 183, 189, 194, 201, 205, 210, 213, 216, 218, 222, 226, 228, 237, 241, 247, 255, 258, 264, 270, 273, 274, 279, 283, 289, 294, 298, 302, 311, 315, 320, 324, 329, 333, 335, 337, 339];

export function get_empty_board(): RawBoard{
  return Array.from(Array(BOARD_SIZE ** 3)).map((_, index) => black_cubes.includes(index + 1) ? null : '');
}

function get_plane_distance(plane: Plane): number[]{
  return (Object.values(Axis).filter(v => typeof v === 'number') as number[]).filter(v => v !== plane as number);
}

export function get_board(all_data: RawBoard, plane: Plane, layer: number) {
  if (layer < 1 || layer > BOARD_SIZE) {
    throw RangeError("Invalid Layer");
  }

  const [row, column] = get_plane_distance(plane);
  return Array.from(Array(BOARD_SIZE)).flatMap(
    (_, x) => Array.from(Array(BOARD_SIZE)).map(
        (_, y) => x * column + y * row + (layer - 1) * plane
        )
    ).map(index => ({ index, value: all_data[index] }));
}