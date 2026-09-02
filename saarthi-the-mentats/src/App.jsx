import React, { useMemo, useState } from "react";
import { Routes, Route, NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowRight, Bell, Calculator, ChevronRight, CircleHelp, FileCheck2,
  FileText, Home as HomeIcon, Languages, LayoutDashboard, MapPin,
  Menu, Search, Sparkles, WalletCards, X, Check, Clock3, UserRound,
  ShieldCheck, BrainCircuit, SlidersHorizontal, Navigation, BriefcaseBusiness
} from "lucide-react";
import { schemes, partners, application } from "./data/mockData";
import { getRecommendations } from "./services/recommendationService";

const palette = { tan:"#D9A068", sand:"#C2B5A9", brown:"#996531", stone:"#A69C92", ink:"#261707" };

function Brand() {
  return <Link className="brand" to="/"><span className="brand-mark">A</span><span><strong>SAARTHI</strong><small>Your path to the right financial support.</small></span></Link>;
}

const nav = [
  ["/", "Dashboard", LayoutDashboard],
  ["/find", "Find My Scheme", Sparkles],
  ["/schemes", "Explore Schemes", Search],
  ["/calculator", "Financial Calculator", Calculator],
  ["/partners", "Partner Locator", MapPin],
  ["/applications", "Applications", FileCheck2],
  ["/documents", "Documents", FileText],
  ["/notifications", "Notifications", Bell],
];

function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return <div className="app-shell">
    <aside className={open ? "sidebar open" : "sidebar"}>
      <div className="sidebar-top"><Brand/><button className="mobile-close" onClick={()=>setOpen(false)}><X/></button></div>
      <nav>{nav.map(([to,label,Icon]) => <NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>isActive ? "nav-item active":"nav-item"}><Icon size={18}/><span>{label}</span>{label==="Notifications" && <i className="dot"/>}</NavLink>)}</nav>
      <div className="sidebar-bottom">
        <div className="language"><Languages size={16}/><span>English</span><ChevronRight size={14}/></div>
        <div className="profile-mini"><div className="avatar">RK</div><div><strong>Rahul Kumar</strong><span>View profile</span></div></div>
      </div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setOpen(true)}><Menu/></button>
        <div className="breadcrumb">{location.pathname === "/" ? "Overview" : nav.find(n=>n[0]===location.pathname)?.[1] || "SAARTHI"}</div>
        <div className="top-actions"><button className="icon-btn"><Bell size={18}/><i className="dot"/></button><button className="lang-btn"><Languages size={15}/> English <ChevronRight size={13}/></button><div className="avatar">RK</div></div>
      </header>
      <div className="page">{children}</div>
    </main>
  </div>
}

function Stat({label,value,detail,icon:Icon}) {
 return <div className="stat-card"><div className="stat-icon"><Icon size={17}/></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>
}

function MatchCard({scheme, compact=false}) {
 return <div className={compact ? "match-card compact":"match-card"}>
   <div className="match-score"><strong>{scheme.score}%</strong><span>Match</span></div>
   <div className="match-content"><div className="eyebrow">{scheme.status}</div><h3>{scheme.name}</h3><p>{scheme.description}</p>
     <div className="metric-row"><span><b>Loan</b>{scheme.loan}</span><span><b>Interest</b>{scheme.interest}</span><span><b>Moratorium</b>{scheme.moratorium}</span></div>
   </div>
   <Link className="text-link" to={`/schemes/${scheme.id}`}>View details <ArrowRight size={15}/></Link>
 </div>
}

