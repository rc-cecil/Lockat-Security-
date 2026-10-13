import {useRef,useEffect} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {OrbitControls,ContactShadows,RoundedBox} from '@react-three/drei';
import * as THREE from 'three';
function Box({position=[0,0,0],size=[1,1,1],color='#e3e9ea',metalness=0,roughness=.65,...props}){return <mesh position={position} castShadow receiveShadow {...props}><boxGeometry args={size}/><meshStandardMaterial color={color} metalness={metalness} roughness={roughness}/></mesh>}
function Device({position,onSelect,children}){return <group position={position} onClick={e=>{e.stopPropagation();onSelect();}}>{children}</group>}
function Property({demo,reduced,onSelect}){const gate=useRef(),head=useRef(),fence=useRef();useFrame((state,dt)=>{if(gate.current)gate.current.position.x=reduced?(demo.gate?2.4:0):THREE.MathUtils.damp(gate.current.position.x,demo.gate?2.4:0,4,dt);if(head.current)head.current.rotation.y=reduced?0:THREE.MathUtils.damp(head.current.rotation.y,demo.camera?Math.sin(state.clock.elapsedTime*.55)*.45:0,3,dt);if(fence.current)fence.current.children.forEach(m=>{m.material.emissiveIntensity=demo.fence?(reduced?.35:.35+Math.sin(state.clock.elapsedTime*2)*.15):0;});});
return <group position={[0,-.35,0]}>
 <RoundedBox args={[10,.3,8]} radius={.18} position={[0,-.15,0]} receiveShadow><meshStandardMaterial color="#d5e0e6"/></RoundedBox>
 <Box position={[0,.02,1.1]} size={[8.8,.08,4.8]} color="#e7ecef"/>
 <Box position={[-1.2,1.05,-1.4]} size={[4.6,2.1,3.2]} color="#eeeae4"/>
 <Box position={[1.35,1.65,-1.7]} size={[3,3.3,3]} color="#f8f7f2"/>
 <Box position={[-1.3,2.15,-1.4]} size={[5,.18,3.6]} color="#b7c3cb"/>
 <Box position={[1.35,3.35,-1.7]} size={[3.3,.16,3.35]} color="#b7c3cb"/>
 <Box position={[-1.2,1.05,.22]} size={[3.6,1.55,.07]} color="#183b4d" metalness={.55} roughness={.16}/>
 {[-2.4,-1.2,0].map(x=><Box key={x} position={[x,1.05,.28]} size={[.045,1.6,.08]} color="#7f949b"/>)}
 <Box position={[1.4,2.3,-.17]} size={[2.35,1.4,.06]} color="#315666" metalness={.45} roughness={.2}/>
 <Box position={[1.4,.82,-.12]} size={[1.2,1.65,.12]} color="#b38c63"/>
 <Box position={[1.8,.9,-.035]} size={[.035,.3,.04]} color="#334b58" metalness={.8}/>
 <Box position={[1.4,.08,1.4]} size={[1.8,.1,2.8]} color="#bdcbd0"/>
 {[-4.4,4.4].map(x=><Box key={x} position={[x,.62,0]} size={[.18,1.25,7]} color="#b4c4ce"/>)}
 <Box position={[0,.62,-3.5]} size={[9,1.25,.18]} color="#b4c4ce"/>
 <Box position={[-3.2,.62,3.2]} size={[2.4,1.25,.22]} color="#aabcc9"/><Box position={[3.2,.62,3.2]} size={[2.4,1.25,.22]} color="#aabcc9"/>
 {[-2,2].map(x=><Box key={x} position={[x,1.05,3.2]} size={[.4,2.1,.48]} color="#e2e7e8"/>)}
 <Device position={[0,0,3.2]} onSelect={()=>onSelect('gate')}><group ref={gate}>{Array.from({length:9},(_,i)=><Box key={i} position={[0,.18+i*.18,0]} size={[3.65,.12,.1]} color="#243e51" metalness={.55}/>)}{[-1.7,1.7].map(x=><Box key={x} position={[x,.9,0]} size={[.08,1.65,.16]} color="#263b4b"/>)}</group></Device>
 <group ref={fence}>{[-1.5,-.5,.5,1.5,2.5].flatMap((z,i)=>[-4.4,4.4].map(x=><mesh key={`${x}-${z}`} position={[x,1.5,z]}><boxGeometry args={[.035,.55,.035]}/><meshStandardMaterial color="#547786" emissive="#1689ff"/></mesh>))}{[1.45,1.6,1.75].flatMap(y=>[-4.4,4.4].map(x=><mesh key={`${x}-${y}`} position={[x,y,-.05]}><boxGeometry args={[.012,.012,6.4]}/><meshStandardMaterial color={demo.fence?'#1689ff':'#638291'} emissive="#1689ff"/></mesh>))}</group>
 <Device position={[-2.1,2.2,.4]} onSelect={()=>onSelect('camera')}><Box size={[.12,.12,.45]} color="#879caa"/><group ref={head} position={[0,0,.28]}><RoundedBox args={[.55,.35,.75]} radius={.06}><meshStandardMaterial color="#f0f3f4" metalness={.25}/></RoundedBox><mesh rotation={[Math.PI/2,0,0]} position={[0,0,.39]}><cylinderGeometry args={[.12,.12,.08,24]}/><meshStandardMaterial color="#102b3d" metalness={.7} roughness={.1}/></mesh>{demo.camera&&<mesh rotation={[-Math.PI/2,0,0]} position={[0,-.5,1.6]}><coneGeometry args={[1.2,2.5,32,1,true]}/><meshBasicMaterial color="#2b9cf7" transparent opacity={.13} side={THREE.DoubleSide} depthWrite={false}/></mesh>}</group></Device>
 <Device position={[2,1.28,3.47]} onSelect={()=>onSelect('access')}><RoundedBox args={[.22,.38,.08]} radius={.03}><meshStandardMaterial color="#173040"/></RoundedBox><Box position={[0,.05,.048]} size={[.14,.1,.01]} color={demo.access==='denied'?'#ed825c':demo.access==='accepted'?'#1689ff':'#799ba9'}/></Device>
 <Device position={[-2,1.25,3.47]} onSelect={()=>onSelect('intercom')}><RoundedBox args={[.25,.45,.08]} radius={.025}><meshStandardMaterial color="#758996" metalness={.7}/></RoundedBox><Box position={[0,.06,.049]} size={[.16,.15,.01]} color={demo.intercom?'#2c9dff':'#153448'}/></Device>
 <Device position={[2.7,2.6,-.08]} onSelect={()=>onSelect('alarm')}><mesh><sphereGeometry args={[.12,20,12]}/><meshStandardMaterial color={demo.alarm?'#e78058':'#d8e3e5'} emissive={demo.alarm?'#d36336':'#000000'} emissiveIntensity={.5}/></mesh></Device>
 {[-3.6,3.5].map(x=><group key={x} position={[x,0,.8]}><Box position={[0,.18,0]} size={[.65,.35,.65]} color="#a7bab9"/><mesh position={[0,.7,0]} castShadow><sphereGeometry args={[.48,16,12]}/><meshStandardMaterial color="#667e66" roughness={1}/></mesh></group>)}
 </group>}
