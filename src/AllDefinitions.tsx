import { Flex, FormControl, FormLabel, StackDivider, Switch, VStack } from "@chakra-ui/react"
import React, { useState } from "react";
import { Plane } from "./data"
import Definitions from "./Definitions";

type AllDefinitionsProps = {
    indices: number[],
    plane: Plane,
}

export default function AllDefinitions({ indices, plane }: AllDefinitionsProps): JSX.Element {
    const [onlyVisible, setVisible] = useState(false);
    return <VStack
        textAlign="right"
        align="end"
        margin="3"
        flex="0.5"
        overflowY="auto"
        divider={<StackDivider />}
    >
        <FormControl
            as={Flex}
            dir="rtl"
        >
            <FormLabel
                as="h2">
                כל ההגדרות
            </FormLabel>
            <Switch
                onChange={() => setVisible(!onlyVisible)}
                isChecked={onlyVisible} />
        </FormControl>
        <Definitions
            header="אופקי"
            name="X"
            onlyVisible={onlyVisible}
            indices={indices}
            plane={plane} />
        <Definitions
            header="אנכי"
            name="Y"
            onlyVisible={onlyVisible}
            indices={indices}
            plane={plane} />
        <Definitions
            header="כלפי מטה"
            name="Z"
            onlyVisible={onlyVisible}
            indices={indices}
            plane={plane} />
    </VStack>;
}
