import { Flex, FormLabel, HStack, Switch } from "@chakra-ui/react"
import { useState } from "react";
import { Axis, BOARD_SIZE } from "./data"
import Definitions from "./Definitions";
import { useView } from "./reducers/view";
import ResetBoard from "./ResetBoard";

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
    const [onlyVisible, setVisible] = useState(true);
    const { layer, plane } = useView();

    const isRelevant = (index: number) => Math.floor((index - 1) / plane) % BOARD_SIZE === layer - 1;

    return <Flex
        // bgColor="red"
        flex="1 0"
        minH="5em"
        direction="column"
        align="stretch"
        minW={["initial", "30ch"]}
        ms={["initial", "10"]}
    >
        <Flex
        dir="rtl"
        direction="row-reverse"
        wrap="wrap"
        justify="space-between"
        >
            <ResetBoard />
            <HStack mx="3">
                <FormLabel
                    as="h2">
                    כל ההגדרות
                </FormLabel>
                <Switch
                    onChange={() => setVisible(!onlyVisible)}
                    isChecked={onlyVisible} />
            </HStack>
        </Flex>
        <Flex
            textAlign="right"
            overflowY="auto"
            direction="column"
            align="start"
            justify="start"
            w="100%"
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