function SceneControls({reset,reduced}){const ref=useRef();const{camera,invalidate}=useThree();useEffect(()=>{camera.position.set(10,8,12);ref.current?.target.set(0,.6,0);ref.current?.update();invalidate();},[reset]);return <OrbitControls ref={ref} enablePan={false} enableZoom={false} minPolarAngle={Math.PI/5} maxPolarAngle={Math.PI/2.35} minAzimuthAngle={-.75} maxAzimuthAngle={1.1} enableDamping={!reduced} dampingFactor={.12}/>}
export default function SecurityScene({demo,reduced,active,onSelect,reset}){return <Canvas shadows dpr={[1,1.5]} camera={{position:[10,8,12],fov:39}} frameloop={active?'always':'never'} gl={{antialias:true,alpha:true,powerPreference:'low-power'}} onCreated={({gl})=>{gl.domElement.setAttribute('aria-label','Interactive illustrative 3D property. Use the adjacent controls for accessible operation.');gl.domElement.addEventListener('webglcontextlost',()=>window.dispatchEvent(new Event('lockat-webgl-failed')));}}><ambientLight intensity={1.5}/><directionalLight position={[5,9,4]} intensity={3} castShadow shadow-mapSize={[1024,1024]}/><directionalLight position={[-5,3,-2]} intensity={1.3} color="#afd5ff"/><Property demo={demo} reduced={reduced} onSelect={onSelect}/><ContactShadows position={[0,-.52,0]} opacity={.28} scale={18} blur={2.8} far={8} resolution={256} frames={1}/><SceneControls reset={reset} reduced={reduced}/></Canvas>}
