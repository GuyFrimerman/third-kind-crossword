import { Box } from "@chakra-ui/react";
import { Camera, Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import Cube from "./Cube";
import { Cell } from "./data";
import { useRawBoard } from "./reducers/board";
import { useView } from "./reducers/view";


export default function Display() {
    const rawBoard = useRawBoard();
    const { layer, plane } = useView();
    const ref = useRef<Camera>();

    return (
        <Box flexShrink="1" w="30%" style={{aspectRatio: 1}}>
            <Canvas camera={{ position: [17,15,18], fov: 30}}>
                <ambientLight/>
                <pointLight position={[10, 10, 10]} />
                {rawBoard.map((value: Cell, index: number) => <Cube key={index} value={value} index={index} layer={layer} plane={plane} />)}
            </Canvas>
        </Box>
    )

}