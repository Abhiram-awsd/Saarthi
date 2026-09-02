import React, { useMemo, useState } from "react";
import { Routes, Route, NavLink, useNavigate, useParams, Link, Outlet } from "react-router-dom";
import {
  ArrowRight, Bell, Calculator, ChevronDown, ChevronRight, CircleHelp, FileCheck2,
  FileText, Home, Languages, LayoutDashboard, MapPin, Menu, Search, Sparkles, WalletCards,
  X, Check, Clock3, UserRound, ShieldCheck, BrainCircuit, SlidersHorizontal, Navigation,
  BriefcaseBusiness, ExternalLink, UploadCloud, Download, LogOut, Plus, CheckCircle2,
  AlertCircle, IndianRupee, LocateFixed, Phone, Building2, RefreshCw
} from "lucide-react";
import { schemes, partners, application } from "./data/mockData";
import { getRecommendations } from "./services/recommendationService";

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

function Layout() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  return <div className="app-shell">
    <aside className={open ? "sidebar open" : "sidebar"}>
      <div className="sidebar-top"><Brand/><button className="mobile-close" onClick={() => setOpen(false)}><X/></button></div>
      <nav>{nav.map(([to, label, Icon]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><Icon size={18}/><span>{label}</span>{label === "Notifications" && <i className="dot"/>}</NavLink>)}</nav>
      <div className="sidebar-bottom">
        <button className="language" onClick={() => alert("Language selector: English, తెలుగు, हिन्दी, தமிழ், ಕನ್ನಡ") }><Languages size={16}/><span>English</span><ChevronRight size={14}/></button>
        <div className="profile-mini"><div className="avatar">RK</div><div><strong>Rahul Kumar</strong><span>Profile 84% complete</span></div></div>
      </div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setOpen(true)}><Menu/></button>
        <div className="breadcrumb">SAARTHI <span>/</span> {nav.find(n => n[0] === window.location.pathname)?.[1] || "Overview"}</div>
        <div className="top-actions">
          <Link className="icon-btn" to="/notifications"><Bell size={18}/><i className="dot"/></Link>
          <button className="lang-btn" onClick={() => alert("Language selector coming next: English, తెలుగు, हिन्दी, தமிழ், ಕನ್ನಡ")}><Languages size={15}/> English <ChevronDown size={13}/></button>
          <button className="avatar avatar-button" onClick={() => setProfileOpen(v => !v)}>RK</button>
          {profileOpen && <div className="profile-popover"><strong>Rahul Kumar</strong><span>SC beneficiary profile</span><Link to="/find">Update profile <ArrowRight size={13}/></Link><button onClick={() => alert("Demo logout") }><LogOut size={13}/> Log out</button></div>}
        </div>
      </header>
      <div className="page"><Outlet /></div>
    </main>
  </div>;
}

function PageTitle({ eyebrow, title, subtitle, action }) { return <div className="page-title"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p>{action}</div>; }
function Stat({ label, value, detail, icon: Icon, to }) { return <Link to={to || "#"} className="stat-card"><div className="stat-icon"><Icon size={17}/></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></Link>; }

function MatchCard({ scheme, compact = false }) {
  return <div className={compact ? "match-card compact" : "match-card"}>
    <div className="match-score"><strong>{scheme.score}%</strong><span>Match</span></div>
    <div className="match-content"><div className="eyebrow">{scheme.status}</div><h3>{scheme.name}</h3><p>{scheme.description}</p>
      <div className="metric-row"><span><b>Loan</b>{scheme.loan}</span><span><b>Interest</b>{scheme.interest}</span><span><b>Moratorium</b>{scheme.moratorium}</span></div>
    </div>
    <Link className="text-link" to={`/schemes/${scheme.id}`}>View details <ArrowRight size={15}/></Link>
  </div>;
}

