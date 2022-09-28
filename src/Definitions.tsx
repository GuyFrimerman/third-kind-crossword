import React from "react";
import { ChevronLeftIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { Plane } from "./data"
import { Definition, useGetDefinitionsQuery } from "./reducers/definitions";

type DefinitionsProps = {
    header: string,
    name: string
    plane: Plane,
    isRelevant: (_: number) => boolean
};

const SingleDefinition = ({ definition, start }: Definition) => (
    <Text
        fontSize="sm"
        onClick={() => document.getElementById(`boardCell${start - 1}`)?.focus()}
    >
        {definition}
    </Text>)

export default function Definitions({ header, name, plane, isRelevant }: DefinitionsProps): JSX.Element {
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
    >

        <Heading fontSize="2xl">
            {header} {icon}
        </Heading>
        <Container
            style={{ columnCount: "2" }}
        >
            {isLoading ?
                <Spinner /> :
                data?.filter(
                    ({ start }) => (isRelevant(start - 1))
                ).map((v: Definition) => <SingleDefinition {...v} />)
            }
        </Container>
    </Container>;
}