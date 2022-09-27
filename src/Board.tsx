import React from "react";
import { AspectRatio, Box, Editable, EditableInput, EditablePreview, SimpleGrid } from "@chakra-ui/react";
import { BOARD_SIZE, IndexedBoard, IndexedCell, IndexedLegalCell } from "./data";

type BoardCellProps = IndexedCell & {
    onChange: (_: IndexedLegalCell) => void
}
const BoardCell = ({ index, value, onChange }: BoardCellProps): JSX.Element => {
    return <AspectRatio
        bg={value === null ? 'black' : 'inherit'}
        ratio={1}
        border="2px"
        flex="1"
    >
        {value === null ?
            <Box /> :
            <Box textAlign="center" >
                <Box
                    ml={{ sm: "1px", base: "1" }}
                    textAlign="left"
                    fontSize={["8px", "small"]}
                    position='absolute'
                    top="0"
                    left="0">
                    {index + 1}
                </Box>
                <Editable
                    defaultValue={value || ''}
                    placeholder="__"
                    onSubmit={value => onChange({ index, value })}
                    flex="1"
                    margin="auto"
                    position="absolute"
                    fontSize={{ sm: "2xl", base: "2xl" }}
                >
                    <EditablePreview id={`boardCell${index}`} />
                    <EditableInput maxLength={1} />
                </Editable>
            </Box>
        }
    </AspectRatio>
};


type BoardProps = {
    setCube: (_: IndexedLegalCell) => any,
    currentBoard: IndexedBoard,
}

export default function Board({ setCube, currentBoard }: BoardProps): JSX.Element {
    return (
            <SimpleGrid
                dir="rtl"
                columns={BOARD_SIZE}
                minW="40vw"
                maxW={["90vw", "45vw"]}
                maxH={["30vh", "60vh"]}
                flex="1"
                mx="auto"
                style={{aspectRatio: 1}}
            >
                {currentBoard.map((props) => <BoardCell {...props} key={props.index} onChange={setCube} />)}
            </SimpleGrid>
    );
}