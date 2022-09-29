import { Flex, FormLabel, Select, Spacer, Box } from "@chakra-ui/react";
import { AXES, Axis, BOARD_SIZE, Plane } from "./data";
import Display from "./Display";
import { useAppDispatch } from "./reducers";
import { setDirection, useCursor } from "./reducers/cursor";
import { setLayer, setPlane, useView } from "./reducers/view";

export default function ChooseBoard(): JSX.Element {
    const { layer, plane } = useView();
    const dispatch = useAppDispatch();
    const { direction } = useCursor();

    const changePlane = (newPlane: string) => {
        dispatch(setPlane(newPlane));
        if (newPlane === Plane[direction]) {
            const newDirection = AXES.find(x => x !== Number(newPlane)) as Axis;
            dispatch(setDirection(newDirection))
        }
    }

    return (
        <Flex
            direction="row"
            dir="rtl"
            justify="stretch"
            flex="0 0"
            w={["80vmin", "65vmin"]}
        >
            <Box
            w={["20vmin", "10em"]}
            h={["20vmin", "10em"]}
            >
                <Display {...{ layer, plane }} />
            </Box>
            <Flex
                direction="column"
                my="2"
                dir="rtl"
                textAlign="left"
                flex="1"
                justify="stretch"
                h="min-content"
            >
                <Flex direction="row" flex="1">
                    <FormLabel fontSize="sm">מישור</FormLabel>
                    <Spacer />
                    <Select
                        value={plane}
                        id="plane"
                        dir="rtl"
                        size="sm"
                        textAlign="left"
                        onChange={e => changePlane(e.target.value)}
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
                        onChange={(v => dispatch(setLayer(Number(v.target.value))))}
                    >
                        {Array.from(Array(BOARD_SIZE)).map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
                    </Select>
                </Flex>
            </Flex>
        </Flex>
    );
}