function Dashboard() {
 const navigate=useNavigate();
 return <div>
   <section className="hero">
    <div><div className="eyebrow"><Sparkles size={13}/> AI-powered scheme matching</div><h1>Find the support<br/>that's <em>meant for you.</em></h1><p>One profile. Personalized schemes. Clear next steps — from discovery to application.</p><button className="primary" onClick={()=>navigate("/find")}>Find My Scheme <ArrowRight size={17}/></button></div>
    <div className="hero-orbit">
      <div className="orbit-line"></div><div className="ai-core"><BrainCircuit size={34}/><span>AI</span></div>
      <div className="floating-card top"><span>Profile</span><b>84%</b><div className="progress"><i style={{width:"84%"}}/></div></div>
      <div className="floating-card bottom"><Check size={15}/> 3 schemes matched</div>
    </div>
   </section>
   <div className="stats"><Stat label="Profile completion" value="84%" detail="Continue →" icon={UserRound}/><Stat label="Recommended schemes" value="3" detail="View matches →" icon={Sparkles}/><Stat label="Active applications" value="1" detail="View application →" icon={FileCheck2}/><Stat label="Nearest partner" value="4.2 km" detail="View on map →" icon={MapPin}/></div>
   <div className="section-head"><div><div className="eyebrow">Personalized for you</div><h2>Your top match</h2></div><Link to="/schemes" className="ghost">View all schemes <ArrowRight size={15}/></Link></div>
   <MatchCard scheme={schemes[0]}/>
   <div className="two-col">
    <div className="panel"><div className="section-head small"><div><div className="eyebrow">Application</div><h3>Keep moving forward</h3></div><span className="pill in-progress">In progress</span></div><div className="timeline mini"><div className="done"><Check/><span>Application submitted</span><small>12 May</small></div><div className="done"><Check/><span>Documents verified</span><small>14 May</small></div><div className="current"><Clock3/><span>Partner review</span><small>In progress</small></div><div><span>Sanction</span><small>Pending</small></div></div><Link to="/applications" className="ghost">Open application <ArrowRight size={15}/></Link></div>
    <div className="panel"><div className="section-head small"><div><div className="eyebrow">Financial planning</div><h3>Know your numbers</h3></div><Calculator size={19}/></div><div className="emi-preview"><span>Estimated monthly EMI</span><strong>₹2,910</strong><div className="mini-chart"><i/><i/><i/><i/><i/><i/><i/></div></div><Link to="/calculator" className="ghost">Calculate again <ArrowRight size={15}/></Link></div>
   </div>
 </div>
}