function Dashboard() {
  const navigate = useNavigate();
  return <div>
    <section className="hero">
      <div><div className="eyebrow"><Sparkles size={13}/> AI-powered scheme matching</div><h1>Find the support<br/>that's <em>meant for you.</em></h1><p>One profile. Personalized schemes. Clear next steps — from discovery to application.</p><button className="primary" onClick={() => navigate("/find")}>Find My Scheme <ArrowRight size={17}/></button></div>
      <div className="hero-orbit"><div className="orbit-line"></div><div className="ai-core"><BrainCircuit size={34}/><span>AI</span></div><div className="floating-card top"><span>Profile ready</span><b>84%</b><div className="progress"><i style={{ width: "84%" }}/></div></div><div className="floating-card bottom"><Check size={15}/> 3 schemes matched</div></div>
    </section>
    <div className="stats">
      <Stat label="Profile completion" value="84%" detail="Continue →" icon={UserRound} to="/find"/>
      <Stat label="Recommended schemes" value="3" detail="View matches →" icon={Sparkles} to="/schemes"/>
      <Stat label="Active applications" value="1" detail="View application →" icon={FileCheck2} to="/applications"/>
      <Stat label="Nearest partner" value="4.2 km" detail="View on map →" icon={MapPin} to="/partners"/>
    </div>
    <div className="section-head"><div><div className="eyebrow">Personalized for you</div><h2>Your top match</h2></div><Link to="/schemes" className="ghost">View all schemes <ArrowRight size={15}/></Link></div>
    <MatchCard scheme={schemes[0]}/>
    <div className="two-col">
      <div className="panel"><div className="section-head small"><div><div className="eyebrow">Application</div><h3>Keep moving forward</h3></div><span className="pill in-progress">In progress</span></div><div className="timeline mini"><div className="done"><Check/><span>Application submitted</span><small>12 May</small></div><div className="done"><Check/><span>Documents verified</span><small>14 May</small></div><div className="current"><Clock3/><span>Partner review</span><small>In progress</small></div><div><span>Sanction</span><small>Pending</small></div></div><Link to="/applications" className="ghost">Open application <ArrowRight size={15}/></Link></div>
      <div className="panel"><div className="section-head small"><div><div className="eyebrow">Financial planning</div><h3>Know your numbers</h3></div><Calculator size={19}/></div><div className="emi-preview"><span>Estimated monthly EMI</span><strong>₹2,910</strong><div className="mini-chart"><i/><i/><i/><i/><i/><i/><i/></div></div><Link to="/calculator" className="ghost">Calculate again <ArrowRight size={15}/></Link></div>
    </div>
    <div className="trust-strip"><ShieldCheck size={18}/><div><strong>Built around official scheme information</strong><span>SAARTHI helps you understand options; final eligibility and sanction remain with the authorized channel partner.</span></div></div>
  </div>;
}

