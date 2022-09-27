import { AspectRatio, Box, Editable, EditableInput, EditablePreview, Flex, SimpleGrid } from "@chakra-ui/react";
import { BOARD_SIZE, IndexedBoard, IndexedCell, IndexedLegalCell } from "./data";

type BoardCellProps = IndexedCell & {
    onChange: (_: IndexedLegalCell) => void
}
const BoardCell = ({ index, value, onChange }: BoardCellProps) => {
    return <AspectRatio
        bg={value === null ? 'black' : 'inherit'}
        ratio={1}
        border="2px"
        flex="1"
    >
        {value === null ?
            <Box /> :
            <Flex
                direction="column"
                justifyItems="stretch"
                textAlign="center"
            >
                <Box ml="1" textAlign="left" fontSize="sm">
                    {index + 1}
                </Box>
                <Editable
                    defaultValue={value || ''}
                    placeholder="__"
                    onSubmit={value => onChange({ index, value })}
                    flex="1"
                    fontSize="xx-large"
                >
                    <EditablePreview id={`boardCell${index}`} />
                    <EditableInput maxLength={1} />
                </Editable>
            </Flex>
        }
    </AspectRatio>
};


type BoardProps = {
    setCube: (_: IndexedLegalCell) => any,
    currentBoard: IndexedBoard,
}

export default ({ setCube, currentBoard }: BoardProps) => (
    <SimpleGrid
        dir="rtl"
        columns={BOARD_SIZE}
        w="40vw"
    >
        {currentBoard.map((props) => <BoardCell {...props} key={props.index} onChange={setCube} />)}
    </SimpleGrid>
)