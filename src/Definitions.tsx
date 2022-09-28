import React from "react";
import { ChevronLeftIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Container, Heading, Spinner, Text } from "@chakra-ui/react";
import { Axis, Plane } from "./data"
import { Definition, useGetDefinitionsQuery } from "./reducers/definitions";
import { useAppDispatch } from "./reducers";
import { setCursor } from "./reducers/cursor";

type DefinitionsProps = {
    header: string,
    axis: Axis,
    plane: Plane,
    isRelevant: (_: number) => boolean,
};

type SingleDefinitionProps = Definition & {
    onClick: (_: number) => any
};

const SingleDefinition = ({ definition, start, onClick }: SingleDefinitionProps ) => (
    <Text
        fontSize="sm"
        onClick={() => onClick(start)}
    >
        {definition}
    </Text>)

export default function Definitions({ header, axis, plane, isRelevant }: DefinitionsProps): JSX.Element {
    const name = Axis[axis];
    const { data, isLoading } = useGetDefinitionsQuery(name);
    const [horizontal, vertical] = Plane[plane];
    const dispatch = useAppDispatch();
    let icon: JSX.Element | undefined = undefined;
    const onClick = (index: number) => dispatch(setCursor({direction: axis, index}))

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
                    ({ start }) => (isRelevant(start))
                ).map((v: Definition) => <SingleDefinition key={v.start} onClick={onClick} {...v} />)
            }
        </Container>
    </Container>;
}