function FindScheme() {
 const [step,setStep]=useState(1);
 const [profile,setProfile]=useState({purpose:"business",category:"SC",income:"240000",state:"Telangana",district:"Hyderabad",projectCost:"2000000",loanRequired:"1500000"});
 const [loading,setLoading]=useState(false); const [result,setResult]=useState(null);
 const update=(k,v)=>setProfile(p=>({...p,[k]:v}));
 async function run(){setLoading(true); await new Promise(r=>setTimeout(r,1000)); const r=await getRecommendations(profile); setResult(r); setLoading(false); setStep(4);}
 if(result) return <div><PageTitle eyebrow="AI scheme matching" title="Your matches are ready." subtitle="Ranked by eligibility, financial suitability and accessibility."/><div className="result-banner"><div className="ai-badge"><Sparkles size={18}/></div><div><strong>{result.recommendations.length} schemes match your profile</strong><span>Your recommendation is explainable — see exactly what influenced each match.</span></div><button className="ghost">How matching works <CircleHelp size={15}/></button></div>{result.recommendations.map(r=>{const s=schemes.find(x=>x.id===r.schemeId); return <div key={r.schemeId} className="result-item"><MatchCard scheme={{...s,score:r.score}}/><div className="why"><strong>Why this match</strong>{r.reasons.map(x=><span key={x}><Check size={14}/>{x}</span>)}</div></div>})}<button className="secondary" onClick={()=>{setResult(null);setStep(1)}}>Start over</button></div>;
 return <div><PageTitle eyebrow="Personalized matching" title="Tell us what you need." subtitle="You don't need to understand the schemes first. SAARTHI will do the hard part."/>
 <div className="wizard"><div className="wizard-steps">{["What you need","About you","Requirement","AI analysis"].map((x,i)=><div className={step>=i+1?"step active":"step"} key={x}><b>0{i+1}</b><span>{x}</span></div>)}</div>
 <div className="wizard-body">
 {step===1 && <><div className="question">What are you looking for?</div><p className="muted">Choose the option that best describes your goal.</p><div className="choice-grid">{[["business","Start a business",BriefcaseBusiness],["expand","Expand my business",WalletCards],["education","Fund education",FileText],["skill","Skill development",Sparkles],["micro","Micro finance",WalletCards],["other","Other",CircleHelp]].map(([v,l,I])=><button className={profile.purpose===v?"choice selected":"choice"} key={v} onClick={()=>update("purpose",v)}><I size={19}/><span>{l}</span>{profile.purpose===v&&<Check size={16}/>}</button>)}</div></>}
 {step===2 && <><div className="question">Tell us about yourself</div><p className="muted">Only information needed for scheme matching.</p><div className="form-grid"><Field label="Annual family income" value={profile.income} onChange={v=>update("income",v)} prefix="₹"/><Select label="Social category" value={profile.category} onChange={v=>update("category",v)} options={["SC","ST","OBC","General"]}/><Select label="State" value={profile.state} onChange={v=>update("state",v)} options={["Telangana","Andhra Pradesh","Karnataka","Tamil Nadu"]}/><Field label="District" value={profile.district} onChange={v=>update("district",v)}/></div></>}
 {step===3 && <><div className="question">Your requirement</div><p className="muted">Help us understand your financial need.</p><div className="form-grid"><Select label="Business type" value="Manufacturing" onChange={()=>{}} options={["Manufacturing","Service","Retail","Education"]}/><Field label="Estimated project cost" value={profile.projectCost} onChange={v=>update("projectCost",v)} prefix="₹"/><Field label="Amount required" value={profile.loanRequired} onChange={v=>update("loanRequired",v)} prefix="₹"/></div><div className="note"><ShieldCheck size={17}/><span>Your information is used only to identify suitable assistance and guide your application.</span></div></>}
 {step===4 && <div className="analysis"><div className="analysis-orbit"><BrainCircuit size={42}/><span>AI</span></div><h3>{loading?"Understanding your profile…":"Ready to analyze"}</h3><p>{loading?"Checking eligibility, financial fit, purpose and partner availability.":"We'll compare your profile against the scheme knowledge base."}</p>{loading&&<div className="analysis-list">{["Income eligibility checked","Scheme criteria analyzed","Loan requirement evaluated","Location eligibility checked","Channel partners identified"].map(x=><span key={x}><Check size={14}/>{x}</span>)}</div>}</div>}
 <div className="wizard-actions"><button className="ghost" disabled={step===1} onClick={()=>setStep(s=>s-1)}>Back</button>{step<3?<button className="primary" onClick={()=>setStep(s=>s+1)}>Next <ArrowRight size={16}/></button>:step===3?<button className="primary" onClick={()=>setStep(4)}>Analyze profile <Sparkles size={16}/></button>:<button className="primary" onClick={run} disabled={loading}>{loading?"Analyzing…":"View my matches"} <ArrowRight size={16}/></button>}</div>
 </div></div></div>
}

function PageTitle({eyebrow,title,subtitle}){return <div className="page-title"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>}
function Field({label,value,onChange,prefix}){return <label className="field"><span>{label}</span><div>{prefix&&<i>{prefix}</i>}<input value={value} onChange={e=>onChange(e.target.value)}/></div></label>}
function Select({label,value,onChange,options}){return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(x=><option key={x}>{x}</option>)}</select></label>}

function Schemes(){
 const [q,setQ]=useState(""); const filtered=useMemo(()=>schemes.filter(s=>`${s.name} ${s.category}`.toLowerCase().includes(q.toLowerCase())),[q]);
 return <div><PageTitle eyebrow="Scheme knowledge base" title="Explore financial support." subtitle="Browse schemes with clear eligibility, financial terms and next steps."/><div className="searchbar"><Search size={18}/><input placeholder="Search schemes, purposes or categories…" value={q} onChange={e=>setQ(e.target.value)}/><button><SlidersHorizontal size={16}/> Filters</button></div><div className="scheme-grid">{filtered.map(s=><MatchCard key={s.id} scheme={s} compact/>)}</div></div>
}

