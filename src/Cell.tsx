import { Box, Editable, EditablePreview, EditableInput, AspectRatio } from "@chakra-ui/react"
import { useRef, useEffect } from "react"
import { IndexedCell } from "./data"

export type CellProps = IndexedCell & {
    onChange: (_: string) => any
    setIndex: (_: undefined | number) => any
    current: number | undefined
}

const LegalCell = ({ index, value, current, onChange, setIndex }: CellProps) => {
    const ref = useRef<HTMLInputElement>(null);

    const onFocus = () => {
        if (current !== index) {
            setIndex(index)
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
            value={value || ''}
            onInput={(e: any) => { onChange(e.target.value) }}
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

const EmptyCell = ({ setIndex, current, index }: CellProps) => {
    useEffect(() => {
        if (current === index) {
        }
    }, [current, index, setIndex])
    return <Box bgColor="black" />
}

export default function Cell({ value, ...props }: CellProps) {
    return <AspectRatio
        ratio={1}
        border="2px"
        flex="1"
    >
        {value === null ?
            <EmptyCell {...{value, ...props}}/>
            :
            <LegalCell {...{ value, ...props }} />
        }
    </AspectRatio>
};