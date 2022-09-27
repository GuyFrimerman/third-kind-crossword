import { QuestionIcon } from "@chakra-ui/icons"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

export default () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <QuestionIcon onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>עזרה</ModalHeader>
                    <ModalBody>
                        סבא עשה את זה
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}