import { QuestionIcon } from "@chakra-ui/icons"
import { Button, Container, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import RandomDisplay from "./RandomDisplay"

export default function Info() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <QuestionIcon onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent m="5" dir="rtl">
                    <ModalHeader>עזרה</ModalHeader>
                    <ModalBody>
                        <RandomDisplay />
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