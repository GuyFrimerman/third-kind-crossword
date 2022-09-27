import { ChevronLeftIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { Axis, Plane } from "./data"
import { Definition, useGetDefinitionsQuery } from "./reducers/definitions";

type DefinitionsProps = {
    header: string,
    name: 'X' | 'Y' | 'Z',
    onlyVisible: boolean
    indices: number[]
    plane: Plane
};
const SingleDefinition = ({ definition, start }: Definition) => (
    <Text
        fontSize="sm"
        onClick={() => document.getElementById(`boardCell${start - 1}`)?.focus()}
    >
        {definition}
    </Text>)

export default ({ header, name, onlyVisible, indices, plane }: DefinitionsProps) => {
    const { data, error, isLoading } = useGetDefinitionsQuery(name);
    const [horizontal, vertical] = Plane[plane];
    let icon = undefined;

    switch (name) {
        case horizontal:
            icon = <ChevronLeftIcon />
            break;

        case vertical:
            icon = <ChevronDownIcon />
            break;
    }

    return <Box
        textAlign='right'
        dir="rtl"
        m="5"
    >
        <Heading fontSize="2xl">
            {header} {icon}
        </Heading>
        <Box
            style={{
                columnCount: 2
            }}>
            {isLoading ?
                <Spinner /> :
                data?.filter(
                    ({ start }) => onlyVisible || indices.includes(start - 1) && plane != Axis[name] as number
            ).map((v: Definition) => <SingleDefinition {...v} />)
            }
        </Box>
    </Box>;
}