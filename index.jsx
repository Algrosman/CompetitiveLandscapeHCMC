import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, ScatterChart, Scatter, ZAxis, AreaChart, Area } from "recharts";

const HOSPITALS = [
  {
    id: "fv", name: "FV Hospital", shortName: "FV", type: "Private International", founded: 2003, beds: 220,
    ownership: "Foreign-invested (French-Vietnamese)", jci: true, jciYear: 2016, location: "District 7",
    specialties: ["Cardiology", "Oncology", "Orthopedics", "IVF", "Neurology"],
    estRevenue: 120, estPatients: 350000, intlPatientPct: 30, avgCostUSD: 150, premiumTier: true,
    expansionPlans: "Phase 3 expansion underway, 400-bed target",
    strengthScore: { quality: 92, tech: 88, brand: 90, access: 65, price: 40, intl: 95 },
    marketShare: 18, color: "#1B6B93", growthRate: 12, staffCount: 1200, doctorCount: 250,
    insurancePartners: 45, patientSat: 4.5, digitalScore: 82,
  },
  {
    id: "vinmec", name: "Vinmec Central Park", shortName: "Vinmec", type: "Private Domestic", founded: 2014, beds: 300,
    ownership: "Vingroup (VIC)", jci: true, jciYear: 2018, location: "Binh Thanh",
    specialties: ["Oncology", "Stem Cell", "Cardiology", "Pediatrics", "IVF"],
    estRevenue: 150, estPatients: 500000, intlPatientPct: 15, avgCostUSD: 120, premiumTier: true,
    expansionPlans: "AI diagnostics lab, gene therapy center",
    strengthScore: { quality: 90, tech: 95, brand: 92, access: 75, price: 50, intl: 80 },
    marketShare: 22, color: "#2E8B57", growthRate: 18, staffCount: 1800, doctorCount: 350,
    insurancePartners: 50, patientSat: 4.4, digitalScore: 91,
  },
  {
    id: "tamanh", name: "Tam Anh Hospital", shortName: "Tam Anh", type: "Private Domestic", founded: 2019, beds: 500,
    ownership: "Private (Dr. Nguyen Van Phung)", jci: false, jciYear: null, location: "District 8 & Thu Duc",
    specialties: ["Cardiology", "IVF", "Orthopedics", "Neurology", "Urology"],
    estRevenue: 100, estPatients: 600000, intlPatientPct: 5, avgCostUSD: 60, premiumTier: false,
    expansionPlans: "Rapid multi-site expansion, 1000-bed Thu Duc campus",
    strengthScore: { quality: 82, tech: 80, brand: 78, access: 92, price: 80, intl: 35 },
    marketShare: 16, color: "#E07B39", growthRate: 35, staffCount: 2500, doctorCount: 500,
    insurancePartners: 30, patientSat: 4.2, digitalScore: 70,
  },
  {
    id: "aih", name: "AIH Hospital", shortName: "AIH", type: "Private International", founded: 2017, beds: 120,
    ownership: "Hoang Anh Gia Lai Group (HAG)", jci: false, jciYear: null, location: "District 2 (Thu Duc)",
    specialties: ["General Surgery", "Orthopedics", "Cardiology", "Gastro", "Aesthetics"],
    estRevenue: 40, estPatients: 120000, intlPatientPct: 20, avgCostUSD: 130, premiumTier: true,
    expansionPlans: "Specialty center expansion, medical tourism packages",
    strengthScore: { quality: 80, tech: 75, brand: 68, access: 55, price: 45, intl: 78 },
    marketShare: 5, color: "#8E44AD", growthRate: 8, staffCount: 450, doctorCount: 100,
    insurancePartners: 25, patientSat: 4.3, digitalScore: 65,
  },
  {
    id: "choray", name: "Cho Ray Hospital", shortName: "Cho Ray", type: "Public Flagship", founded: 1900, beds: 2200,
    ownership: "Ministry of Health", jci: false, jciYear: null, location: "District 5",
    specialties: ["Trauma", "Organ Transplant", "Oncology", "Cardiology", "Neurosurgery"],
    estRevenue: 200, estPatients: 2500000, intlPatientPct: 2, avgCostUSD: 15, premiumTier: false,
    expansionPlans: "Cho Ray 2 (Binh Chanh) 1000-bed campus",
    strengthScore: { quality: 75, tech: 70, brand: 85, access: 95, price: 95, intl: 20 },
    marketShare: 25, color: "#C0392B", growthRate: 5, staffCount: 5000, doctorCount: 800,
    insurancePartners: 10, patientSat: 3.5, digitalScore: 40,
  },
  {
    id: "umcmed", name: "UMC Medical Center", shortName: "UMC", type: "Public-Private", founded: 2020, beds: 200,
    ownership: "University Medical Center (Hybrid)", jci: false, jciYear: null, location: "District 3",
    specialties: ["Oncology", "Cardiology", "Transplant", "Trauma", "Research"],
    estRevenue: 80, estPatients: 400000, intlPatientPct: 5, avgCostUSD: 40, premiumTier: false,
    expansionPlans: "Research-led specialty clusters",
    strengthScore: { quality: 80, tech: 78, brand: 75, access: 80, price: 75, intl: 40 },
    marketShare: 10, color: "#2980B9", growthRate: 10, staffCount: 2000, doctorCount: 450,
    insurancePartners: 15, patientSat: 3.8, digitalScore: 55,
  },
  {
    id: "hanhphuc", name: "Hanh Phuc Int'l Hospital", shortName: "Hanh Phuc", type: "Private Domestic", founded: 2016, beds: 150,
    ownership: "Private", jci: false, jciYear: null, location: "Binh Duong",
    specialties: ["Obstetrics", "Pediatrics", "IVF", "Neonatal", "Women's Health"],
    estRevenue: 35, estPatients: 150000, intlPatientPct: 8, avgCostUSD: 80, premiumTier: false,
    expansionPlans: "Niche women's + children's brand growth",
    strengthScore: { quality: 78, tech: 72, brand: 65, access: 60, price: 60, intl: 50 },
    marketShare: 4, color: "#E91E63", growthRate: 15, staffCount: 500, doctorCount: 110,
    insurancePartners: 20, patientSat: 4.3, digitalScore: 60,
  },
];

const TRENDS = [
  { year: 2019, private: 32, public: 68, medTourism: 150, digitalHealth: 20 },
  { year: 2020, private: 33, public: 67, medTourism: 60, digitalHealth: 45 },
  { year: 2021, private: 36, public: 64, medTourism: 80, digitalHealth: 65 },
  { year: 2022, private: 38, public: 62, medTourism: 180, digitalHealth: 72 },
  { year: 2023, private: 40, public: 60, medTourism: 280, digitalHealth: 80 },
  { year: 2024, private: 42, public: 58, medTourism: 380, digitalHealth: 85 },
  { year: "2025E", private: 45, public: 55, medTourism: 480, digitalHealth: 90 },
];

const SWOT = {
  strengths: ["Young, growing urban population (22M+ in southern region)", "Government prioritization of healthcare modernization", "Strong private investment pipeline (Vingroup, foreign PE)", "Medical tourism cost advantage vs. Singapore/Thailand"],
  weaknesses: ["Severe physician shortage (9 doctors per 10,000 people)", "Public hospital overcrowding (300%+ capacity common)", "Limited health data infrastructure and interoperability", "Fragmented regulatory framework for private sector"],
  opportunities: ["Medical tourism from ASEAN, Japan, Korea", "Digital health / telemedicine post-COVID adoption", "Specialty care gaps (oncology, cardiology, neurology)", "Public-private partnership models expanding", "AI diagnostics and health-tech startup ecosystem"],
  threats: ["Brain drain of physicians to private sector / abroad", "Regulatory uncertainty on foreign ownership caps", "Rising costs eroding affordability advantage", "Competition from Thai, Malaysian medical tourism hubs"],
};

