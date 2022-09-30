import { useEffect, useRef } from "react";
import { AspectRatio, Box, Editable, EditableInput, EditablePreview, SimpleGrid } from "@chakra-ui/react";
import { BOARD_SIZE, IndexedCell, IndexedLegalCell } from "./data";
import { AppDispatch, useAppDispatch, useBoard } from "./reducers";
import { Cursor, setIndex, useCursor } from "./reducers/cursor";
import { setCube } from "./reducers/board";

type BoardCellProps = IndexedCell & {
    setValue: (_: IndexedLegalCell) => any
    setNext: () => any
    current: number | undefined
    dispatch: AppDispatch
}

const LegalCell = ({ index, value, current, dispatch, setNext, setValue}: BoardCellProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const onFocus = () => {
        if (current !== index) {
            dispatch(setIndex(index))
        }
    }
    useEffect(() => {
        if (current === index && document.activeElement !== ref.current) {
            ref.current?.focus()
        }
    }, [current, index]
    )

    return <Box textAlign="center" >
        <Box
            ml={{ sm: "1px", base: "1" }}
            textAlign="left"
            fontSize={["8px", "small"]}
            position='absolute'
            top="0"
            left="0">
            {index}
        </Box>
        <Editable
            placeholder="__"
            defaultValue={value || ''}
            onInput={(e: any) => setValue({index, value: e.target.value})}
            onSubmit={setNext}
            flex="1"
            margin="auto"
            position="absolute"
            fontSize={{ sm: "2xl", base: "2xl" }}
        >
            <EditablePreview ref={ref} onFocus={onFocus} />
            <EditableInput maxLength={1} />
        </Editable>
    </Box>

}

const BoardCell = ({value, ...props}: BoardCellProps): JSX.Element => {
    return <AspectRatio
        bg={value === null ? 'black' : 'inherit'}
        ratio={1}
        border="2px"
        flex="1"
    >
        {value === null ?
            <Box onFocus={() => props.dispatch(setIndex(undefined))}/> :
            <LegalCell {...{value, ...props}} />
        }
    </AspectRatio>
};


export default function Board(): JSX.Element {
    const board = useBoard();
    const { index: current, direction }: Cursor = useCursor();
    const dispatch = useAppDispatch()
    const setValue = ({index, value}: IndexedLegalCell) => dispatch(setCube({index, value}))
    const setNext = () => dispatch(setIndex(current ? current + direction  : current))

    return (
        <Box
                    w={["80vmin", "65vmin"]}
                    style={{aspectRatio: 1}}
                    flex="0 0 "
        >
                <SimpleGrid
                    style={{aspectRatio: 1}}
                    dir="rtl"
                    mx="auto"
                    columns={BOARD_SIZE}
                >
                    {board.map((props) => <BoardCell
                        key={props.index}
                        current={current}
                        setValue={setValue}
                        setNext={setNext}
                        dispatch={dispatch}
                        {...props}
                    />)}
                </SimpleGrid>
        </Box>);
}