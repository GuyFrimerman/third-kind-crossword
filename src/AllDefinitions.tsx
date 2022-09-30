import { Flex, FormLabel, HStack, Switch } from "@chakra-ui/react"
import { useState } from "react";
import { Axis, BOARD_SIZE } from "./data"
import Definitions from "./Definitions";
import { useView } from "./reducers/view";

const axes = [
    {
        header: "אופקי",
        axis: Axis.X
    },
    {
        header: "אנכי",
        axis: Axis.Y
    },
    {
        header: "כלפי מטה",
        axis: Axis.Z
    }
]

export default function AllDefinitions() {
    const [onlyVisible, setVisible] = useState(false);
    const { layer, plane } = useView();

    const isRelevant = (index: number) => Math.floor((index - 1) / plane) % BOARD_SIZE === layer - 1;

    return <Flex
        flex="3 0" 
        minH="10ch"
        ms={["initial", "10"]}
        minW={["initial", "30ch"]}
        justify="stretch"
        direction="column"
        align="stretch"
         >
            <HStack ms="auto">
                <FormLabel
                    as="h2">
                    כל ההגדרות
                </FormLabel>
                <Switch
                    onChange={() => setVisible(!onlyVisible)}
                    isChecked={onlyVisible} />
            </HStack>
            <Flex
                textAlign="right"
                overflowY="auto"
                direction="column"
                align="start"
                justify="start"
            >
                {
                    axes
                        .filter(({ axis }) => onlyVisible || axis !== plane as number)
                        .map(({ axis, header }) => (
                            <Definitions
                                key={axis}
                                axis={axis}
                                header={header}
                                plane={plane}
                                isRelevant={(x => onlyVisible || isRelevant(x))}
                            />
                        )
                        )
                }
            </Flex>
    </Flex>;
}