const MARKET_DATA = { totalMarketSize: 4200, cagr: 12.5, populationServed: 22000000, hospitalsTotal: 400, bedsPerThousand: 2.8, oopExpenditure: 45 };

const SPECIALTY_POOLS = {
  hvti: { label: "Heart / Vascular / Thoracic Interventional", domestic: 420000, intl: 18000, growthDom: 8, growthIntl: 18, avgRevDom: 2800, avgRevIntl: 8500 },
  oncology: { label: "Oncology", domestic: 310000, intl: 14000, growthDom: 10, growthIntl: 22, avgRevDom: 4200, avgRevIntl: 12000 },
  neurology: { label: "Neurology", domestic: 250000, intl: 9000, growthDom: 7, growthIntl: 15, avgRevDom: 2200, avgRevIntl: 7000 },
};

const SIM_HOSPITALS = ["fv", "vinmec", "tamanh", "choray", "aih"];

const DEFAULT_SHARES = {
  hvti:      { fv: { dom: 12, intl: 30 }, vinmec: { dom: 18, intl: 25 }, tamanh: { dom: 22, intl: 5 }, choray: { dom: 35, intl: 3 }, aih: { dom: 5, intl: 15 } },
  oncology:  { fv: { dom: 14, intl: 32 }, vinmec: { dom: 22, intl: 28 }, tamanh: { dom: 10, intl: 3 }, choray: { dom: 38, intl: 5 }, aih: { dom: 4, intl: 12 } },
  neurology: { fv: { dom: 15, intl: 28 }, vinmec: { dom: 20, intl: 30 }, tamanh: { dom: 18, intl: 5 }, choray: { dom: 32, intl: 4 }, aih: { dom: 6, intl: 14 } },
};

const TOURISM_SOURCE_MARKETS = [
  { country: "Cambodia", patients: 45000, avgSpend: 3200, growth: 12, procedures: "General surgery, dental, diagnostics", color: "#4FC3F7" },
  { country: "Laos", patients: 18000, avgSpend: 2800, growth: 10, procedures: "Cardiology, cancer screening, IVF", color: "#66BB6A" },
  { country: "Japan", patients: 12000, avgSpend: 8500, growth: 25, procedures: "Dental, aesthetics, health checks", color: "#EF5350" },
  { country: "S. Korea", patients: 8000, avgSpend: 7200, growth: 22, procedures: "IVF, dental, orthopedics", color: "#AB47BC" },
  { country: "Taiwan", patients: 6000, avgSpend: 5800, growth: 18, procedures: "Dental, health screening, aesthetics", color: "#FFB74D" },
  { country: "China", patients: 15000, avgSpend: 6000, growth: 30, procedures: "IVF, oncology, aesthetics", color: "#FF7043" },
  { country: "AU/NZ (Viet Kieu)", patients: 10000, avgSpend: 4500, growth: 15, procedures: "Dental, aesthetics, orthopedics", color: "#26C6DA" },
  { country: "US/EU (Viet Kieu)", patients: 8000, avgSpend: 5000, growth: 14, procedures: "Dental, IVF, aesthetics, family care", color: "#78909C" },
];

const COST_COMPARISON = [
  { procedure: "Coronary Bypass", hcmc: 12000, bangkok: 26000, singapore: 75000, kl: 20000, seoul: 40000 },
  { procedure: "Hip Replacement", hcmc: 7500, bangkok: 17000, singapore: 35000, kl: 12000, seoul: 22000 },
  { procedure: "IVF Cycle", hcmc: 4000, bangkok: 8000, singapore: 15000, kl: 6500, seoul: 10000 },
  { procedure: "Dental Implant", hcmc: 800, bangkok: 1800, singapore: 3500, kl: 1500, seoul: 2200 },
  { procedure: "Full Health Check", hcmc: 250, bangkok: 500, singapore: 1200, kl: 400, seoul: 700 },
  { procedure: "Brain Tumor Surgery", hcmc: 8000, bangkok: 22000, singapore: 60000, kl: 18000, seoul: 35000 },
  { procedure: "Cataract Surgery", hcmc: 600, bangkok: 2000, singapore: 5000, kl: 1800, seoul: 3000 },
];

const TOURISM_PROJECTIONS = [
  { year: 2022, patients: 80, revenue: 280 },
  { year: 2023, patients: 120, revenue: 420 },
  { year: 2024, patients: 155, revenue: 580 },
  { year: "2025E", patients: 200, revenue: 780 },
  { year: "2026E", patients: 260, revenue: 1050 },
  { year: "2027E", patients: 340, revenue: 1400 },
  { year: "2028E", patients: 430, revenue: 1850 },
];

const HOSPITAL_TOURISM_SHARE = [
  { name: "FV", share: 32, focus: "Full-service international, JCI premium", color: "#1B6B93" },
  { name: "Vinmec", share: 22, focus: "Tech-forward, Vinpearl bundling", color: "#2E8B57" },
  { name: "AIH", share: 14, focus: "Medical tourism packages, bilingual", color: "#8E44AD" },
  { name: "Hanh Phuc", share: 8, focus: "IVF/fertility niche tourism", color: "#E91E63" },
  { name: "Others", share: 24, focus: "Dental clinics, aesthetics centers", color: "#546E7A" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(15,20,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#e0e0e0", backdropFilter: "blur(8px)" }}>
      <div style={{ fontWeight: 700, marginBottom: 4, color: "#fff" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color || p.fill, display: "inline-block" }} />
          <span>{p.name}: <strong style={{ color: "#fff" }}>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong></span>
        </div>
      ))}
    </div>
  );
};

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3;
  return (
    <span style={{ letterSpacing: 1 }}>
      {"★".repeat(full)}{half ? "½" : ""}
      <span style={{ opacity: 0.2 }}>{"★".repeat(5 - full - (half ? 1 : 0))}</span>
      <span style={{ fontSize: 11, marginLeft: 4, opacity: 0.7 }}>{rating}</span>
    </span>
  );
};

const tabs = [
  { id: "overview", label: "Market Overview" },
  { id: "hospitals", label: "Hospital Profiles" },
  { id: "compare", label: "Competitive Matrix" },
  { id: "positioning", label: "Strategic Map" },
  { id: "simulator", label: "⚡ Capture Simulator", accent: true },
  { id: "medtourism", label: "✈️ Med Tourism", accent: true },
  { id: "trends", label: "Trends & Outlook" },
  { id: "swot", label: "SWOT" },
];

