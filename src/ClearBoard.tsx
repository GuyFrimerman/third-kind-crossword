import { Button } from "@chakra-ui/react";
import { useAppDispatch, useBoard } from "./reducers";
import { clearBoard } from "./reducers/board";
import { useView } from "./reducers/view";

export default function ClearBoard() {
    const { layer, plane } = useView();
    const dispatch = useAppDispatch();
    const isEmpty = useBoard().every(({ value }) => value === null || value === '')
    return <Button
        isDisabled={isEmpty}
        onClick={() => dispatch(clearBoard({ layer, plane }))}
        >
        נקה לוח נוכחי
    </Button>
}