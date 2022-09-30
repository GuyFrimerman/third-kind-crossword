import { useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { AXES, BOARD_SIZE, IndexedLegalCell } from "./data";
import { useAppDispatch, useBoard } from "./reducers";
import { Cursor, setDirection, setIndex, useCursor } from "./reducers/cursor";
import { setCell } from "./reducers/board";
import { useView } from "./reducers/view";
import Cell from "./Cell";


export default function Board() {
    const board = useBoard();
    const { plane } = useView();
    const { index: current, direction }: Cursor = useCursor();
    const dispatch = useAppDispatch()
    const validateValue = (value: string) => (value === '' || (value !== ' ' && value >= 'א' && value <= "ת"))

    const axes = AXES.filter(x => x !== plane);

    useEffect(() => {
        if (plane === direction) {
            dispatch(setDirection(axes[0]))
        }
    }, [direction, plane, dispatch, axes])

    const hasNext = (index: number) => {
        const coordinates = [index % BOARD_SIZE, Math.floor(index / 7)];
        if (coordinates[axes.findIndex(x => x === direction)] === (BOARD_SIZE - 1))
        {
            return false;
        }
        const locationDirection = (direction === axes[0]) ? 1 : BOARD_SIZE;
        return board.at(index + locationDirection)?.value !== null
    }

    const setNext = (nextIndex: number, locationIndex: number) => {
        if (hasNext(locationIndex)) {
            dispatch(setIndex(nextIndex))
        }
        else {
            dispatch(setIndex());
            (document.activeElement as HTMLDivElement)?.blur();
        }
    }

    const onChange = ({ index, value }: IndexedLegalCell, i: number) => {
        if (validateValue(value)) {
            dispatch(setCell({ index, value }))
            if (value !== '') {
                setNext(index + direction, i)
            }
        }
    }

    return (
        <Box
            style={{ aspectRatio: 1 }}
            flex="75 1 56vmin"
            // minH={["80vmin", "60vmin"]}
            maxH="80vmin"
            alignSelf="center"
        >
            <SimpleGrid
                style={{ aspectRatio: 1 }}
                dir="rtl"
                mx="auto"
                columns={BOARD_SIZE}
            >
                {board.map((props, i) => <Cell
                    key={props.index}
                    current={current}
                    onChange={(value: string) => onChange({ index: props.index, value }, i)}
                    setIndex={index => dispatch(setIndex(index))}
                    {...props}
                />)}
            </SimpleGrid>
        </Box>);
}