function SchemeDetails({id}){
 const s=schemes.find(x=>x.id===id)||schemes[0]; const navigate=useNavigate();
 return <div><button className="back-link" onClick={()=>navigate(-1)}>← Back to schemes</button><div className="detail-head"><div><div className="eyebrow">Recommended for you</div><h1>{s.name}</h1><p>{s.description}</p></div><div className="big-score"><strong>{s.score}%</strong><span>Match</span></div></div><div className="detail-grid"><div><div className="panel"><div className="section-head small"><h3>Why we recommended this</h3><ShieldCheck size={19}/></div>{s.why.map(x=><div className="reason" key={x}><Check size={15}/><span>{x}</span></div>)}</div><div className="panel"><h3>Scheme overview</h3><div className="detail-metrics"><Metric label="Maximum assistance" value={s.loan}/><Metric label="Interest rate" value={s.interest}/><Metric label="Moratorium" value={s.moratorium}/><Metric label="Repayment" value={s.tenure}/></div></div></div><div className="panel sticky"><div className="eyebrow">Your next step</div><h3>Ready to plan?</h3><p className="muted">Calculate an indicative EMI or find the channel partner that can process this scheme.</p><button className="primary full" onClick={()=>navigate("/calculator")}>Calculate my EMI <Calculator size={16}/></button><button className="secondary full" onClick={()=>navigate("/partners")}>Find a partner <MapPin size={16}/></button><div className="source-note"><FileText size={14}/> Final terms are determined by the authorized channel partner.</div></div></div><div className="panel"><h3>Documents</h3><div className="doc-chips">{s.documents.map(x=><span key={x}><FileCheck2 size={14}/>{x}</span>)}</div></div></div>
}
function Metric({label,value}){return <div><span>{label}</span><strong>{value}</strong></div>}

function CalculatorPage(){
 const [amount,setAmount]=useState(1500000),[rate,setRate]=useState(6.5),[years,setYears]=useState(5);
 const n=years*12,r=rate/1200; const emi=Math.round(amount*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1)); const total=emi*n,interest=total-amount;
 return <div><PageTitle eyebrow="Financial planning" title="Know your numbers before you apply." subtitle="Indicative calculations based on the selected scheme guidelines."/><div className="calculator-grid"><div className="panel controls"><Select label="Scheme" value="PMEGP" onChange={()=>{}} options={["PMEGP","Stand Up India","MUDRA"]}/><Range label="Loan amount" value={amount} min={100000} max={5000000} step={50000} onChange={setAmount} format={v=>`₹${Number(v).toLocaleString("en-IN")}`}/><Range label="Interest rate" value={rate} min={6} max={15} step={0.1} onChange={setRate} format={v=>`${v}%`}/><Range label="Tenure" value={years} min={1} max={7} step={1} onChange={setYears} format={v=>`${v} years`}/><Select label="Moratorium" value="6 months" onChange={()=>{}} options={["3 months","6 months","12 months"]}/></div><div className="panel emi-panel"><span className="eyebrow">Estimated monthly EMI</span><strong className="emi">₹{emi.toLocaleString("en-IN")}</strong><div className="donut"><div><b>{Math.round(amount/total*100)}%</b><span>principal</span></div></div><div className="money-row"><span>Principal <b>₹{amount.toLocaleString("en-IN")}</b></span><span>Total interest <b>₹{interest.toLocaleString("en-IN")}</b></span><span>Total repayment <b>₹{total.toLocaleString("en-IN")}</b></span></div><div className="bar-chart">{[.45,.58,.67,.72,.8,.86,.93].map((h,i)=><i key={i} style={{height:`${h*100}%`}}/>)}</div></div></div><p className="disclaimer">Indicative calculation only. Final interest rate, tenure and repayment terms are subject to approval by the authorized channel partner.</p></div>
}
function Range({label,value,min,max,step,onChange,format}){return <div className="range-field"><div><span>{label}</span><b>{format(value)}</b></div><input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/></div>}

