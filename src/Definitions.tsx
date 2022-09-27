import React from "react";
import { ChevronLeftIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Heading, Spinner, Text } from "@chakra-ui/react";
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

export default function Definitions({ header, name, onlyVisible, indices, plane }: DefinitionsProps) : JSX.Element {
    const { data, isLoading } = useGetDefinitionsQuery(name);
    const [horizontal, vertical] = Plane[plane];
    let icon: JSX.Element | undefined = undefined;

    switch (name) {
        case horizontal:
            icon = <ChevronLeftIcon />
            break;

        case vertical:
            icon = <ChevronDownIcon />
            break;
    }

    return <Container
        textAlign='right'
        dir="rtl"
        p="5"
        style={{columnCount: "2"}}
        >
    
        <Heading fontSize="2xl">
            {header} {icon}
        </Heading>
        {isLoading ?
            <Spinner /> :
            data?.filter(
                ({ start }) => onlyVisible || (indices.includes(start - 1) && plane !== Axis[name] as number)
            ).map((v: Definition) => <SingleDefinition {...v} />)
        }
    </Container>;
}