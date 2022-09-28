import { Flex, FormLabel, HStack, SimpleGrid, StackDivider, Switch, VStack } from "@chakra-ui/react"
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
    const [onlyVisible, setVisible] = useState(false);
    const { layer, plane } = useView();

    const isRelevant = (index: number) => Math.floor((index - 1) / plane) % BOARD_SIZE === layer - 1;

    return <VStack
        bottom="inherit"
        align="center"
        maxH={["50vh", "90vh"]}
        divider={<StackDivider />}
    >
        <Flex w="100%" dir="rtl" justify="space-between">
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
            <ResetBoard />
        </Flex>
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
        </SimpleGrid>
    </VStack>;
}
