import { Flex, FormLabel, VStack, Select, Spacer, Divider, Box } from "@chakra-ui/react";
import { BOARD_SIZE, Plane } from "./data";
import { useAppDispatch } from "./reducers";
import { setLayer, setPlane, useView } from "./reducers/view";

export default function ChooseBoard(): JSX.Element {
    const { layer, plane } = useView();
    const dispatch = useAppDispatch();
    return <>
        <Divider />
        <Flex direction="row" dir="rtl" justify="start">
            <Flex
                direction="column"
                mx="4"
                my="2"
                dir="rtl"
                textAlign="left"
                flex="0.6"
            >
                <Flex direction="row">
                    <FormLabel fontSize="sm">מישור</FormLabel>
                    <Spacer />
                    <Select
                        value={plane}
                        id="plane"
                        dir="rtl"
                        size="sm"
                        textAlign="left"
                        onChange={(v => dispatch(setPlane(v.target.value)))}
                    >
                        <option value={Plane.YZ}>אופקי</option>
                        <option value={Plane.XZ}>אנכי</option>
                        <option value={Plane.XY}>כלפי מטה</option>
                    </Select>
                </Flex>
                <Flex direction="row">
                    <FormLabel fontSize="sm">שכבה</FormLabel>
                    <Spacer />
                    <Select
                        value={layer}
                        id="plane"
                        dir="rtl"
                        size="sm"
                        textAlign="left"
                        onChange={(v => dispatch(setLayer(v.target.value)))}
                    >
                        {Array.from(Array(BOARD_SIZE)).map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                    </Select>
                </Flex>
            </Flex>
            <Box bgColor="blue" flex="0.4"/>
        </Flex>
        <Divider />
    </>;
}
