import { FormLabel, HStack, SimpleGrid, StackDivider, Switch, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { Plane } from "./data"
import Definitions from "./Definitions";

type AllDefinitionsProps = {
    indices: number[],
    plane: Plane,
}

export default function AllDefinitions({ indices, plane }: AllDefinitionsProps): JSX.Element {
    const [onlyVisible, setVisible] = useState(false);
    return <VStack
        bottom="inherit"
        align="center"
        maxH={["50vh", "90vh"]}
        divider={<StackDivider />}
    >
        <HStack ml="auto" mr="10">
            <FormLabel
                as="h2">
                כל ההגדרות
            </FormLabel>
            <Switch
                onChange={() => setVisible(!onlyVisible)}
                isChecked={onlyVisible} />
            <span id="topMark" />
        </HStack>
        <SimpleGrid
            textAlign="right"
            columns={1}
            h={(document.getElementById('bigContainer')?.getBoundingClientRect().bottom || 0) -
                (document.getElementById('topMark')?.getBoundingClientRect().bottom || 0)}
            p="3"
            overflowY="auto"
            overflowX="hidden"
            justifyContent="start"
        >
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
        </SimpleGrid>
    </VStack>;
}
