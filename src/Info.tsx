import { useState } from "react";
import { QuestionIcon } from "@chakra-ui/icons"
import { Box, Button, Container, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useInterval } from "@chakra-ui/react"
import Display from "./Display";
import { OrbitControls } from "@react-three/drei";
import { BOARD_SIZE, Plane } from "./data";

const getRandomHighlight = (current: {layer: number, plane: Plane} | undefined) => {
    const layers = Array.from(Array(BOARD_SIZE))
        .map((_, i) => (i + 1))
        .filter(x => x !== current?.layer);
    const layer = layers[Math.floor(layers.length * Math.random())];
    const planes = [Plane.XY, Plane.YZ, Plane.XZ];
    const plane = planes[Math.floor(planes.length * Math.random())];
    return {layer, plane};
}

export default function Info() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [{layer, plane}, setHighlighted] = useState(getRandomHighlight(undefined));
    useInterval(() => setHighlighted(getRandomHighlight({layer, plane})), Math.random() * 3000 + 1000);
    return (
        <>
            <QuestionIcon onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent m="5" dir="rtl">
                    <ModalHeader>עזרה</ModalHeader>
                    <ModalBody>
                        <Box maxH='70vh' maxW='70vw'>
                            <Display layer={layer} plane={plane}>
                                <OrbitControls
                                    enableDamping
                                    enableRotate
                                    enablePan={false}
                                    enableZoom={false}
                                    autoRotate
                                    target={[3.5,3.5,3.5]}
                                />
                            </Display>
                        </Box>
                        <Container>
                            התשבץ התלת ממדי בנוי לפי כל כללי "תשבץ אמיתי". כדי להקל על פתרונו ממוספרות כל המשבצות לפי סדר, מימין לשמאל, שורה אחר שורה, וקומה אחר קומה. לדוגמה 1 אופקי - משבצות 1 - 7, 1 אנכי - משבצות 1, 8, 15, 22, 1 כלפי מטה – משבצות 197,148,99,50,1, 295,246. פתירת התשבץ אינה כה קשה כפי שהדבר נראה ממבט ראשון ואנו משוכנעים שפתירתו תהווה אתגר יוצא דופן לכל חובב תשבצים מושבע.
                            <br></br>
                            התשבץ התלת-מימדי נוצר ב1985 על ידי דב פרימרמן
                        </Container>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            חזרה
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}