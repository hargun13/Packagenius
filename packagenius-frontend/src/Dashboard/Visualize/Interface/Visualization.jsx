import React from 'react'
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props) {
  // const { scene } = useGLTF('/model.glb');
  const { scene } = useGLTF("https://storage.googleapis.com/vois-34fe5.appspot.com/yt5ypdAziiTPcxvY3nNRpgMdYeE3/73b28004-271f-40b5-b91d-3e2a6efcdc04/7adde9ea-7a7e-4205-9f43-28029ff1fae0.glb");
  return <primitive object={scene} {...props} />
}
//"https://storage.googleapis.com/vois-34fe5.appspot.com/yt5ypdAziiTPcxvY3nNRpgMdYeE3/73b28004-271f-40b5-b91d-3e2a6efcdc04/7adde9ea-7a7e-4205-9f43-28029ff1fae0.glb"
//Access-Control-Allow-Origin

const Visualization = () => {

  return (
    <Canvas dpr={[1,2]} shadows camera={{ fov: 40 }} style={{width:"100%", height:"100%", touchAction:"none"}}>
      <color attach="background" args={["#101010"]} />
      <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
        <Stage environment={"sunset"}>
          <Model scale={0.01}  />
        </Stage>
      </PresentationControls>
    </Canvas>
  )
}

export default Visualization