function FindScheme() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ purpose: "business", category: "SC", income: "240000", state: "Telangana", district: "Hyderabad", projectCost: "2000000", loanRequired: "1500000" });
  const [loading, setLoading] = useState(false); const [result, setResult] = useState(null);
  const update = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  async function run() { setLoading(true); const r = await getRecommendations(profile); setResult(r); setLoading(false); }
  if (result) return <div><PageTitle eyebrow="AI scheme matching" title="Your matches are ready." subtitle="Ranked by eligibility, financial suitability and accessibility." action={<button className="ghost" onClick={() => { setResult(null); setStep(1); }}>← Start over</button>}/><div className="result-banner"><div className="ai-badge"><Sparkles size={18}/></div><div><strong>{result.recommendations.length} schemes match your profile</strong><span>Your recommendation is explainable — see exactly what influenced each match.</span></div><span className="model-tag">Demo model · replaceable</span></div>{result.recommendations.map(r => { const s = schemes.find(x => x.id === r.schemeId) || schemes[0]; return <div key={r.schemeId} className="result-item"><MatchCard scheme={{ ...s, score: r.score }}/><div className="why"><strong>Why this match</strong>{r.reasons.map(x => <span key={x}><Check size={14}/>{x}</span>)}<Link to={`/schemes/${s.id}`} className="ghost">Open full scheme <ArrowRight size={14}/></Link></div></div>; })}</div>;
  return <div><PageTitle eyebrow="Personalized matching" title="Tell us what you need." subtitle="You don't need to understand the schemes first. SAARTHI will do the hard part."/>
    <div className="wizard"><div className="wizard-steps">{["What you need", "About you", "Requirement", "AI analysis"].map((x, i) => <div className={step >= i + 1 ? "step active" : "step"} key={x}><b>0{i + 1}</b><span>{x}</span></div>)}</div>
      <div className="wizard-body">
        {step === 1 && <><div className="question">What are you looking for?</div><p className="muted">Choose the option that best describes your goal.</p><div className="choice-grid">{[["business", "Start a business", BriefcaseBusiness], ["expand", "Expand my business", WalletCards], ["education", "Fund education", FileText], ["skill", "Skill development", Sparkles], ["micro", "Micro finance", WalletCards], ["other", "Other", CircleHelp]].map(([v, l, I]) => <button className={profile.purpose === v ? "choice selected" : "choice"} key={v} onClick={() => update("purpose", v)}><I size={19}/><span>{l}</span>{profile.purpose === v && <Check size={16}/>}</button>)}</div></>}
        {step === 2 && <><div className="question">Tell us about yourself</div><p className="muted">Only information needed for scheme matching.</p><div className="form-grid"><Field label="Annual family income" value={profile.income} onChange={v => update("income", v)} prefix="₹"/><Select label="Social category" value={profile.category} onChange={v => update("category", v)} options={["SC", "ST", "OBC", "General"]}/><Select label="State" value={profile.state} onChange={v => update("state", v)} options={["Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu"]}/><Field label="District" value={profile.district} onChange={v => update("district", v)}/></div></>}
        {step === 3 && <><div className="question">Your requirement</div><p className="muted">Help us understand your financial need.</p><div className="form-grid"><Select label="Business type" value="Manufacturing" onChange={() => {}} options={["Manufacturing", "Service", "Retail", "Education"]}/><Field label="Estimated project cost" value={profile.projectCost} onChange={v => update("projectCost", v)} prefix="₹"/><Field label="Amount required" value={profile.loanRequired} onChange={v => update("loanRequired", v)} prefix="₹"/></div><div className="note"><ShieldCheck size={17}/><span>Your information is used only to identify suitable assistance and guide your application.</span></div></>}
        {step === 4 && <div className="analysis"><div className="analysis-orbit"><BrainCircuit size={42}/><span>AI</span></div><h3>{loading ? "Understanding your profile…" : "Ready to analyze"}</h3><p>{loading ? "Checking eligibility, financial fit, purpose and partner availability." : "We'll compare your profile against the scheme knowledge base."}</p>{loading && <div className="analysis-list">{["Income eligibility checked", "Scheme criteria analyzed", "Loan requirement evaluated", "Location eligibility checked", "Channel partners identified"].map(x => <span key={x}><Check size={14}/>{x}</span>)}</div>}</div>}
        <div className="wizard-actions"><button className="ghost" disabled={step === 1} onClick={() => setStep(s => s - 1)}>Back</button>{step < 3 ? <button className="primary" onClick={() => setStep(s => s + 1)}>Next <ArrowRight size={16}/></button> : step === 3 ? <button className="primary" onClick={() => setStep(4)}>Analyze profile <Sparkles size={16}/></button> : <button className="primary" onClick={run} disabled={loading}>{loading ? "Analyzing…" : "View my matches"} <ArrowRight size={16}/></button>}</div>
      </div>
    </div></div>;
}

function Field({ label, value, onChange, prefix }) { return <label className="field"><span>{label}</span><div>{prefix && <i>{prefix}</i>}<input value={value} onChange={e => onChange(e.target.value)}/></div></label>; }
function Select({ label, value, onChange, options }) { return <label className="field"><span>{label}</span><select value={value} onChange={e => onChange(e.target.value)}>{options.map(x => <option key={x}>{x}</option>)}</select></label>; }

function Schemes() {
  const [q, setQ] = useState(""); const [category, setCategory] = useState("All");
  const filtered = useMemo(() => schemes.filter(s => `${s.name} ${s.category} ${s.description} ${s.purpose.join(" ")}`.toLowerCase().includes(q.toLowerCase()) && (category === "All" || s.category === category)), [q, category]);
  return <div><PageTitle eyebrow="Scheme knowledge base" title="Explore financial support." subtitle="Browse schemes with clear eligibility, financial terms and next steps."/><div className="searchbar"><Search size={18}/><input placeholder="Search schemes, purposes or categories…" value={q} onChange={e => setQ(e.target.value)}/><div className="filter-select"><SlidersHorizontal size={15}/><select value={category} onChange={e => setCategory(e.target.value)}><option>All</option><option>Enterprise</option><option>Micro finance</option><option>Education</option></select></div></div><div className="scheme-count">Showing <strong>{filtered.length}</strong> schemes <span>· sourced and structured for matching</span></div><div className="scheme-grid">{filtered.map(s => <MatchCard key={s.id} scheme={s} compact/>)}{filtered.length === 0 && <div className="empty-state"><Search size={28}/><h3>No schemes found</h3><p>Try a different keyword or category.</p></div>}</div></div>;
}