export default function HealthcareDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [compareSet, setCompareSet] = useState(["fv", "vinmec", "tamanh"]);
  const [animateIn, setAnimateIn] = useState(false);
  const [simShares, setSimShares] = useState(JSON.parse(JSON.stringify(DEFAULT_SHARES)));
  const [simSpecialty, setSimSpecialty] = useState("hvti");
  const [simYearOffset, setSimYearOffset] = useState(0);

  useEffect(() => {
    setAnimateIn(false);
    const t = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(t);
  }, [activeTab]);

  const updateShare = (specialty, hospId, type, val) => {
    setSimShares(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[specialty][hospId][type] = Math.max(0, Math.min(60, Number(val)));
      return next;
    });
  };

  const S = {
    page: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0a0f1a", color: "#d4d8e0", minHeight: "100vh" },
    header: { background: "linear-gradient(135deg, #0a1628 0%, #132744 50%, #1a3a5c 100%)", padding: "32px 28px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" },
    tabBar: { display: "flex", gap: 0, background: "rgba(10,15,26,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", overflowX: "auto", WebkitOverflowScrolling: "touch" },
    tab: (on, acc) => ({ padding: "12px 16px", fontSize: 11.5, fontWeight: on ? 700 : 500, color: on ? (acc ? "#FFB74D" : "#4FC3F7") : "rgba(180,200,220,0.55)", background: on && acc ? "rgba(255,183,77,0.06)" : "transparent", border: "none", borderBottom: on ? `2px solid ${acc ? "#FFB74D" : "#4FC3F7"}` : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s", letterSpacing: 0.2 }),
    content: { padding: "24px 20px", maxWidth: 1200, margin: "0 auto", opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(12px)", transition: "all 0.4s ease" },
    card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20, marginBottom: 16 },
    cardTitle: { fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 },
    kpiRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 20 },
    kpi: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "14px 12px", textAlign: "center" },
    kpiV: { fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1 },
    kpiL: { fontSize: 9, color: "rgba(180,200,220,0.5)", marginTop: 6, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 },
    badge: (c) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: `${c}22`, color: c, border: `1px solid ${c}44` }),
    hCard: (c, sel) => ({ background: sel ? `${c}15` : "rgba(255,255,255,0.02)", border: `1px solid ${sel ? c : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: 16, cursor: "pointer", transition: "all 0.25s", borderLeft: `3px solid ${c}` }),
    g2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 },
    mL: { fontSize: 10, color: "rgba(180,200,220,0.45)", textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600 },
    dR: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" },
  };

  /* ── OVERVIEW ── */
  const renderOverview = () => (
    <div>
      <div style={S.kpiRow}>
        {[{ v: `$${MARKET_DATA.totalMarketSize}M`, l: "Market Size", c: "#4FC3F7" }, { v: `${MARKET_DATA.cagr}%`, l: "CAGR", c: "#66BB6A" }, { v: `${MARKET_DATA.populationServed / 1e6}M`, l: "Population", c: "#fff" }, { v: MARKET_DATA.hospitalsTotal, l: "Hospitals", c: "#fff" }, { v: MARKET_DATA.bedsPerThousand, l: "Beds/1K", c: "#fff" }, { v: `${MARKET_DATA.oopExpenditure}%`, l: "OOP Spend", c: "#fff" }].map((k, i) => (
          <div key={i} style={S.kpi}><div style={{ ...S.kpiV, color: k.c }}>{k.v}</div><div style={S.kpiL}>{k.l}</div></div>
        ))}
      </div>
      <div style={S.g2}>
        <div style={S.card}>
          <div style={S.cardTitle}><span>📊</span> Market Share</div>
          <ResponsiveContainer width="100%" height={270}>
            <PieChart><Pie data={HOSPITALS} dataKey="marketShare" nameKey="shortName" cx="50%" cy="50%" outerRadius={95} innerRadius={48} paddingAngle={2} stroke="none">{HOSPITALS.map(h => <Cell key={h.id} fill={h.color} />)}</Pie>
              <Tooltip content={({ active, payload }) => active && payload?.[0] ? <div style={{ background: "rgba(15,20,30,0.92)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#fff" }}><strong>{payload[0].name}</strong>: {payload[0].value}%</div> : null} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
            {HOSPITALS.map(h => <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: h.color }} /><span style={{ color: "rgba(200,210,220,0.7)" }}>{h.shortName} {h.marketShare}%</span></div>)}
          </div>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}><span>💰</span> Revenue vs. Patient Volume</div>
          <ResponsiveContainer width="100%" height={290}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="x" name="Patients (K)" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} label={{ value: "Annual Patients (K)", position: "bottom", offset: 10, style: { fontSize: 10, fill: "rgba(180,200,220,0.4)" } }} />
              <YAxis dataKey="y" name="Revenue ($M)" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} label={{ value: "Revenue ($M)", angle: -90, position: "insideLeft", style: { fontSize: 10, fill: "rgba(180,200,220,0.4)" } }} />
              <ZAxis dataKey="z" range={[200, 1200]} />
              <Tooltip content={({ active, payload }) => active && payload?.[0] ? <div style={{ background: "rgba(15,20,30,0.92)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#fff" }}><strong>{payload[0].payload.name}</strong><br />Patients: {payload[0].payload.x}K | Rev: ${payload[0].payload.y}M</div> : null} />
              <Scatter data={HOSPITALS.map(h => ({ name: h.shortName, x: Math.round(h.estPatients / 1000), y: h.estRevenue, z: h.beds, fill: h.color }))}>{HOSPITALS.map(h => <Cell key={h.id} fill={h.color} />)}</Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={S.card}>
        <div style={S.cardTitle}><span>🏥</span> Capacity & Infrastructure</div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={HOSPITALS.map(h => ({ name: h.shortName, Beds: h.beds, Doctors: h.doctorCount, "Staff÷10": Math.round(h.staffCount / 10) }))}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" /><XAxis dataKey="name" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><YAxis tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><Tooltip content={CustomTooltip} /><Legend wrapperStyle={{ fontSize: 11 }} /><Bar dataKey="Beds" fill="#4FC3F7" radius={[4, 4, 0, 0]} /><Bar dataKey="Doctors" fill="#66BB6A" radius={[4, 4, 0, 0]} /><Bar dataKey="Staff÷10" fill="#FFB74D" radius={[4, 4, 0, 0]} /></BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  /* ── HOSPITAL PROFILES ── */
  const renderHospitals = () => {
    const h = selectedHospital ? HOSPITALS.find(x => x.id === selectedHospital) : null;
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))", gap: 12, marginBottom: 20 }}>
          {HOSPITALS.map(hp => (
            <div key={hp.id} style={S.hCard(hp.color, selectedHospital === hp.id)} onClick={() => setSelectedHospital(selectedHospital === hp.id ? null : hp.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div><div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{hp.shortName}</div><div style={{ fontSize: 10, color: "rgba(180,200,220,0.5)", marginTop: 2 }}>{hp.name}</div></div>
                <span style={S.badge(hp.color)}>{hp.type}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 11 }}>
                <div><span style={{ color: "rgba(180,200,220,0.4)" }}>Beds:</span> <strong style={{ color: "#fff" }}>{hp.beds}</strong></div>
                <div><span style={{ color: "rgba(180,200,220,0.4)" }}>Rev:</span> <strong style={{ color: "#fff" }}>${hp.estRevenue}M</strong></div>
                <div><span style={{ color: "rgba(180,200,220,0.4)" }}>Growth:</span> <strong style={{ color: "#66BB6A" }}>+{hp.growthRate}%</strong></div>
                <div><span style={{ color: "rgba(180,200,220,0.4)" }}>Intl:</span> <strong style={{ color: "#fff" }}>{hp.intlPatientPct}%</strong></div>
              </div>
              <div style={{ marginTop: 8 }}><StarRating rating={hp.patientSat} /></div>
            </div>
          ))}
        </div>
        {h && (
          <div style={{ ...S.card, borderLeft: `3px solid ${h.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
              <div><div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{h.name}</div><div style={{ fontSize: 12, color: "rgba(180,200,220,0.5)", marginTop: 4 }}>{h.location} · Founded {h.founded} · {h.ownership}</div></div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{h.jci && <span style={S.badge("#FFD700")}>JCI ({h.jciYear})</span>}<span style={S.badge(h.premiumTier ? "#E91E63" : "#78909C")}>{h.premiumTier ? "Premium" : "Mid-Tier"}</span></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              <div>
                <div style={S.mL}>Key Metrics</div>
                {[["Beds", h.beds], ["Patients (est.)", `${(h.estPatients / 1000).toFixed(0)}K`], ["Revenue", `$${h.estRevenue}M`], ["Avg Cost", `$${h.avgCostUSD}`], ["Intl Mix", `${h.intlPatientPct}%`], ["Growth", `+${h.growthRate}%`], ["Staff", h.staffCount.toLocaleString()], ["Physicians", h.doctorCount], ["Insurers", h.insurancePartners], ["Digital Score", `${h.digitalScore}/100`]].map(([l, v], i) => (
                  <div key={i} style={S.dR}><span style={{ fontSize: 12, color: "rgba(180,200,220,0.6)" }}>{l}</span><span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{v}</span></div>
                ))}
              </div>
              <div>
                <div style={S.mL}>Strengths Radar</div>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={Object.entries(h.strengthScore).map(([k, v]) => ({ m: k.charAt(0).toUpperCase() + k.slice(1), v }))}><PolarGrid stroke="rgba(255,255,255,0.08)" /><PolarAngleAxis dataKey="m" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.6)" }} /><PolarRadiusAxis tick={false} domain={[0, 100]} /><Radar dataKey="v" stroke={h.color} fill={h.color} fillOpacity={0.25} strokeWidth={2} /></RadarChart>
                </ResponsiveContainer>
                <div style={{ marginTop: 10 }}><div style={S.mL}>Specialties</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>{h.specialties.map(sp => <span key={sp} style={{ ...S.badge(h.color), fontSize: 10 }}>{sp}</span>)}</div></div>
                <div style={{ marginTop: 10 }}><div style={S.mL}>Expansion</div><div style={{ fontSize: 12, color: "rgba(200,210,220,0.75)", marginTop: 4, lineHeight: 1.5 }}>{h.expansionPlans}</div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ── COMPETITIVE MATRIX ── */
  const renderCompare = () => {
    const sel = HOSPITALS.filter(h => compareSet.includes(h.id));
    const rd = ["quality", "tech", "brand", "access", "price", "intl"].map(m => { const o = { metric: m.charAt(0).toUpperCase() + m.slice(1) }; sel.forEach(h => { o[h.shortName] = h.strengthScore[m]; }); return o; });
    return (
      <div>
        <div style={{ ...S.card, padding: "12px 16px" }}>
          <div style={{ fontSize: 12, color: "rgba(180,200,220,0.5)", marginBottom: 8 }}>Toggle hospitals:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {HOSPITALS.map(h => <button key={h.id} onClick={() => setCompareSet(p => p.includes(h.id) ? p.filter(x => x !== h.id) : [...p, h.id])} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, border: `1px solid ${h.color}`, background: compareSet.includes(h.id) ? `${h.color}33` : "transparent", color: compareSet.includes(h.id) ? h.color : "rgba(180,200,220,0.5)", cursor: "pointer" }}>{h.shortName}</button>)}
          </div>
        </div>
        {sel.length > 0 && <>
          <div style={S.card}>
            <div style={S.cardTitle}><span>🎯</span> Multi-Dimensional Comparison</div>
            <ResponsiveContainer width="100%" height={310}><RadarChart data={rd}><PolarGrid stroke="rgba(255,255,255,0.06)" /><PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "rgba(180,200,220,0.6)" }} /><PolarRadiusAxis tick={false} domain={[0, 100]} />{sel.map(h => <Radar key={h.id} name={h.shortName} dataKey={h.shortName} stroke={h.color} fill={h.color} fillOpacity={0.12} strokeWidth={2} />)}<Legend wrapperStyle={{ fontSize: 11 }} /><Tooltip content={CustomTooltip} /></RadarChart></ResponsiveContainer>
          </div>
          <div style={S.card}>
            <div style={S.cardTitle}><span>📋</span> Head-to-Head</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 560 }}>
                <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}><th style={{ textAlign: "left", padding: "8px 10px", color: "rgba(180,200,220,0.5)", fontSize: 10, fontWeight: 600, textTransform: "uppercase" }}>Metric</th>{sel.map(h => <th key={h.id} style={{ textAlign: "center", padding: "8px 10px", color: h.color, fontSize: 11, fontWeight: 700 }}>{h.shortName}</th>)}</tr></thead>
                <tbody>
                  {[{ l: "Beds", k: "beds" }, { l: "JCI", k: "jci", f: v => v ? "✓" : "—" }, { l: "Revenue", k: "estRevenue", f: v => `$${v}M` }, { l: "Patients", k: "estPatients", f: v => `${(v / 1000).toFixed(0)}K` }, { l: "Intl %", k: "intlPatientPct", f: v => `${v}%` }, { l: "Cost/Visit", k: "avgCostUSD", f: v => `$${v}` }, { l: "Growth", k: "growthRate", f: v => `+${v}%` }, { l: "Satisfaction", k: "patientSat", f: v => `${v}/5` }, { l: "Digital", k: "digitalScore", f: v => `${v}/100` }, { l: "Share", k: "marketShare", f: v => `${v}%` }].map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={{ padding: "8px 10px", color: "rgba(180,200,220,0.6)" }}>{r.l}</td>
                      {sel.map(h => <td key={h.id} style={{ textAlign: "center", padding: "8px 10px", color: "#fff" }}>{r.f ? r.f(h[r.k]) : h[r.k]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>}
      </div>
    );
  };

  /* ── STRATEGIC MAP ── */
  const renderPositioning = () => (
    <div>
      <div style={S.card}>
        <div style={S.cardTitle}><span>🗺️</span> Price vs. Quality Positioning</div>
        <div style={{ position: "relative", height: 380, background: "rgba(0,0,0,0.2)", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "rgba(180,200,220,0.3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Higher Quality →</div>
          <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 10, color: "rgba(180,200,220,0.3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Higher Price →</div>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", height: "90%" }}>
            <div style={{ position: "absolute", width: "100%", height: "1px", top: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ position: "absolute", height: "100%", width: "1px", left: "50%", background: "rgba(255,255,255,0.06)" }} />
            {[["VALUE", 4, 4, "left"], ["PREMIUM", 4, null, "right"], ["MASS", null, 4, "left"], ["NICHE", null, null, "right"]].map(([l, t, , ta], i) => <div key={i} style={{ position: "absolute", [t !== null ? "top" : "bottom"]: 4, [i % 2 === 0 ? "left" : "right"]: 4, fontSize: 9, color: "rgba(180,200,220,0.2)", fontWeight: 600, textAlign: ta }}>{l}</div>)}
            {HOSPITALS.map(h => {
              const qN = (h.strengthScore.quality - 70) / 30, pN = 1 - (h.strengthScore.price - 35) / 65;
              const x = pN * 85 + 5, y = (1 - qN) * 85 + 5, sz = Math.max(20, h.marketShare * 2.5);
              return <div key={h.id} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", textAlign: "center" }}><div style={{ width: sz, height: sz, borderRadius: "50%", background: `${h.color}44`, border: `2px solid ${h.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: "#fff", margin: "0 auto" }}>{h.marketShare}%</div><div style={{ fontSize: 10, fontWeight: 700, color: h.color, marginTop: 4, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{h.shortName}</div></div>;
            })}
          </div>
        </div>
      </div>
      <div style={S.g2}>
        <div style={S.card}>
          <div style={S.cardTitle}><span>🚀</span> Growth vs. Share</div>
          <ResponsiveContainer width="100%" height={240}><BarChart data={HOSPITALS.map(h => ({ name: h.shortName, Growth: h.growthRate, Share: h.marketShare })).sort((a, b) => b.Growth - a.Growth)}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" /><XAxis dataKey="name" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><YAxis tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><Tooltip content={CustomTooltip} /><Legend wrapperStyle={{ fontSize: 11 }} /><Bar dataKey="Growth" fill="#66BB6A" radius={[4, 4, 0, 0]} /><Bar dataKey="Share" fill="#4FC3F7" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}><span>💻</span> Digital Readiness</div>
          {[...HOSPITALS].sort((a, b) => b.digitalScore - a.digitalScore).map(h => <div key={h.id} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}><span style={{ fontWeight: 600, color: h.color }}>{h.shortName}</span><span style={{ color: "#fff", fontWeight: 700 }}>{h.digitalScore}/100</span></div><div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${h.digitalScore}%`, height: "100%", background: `linear-gradient(90deg, ${h.color}88, ${h.color})`, borderRadius: 3 }} /></div></div>)}
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════
     CAPTURE SIMULATOR
     ═══════════════════════════════════════════ */
  const renderSimulator = () => {
    const pool = SPECIALTY_POOLS[simSpecialty];
    const yM = Math.pow(1 + pool.growthDom / 100, simYearOffset);
    const yMI = Math.pow(1 + pool.growthIntl / 100, simYearOffset);
    const totalDom = Math.round(pool.domestic * yM);
    const totalIntl = Math.round(pool.intl * yMI);
    const shares = simShares[simSpecialty];
    const tDA = SIM_HOSPITALS.reduce((s, id) => s + shares[id].dom, 0);
    const tIA = SIM_HOSPITALS.reduce((s, id) => s + shares[id].intl, 0);

    const td = SIM_HOSPITALS.map(id => {
      const h = HOSPITALS.find(x => x.id === id);
      const dP = Math.round(totalDom * shares[id].dom / 100);
      const iP = Math.round(totalIntl * shares[id].intl / 100);
      const dR = Math.round(dP * pool.avgRevDom / 1e6 * 10) / 10;
      const iR = Math.round(iP * pool.avgRevIntl / 1e6 * 10) / 10;
      return { id, name: h.shortName, color: h.color, dS: shares[id].dom, iS: shares[id].intl, dP, iP, tP: dP + iP, dR, iR, tR: Math.round((dR + iR) * 10) / 10 };
    });

    return (
      <div>
        <div style={{ ...S.card, borderTop: "2px solid #FFB74D" }}>
          <div style={S.cardTitle}><span style={{ fontSize: 18 }}>🎛️</span> Patient Capture Simulator</div>
          <div style={{ fontSize: 12, color: "rgba(180,200,220,0.55)", marginBottom: 16, lineHeight: 1.6 }}>
            Model how top competitors capture domestic and international patient volume across HVTI, Oncology, and Neurology. Adjust share sliders and projection year to see volume and revenue impact in real time.
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
            {Object.keys(SPECIALTY_POOLS).map(sp => (
              <button key={sp} onClick={() => setSimSpecialty(sp)} style={{ padding: "8px 18px", borderRadius: 24, fontSize: 12, fontWeight: 700, border: simSpecialty === sp ? "2px solid #FFB74D" : "1px solid rgba(255,255,255,0.1)", background: simSpecialty === sp ? "rgba(255,183,77,0.15)" : "transparent", color: simSpecialty === sp ? "#FFB74D" : "rgba(180,200,220,0.6)", cursor: "pointer", textTransform: "uppercase", letterSpacing: 0.5 }}>
                {sp === "hvti" ? "HVTI" : sp.charAt(0).toUpperCase() + sp.slice(1)}
              </button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: "rgba(180,200,220,0.5)" }}>Year:</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#FFB74D", minWidth: 48 }}>{2024 + simYearOffset}</span>
              <input type="range" min={0} max={5} value={simYearOffset} onChange={e => setSimYearOffset(Number(e.target.value))} style={{ width: 110 }} />
              <button onClick={() => setSimShares(JSON.parse(JSON.stringify(DEFAULT_SHARES)))} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(180,200,220,0.6)", cursor: "pointer" }}>Reset</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 20 }}>
            {[{ v: pool.label, l: "Specialty", sm: true }, { v: totalDom.toLocaleString(), l: "Dom. Pool" }, { v: totalIntl.toLocaleString(), l: "Intl. Pool" }, { v: `$${pool.avgRevDom.toLocaleString()}`, l: "Rev/Pat (Dom)" }, { v: `$${pool.avgRevIntl.toLocaleString()}`, l: "Rev/Pat (Intl)" }].map((k, i) => (
              <div key={i} style={{ ...S.kpi, padding: "10px" }}><div style={{ fontSize: k.sm ? 10 : 17, fontWeight: 800, color: i === 0 ? "#FFB74D" : "#fff", lineHeight: 1.2 }}>{k.v}</div><div style={{ ...S.kpiL, fontSize: 8 }}>{k.l}</div></div>
            ))}
          </div>

          {(tDA > 100 || tIA > 100) && <div style={{ background: "rgba(239,83,80,0.1)", border: "1px solid rgba(239,83,80,0.3)", borderRadius: 8, padding: "8px 14px", marginBottom: 16, fontSize: 12, color: "#EF5350" }}>⚠️ Allocation exceeds 100% — {tDA > 100 ? `Dom: ${tDA}% ` : ""}{tIA > 100 ? `Intl: ${tIA}%` : ""}</div>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14, marginBottom: 20 }}>
            {SIM_HOSPITALS.map(id => {
              const h = HOSPITALS.find(x => x.id === id);
              return (
                <div key={id} style={{ background: `${h.color}08`, border: `1px solid ${h.color}22`, borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: h.color, marginBottom: 12 }}>{h.shortName}</div>
                  {["dom", "intl"].map(type => (
                    <div key={type} style={{ marginBottom: type === "dom" ? 12 : 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: "rgba(180,200,220,0.55)" }}>{type === "dom" ? "Domestic" : "International"} Capture</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{shares[id][type]}%</span>
                      </div>
                      <input type="range" min={0} max={60} value={shares[id][type]} onChange={e => updateShare(simSpecialty, id, type, e.target.value)} style={{ width: "100%" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(180,200,220,0.25)", marginTop: 1 }}><span>0%</span><span>60%</span></div>
                    </div>
                  ))}
                </div>
              );
            })}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div style={{ fontSize: 10, color: "rgba(180,200,220,0.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Unallocated (Others)</div>
              <div style={{ display: "flex", gap: 28 }}>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: 30, fontWeight: 800, color: Math.max(0, 100 - tDA) > 0 ? "#66BB6A" : "#EF5350" }}>{Math.max(0, 100 - tDA)}%</div><div style={{ fontSize: 10, color: "rgba(180,200,220,0.4)" }}>Domestic</div></div>
                <div style={{ textAlign: "center" }}><div style={{ fontSize: 30, fontWeight: 800, color: Math.max(0, 100 - tIA) > 0 ? "#4FC3F7" : "#EF5350" }}>{Math.max(0, 100 - tIA)}%</div><div style={{ fontSize: 10, color: "rgba(180,200,220,0.4)" }}>International</div></div>
              </div>
            </div>
          </div>

          <div style={S.g2}>
            <div style={{ ...S.card, marginBottom: 0 }}>
              <div style={S.cardTitle}><span>👥</span> Patient Volume</div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={td.map(d => ({ name: d.name, "Domestic": d.dP, "International": d.iP }))}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" /><XAxis dataKey="name" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><YAxis tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} /><Tooltip content={CustomTooltip} /><Legend wrapperStyle={{ fontSize: 11 }} /><Bar dataKey="Domestic" fill="#66BB6A" stackId="a" radius={[0, 0, 0, 0]} /><Bar dataKey="International" fill="#4FC3F7" stackId="a" radius={[4, 4, 0, 0]} /></BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ ...S.card, marginBottom: 0 }}>
              <div style={S.cardTitle}><span>💵</span> Revenue ($M)</div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={td.map(d => ({ name: d.name, "Dom Rev": d.dR, "Intl Rev": d.iR }))}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" /><XAxis dataKey="name" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><YAxis tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><Tooltip content={CustomTooltip} /><Legend wrapperStyle={{ fontSize: 11 }} /><Bar dataKey="Dom Rev" fill="#FFB74D" stackId="a" radius={[0, 0, 0, 0]} /><Bar dataKey="Intl Rev" fill="#AB47BC" stackId="a" radius={[4, 4, 0, 0]} /></BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ ...S.card, marginTop: 16, marginBottom: 0 }}>
            <div style={S.cardTitle}><span>📊</span> Capture Summary</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 680 }}>
                <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Hospital", "Dom %", "Intl %", "Dom Patients", "Intl Patients", "Total Patients", "Dom Rev", "Intl Rev", "Total Rev"].map((c, i) => <th key={i} style={{ textAlign: i === 0 ? "left" : "right", padding: "8px 8px", color: "rgba(180,200,220,0.5)", fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{c}</th>)}
                </tr></thead>
                <tbody>
                  {td.map(d => (
                    <tr key={d.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td style={{ padding: "8px", fontWeight: 700, color: d.color }}>{d.name}</td>
                      <td style={{ textAlign: "right", padding: "8px", color: "#fff" }}>{d.dS}%</td>
                      <td style={{ textAlign: "right", padding: "8px", color: "#fff" }}>{d.iS}%</td>
                      <td style={{ textAlign: "right", padding: "8px", color: "#66BB6A", fontWeight: 600 }}>{d.dP.toLocaleString()}</td>
                      <td style={{ textAlign: "right", padding: "8px", color: "#4FC3F7", fontWeight: 600 }}>{d.iP.toLocaleString()}</td>
                      <td style={{ textAlign: "right", padding: "8px", color: "#fff", fontWeight: 700 }}>{d.tP.toLocaleString()}</td>
                      <td style={{ textAlign: "right", padding: "8px", color: "#FFB74D" }}>${d.dR}M</td>
                      <td style={{ textAlign: "right", padding: "8px", color: "#AB47BC" }}>${d.iR}M</td>
                      <td style={{ textAlign: "right", padding: "8px", color: "#fff", fontWeight: 800 }}>${d.tR}M</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "2px solid rgba(255,255,255,0.1)" }}>
                    <td style={{ padding: "8px", fontWeight: 700, color: "rgba(180,200,220,0.7)" }}>TOTAL</td>
                    <td style={{ textAlign: "right", padding: "8px", color: tDA > 100 ? "#EF5350" : "#fff", fontWeight: 600 }}>{tDA}%</td>
                    <td style={{ textAlign: "right", padding: "8px", color: tIA > 100 ? "#EF5350" : "#fff", fontWeight: 600 }}>{tIA}%</td>
                    <td style={{ textAlign: "right", padding: "8px", color: "#66BB6A", fontWeight: 700 }}>{td.reduce((s, d) => s + d.dP, 0).toLocaleString()}</td>
                    <td style={{ textAlign: "right", padding: "8px", color: "#4FC3F7", fontWeight: 700 }}>{td.reduce((s, d) => s + d.iP, 0).toLocaleString()}</td>
                    <td style={{ textAlign: "right", padding: "8px", color: "#fff", fontWeight: 800 }}>{td.reduce((s, d) => s + d.tP, 0).toLocaleString()}</td>
                    <td colSpan={2} />
                    <td style={{ textAlign: "right", padding: "8px", color: "#FFB74D", fontWeight: 800, fontSize: 14 }}>${td.reduce((s, d) => s + d.tR, 0).toFixed(1)}M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════
     MEDICAL TOURISM ANALYSIS
     ═══════════════════════════════════════════ */
  const renderMedTourism = () => (
    <div>
      <div style={{ ...S.card, borderTop: "2px solid #26C6DA" }}>
        <div style={S.cardTitle}><span style={{ fontSize: 18 }}>✈️</span> HCMC Medical Tourism — Competitive Analysis</div>
        <div style={{ fontSize: 12, color: "rgba(180,200,220,0.55)", lineHeight: 1.6 }}>Source markets, cost benchmarking vs. regional hubs, hospital-level capture, and growth projections for Ho Chi Minh City's medical tourism sector.</div>
      </div>

      <div style={S.kpiRow}>
        {[{ v: "155K+", l: "Intl Patients (2024)", c: "#26C6DA" }, { v: "$580M", l: "Tourism Rev (2024)", c: "#66BB6A" }, { v: "22%", l: "YoY Growth", c: "#FFB74D" }, { v: "60-80%", l: "Savings vs. SG", c: "#AB47BC" }, { v: "8", l: "Source Markets", c: "#4FC3F7" }, { v: "2", l: "JCI Hospitals", c: "#FFD700" }].map((k, i) => (
          <div key={i} style={S.kpi}><div style={{ ...S.kpiV, color: k.c, fontSize: 21 }}>{k.v}</div><div style={S.kpiL}>{k.l}</div></div>
        ))}
      </div>

      <div style={S.g2}>
        <div style={S.card}>
          <div style={S.cardTitle}><span>🌏</span> Source Markets — Patient Volume</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={[...TOURISM_SOURCE_MARKETS].sort((a, b) => b.patients - a.patients)} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="country" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.6)" }} width={75} />
              <Tooltip content={({ active, payload }) => active && payload?.[0] ? <div style={{ background: "rgba(15,20,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#fff" }}><strong>{payload[0].payload.country}</strong><br />Patients: {payload[0].value.toLocaleString()}<br />Avg Spend: ${payload[0].payload.avgSpend.toLocaleString()}<br />Growth: +{payload[0].payload.growth}%<br /><span style={{ fontSize: 10, color: "rgba(180,200,220,0.5)" }}>{payload[0].payload.procedures}</span></div> : null} />
              <Bar dataKey="patients" radius={[0, 4, 4, 0]}>{TOURISM_SOURCE_MARKETS.sort((a, b) => b.patients - a.patients).map((m, i) => <Cell key={i} fill={m.color} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}><span>💳</span> Avg Spend per Patient</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={[...TOURISM_SOURCE_MARKETS].sort((a, b) => b.avgSpend - a.avgSpend)} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} tickFormatter={v => `$${(v / 1000).toFixed(1)}K`} />
              <YAxis type="category" dataKey="country" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.6)" }} width={75} />
              <Tooltip content={({ active, payload }) => active && payload?.[0] ? <div style={{ background: "rgba(15,20,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#fff" }}><strong>{payload[0].payload.country}</strong>: ${payload[0].value.toLocaleString()}</div> : null} />
              <Bar dataKey="avgSpend" radius={[0, 4, 4, 0]}>{TOURISM_SOURCE_MARKETS.sort((a, b) => b.avgSpend - a.avgSpend).map((m, i) => <Cell key={i} fill={m.color} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}><span>💰</span> Procedure Cost — HCMC vs. Regional Competitors (USD)</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 680 }}>
            <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              {["Procedure", "HCMC", "Bangkok", "KL", "Seoul", "Singapore", "Savings vs SG"].map((c, i) => <th key={i} style={{ textAlign: i === 0 ? "left" : "right", padding: "10px", color: i === 1 ? "#26C6DA" : "rgba(180,200,220,0.5)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{c}</th>)}
            </tr></thead>
            <tbody>{COST_COMPARISON.map((r, i) => {
              const sav = Math.round((1 - r.hcmc / r.singapore) * 100);
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding: "10px", fontWeight: 600, color: "#fff" }}>{r.procedure}</td>
                  <td style={{ textAlign: "right", padding: "10px", color: "#26C6DA", fontWeight: 800 }}>${r.hcmc.toLocaleString()}</td>
                  <td style={{ textAlign: "right", padding: "10px", color: "rgba(200,210,220,0.7)" }}>${r.bangkok.toLocaleString()}</td>
                  <td style={{ textAlign: "right", padding: "10px", color: "rgba(200,210,220,0.7)" }}>${r.kl.toLocaleString()}</td>
                  <td style={{ textAlign: "right", padding: "10px", color: "rgba(200,210,220,0.7)" }}>${r.seoul.toLocaleString()}</td>
                  <td style={{ textAlign: "right", padding: "10px", color: "rgba(200,210,220,0.7)" }}>${r.singapore.toLocaleString()}</td>
                  <td style={{ textAlign: "right", padding: "10px" }}><span style={{ background: "rgba(102,187,106,0.15)", color: "#66BB6A", fontWeight: 800, padding: "3px 10px", borderRadius: 20, fontSize: 11 }}>-{sav}%</span></td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      </div>

      <div style={S.g2}>
        <div style={S.card}>
          <div style={S.cardTitle}><span>📈</span> Growth Projection (2022-2028E)</div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={TOURISM_PROJECTIONS} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#26C6DA" stopOpacity={0.3} /><stop offset="100%" stopColor="#26C6DA" stopOpacity={0} /></linearGradient>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFB74D" stopOpacity={0.3} /><stop offset="100%" stopColor="#FFB74D" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} />
              <YAxis yAxisId="l" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} />
              <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} />
              <Tooltip content={CustomTooltip} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area yAxisId="l" type="monotone" dataKey="patients" stroke="#26C6DA" fill="url(#pg)" strokeWidth={2} name="Patients (K)" />
              <Area yAxisId="r" type="monotone" dataKey="revenue" stroke="#FFB74D" fill="url(#rg)" strokeWidth={2} name="Revenue ($M)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}><span>🏥</span> Hospital Tourism Share</div>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart><Pie data={HOSPITAL_TOURISM_SHARE} dataKey="share" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={38} paddingAngle={2} stroke="none">{HOSPITAL_TOURISM_SHARE.map((h, i) => <Cell key={i} fill={h.color} />)}</Pie>
              <Tooltip content={({ active, payload }) => active && payload?.[0] ? <div style={{ background: "rgba(15,20,30,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#fff" }}><strong>{payload[0].name}</strong>: {payload[0].value}%<br /><span style={{ fontSize: 10, color: "rgba(180,200,220,0.5)" }}>{payload[0].payload.focus}</span></div> : null} />
            </PieChart>
          </ResponsiveContainer>
          {HOSPITAL_TOURISM_SHARE.map(h => <div key={h.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: h.color, flexShrink: 0 }} /><span style={{ fontSize: 11, color: "#fff", fontWeight: 600, minWidth: 58 }}>{h.name} ({h.share}%)</span><span style={{ fontSize: 10, color: "rgba(180,200,220,0.45)" }}>{h.focus}</span></div>)}
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}><span>🆚</span> HCMC vs. Regional Med Tourism Hubs</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {[
            { hub: "Bangkok", icon: "🇹🇭", str: "60+ JCI hospitals, wellness tourism, govt promotion", weak: "Higher costs, political risk", edge: "50-65% lower costs, growing credentials" },
            { hub: "Singapore", icon: "🇸🇬", str: "World-class quality, regulatory trust, R&D hub", weak: "Very high costs, small capacity", edge: "60-85% lower costs, comparable outcomes" },
            { hub: "Kuala Lumpur", icon: "🇲🇾", str: "MHTC promotion, halal tourism, competitive pricing", weak: "Smaller specialty range", edge: "30-45% lower, stronger dental & fertility" },
            { hub: "Seoul", icon: "🇰🇷", str: "Aesthetics leader, advanced cancer care, K-wave brand", weak: "Language barriers, high non-aesthetic costs", edge: "60-75% lower, Korean patient inflow growing" },
          ].map((c, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 14, border: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: 15, marginBottom: 6 }}>{c.icon} <strong style={{ color: "#fff", fontSize: 13 }}>{c.hub}</strong></div>
              {[["Their Strengths", "#66BB6A", c.str], ["Their Weaknesses", "#EF5350", c.weak], ["HCMC's Edge", "#26C6DA", c.edge]].map(([label, color, text]) => (
                <div key={label} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 9, color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 11, color: label === "HCMC's Edge" ? "rgba(200,210,220,0.85)" : "rgba(180,200,220,0.6)", lineHeight: 1.5 }}>{text}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={S.card}>
        <div style={S.cardTitle}><span>📌</span> Strategic Takeaways</div>
        <div style={{ fontSize: 12, color: "rgba(200,210,220,0.7)", lineHeight: 1.8 }}>
          <p style={{ marginBottom: 10 }}><strong style={{ color: "#26C6DA" }}>Cost leadership is HCMC's primary weapon</strong> — procedure costs run 50-85% below Singapore and 30-60% below Bangkok, with the gap widening for complex interventions. This advantage holds as long as labor costs remain competitive.</p>
          <p style={{ marginBottom: 10 }}><strong style={{ color: "#FFB74D" }}>Diaspora (Viet Kieu) is underexploited</strong> — ~18K patients/year from the US, Europe, AU/NZ represent high-spend travelers with cultural ties. Bundling healthcare with family visits is a natural channel no hospital has fully capitalized on.</p>
          <p style={{ marginBottom: 10 }}><strong style={{ color: "#66BB6A" }}>JCI accreditation is the trust bottleneck</strong> — with only FV and Vinmec holding JCI, the pipeline of internationally credentialed facilities is thin. Hospitals targeting tourism (AIH, Hanh Phuc) need to accelerate accreditation.</p>
          <p><strong style={{ color: "#AB47BC" }}>Specialty niches are the differentiation path</strong> — rather than competing head-on with Bangkok's mature ecosystem, HCMC should double down on fertility/IVF, dental, and cardiac where cost advantages are largest and outcomes increasingly competitive.</p>
        </div>
      </div>
    </div>
  );

  /* ── TRENDS ── */
  const renderTrends = () => (
    <div>
      <div style={S.g2}>
        <div style={S.card}>
          <div style={S.cardTitle}><span>⚖️</span> Private vs. Public Share Shift</div>
          <ResponsiveContainer width="100%" height={250}><LineChart data={TRENDS}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" /><XAxis dataKey="year" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><YAxis tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} domain={[0, 100]} /><Tooltip content={CustomTooltip} /><Legend wrapperStyle={{ fontSize: 11 }} /><Line type="monotone" dataKey="private" stroke="#4FC3F7" strokeWidth={2.5} dot={{ r: 4 }} name="Private %" /><Line type="monotone" dataKey="public" stroke="#EF5350" strokeWidth={2.5} dot={{ r: 4 }} name="Public %" /></LineChart></ResponsiveContainer>
        </div>
        <div style={S.card}>
          <div style={S.cardTitle}><span>✈️</span> Medical Tourism Revenue ($M)</div>
          <ResponsiveContainer width="100%" height={250}><BarChart data={TRENDS}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" /><XAxis dataKey="year" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><YAxis tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><Tooltip content={CustomTooltip} /><Bar dataKey="medTourism" fill="#FFB74D" name="Rev ($M)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
        </div>
      </div>
      <div style={S.card}>
        <div style={S.cardTitle}><span>📡</span> Digital Health Adoption</div>
        <ResponsiveContainer width="100%" height={210}><LineChart data={TRENDS}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" /><XAxis dataKey="year" tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} /><YAxis tick={{ fontSize: 10, fill: "rgba(180,200,220,0.5)" }} domain={[0, 100]} /><Tooltip content={CustomTooltip} /><Line type="monotone" dataKey="digitalHealth" stroke="#AB47BC" strokeWidth={2.5} dot={{ r: 4 }} name="Index" /></LineChart></ResponsiveContainer>
      </div>
      <div style={S.card}>
        <div style={S.cardTitle}><span>🔮</span> Key Market Signals</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {[
            { i: "🏗️", t: "Capacity Expansion", d: "8,000+ new private beds planned by 2027. Tam Anh and Vinmec leading multi-campus strategies." },
            { i: "🤖", t: "AI & Health-Tech", d: "Vinmec investing in AI diagnostics. VinBrain developing FDA-pathway imaging tools." },
            { i: "🌏", t: "Medical Tourism", d: "Government targeting $2B tourism revenue by 2030. HCMC positioned as dental, ortho, and fertility hub." },
            { i: "📱", t: "Telemedicine", d: "40% of private hospitals now offer digital consultations. Post-COVID acceleration continuing." },
            { i: "💼", t: "PE/VC Activity", d: "TPG, VinaCapital, and regional funds actively exploring hospital chains." },
            { i: "⚕️", t: "Workforce Gap", d: "Critical specialist shortage. Aggressive competition for cardiologists, oncologists, and surgeons." },
          ].map((s, i) => <div key={i} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 14, border: "1px solid rgba(255,255,255,0.04)" }}><div style={{ fontSize: 20, marginBottom: 6 }}>{s.i}</div><div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{s.t}</div><div style={{ fontSize: 11, color: "rgba(180,200,220,0.6)", lineHeight: 1.6 }}>{s.d}</div></div>)}
        </div>
      </div>
    </div>
  );

  /* ── SWOT ── */
  const renderSwot = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {[{ k: "strengths", l: "Strengths", i: "💪", c: "#66BB6A" }, { k: "weaknesses", l: "Weaknesses", i: "⚠️", c: "#EF5350" }, { k: "opportunities", l: "Opportunities", i: "🎯", c: "#4FC3F7" }, { k: "threats", l: "Threats", i: "🔥", c: "#FFB74D" }].map(sec => (
          <div key={sec.k} style={{ ...S.card, background: `${sec.c}08`, borderColor: `${sec.c}22` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: sec.c, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><span>{sec.i}</span> {sec.l}</div>
            {SWOT[sec.k].map((item, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: sec.c, marginTop: 5, flexShrink: 0 }} /><span style={{ fontSize: 12, color: "rgba(200,210,220,0.8)", lineHeight: 1.6 }}>{item}</span></div>)}
          </div>
        ))}
      </div>
      <div style={{ ...S.card, marginTop: 16 }}>
        <div style={S.cardTitle}><span>📌</span> Landscape Summary</div>
        <div style={{ fontSize: 12, color: "rgba(200,210,220,0.7)", lineHeight: 1.8 }}>
          <p style={{ marginBottom: 12 }}>Southern Vietnam's healthcare market is at an inflection point. The private sector is rapidly closing the quality gap, driven by Vingroup, Tam Anh, and foreign capital.</p>
          <p style={{ marginBottom: 12 }}><strong style={{ color: "#fff" }}>FV</strong> leads international capture. <strong style={{ color: "#fff" }}>Vinmec</strong> leverages Vingroup's ecosystem. <strong style={{ color: "#fff" }}>Tam Anh</strong> is scaling fastest with accessibility-first positioning. <strong style={{ color: "#fff" }}>AIH</strong> targets medical tourism. <strong style={{ color: "#fff" }}>Cho Ray</strong> retains volume dominance but faces structural constraints.</p>
          <p>Physician shortages, specialty gaps, rising middle-class demand, and untapped medical tourism create significant openings for well-capitalized, tech-enabled players.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        input[type="range"] { -webkit-appearance: none; height: 5px; border-radius: 4px; outline: none; cursor: pointer; background: rgba(255,255,255,0.1); }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #FFB74D; border: 2px solid #0a0f1a; cursor: pointer; box-shadow: 0 0 6px rgba(255,183,77,0.4); }
        input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #FFB74D; border: 2px solid #0a0f1a; cursor: pointer; }
      `}</style>
      <div style={S.header}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, color: "#fff", lineHeight: 1.2 }}><span style={{ color: "#4FC3F7" }}>Southern Vietnam</span> Healthcare</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginTop: 2 }}>Competitive Landscape Intelligence</div>
        <div style={{ fontSize: 13, color: "rgba(180,200,220,0.7)", marginTop: 6 }}>HCMC & surrounding provinces · Private & public analysis · 2024-2025 estimates</div>
      </div>
      <div style={S.tabBar}>{tabs.map(t => <button key={t.id} style={S.tab(activeTab === t.id, t.accent)} onClick={() => setActiveTab(t.id)}>{t.label}</button>)}</div>
      <div style={S.content}>
        {activeTab === "overview" && renderOverview()}
        {activeTab === "hospitals" && renderHospitals()}
        {activeTab === "compare" && renderCompare()}
        {activeTab === "positioning" && renderPositioning()}
        {activeTab === "simulator" && renderSimulator()}
        {activeTab === "medtourism" && renderMedTourism()}
        {activeTab === "trends" && renderTrends()}
        {activeTab === "swot" && renderSwot()}
      </div>
      <div style={{ textAlign: "center", padding: "20px 16px 32px", fontSize: 10, color: "rgba(180,200,220,0.25)" }}>Data: MOH Vietnam, hospital disclosures, Fitch/BMI, analyst estimates. Approximations for competitive analysis.</div>
    </div>
  );
}
