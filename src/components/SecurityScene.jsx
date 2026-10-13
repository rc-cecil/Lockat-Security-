import {useRef,useEffect,useMemo} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {OrbitControls,ContactShadows,RoundedBox,Html} from '@react-three/drei';
import * as THREE from 'three';

const views={
 overview:{position:[10,7.5,12],target:[0,.8,0]},
 camera:{position:[-.15,3.55,4.9],target:[-2.1,1.85,.8]},
 coverage:{position:[1.1,4.5,7.4],target:[-1.45,1.05,1.8]},
 fence:{position:[8.4,3.8,5.8],target:[4.4,1.2,.65]},
 gate:{position:[5.5,3.2,10],target:[.4,.7,3.2]},
 access:{position:[3.25,1.65,5.7],target:[2,.94,3.48]},
 intercom:{position:[-.85,1.65,5.7],target:[-2,.9,3.48]},
 alarm:{position:[4.5,3.1,3.6],target:[2.7,2.25,-.08]}
};
function Box({position=[0,0,0],size=[1,1,1],color='#e3e9ea',metalness=0,roughness=.65,...props}){return <mesh position={position} castShadow receiveShadow {...props}><boxGeometry args={size}/><meshStandardMaterial color={color} metalness={metalness} roughness={roughness}/></mesh>}
function Cylinder({position=[0,0,0],radius=.03,height=.3,color='#364954',rotation=[0,0,0],...props}){return <mesh position={position} rotation={rotation} castShadow {...props}><cylinderGeometry args={[radius,radius,height,20]}/><meshStandardMaterial color={color} metalness={.55} roughness={.32}/></mesh>}
function Device({position,onSelect,children}){return <group position={position} onClick={e=>{e.stopPropagation();onSelect();}}>{children}</group>}
function Coverage(){
 const geometry=useMemo(()=>{const g=new THREE.BufferGeometry();const tip=[0,0,.4],corners=[[-1.7,-2.13,3.4],[1.7,-2.13,3.4],[1.7,-.55,3.4],[-1.7,-.55,3.4]];const vertices=[];for(let i=0;i<4;i++)vertices.push(...tip,...corners[i],...corners[(i+1)%4]);g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.computeVertexNormals();return g},[]);
 return <group><mesh geometry={geometry}><meshBasicMaterial color="#58b5fa" transparent opacity={.085} side={THREE.DoubleSide} depthWrite={false}/></mesh><lineSegments><edgesGeometry args={[geometry]}/><lineBasicMaterial color="#2b98e8" transparent opacity={.55}/></lineSegments><mesh position={[0,-2.13,2.7]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[3.4,1.6]}/><meshBasicMaterial color="#329bea" transparent opacity={.14} depthWrite={false}/></mesh></group>
}
function Property({demo,reduced,onSelect,focus}){
 const gate=useRef(),fence=useRef();
 useFrame((state,dt)=>{if(gate.current)gate.current.position.x=reduced?(demo.gate?3.2:0):THREE.MathUtils.damp(gate.current.position.x,demo.gate?3.2:0,3.5,dt);if(fence.current)fence.current.children.forEach(m=>{if(m.material)m.material.emissiveIntensity=demo.fence?.22:0})});
 return <group position={[0,-.35,0]}>
  <RoundedBox args={[10,.3,8]} radius={.15} position={[0,-.15,0]} receiveShadow><meshStandardMaterial color="#d5ddd9" roughness={.9}/></RoundedBox>
  <Box position={[0,.015,1.05]} size={[8.8,.04,4.65]} color="#d4d2cb" roughness={.94}/>
  {Array.from({length:10},(_,i)=><Box key={`pave-${i}`} position={[-4.15+i*.9,.04,1.05]} size={[.014,.012,4.65]} color="#aaa99f"/>)}
  {[-.75,.2,1.15,2.1,3.05].map(z=><Box key={z} position={[0,.04,z]} size={[8.8,.012,.014]} color="#aaa99f"/>)}
  <Box position={[-1.2,1.05,-1.4]} size={[4.6,2.1,3.2]} color="#e8e6df" roughness={.88}/>
  <Box position={[1.35,1.65,-1.7]} size={[3,3.3,3]} color="#f1f0e9" roughness={.86}/>
  <Box position={[-1.3,2.15,-1.4]} size={[5,.18,3.6]} color="#ebe9e2"/>
  <Box position={[1.35,3.35,-1.7]} size={[3.3,.16,3.35]} color="#e9e8e1"/>
  <Box position={[-1.3,2.05,.38]} size={[5,.1,.2]} color="#b6aca0"/>
  <Box position={[1.35,3.25,.03]} size={[3.3,.07,.14]} color="#a9aaa4"/>
  <Box position={[-1.2,1.05,.22]} size={[3.6,1.55,.07]} color="#294954" metalness={.65} roughness={.12}/>
  {[-2.9,-1.75,-.6,.5].map(x=><Box key={x} position={[x,1.05,.275]} size={[.035,1.6,.08]} color="#263a41" metalness={.7}/>)}
  <Box position={[-1.2,.3,.3]} size={[3.7,.09,.16]} color="#bac0bd"/>
  <Box position={[1.4,2.3,-.17]} size={[2.35,1.4,.06]} color="#355461" metalness={.65} roughness={.1}/>
  {[.65,1.4,2.15].map(x=><Box key={x} position={[x,2.3,-.12]} size={[.035,1.45,.07]} color="#273a42"/>)}
  <Box position={[1.4,.82,-.12]} size={[1.2,1.65,.12]} color="#a17e56" roughness={.72}/>
  {Array.from({length:7},(_,i)=><Box key={i} position={[.94+i*.15,.82,-.045]} size={[.01,1.6,.016]} color="#826644"/>)}
  <Box position={[1.8,.9,-.01]} size={[.035,.3,.04]} color="#334b58" metalness={.8}/>
  <Box position={[1.4,.08,1.4]} size={[1.8,.1,2.8]} color="#c4c2bb"/>
  {[-4.4,4.4].map(x=><group key={x}><Box position={[x,.62,0]} size={[.18,1.25,7]} color="#c1c4bd"/><Box position={[x,1.26,0]} size={[.28,.09,7.1]} color="#dadbd4"/></group>)}
  <Box position={[0,.62,-3.5]} size={[9,1.25,.18]} color="#c1c4bd"/>
  {[-3.2,3.2].map(x=><group key={x}><Box position={[x,.62,3.2]} size={[2.4,1.25,.22]} color="#c1c4bd"/><Box position={[x,1.26,3.2]} size={[2.45,.08,.3]} color="#dadbd4"/></group>)}
  {[-2,2].map(x=><group key={x}><Box position={[x,1.05,3.2]} size={[.4,2.1,.48]} color="#e7e7de"/><Box position={[x,2.12,3.2]} size={[.48,.08,.56]} color="#f3f1e9"/></group>)}
  <Device position={[0,0,3.2]} onSelect={()=>onSelect('gate')}>
   <Box position={[1.4,.055,0]} size={[6.8,.04,.05]} color="#53636c" metalness={.7}/>
   <group ref={gate}>{Array.from({length:11},(_,i)=><Box key={i} position={[0,.16+i*.15,0]} size={[3.65,.105,.12]} color="#26353c" metalness={.55} roughness={.35}/>)}{[-1.76,1.76].map(x=><Box key={x} position={[x,.9,0]} size={[.07,1.72,.17]} color="#25333a"/>)}{[-1.3,1.3].map(x=><Cylinder key={x} position={[x,.08,0]} radius={.075} height={.1} rotation={[Math.PI/2,0,0]}/>)}</group>
   <RoundedBox args={[.33,.4,.3]} radius={.045} position={[2.32,.2,-.14]}><meshStandardMaterial color="#33434b" metalness={.5}/></RoundedBox>
  </Device>
  <group ref={fence} onClick={e=>{e.stopPropagation();onSelect('fence')}}>{[-2.8,-1.4,0,1.4,2.8].flatMap(z=>[-4.4,4.4].map(x=><mesh key={`${x}-${z}`} position={[x,1.55,z]}><boxGeometry args={[.04,.65,.04]}/><meshStandardMaterial color="#303e42" emissive="#1689ff"/></mesh>))}{[1.4,1.57,1.74,1.9].flatMap(y=>[-4.4,4.4].map(x=><mesh key={`${x}-${y}`} position={[x,y,0]}><boxGeometry args={[.009,.009,6.6]}/><meshStandardMaterial color={demo.fence?'#328ec9':'#7d8a8a'} metalness={.8} roughness={.3} emissive="#1689ff"/></mesh>))}</group>
  {[-2.8,-1.4,0,1.4,2.8].flatMap(z=>[1.4,1.57,1.74,1.9].map(y=><Cylinder key={`${z}-${y}`} position={[4.39,y,z]} radius={.045} height={.06} rotation={[0,0,Math.PI/2]} color="#17282f"/>))}
  {demo.fence&&<Html position={[4.4,2.15,.4]} center><span className="scene-device-tag">Perimeter highlighted</span></Html>}
  <Device position={[-2.1,2.2,.4]} onSelect={()=>onSelect('camera')}>
   <Box size={[.18,.18,.06]} color="#babfc0" metalness={.7}/><Cylinder position={[0,-.08,.18]} radius={.035} height={.32} rotation={[Math.PI/2,0,0]} color="#bfc5c5"/>
   <group position={[0,0,.3]} rotation={[.15,0,0]}><RoundedBox args={[.36,.27,.62]} radius={.05}><meshStandardMaterial color="#e4e8e7" metalness={.25} roughness={.32}/></RoundedBox><Box position={[0,.15,.06]} size={[.4,.035,.68]} color="#f0f0e9"/><Cylinder position={[0,0,.32]} radius={.104} height={.035} rotation={[Math.PI/2,0,0]} color="#12202a"/><mesh position={[0,0,.342]}><circleGeometry args={[.065,32]}/><meshPhysicalMaterial color="#133f63" metalness={.8} roughness={.06} clearcoat={1}/></mesh>{Array.from({length:8},(_,i)=><mesh key={i} position={[Math.sin(i*Math.PI/4)*.08,Math.cos(i*Math.PI/4)*.08,.343]}><sphereGeometry args={[.009,8,8]}/><meshStandardMaterial color="#5b6770"/></mesh>)}</group>{demo.camera&&<group position={[0,0,.3]}><Coverage/></group>}
   {demo.camera&&<Html position={[0,.48,.4]} center><span className="scene-device-tag">Illustrative field of view</span></Html>}
  </Device>
  <Device position={[2,1.28,3.47]} onSelect={()=>onSelect('access')}>
   <RoundedBox args={[.24,.44,.09]} radius={.025}><meshStandardMaterial color="#1e2c34" metalness={.35} roughness={.3}/></RoundedBox>
   <Box position={[0,.1,.051]} size={[.17,.1,.012]} color={demo.access==='denied'?'#be422d':demo.access==='accepted'?'#1d9368':'#203d4c'}/>
   <Box position={[0,-.095,.052]} size={[.09,.09,.012]} color="#0b1821"/>
   {[-.065,0,.065].flatMap(x=>[-.012,.035].map(y=><Box key={`${x}-${y}`} position={[x,y,.052]} size={[.032,.022,.008]} color="#89979b"/>))}
   {demo.access!=='idle'&&<Html position={[0,.39,.1]} center><span className={`scene-device-tag ${demo.access==='denied'?'denied':'accepted'}`}>{demo.access==='accepted'?'Entry accepted':'Entry denied'}</span></Html>}
  </Device>
  <Device position={[-2,1.25,3.47]} onSelect={()=>onSelect('intercom')}>
   <RoundedBox args={[.25,.48,.09]} radius={.02}><meshStandardMaterial color="#a8b0b0" metalness={.8} roughness={.28}/></RoundedBox>
   <Cylinder position={[0,.145,.05]} radius={.043} height={.013} rotation={[Math.PI/2,0,0]} color="#142333"/>
   {[-.03,0,.03,.06].map(y=><Box key={y} position={[0,y,.05]} size={[.13,.008,.009]} color="#35444d"/>)}
   <Cylinder position={[0,-.13,.05]} radius={.034} height={.014} rotation={[Math.PI/2,0,0]} color={demo.intercom?'#42a4d9':'#627781'}/>
   {demo.intercom&&<Html position={[0,.39,.1]} center><span className="scene-device-tag">Visitor call connected</span></Html>}
  </Device>
  <Device position={[2.7,2.6,-.08]} onSelect={()=>onSelect('alarm')}>
   <RoundedBox args={[.23,.38,.1]} radius={.065}><meshStandardMaterial color="#e5e8e2" roughness={.4}/></RoundedBox>
   <Box position={[0,.095,.065]} size={[.17,.11,.04]} color={demo.alarm?'#ee733e':'#d89970'}/>
   {[-.08,-.045,-.01,.025].map(y=><Box key={y} position={[0,y,.057]} size={[.13,.009,.009]} color="#8b9999"/>)}
   {demo.alarm&&<Html position={[0,.43,.12]} center><span className="scene-device-tag denied">Demo intrusion alert</span></Html>}
  </Device>
  {[-3.55,3.55].map(x=><group key={x} position={[x,0,.6]}><Box position={[0,.17,0]} size={[.76,.32,1.15]} color="#a8aaa2"/><mesh position={[0,.38,0]}><boxGeometry args={[.67,.05,1.04]}/><meshStandardMaterial color="#4a4c38"/></mesh>{[-.34,0,.34].map(z=><mesh key={z} position={[0,.55,z]} castShadow><sphereGeometry args={[.31,12,10]}/><meshStandardMaterial color="#617750" roughness={1}/></mesh>)}</group>)}
 </group>
}
function SceneControls({focus,zoom,reset,reduced,coverage}){
 const controls=useRef(),transition=useRef(null);const{camera,invalidate,gl}=useThree();
 useEffect(()=>{const view=views[focus?.id==='camera'&&coverage?'coverage':focus?.id||'overview'];const target=new THREE.Vector3(...view.target);const position=new THREE.Vector3(...view.position);position.sub(target).multiplyScalar(zoom).add(target);transition.current={target,position};gl.domElement.dataset.view=focus?.id||'overview';if(reduced){camera.position.copy(position);controls.current?.target.copy(target);controls.current?.update();transition.current=null}invalidate()},[focus,zoom,reset,reduced,coverage,camera,invalidate,gl]);
 useFrame((_,dt)=>{if(!transition.current||!controls.current)return;const{position,target}=transition.current;const amount=1-Math.exp(-4.5*Math.min(dt,.05));camera.position.lerp(position,amount);controls.current.target.lerp(target,amount);controls.current.update();if(camera.position.distanceTo(position)<.008&&controls.current.target.distanceTo(target)<.008){camera.position.copy(position);controls.current.target.copy(target);controls.current.update();transition.current=null;gl.domElement.dataset.transition='settled'}else gl.domElement.dataset.transition='moving'});
 return <OrbitControls ref={controls} enablePan={false} enableZoom={false} minPolarAngle={.18} maxPolarAngle={Math.PI/2.05} minAzimuthAngle={-Math.PI*.9} maxAzimuthAngle={Math.PI*.9} enableDamping={!reduced} dampingFactor={.1} onStart={()=>{transition.current=null}}/>;
}
export default function SecurityScene({demo,reduced,active,onSelect,reset,focus,zoom=1}){
 return <Canvas shadows dpr={[1,1.5]} camera={{position:views.overview.position,fov:39}} frameloop={active?'always':'never'} gl={{antialias:true,alpha:true,powerPreference:'low-power'}} onCreated={({gl})=>{gl.setClearColor('#e6edf0',1);gl.domElement.setAttribute('aria-label','Illustrative interactive property. Choose a system to view its equipment.');gl.domElement.addEventListener('webglcontextlost',()=>window.dispatchEvent(new Event('lockat-webgl-failed')))}}>
 <ambientLight intensity={.8}/><hemisphereLight args={['#e6f3ff','#b9b3a1',1.3]}/><directionalLight position={[-3,9,5]} intensity={3.2} color="#fff2dd" castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-8} shadow-bias={-.0004}/><directionalLight position={[6,4,-3]} intensity={.75} color="#afd5ff"/>
 <Property demo={demo} reduced={reduced} onSelect={onSelect} focus={focus}/><ContactShadows position={[0,-.52,0]} opacity={.3} scale={18} blur={2.5} far={8} resolution={256} frames={1}/><SceneControls reset={reset} reduced={reduced} focus={focus} zoom={zoom} coverage={demo.camera}/>
 </Canvas>
}
