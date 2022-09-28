import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import { Cell } from "./data";
import { useRawBoard } from "./reducers/board";

export default function Display({children, layer, plane}: any) {
    const rawBoard = useRawBoard();

    const isRelevant = (index: number) => Math.floor(index / plane) % 7 === (layer - 1);

    return (
            <Canvas camera={{ position: [17,15,18], fov: 30}}>
                {children}
                <ambientLight/>
                <pointLight position={[10, 10, 10]} />
                {rawBoard.map((value: Cell, index: number) => <Cube key={index} value={value} index={index} isRelevant={isRelevant(index)}/>)}
            </Canvas>
    )

}