import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight} from 'lucide-react';
import {services} from '../data/content';
const CircularGallery=lazy(()=>import('./reactbits/CircularGallery'));
const items=services.map(s=>({image:`/images/services/${s.image}.webp`,text:s.title,description:s.summary,alt:`Illustrative ${s.title.toLowerCase()} equipment`}));
export default function ServicesGallery({theme,onDetails,onQuote}){
  const root=useRef(null);
  const [ready,setReady]=useState(false);
  const [active,setActive]=useState(0);
  useEffect(()=>{const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setReady(true);observer.disconnect()}},{rootMargin:'200px'});observer.observe(root.current);return()=>observer.disconnect()},[]);
  const select=index=>{setActive(index);root.current.querySelectorAll('[data-gallery-list] button')[index]?.focus({preventScroll:true})};
  const service=services[active];
  return <div className="services-gallery" ref={root}>
    <div className="services-gallery-hint"><span>Drag to explore · Select a service to learn more</span><div><button className="icon-button" aria-label="Previous service" onClick={()=>select((active+5)%6)}><ArrowLeft size={20}/></button><button className="icon-button" aria-label="Next service" onClick={()=>select((active+1)%6)}><ArrowRight size={20}/></button></div></div>
    <div className="services-gallery-stage">{ready&&<Suspense fallback={<p className="gallery-loading">Preparing services…</p>}><CircularGallery items={items} bend={2.3} itemSize={1.05} itemAspect={1.12} gap={.19} borderRadius={.06} wave={.35} shadow={.08} fadeEdges={.045} textColor={theme==='dark'?'#edf5fc':'#102d45'} font={'600 24px "Manrope Variable"'} scrollEase={.08} dpr={1.5} autoScroll={0} openOnClick={false} onActiveChange={setActive} onItemClick={(_,index)=>onDetails(services[index])} aria-label="LOCKAT security services"/></Suspense>}</div>
    <div className="service-gallery-summary"><div aria-live="polite"><span className="small-label">EXPLORE OUR SERVICES</span><h3>{service.title}</h3><p>{service.summary}</p></div><div className="service-gallery-actions"><button className="text-link" onClick={()=>onDetails(service)}>Service details <ArrowUpRight size={17}/></button><button className="button" onClick={()=>onQuote(service)}>Get a Quote <ArrowUpRight size={17}/></button></div></div>
    <div className="service-gallery-index" role="group" aria-label="Choose a service">{services.map((s,index)=><button key={s.id} aria-pressed={active===index} onClick={()=>{select(index);onDetails(s)}}>{s.title}</button>)}</div>
  </div>
}