function SchemeDetails() {
  const { id } = useParams(); const s = schemes.find(x => x.id === id) || schemes[0]; const navigate = useNavigate();
  return <div><button className="back-link" onClick={() => navigate(-1)}>← Back to schemes</button><div className="detail-head"><div><div className="eyebrow">{s.status}</div><h1>{s.name}</h1><p>{s.description}</p></div><div className="big-score"><strong>{s.score}%</strong><span>Match</span></div></div><div className="detail-grid"><div><div className="panel"><div className="section-head small"><h3>Why we recommended this</h3><ShieldCheck size={19}/></div>{s.why.map(x => <div className="reason" key={x}><Check size={15}/><span>{x}</span></div>)}</div><div className="panel"><h3>Scheme overview</h3><div className="detail-metrics"><Metric label="Maximum assistance" value={s.loan}/><Metric label="Interest rate" value={s.interest}/><Metric label="Moratorium" value={s.moratorium}/><Metric label="Repayment" value={s.tenure}/></div></div><div className="panel"><h3>Purpose & eligibility</h3><div className="tag-list">{s.purpose.map(x => <span key={x}>{x}</span>)}</div><p className="muted">Category coverage: <strong>SC / eligible beneficiaries</strong>. Income and other criteria should be verified against the latest official scheme guidelines.</p></div></div><div className="panel sticky"><div className="eyebrow">Your next step</div><h3>Ready to plan?</h3><p className="muted">Calculate an indicative EMI or find the channel partner that can process this scheme.</p><Link className="primary full" to="/calculator">Calculate my EMI <Calculator size={16}/></Link><Link className="secondary full" to="/partners">Find a partner <MapPin size={16}/></Link><div className="source-note"><FileText size={14}/> Final terms are determined by the authorized channel partner.</div></div></div><div className="panel"><h3>Documents</h3><div className="doc-chips">{s.documents.map(x => <span key={x}><FileCheck2 size={14}/>{x}</span>)}</div></div></div>;
}
function Metric({ label, value }) { return <div><span>{label}</span><strong>{value}</strong></div>; }

function CalculatorPage() {
  const [amount, setAmount] = useState(1500000), [rate, setRate] = useState(6.5), [years, setYears] = useState(5);
  const n = years * 12, r = rate / 1200; const emi = r ? Math.round(amount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)) : Math.round(amount / n); const total = emi * n, interest = total - amount;
  return <div><PageTitle eyebrow="Financial planning" title="Know your numbers before you apply." subtitle="Indicative calculations based on the selected scheme guidelines."/><div className="calculator-grid"><div className="panel controls"><Select label="Scheme" value="PMEGP" onChange={() => {}} options={["PMEGP", "Stand Up India", "MUDRA"]}/><Range label="Loan amount" value={amount} min={100000} max={5000000} step={50000} onChange={setAmount} format={v => `₹${Number(v).toLocaleString("en-IN")}`}/><Range label="Interest rate" value={rate} min={6} max={15} step={0.1} onChange={setRate} format={v => `${v}%`}/><Range label="Tenure" value={years} min={1} max={7} step={1} onChange={setYears} format={v => `${v} years`}/><Select label="Moratorium" value="6 months" onChange={() => {}} options={["3 months", "6 months", "12 months"]}/></div><div className="panel emi-panel"><span className="eyebrow">Estimated monthly EMI</span><strong className="emi">₹{emi.toLocaleString("en-IN")}</strong><div className="donut"><div><b>{Math.round(amount / total * 100)}%</b><span>principal</span></div></div><div className="money-row"><span>Principal <b>₹{amount.toLocaleString("en-IN")}</b></span><span>Total interest <b>₹{interest.toLocaleString("en-IN")}</b></span><span>Total repayment <b>₹{total.toLocaleString("en-IN")}</b></span></div><div className="bar-chart">{[.45,.58,.67,.72,.8,.86,.93].map((h, i) => <i key={i} style={{ height: `${h * 100}%` }}/>)}</div><Link className="primary" to="/partners">Find a partner to apply <ArrowRight size={15}/></Link></div></div><p className="disclaimer">Indicative calculation only. Final interest rate, tenure and repayment terms are subject to approval by the authorized channel partner.</p></div>;
}
function Range({ label, value, min, max, step, onChange, format }) { return <div className="range-field"><div><span>{label}</span><b>{format(value)}</b></div><input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}/></div>; }

