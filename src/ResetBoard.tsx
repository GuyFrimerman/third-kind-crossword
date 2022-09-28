import { RepeatIcon } from "@chakra-ui/icons"
import { useDisclosure, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import { useRef } from "react"
import { useAppDispatch } from "./reducers"
import { resetBoard } from "./reducers/board"

  
export default function ResetBoard() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<any>()
    const dispatch = useAppDispatch();
    
    const onReset = () => {
        dispatch(resetBoard());
        onClose();
    };

    return (
      <>
        <Button onClick={onOpen}>
                <RepeatIcon /> התחל מחדש 
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent dir="rtl">
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                התחל מחדש
              </AlertDialogHeader>
  
              <AlertDialogBody>
              האם אתה בטוח שברצונך להתחיל מחדש? פעולה זו תנקה את כלל התשבצים
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    ביטול
                </Button>
                <Button colorScheme="red" onClick={() => onReset()} mx={3}>
                    התחל מחדש
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }