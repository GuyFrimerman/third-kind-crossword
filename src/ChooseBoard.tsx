import { Container, FormControl, Flex, FormLabel, RadioGroup, VStack, Radio, StackDivider, SliderMark, SliderTrack, SliderThumb, Slider } from "@chakra-ui/react";
import { BOARD_SIZE, Plane } from "./data";
import { useAppDispatch } from "./reducers";
import { PlaneString, setLayer, setPlane, useView } from "./reducers/view";

export default () => {
    const { layer, plane } = useView();
    const dispatch = useAppDispatch();
    return <Container
        p="4"
        boxShadow="lg">

        <FormControl>
            <Flex
                minW="100%"
                flexDir="row-reverse">
                <FormLabel fontSize="2xl">מישור</FormLabel>
                <RadioGroup
                    value={plane}
                    id="plane"
                    flex={1}
                    onChange={(v => dispatch(setPlane(v)))}
                >
                    <VStack
                        flex="1"
                        flexDir="row-reverse"
                        justify="space-evenly"
                        align="end"
                    >
                        <Radio value={Plane.YZ}>אופקי</Radio>
                        <Radio value={Plane.XZ}>אנכי</Radio>
                        <Radio value={Plane.XY}>כלפי מטה</Radio>
                    </VStack>
                </RadioGroup>
            </Flex>
            <StackDivider />
            <Flex
                minW="100%"
                flexDir="row-reverse">
                <FormLabel fontSize="2xl" pl="7">שכבה</FormLabel>
                <Slider
                    id="layer"
                    min={1}
                    pt="7"
                    max={BOARD_SIZE}
                    step={1}
                    isReversed={true}
                    value={layer}
                    onChange={(v: number) => dispatch(setLayer(v))}>
                    <SliderMark
                        value={layer}
                        textAlign="center"
                        mt="-5"
                        ml="-3.5"
                        rounded="full"
                        width="6"
                        bgColor='black'
                        color='white'
                        zIndex={2}
                    >{layer}</SliderMark>
                    {Array.from(Array(BOARD_SIZE)).map((_, index) => <SliderMark
                        value={index + 1}
                        key={index}
                        textAlign="center"
                        mt="4"
                        ml="-1.5"
                    >{index + 1}</SliderMark>)}
                    <SliderTrack />
                    <SliderThumb/>
                </Slider>
            </Flex>
        </FormControl>
    </Container>;
}