function Partners() {
  const [filter, setFilter] = useState("All"); const [radius, setRadius] = useState(25); const [located, setLocated] = useState(false);
  const list = partners.filter(p => (filter === "All" || p.type === filter) && Number(p.distance.split(" ")[0]) <= radius);
  const locate = () => { setLocated(true); if (navigator.geolocation) navigator.geolocation.getCurrentPosition(() => {}, () => {}); };
  return <div><PageTitle eyebrow="Intelligent routing" title="Your nearest path to application." subtitle="Partners are ranked by scheme compatibility, availability and distance." action={<button className="secondary" onClick={locate}><LocateFixed size={15}/> {located ? "Location detected" : "Use my location"}</button>}/><div className="map-toolbar"><span><MapPin size={15}/> Hyderabad, Telangana</span><label>Radius <select value={radius} onChange={e => setRadius(Number(e.target.value))}><option value="10">10 km</option><option value="25">25 km</option><option value="50">50 km</option></select></label><button className="ghost" onClick={() => alert("Map search is ready for live map API integration.")}><RefreshCw size={14}/> Refresh</button></div><div className="map-layout"><div className="fake-map"><div className="map-grid"></div><div className="map-road r1"></div><div className="map-road r2"></div><div className="you-pin"><Navigation size={16}/><span>You</span></div>{list.map((p, i) => <div className={`map-pin p${(i % 4) + 1}`} key={p.id} title={p.name}><MapPin size={25}/></div>)}<div className="map-label"><MapPin size={14}/> {located ? "Your location" : "Hyderabad • Telangana"}</div></div><div className="partner-panel"><div className="filter-row">{["All", "SCA", "PSB", "RRB", "NBFC-MFI"].map(x => <button className={filter === x ? "filter active" : "filter"} key={x} onClick={() => setFilter(x)}>{x}</button>)}</div>{list.map((p, i) => <div className={i === 0 ? "partner-card recommended" : "partner-card"} key={p.id}><div className="partner-icon"><Building2 size={18}/></div><div className="partner-info"><div><strong>{p.name}</strong>{i === 0 && <span className="best-badge">Recommended</span>}</div><small>{p.type} · {p.distance}</small><span className={p.color === "good" ? "status good" : "status warn"}><i/> {p.status}</span><div className="partner-actions"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + " Hyderabad Telangana")}`} target="_blank" rel="noreferrer">Directions <ExternalLink size={11}/></a><button onClick={() => alert(`${p.name}\nSupports: ${p.schemes.join(", ")}\nStatus: ${p.status}`)}>Details</button></div></div><ChevronRight size={17}/></div>)}{list.length === 0 && <div className="empty-state small"><MapPin size={25}/><h3>No partners in this radius</h3><p>Increase the search radius.</p></div>}</div></div><div className="routing-note"><ShieldCheck size={18}/><div><strong>Why this partner?</strong><span>Supports your selected scheme · currently accepting applications · within your search radius · suitable for your loan category.</span></div></div></div>;
}

function Applications() {
  const [submitted, setSubmitted] = useState(false);
  return <div><PageTitle eyebrow="Application tracking" title="Your application, without the guesswork." subtitle={`Application ID ${application.id}`}/><div className="application-layout"><div className="panel"><div className="app-status"><span className="pill in-progress">Partner review</span><strong>{submitted ? "Application action recorded for this demo." : application.next}</strong></div><div className="timeline large">{["Application submitted", "Documents verified", "Partner review", "Sanction", "Disbursement"].map((x, i) => <div className={i < 2 ? "done" : i === 2 ? "current" : ""} key={x}>{i < 2 ? <Check/> : i === 2 ? <Clock3/> : <span className="empty-dot"/>}<span>{x}</span><small>{i === 0 ? application.submitted : i === 1 ? application.verified : i === 2 ? "In progress" : "Pending"}</small></div>)}</div><button className="secondary" onClick={() => setSubmitted(true)}><Bell size={15}/> Send update request</button></div><div className="panel"><div className="eyebrow">Application checklist</div><h3>6 of 8 documents verified</h3>{["Aadhaar Card", "Income Certificate", "Business Plan", "Bank Statement"].map((x, i) => <div className="check-row" key={x}><span>{x}</span><b className={i === 3 ? "pending" : ""}>{i === 3 ? "Pending" : "Verified"}</b></div>)}<Link to="/documents" className="primary full">Open documents <ArrowRight size={16}/></Link></div></div><div className="panel application-actions"><h3>Need help?</h3><div><button className="secondary" onClick={() => alert("Support: connect with your authorized Channel Partner.")}><CircleHelp size={15}/> Get guidance</button><Link className="ghost" to="/partners">Contact partner <Phone size={14}/></Link></div></div></div>;
}

function Documents() {
  const [docs, setDocs] = useState(["Aadhaar Card", "Income Certificate", "Business Plan", "Bank Statement", "Project Report", "GST / Tax document"]);
  const upload = () => { const name = prompt("Enter document name"); if (name) setDocs(d => [...d, name]); };
  return <div><PageTitle eyebrow="Document center" title="Keep your application ready." subtitle="Upload once, reuse across your application journey."/><div className="panel doc-panel"><div className="doc-progress"><strong>6 / 8</strong><span>documents verified</span><div className="progress"><i style={{ width: "75%" }}/></div><button className="primary" onClick={upload}><UploadCloud size={15}/> Upload document</button></div>{docs.map((x, i) => <div className="document-row" key={`${x}-${i}`}><div className="file-icon"><FileText size={18}/></div><div><strong>{x}</strong><small>{i < 4 ? "Verified successfully" : "Required for application"}</small></div><span className={i < 4 ? "status good" : "status warn"}><i/> {i < 4 ? "Verified" : "Pending"}</span><button className="ghost" onClick={() => alert(`${x}\nDemo document preview.`)}>View</button></div>)}</div><div className="note"><ShieldCheck size={17}/><span>Documents are shown in this prototype only. Production uploads should use encrypted object storage with access controls.</span></div></div>;
}

function Notifications() {
  const [items, setItems] = useState(["Your application is under partner review", "Document verification completed successfully", "New scheme match: Stand Up India", "Reminder: complete your application"]);
  return <div><PageTitle eyebrow="Updates" title="Nothing important should slip through." subtitle="Relevant application and scheme updates in one place." action={<button className="ghost" onClick={() => setItems([])}>Mark all as read</button>}/><div className="panel notification-list">{items.length ? items.map((x, i) => <div className="notification" key={x}><div className="notif-icon">{i === 0 ? <Clock3/> : i === 1 ? <Check/> : <Bell/>}</div><div><strong>{x}</strong><span>{i === 0 ? "2 hours ago" : i === 1 ? "1 day ago" : "2 days ago"}</span></div><ChevronRight size={16}/></div>) : <div className="empty-state"><CheckCircle2 size={30}/><h3>You're all caught up</h3><p>No unread updates.</p></div>}</div></div>;
}

function NotFound() { return <div className="empty-state page-empty"><AlertCircle size={32}/><h2>Page not found</h2><p>The page you're looking for doesn't exist.</p><Link to="/" className="primary">Back to dashboard</Link></div>; }

export default function App() {
  return <Routes><Route element={<Layout/>}><Route path="/" element={<Dashboard/>}/><Route path="/find" element={<FindScheme/>}/><Route path="/schemes" element={<Schemes/>}/><Route path="/schemes/:id" element={<SchemeDetails/>}/><Route path="/calculator" element={<CalculatorPage/>}/><Route path="/partners" element={<Partners/>}/><Route path="/applications" element={<Applications/>}/><Route path="/documents" element={<Documents/>}/><Route path="/notifications" element={<Notifications/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>;
}