function Partners(){
 const [filter,setFilter]=useState("All"); const list=partners.filter(p=>filter==="All"||p.type===filter);
 return <div><PageTitle eyebrow="Intelligent routing" title="Your nearest path to application." subtitle="Partners are ranked by scheme compatibility, availability and distance."/><div className="map-layout"><div className="fake-map"><div className="map-grid"></div><div className="you-pin"><Navigation size={16}/><span>You</span></div>{list.map((p,i)=><div className={`map-pin p${i+1}`} key={p.id}><MapPin size={25}/></div>)}<div className="map-label"><MapPin size={14}/> Hyderabad • Telangana</div></div><div className="partner-panel"><div className="filter-row">{["All","SCA","PSB","RRB","NBFC-MFI"].map(x=><button className={filter===x?"filter active":"filter"} key={x} onClick={()=>setFilter(x)}>{x}</button>)}</div>{list.map((p,i)=><div className={i===0?"partner-card recommended":"partner-card"} key={p.id}><div className="partner-icon"><BriefcaseBusiness size={18}/></div><div className="partner-info"><div><strong>{p.name}</strong>{i===0&&<span className="best-badge">Recommended</span>}</div><small>{p.type} · {p.distance}</small><span className={p.color==="good"?"status good":"status warn"}><i/> {p.status}</span></div><ChevronRight size={17}/></div>)}</div></div><div className="routing-note"><ShieldCheck size={18}/><div><strong>Why this partner?</strong><span>Supports your selected scheme · currently accepting applications · within your search radius · suitable for your loan category.</span></div></div></div>
}

function Applications(){
 return <div><PageTitle eyebrow="Application tracking" title="Your application, without the guesswork." subtitle={`Application ID ${application.id}`}/><div className="application-layout"><div className="panel"><div className="app-status"><span className="pill in-progress">Partner review</span><strong>{application.next}</strong></div><div className="timeline large">{["Application submitted","Documents verified","Partner review","Sanction","Disbursement"].map((x,i)=><div className={i<2?"done":i===2?"current":""} key={x}>{i<2?<Check/>:i===2?<Clock3/>:<span className="empty-dot"/>}<span>{x}</span><small>{i===0?application.submitted:i===1?application.verified:i===2?"In progress":"Pending"}</small></div>)}</div></div><div className="panel"><div className="eyebrow">Application checklist</div><h3>6 of 8 documents verified</h3>{["Aadhaar Card","Income Certificate","Business Plan","Bank Statement"].map((x,i)=><div className="check-row" key={x}><span>{x}</span><b className={i===3?"pending":""}>{i===3?"Pending":"Verified"}</b></div>)}<Link to="/documents" className="primary full">Open documents <ArrowRight size={16}/></Link></div></div></div>
}

function Documents(){return <div><PageTitle eyebrow="Document center" title="Keep your application ready." subtitle="Upload once, reuse across your application journey."/><div className="panel doc-panel"><div className="doc-progress"><strong>6 / 8</strong><span>documents verified</span><div className="progress"><i style={{width:"75%"}}/></div><button className="primary">Upload document <ArrowRight size={15}/></button></div>{["Aadhaar Card","Income Certificate","Business Plan","Bank Statement","Project Report","GST / Tax document"].map((x,i)=><div className="document-row" key={x}><div className="file-icon"><FileText size={18}/></div><div><strong>{x}</strong><small>{i<4?"Verified successfully":"Required for application"}</small></div><span className={i<4?"status good":"status warn"}><i/> {i<4?"Verified":"Pending"}</span><button className="ghost">View</button></div>)}</div></div>}

function Notifications(){return <div><PageTitle eyebrow="Updates" title="Nothing important should slip through." subtitle="Relevant application and scheme updates in one place."/><div className="panel notification-list">{["Your application is under partner review","Document verification completed successfully","New scheme match: Stand Up India","Reminder: complete your application"].map((x,i)=><div className="notification" key={x}><div className="notif-icon">{i===0?<Clock3/>:i===1?<Check/>:<Bell/>}</div><div><strong>{x}</strong><span>{i===0?"2 hours ago":i===1?"1 day ago":"2 days ago"}</span></div><ChevronRight size={16}/></div>)}</div></div>}

function App(){
 return <Routes><Route element={<Layout/>}><Route path="/" element={<Dashboard/>}/><Route path="/find" element={<FindScheme/>}/><Route path="/schemes" element={<Schemes/>}/><Route path="/schemes/:id" element={<SchemeDetailsRoute/>}/><Route path="/calculator" element={<CalculatorPage/>}/><Route path="/partners" element={<Partners/>}/><Route path="/applications" element={<Applications/>}/><Route path="/documents" element={<Documents/>}/><Route path="/notifications" element={<Notifications/>}/><Route path="*" element={<Dashboard/>}/></Route></Routes>
}
function SchemeDetailsRoute(){const {pathname}=useLocation();return <SchemeDetails id={pathname.split("/").pop()}/>}
export default App;