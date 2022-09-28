import { Edges } from '@react-three/drei';
import {ThreeElements} from '@react-three/fiber'
import { Axis, IndexedCell } from './data';
import { View } from './reducers/view';

const getPositionFromIndex = (index: number) => {
    const x = Math.floor(index / Axis.X) % 7
    const y = Math.floor(index / Axis.Y) % 7
    const z = Math.floor(index / Axis.Z) % 7
    return [7 - x, 7 - z, y]
}

type CubeProps = IndexedCell & View;

export default function Cube({index, value, plane, layer} : CubeProps) {
    const isRelevant = Math.floor(index / plane) % 7 === (layer - 1);
    return (
        <mesh
            position={getPositionFromIndex(index)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={value === null ? 0 : (isRelevant ? 0xffffff : 0x909090)}
                opacity={isRelevant ? 0.85 : 0.15}
                transparent
                />
            {isRelevant &&
            <Edges
                color="black"
            />
            }
        </mesh>
    );
}