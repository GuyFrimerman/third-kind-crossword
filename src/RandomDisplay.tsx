import { useInterval, Box } from "@chakra-ui/react";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { Plane, BOARD_SIZE } from "./data";
import Display from "./Display";

const getRandomHighlight = (current: { layer: number, plane: Plane } | undefined) => {
    const layers = Array.from(Array(BOARD_SIZE))
        .map((_, i) => (i + 1))
        .filter(x => x !== current?.layer);
    const layer = layers[Math.floor(layers.length * Math.random())];
    const planes = [Plane.XY, Plane.YZ, Plane.XZ];
    const plane = planes[Math.floor(planes.length * Math.random())];
    return { layer, plane };
}

export default function RandomDisplay() {
    const [{ layer, plane }, setHighlighted] = useState(getRandomHighlight(undefined));
    useInterval(() => setHighlighted(getRandomHighlight({ layer, plane })), Math.random() * 2500 + 500);

    return <Box style={{ margin: "auto", aspectRatio: "1", maxHeight: "80%", maxWidth: "80%" }}>
        <Display layer={layer} plane={plane}>
            <OrbitControls
                enableDamping
                enableRotate
                enablePan={false}
                enableZoom={false}
                autoRotate
                autoRotateSpeed={5}
                target={[3.5, 3.5, 3.5]}
            />
        </Display>
    </Box>
}
