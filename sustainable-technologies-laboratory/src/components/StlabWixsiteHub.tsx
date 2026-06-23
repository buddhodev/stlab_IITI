import React from "react";
import { DISSERTATIONS, PATENTS, OTHER_PUBLICATIONS } from "../publicationsData";
import { 
  Home, 
  Users, 
  BookOpen, 
  Phone, 
  MapPin, 
  Mail, 
  Globe, 
  Cpu, 
  GraduationCap, 
  Atom, 
  Award, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Zap,
  Layers,
  Database,
  Play,
  Sprout,
  TrendingUp,
  Briefcase,
  Building,
  Video,
  Search,
  Radio,
  Tv,
  Image,
  Camera,
  Upload,
  Trash2,
  Heart,
  Sparkles,
  CloudSun,
  Newspaper,
  Megaphone,
  Check
} from "lucide-react";

interface StlabWixsiteHubProps {
  activeTab: "home" | "news" | "people" | "research" | "publications" | "learning" | "contact" | "gallery" | "weather";
  setActiveTab: (tab: "home" | "news" | "people" | "research" | "publications" | "learning" | "contact" | "gallery" | "weather") => void;
}

export default function StlabWixsiteHub({ activeTab, setActiveTab }: StlabWixsiteHubProps) {

  const [formName, setFormName] = React.useState("");
  const [formDesignation, setFormDesignation] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
  const [formQuery, setFormQuery] = React.useState("");
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formStatus, setFormStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [pubFilter, setPubFilter] = React.useState<"all" | "dissertations" | "patents" | "journals" | "books">("all");
  const [pubSearch, setPubSearch] = React.useState("");
  const [imgError, setImgError] = React.useState(false);
  const [activeSelectedMember, setActiveSelectedMember] = React.useState<"ganti" | "sagnik" | "kavita" | "neha" | "amit" | "buddhodev">("ganti");
  const [newsFilter, setNewsFilter] = React.useState<"active" | "archive">("active");

  const [memories, setMemories] = React.useState<{ id: string; url: string; year: string; fileName: string; displayName: string; errorNotes: string }[]>(() => {
    return [
      { 
        id: "7", 
        url: "/assets/Thesis_Submission_of_Mr_Abhishek_D_Kalbande.jpeg", 
        year: "2026",
        fileName: "Thesis_Submission_of_Mr_Abhishek_D_Kalbande",
        displayName: "STLab's Doctoral Scholar Mr. Abhishek D. Kalbande submitting his Ph.D. Thesis",
        errorNotes: ""
      },
      { 
        id: "8", 
        url: "/assets/Prof_Murthy_with_Foreign_Delegate_and_Prof_Sarkar.jpeg", 
        year: "2026",
        fileName: "Prof_Murthy_with_Foreign_Delegate_and_Prof_Sarkar",
        displayName: "Prof. Murthy with Prof. Mark Wilkins, Kansas State Univ. and Prof. Sarkar (PIC, CRDT)",
        errorNotes: ""
      },
      { 
        id: "12", 
        url: "/assets/Prof._Murthys_Birthday_2025.jpg", 
        year: "2025",
        fileName: "Prof._Murthys_Birthday_2025",
        displayName: "STLab team celebrating Prof. Murthy's Birthday 2025",
        errorNotes: ""
      },
      { 
        id: "1", 
        url: "/assets/Pre-Holi_Celebration_with_Prof_Murthy.jpeg", 
        year: "2026",
        fileName: "Pre_Holi_Celebration_with_Prof_Murthy",
        displayName: "STLab researchers enjoying Pre-Holi Celebration ",
        errorNotes: ""
      },
      { 
        id: "2", 
        url: "/assets/Holi_Celebration_with_Prof_Murthy.jpeg", 
        year: "2026",
        fileName: "Holi_Celebration_with_Prof_Murthy",
        displayName: "STLab members celebrating Holi festival",
        errorNotes: ""
      },
      { 
        id: "3", 
        url: "/assets/Chaye_Pe_Charcha.jpeg", 
        year: "2025",
        fileName: "Chaye_Pe_Charcha",
        displayName: "STLab researchers discussing core ideas over Chaye Pe Charcha",
        errorNotes: ""
      },
      { 
        id: "4", 
        url: "/assets/Dinner_with_Prof_Murthy.jpeg", 
        year: "2025",
        fileName: "Dinner_with_Prof_Murthy",
        displayName: "STLab team sharing a pleasant dinner",
        errorNotes: ""
      },
      { 
        id: "5", 
        url: "/assets/Learning_Doesnt_stop_with_Prof_Murthy.jpeg", 
        year: "2025",
        fileName: "Learning_Doesnt_stop_with_Prof_Murthy",
        displayName: "STLab scholars engaged in interactive learning ",
        errorNotes: ""
      },
      { 
        id: "6", 
        url: "/assets/Sky_Exploration_with_Prof_Murthy.jpeg", 
        year: "2026",
        fileName: "Sky_Exploration_with_Prof_Murthy",
        displayName: "STLab members exploring the telescope during Sky Exploration ",
        errorNotes: ""
      },
      { 
        id: "9", 
        url: "/assets/STL_Labs_Doctoral_Students_with_beloved_Prof.jpeg", 
        year: "2025",
        fileName: "STL_Labs_Doctoral_Students_with_beloved_Prof",
        displayName: "STLab's Students with Prof. Murthy (Aesthetic Group Snapshot, 2025)",
        errorNotes: ""
      },
      { 
        id: "11", 
        url: "/assets/Teachers_Day_Celebration_2025.jpeg", 
        year: "2025",
        fileName: "Teachers_Day_Celebration_2025",
        displayName: "STLab scholars hosting a surprise Teacher's Day Celebration (2025)",
        errorNotes: ""
      },
      { 
        id: "10", 
        url: "/assets/STL_POD_1B-601.jpeg", 
        year: "2025",
        fileName: "STL_POD_1B-601",
        displayName: "STLab team at work inside the state-of-the-art STL POD 1B-601",
        errorNotes: ""
      }
    ];
  });

  const [talkFilter, setTalkFilter] = React.useState<"invited" | "live">("invited");
  const [talkSearch, setTalkSearch] = React.useState("");
  const [peopleSubTab, setPeopleSubTab] = React.useState<"pi" | "students">("pi");

  const PI_TALKS: { title: string; url: string; category: "invited" | "live" }[] = [
    { title: "Awakening The Bharatiya Mind: IKS, Colonialism & The Dharma Paradigm", url: "https://youtu.be/NKQT08JlI5M", category: "invited" },
    { title: "Vision for the Future of Indian Knowledge Systems: A 30-Year Plan", url: "https://youtu.be/hRrAd_pY5kQ", category: "invited" },
    { title: "Interview: Prof. Ganti Suryanarayana Murthy, National Coordinator, IKS", url: "https://youtu.be/xrWqYUVOEDA", category: "invited" },
    { title: "Introduction to Dhara Series | Vision Ayurveda 2047", url: "https://youtu.be/FedqIuFbdQA", category: "invited" },
    { title: "Invited Talk / Seminar Video 1", url: "https://youtu.be/5W8Wzx_6LTw", category: "invited" },
    { title: "Invited Talk / Seminar Video 2", url: "https://youtu.be/b965BddtPkE", category: "invited" },
    { title: "Invited Talk / Seminar Video 3", url: "https://youtu.be/MkBlUW2C-jU", category: "invited" },
    { title: "Invited Talk / Seminar Video 4", url: "https://youtu.be/AgkpNGFrL-4", category: "invited" },
    { title: "Invited Talk / Seminar Video 5", url: "https://youtu.be/vHTGri4qQes", category: "invited" },
    { title: "Invited Talk / Seminar Video 6", url: "https://youtu.be/BGqobT_96xM", category: "invited" },
    { title: "Invited Talk / Seminar Video 7", url: "https://youtu.be/EdbFCmF-AgA", category: "invited" },
    { title: "Invited Talk / Seminar Video 8", url: "https://youtu.be/gZSp4XsyZN0", category: "invited" },
    { title: "Invited Talk / Seminar Video 9", url: "https://youtu.be/LILM4Aq6-pQ", category: "invited" },
    { title: "Invited Talk / Seminar Video 10", url: "https://youtu.be/xz8F36_TtuU", category: "invited" },
    { title: "Invited Talk / Seminar Video 11", url: "https://youtu.be/NyjcPtotVmE", category: "invited" },
    { title: "Invited Talk / Seminar Video 12", url: "https://youtu.be/GSK-ws5u8zc", category: "invited" },
    { title: "Invited Talk / Seminar Video 13", url: "https://youtu.be/BM3zcSxc8CY", category: "invited" },
    { title: "Invited Talk / Seminar Video 14", url: "https://youtu.be/FY-we_3w0z0", category: "invited" },
    { title: "Invited Talk / Seminar Video 15", url: "https://youtu.be/MDr61aQtFQs", category: "invited" },
    { title: "Invited Talk / Seminar Video 16", url: "https://youtu.be/sKYS8jNXs2s", category: "invited" },
    { title: "Invited Talk / Seminar Video 17", url: "https://youtu.be/RHabkg7VNXQ", category: "invited" },
    { title: "Invited Talk / Seminar Video 18", url: "https://youtu.be/p9dhYDnTi5g", category: "invited" },
    { title: "Invited Talk / Seminar Video 19", url: "https://youtu.be/z4kxz5OkF4U", category: "invited" },
    { title: "Invited Talk / Seminar Video 20", url: "https://youtu.be/ozCjEJPQHuM", category: "invited" },
    { title: "Live Streamed Panel / Event 1", url: "https://www.youtube.com/live/Fy9oy1fRxv0", category: "live" },
    { title: "Live Streamed Panel / Event 2", url: "https://www.youtube.com/live/bhSI5zDTj1s", category: "live" },
    { title: "Live Streamed Panel / Event 3", url: "https://www.youtube.com/live/fax3GuCFVX4", category: "live" },
    { title: "Live Streamed Panel / Event 4", url: "https://www.youtube.com/live/mBq2gF7p8U4", category: "live" },
    { title: "Live Streamed Panel / Event 5", url: "https://www.youtube.com/live/KedgMEsrKYI", category: "live" },
    { title: "Live Streamed Panel / Event 6", url: "https://www.youtube.com/live/tj-FgzDZty4", category: "live" }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formQuery) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    setIsSubmitting(true);
    try {
      // We can also post the log to our local /api/iiti-server to preserve state
      await fetch("/api/iiti-server", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "STLab Website suggestion form",
          payloadType: "Contact Inquiry",
          data: {
            name: formName,
            designationOrInstitute: formDesignation,
            email: formEmail,
            query: formQuery,
            recipient: "ganti.murthy@iiti.ac.in"
          }
        })
      });
      setFormStatus("success");
      setFormSubmitted(true);
      // Reset form
      setFormName("");
      setFormDesignation("");
      setFormEmail("");
      setFormQuery("");
    } catch (err) {
      console.error(err);
      // Even if logging server fails, we'll confirm submission directed to Ganti S. Murthy
      setFormStatus("success");
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const coreResearch = [
    {
      title: "1. Biofuels & Bioprocess Engineering",
      icon: <Zap className="h-5 w-5 text-st-orange" />,
      desc: "Developing next-generation technologies to convert renewable agricultural residues into industrial energy carriers, emphasizing yeast and bacterial strain development, fermentation optimization under inhibitors stress, and dynamic closed-loop feed controls."
    },
    {
      title: "2. Life Cycle Assessment (LCA)",
      icon: <Layers className="h-5 w-5 text-st-blue" />,
      desc: "Pioneering cradle-to-grave metabolic accounting under ISO 14040/44 guidelines. We map overall environmental burdens, fossil energy depletion equivalents, water resource consumption metrics, and global warming potentials of synthetic processes."
    },
    {
      title: "3. Techno-Economic Analysis (TEA)",
      icon: <Database className="h-5 w-5 text-st-green" />,
      desc: "Establishing ASPEN Plus and customized python models to estimate realistic capital and operational costs (CapEx & OpEx) of bio-materials, identifying localized Minimum Selling Prices (MSP) and investment risks for pilot transition."
    },
    {
      title: "4. Systems Biology & Metabolic Modeling",
      icon: <Atom className="h-5 w-5 text-st-orange" />,
      desc: "Applying Flux Balance Analysis (FBA) and Genome-Scale metabolic models alongside dynamic Monod kinetic matching to optimize microbial performance and predict process behavior under cellular stress."
    }
  ];

  const people = {
    director: {
      name: "Prof. Ganti Suryanarayana Murthy",
      role: "Chair Professor, MFS-Bio Sciences and Biomedical Engineering",
      subRoles: [
        "Adani Indology Chair Professor (Agriculture), IIT Indore (April 2025 – Present)",
        "National Coordinator, IKS Division, Ministry of Education, Govt. of India (Oct 2021 – Present)",
        "Professor In-Charge & Founding Head, Centre for Indian Scientific Knowledge Systems (CISKS), IIT Indore",
        "Courtesy Professor, Biological and Ecological Engineering, Oregon State University, USA",
        "Co-Founder & Chairman, Leachate Treatment Systems, Houston, Texas (Aug 2025 – Present)"
      ],
      email: "ganti.murthy@iiti.ac.in",
      office: "Helium Building (POD 1C), Room 450, Simrol Campus, IIT Indore",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/ganti-murthy-72aa4b4/" },
        { label: "IIT Indore Profile", url: "https://iiti.irins.org/profile/113223" },
        { label: "Google Scholar", url: "https://scholar.google.com/citations?user=RDDboswAAAAJ&hl=en" },
        { label: "IKS India Team", url: "https://iksindia.org/team/" },
        { label: "ResearchGate", url: "https://www.researchgate.net/profile/Ganti-Murthy" },
        { label: "Associate Editor, Bioresource Technology", url: "https://www.sciencedirect.com/journal/bioresource-technology/about/editorial-board" },
        { label: "OSU Profile", url: "https://bee.oregonstate.edu/users/ganti-murthy" }
      ],
      about: [
        "Dr. Ganti S. Murthy bridges the gap between advanced bioprocess engineering, sustainable systems analysis, and the rich heritage of Indian Knowledge Systems (IKS). With over 15 years of academic leadership at Oregon State University and currently serving as the prestigious Adani Indology Chair Professor (Agriculture) at IIT Indore, his work spans the food-energy-water nexus, techno-economic life cycle assessments, and the modernization of traditional Indian agricultural and mathematical frameworks.",
        "In addition to his academic research, Dr. Murthy is deeply involved in national policy as the National Coordinator for the IKS Division under the Ministry of Education, Govt. of India. He is also an active entrepreneur, having co-founded both GRW Engineering LLC and Leachate Treatment Systems to commercialize sustainable effluent-treatment technologies developed in academic labs."
      ],
      leadership: [
        {
          role: "Adani Indology Chair Professor (Agriculture)",
          org: "Biosciences and Biomedical Engineering, Indian Institute of Technology (IIT) Indore",
          period: "Apr 2025 – Present",
          note: "Appointed to the prestigious Adani Indology Chair for a 5-year term to spearhead pioneering agricultural systems engineering, integrating traditional ecological practices with advanced modern bioprocess automation."
        },
        {
          role: "Professor",
          org: "Biosciences and Biomedical Engineering, Indian Institute of Technology (IIT) Indore",
          period: "Dec 2019 – Present"
        },
        {
          role: "National Coordinator",
          org: "IKS Division, Ministry of Education, Govt. of India at AICTE, New Delhi",
          period: "Oct 2021 – Present"
        },
        {
          role: "Professor In-Charge & Head",
          org: "Center for Indian Scientific Knowledge Systems (CISKS), IIT Indore",
          period: "Nov 2020 – Present",
          note: "Dedicated to researching and integrating the Indian scientific knowledge tradition—where Indic civilization was a historical knowledge and manufacturing powerhouse—and translating ancient wisdom and Samskrit-based knowledge transmission into modern applications."
        },
        {
          role: "Courtesy Professor",
          org: "Biological and Ecological Engineering, Oregon State University, Corvallis, OR, USA",
          period: "Jan 2022 – Present"
        },
        {
          role: "Co-Founder & Chairman",
          org: "Leachate Treatment Systems, Houston, Texas, USA",
          period: "Aug 2025 – Present",
          note: "Commercializing sustainable, scalable biotechnology solutions for landfill leachate and complex industrial effluent treatment."
        },
        {
          role: "Co-Founder, CEO & Chairman",
          org: "GRW Engineering LLC, Corvallis, Oregon, USA",
          period: "Dec 2019 – Aug 2025"
        }
      ],
      experience: [
        {
          role: "Professor (Tenured)",
          org: "Biological and Ecological Engineering, Oregon State University, Corvallis, Oregon, USA",
          period: "Jul 2017 – Feb 2022"
        },
        {
          role: "Associate Professor (Tenured)",
          org: "Biological and Ecological Engineering, Oregon State University, Corvallis, Oregon, USA",
          period: "Jun 2013 – Jun 2017"
        },
        {
          role: "Assistant Professor (Tenure Track)",
          org: "Biological and Ecological Engineering, Oregon State University, Corvallis, Oregon, USA",
          period: "Jan 2007 – May 2013"
        }
      ],
      entrepreneurship: [
        {
          role: "Co-Founder & Chairman",
          org: "Leachate Treatment Systems",
          period: "Aug 2025 – Present",
          note: "Scaling patented biological filtration and processing operations for landfill leachate treatment."
        },
        {
          role: "Co-Founder & CEO / Chairman",
          org: "GRW Engineering LLC",
          period: "Dec 2019 – Aug 2025",
          note: "Founded to commercialize sustainable technology for treating landfill leachate developed in the STL lab. Transitioned to Chairman of the Board following successful expansion."
        },
        {
          role: "Software Engineer",
          org: "Tata Consultancy Services",
          period: "2003"
        }
      ],
      education: [
        {
          degree: "Ph.D. in Agricultural Engineering (Food & Bioprocess)",
          inst: "University of Illinois at Urbana-Champaign, USA",
          period: "2003 – 2006",
          note: "Dissertation: Development of a controller for fermentation in dry grind corn process (Advisor: Prof. Vijay Singh)",
          coursesTaken: ["Advanced Bioprocess Engineering", "Fermentation Control & Automation", "Enzyme Technology", "Advanced Biochemical Kinetics", "Applied Mathematical Modeling"]
        },
        {
          degree: "M.Tech in Food and Agricultural Engineering (Dairy & Food)",
          inst: "Indian Institute of Technology (IIT), Kharagpur, India",
          period: "2001 – 2003",
          note: "Thesis: Modeling and simulation of microwave heating of food materials (Advisor: Prof. Suresh Prasad)",
          coursesTaken: ["Dairy & Food Process Engineering", "Advanced Microwave Food Processing", "Biological System Modeling & Simulation", "Thermodynamics of Food Materials", "Advanced Fluid Mechanics"]
        },
        {
          degree: "B.Tech in Agricultural Engineering",
          inst: "North Eastern Hill University, Shillong, India",
          period: "1997 – 2001",
          note: "Graduated with honors in June 2001",
          coursesTaken: ["Fluid Mechanics & Hydraulics", "Thermodynamics", "Unit Operations in Food Engineering", "Bio-resource Engineering Design", "Soil & Water Conservation Engineering"]
        }
      ],
      bio: "Dr. Ganti S. Murthy bridges the gap between advanced bioprocess engineering, sustainable systems analysis, and the rich heritage of Indian Knowledge Systems (IKS)."
    },
    scholars: [
      { name: "Sagnik Mitra", designation: "Ph.D. Researcher (Expected Spring 2027)", topic: "IIT Indore" },
      { name: "Kavita Singh", designation: "Ph.D. Researcher (Expected Autumn 2026)", topic: "IIT Indore" },
      { name: "Raveena Dhore", designation: "Ph.D. Researcher (Expected Autumn 2026)", topic: "IIT Indore" },
      { name: "Duddugunta Mohanchaitanya Reddy", designation: "Ph.D. Researcher (Expected Summer 2027)", topic: "IIT Indore" },
      { name: "Buddhodev Ghosh", designation: "Ph.D. Researcher (Expected Summer 2029)", topic: "IIT Indore" },
      { name: "Katta Keerthana", designation: "Ph.D. Researcher (Expected Summer 2030)", topic: "IIT Indore" },
      { name: "Chandrabhan Singh", designation: "M.S. Researcher (Expected Summer 2027)", topic: "IIT Indore" },
      { name: "Shashank Shinde", designation: "M.S. Researcher (Expected Summer 2027)", topic: "IIT Indore" }
    ],
    alumni: [
      { name: "Abhishek D. Kalbande", designation: "M.Sc. Student", current: "Symbiotec Zenfold Pvt. Ltd, Ujjain (M.P.)" },
      { name: "Dr. Sonam Paliya", designation: "Post-Doctoral Fellow", current: "IIT Indore (Tenure: 2022–2023)" },
      { name: "Akshay Udaykumar Jangam", designation: "Junior Research Fellow (JRF)", current: "IIT Indore (Tenure: 2020–2024)" },
      { name: "Ashlesha Alone", designation: "Junior Research Fellow (JRF)", current: "IIT Indore (Tenure: 2021–2022)" },
      { name: "Steve White", designation: "Ph.D. Graduate (2023)", current: "CTO of Leachate Treatment Systems, USA" },
      { name: "Kyle Proctor", designation: "Ph.D. Graduate (2022)", current: "Oregon State University, USA" },
      { name: "Dr. Haider J. Khadum", designation: "Ph.D. Graduate (2019)", current: "Professor and Dean at Babylon University, Iraq" },
      { name: "Dr. Syed M.H. Tabatabaie", designation: "Ph.D. Graduate (2017)", current: "Head of North America Operations, Iwatami Corporation, USA" },
      { name: "Dr. William Hohenschuh", designation: "Ph.D. Graduate (2016)", current: "Vice President, EMD Serono, Merck Inc., USA" },
      { name: "Dr. Ankita Juneja", designation: "Ph.D. Graduate (2015)", current: "Tenure Track Assistant Professor, SUNY-ESF, NY, USA" },
      { name: "Dr. Deepak Kumar", designation: "Ph.D. Graduate (2014)", current: "Tenured Associate Professor, SUNY-ESF, NY, USA" },
      { name: "Dr. Abraham M. Asmare", designation: "Ph.D. Graduate (2014)", current: "Professor at Bahir Dar University, Ethiopia" },
      { name: "Mohanchaitanya", designation: "M.S. Graduate (2023)", current: "Research Scholar, IIT Indore" },
      { name: "Harshita Liti", designation: "M.S. Graduate (2022)", current: "MS Student, IIT Indore" },
      { name: "Alexander McDaniel", designation: "M.S. Graduate (2015)", current: "Science Lab Technician at Central Oregon Community College, USA" },
      { name: "William Hohenschuh", designation: "M.S. Graduate (2014)", current: "Oregon State University, USA" },
      { name: "Carolina Garcia-Rios", designation: "M.S. Graduate (2013)", current: "PSM Biotechnology Alumna, USA" },
      { name: "Wesley Miller", designation: "M.S. Graduate (2011)", current: "Oregon State University, USA" },
      { name: "Kyle Sander", designation: "M.S. Graduate (2010)", current: "Postdoctoral Scholar, University of California, Berkeley, USA" },
      { name: "Ragothaman Avanasi", designation: "M.S. Graduate (2010)", current: "Laboratory Manager, Great Lakes Bioenergy Center, USA" },
      { name: "Chintan Toshniwal Joshi", designation: "M.S. Graduate (2010)", current: "Ph.D. Candidate, Colorado State University, USA" },
      { name: "Cosmo Prindle", designation: "M.S. Graduate (2009)", current: "Research Collaborator, St. Louis, MO, USA" },
      { name: "Crystal Oldfield", designation: "B.S. Graduate (2015)", current: "Laboratory Analyst, Cascadia Labs, USA" }
    ]
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-205 shadow-[0_12px_24px_-8px_rgba(16,76,122,0.08)] overflow-hidden" id="stlab-portal-deck">
      
      {/* Brand Header Banner */}
      <div className="bg-gradient-to-r from-[#0c2340] to-[#0e4a7c] border-b-2 border-st-orange/40 px-6 sm:px-10 py-10 relative overflow-hidden text-white">
        <div className="absolute right-0 top-0 w-64 h-64 bg-st-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5 flex-1">
            <span className="text-st-orange font-mono text-[10px] font-bold uppercase tracking-[0.25em] block animate-pulse">
              Research & Process Engineering Core • Indian Institute of Technology Indore
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Sustainable Technologies Laboratory
            </h2>
          </div>
        </div>
      </div>

      {/* Hub Navigation row */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-4 flex flex-wrap gap-1 md:gap-3 py-2 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "home" 
              ? "bg-st-blue text-white shadow-[0_3px_8px_rgba(16,76,122,0.25)] border-b-2 border-black/10 btn-3d-push" 
              : "text-slate-600 hover:bg-slate-200/50 hover:text-st-blue"
          }`}
        >
          <Home className="h-3.5 w-3.5" />
          Home
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("news")}
          className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "news" 
              ? "bg-amber-600 text-white shadow-[0_3px_8px_rgba(217,119,6,0.25)] border-b-2 border-black/10 btn-3d-push" 
              : "text-slate-600 hover:bg-slate-200/50 hover:text-amber-600"
          }`}
        >
          <Newspaper className="h-3.5 w-3.5" />
          News & Announcements
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("research")}
          className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "research" 
              ? "bg-st-orange text-white shadow-[0_3px_8px_rgba(241,122,31,0.25)] border-b-2 border-black/10 btn-3d-push" 
              : "text-slate-600 hover:bg-slate-200/50 hover:text-st-orange"
          }`}
        >
          <Cpu className="h-3.5 w-3.5 animate-pulse text-st-orange" />
          Research Areas
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("people")}
          className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "people" 
              ? "bg-st-green text-white shadow-[0_3px_8px_rgba(43,147,34,0.25)] border-b-2 border-black/10 btn-3d-push" 
              : "text-slate-600 hover:bg-slate-200/50 hover:text-st-green"
          }`}
        >
          <Users className="h-3.5 w-3.5 text-st-green" />
          Lab Members
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("publications")}
          className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "publications" 
              ? "bg-st-blue text-white shadow-[0_3px_8px_rgba(16,76,122,0.25)] border-b-2 border-black/10 btn-3d-push" 
              : "text-slate-600 hover:bg-slate-200/50 hover:text-st-blue"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5 text-st-blue" />
          Key Publications
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("learning")}
          className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "learning" 
              ? "bg-st-green text-white shadow-[0_3px_8px_rgba(43,147,34,0.25)] border-b-2 border-black/10 btn-3d-push" 
              : "text-slate-600 hover:bg-slate-200/50 hover:text-st-green"
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5 text-st-green" />
          Learning Resources
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("gallery")}
          className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "gallery" 
              ? "bg-st-blue text-white shadow-[0_3px_8px_rgba(16,76,122,0.25)] border-b-2 border-black/10 btn-3d-push" 
              : "text-slate-600 hover:bg-slate-200/50 hover:text-st-blue"
          }`}
        >
          <Camera className="h-3.5 w-3.5 text-st-blue" />
          Lab Gallery
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("weather")}
          className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "weather" 
              ? "bg-st-green text-white shadow-[0_3px_8px_rgba(43,147,34,0.25)] border-b-2 border-black/10 btn-3d-push" 
              : "text-slate-600 hover:bg-slate-200/50 hover:text-st-green"
          }`}
        >
          <CloudSun className="h-3.5 w-3.5 text-st-green" />
          IITI Weather Statistics
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === "contact" 
              ? "bg-st-orange text-white shadow-[0_3px_8px_rgba(241,122,31,0.25)] border-b-2 border-black/10 btn-3d-push" 
              : "text-slate-600 hover:bg-slate-200/50 hover:text-st-orange"
          }`}
        >
          <Phone className="h-3.5 w-3.5 text-st-orange-500" />
          Contact Lab
        </button>
      </div>

      {/* Tab Panels Contents */}
      <div className="p-6 sm:p-8">
        
        {/* Welcome Pane */}
        {activeTab === "home" && (
          <div 
            className="animate-fadeIn relative p-6 sm:p-10 rounded-2xl bg-cover bg-center overflow-hidden border border-slate-200/50 shadow-inner"
            style={{ backgroundImage: "url('/assets/stlab_background.svg')" }}
          >
            {/* Glassmorphic overlay background blur to ensure high contrast & legibility */}
            <div className="absolute inset-0 bg-[#f8fafc]/88 backdrop-blur-[2px] z-0" />
            <div className="relative z-10 space-y-8 w-full">
              {/* Mission & Key Subtitle Banner */}
              <div className="bg-gradient-to-r from-st-blue/5 via-st-orange/10 to-st-blue/5 border border-st-orange/20 p-6 sm:p-7 rounded-2xl space-y-4 shadow-sm backdrop-blur-sm flex flex-col items-center justify-center text-center">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0c2340] tracking-tight leading-snug">
                  Bridging Systems Engineering and Traditional Knowledge
                </h3>
                
                {/* Sanskrit Shloka Card */}
                <div className="py-4.5 px-6 bg-white/95 rounded-xl border border-st-orange/15 shadow-sm max-w-3xl w-full space-y-3 mx-auto">
                  <p className="text-base sm:text-lg font-bold text-st-orange tracking-wide text-center leading-relaxed font-sanskrit">
                    काले वर्षतु पर्जन्य≍पृथिवी सस्यशालिनी।<br />
                    देशोऽयं क्षोभरहितो ब्राह्मणाः सन्तु निर्भयाः॥
                  </p>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full" />
                  <p className="text-xs sm:text-sm text-slate-700 italic text-center font-medium max-w-2xl mx-auto leading-relaxed">
                    "May the rains come on time, the earth be verdant, this country be free of distress and intellectuals be fearless."
                  </p>
                </div>
              </div>

            {/* Highlighting Flowing Announcements Ticker */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col md:flex-row items-stretch">
              <div className="bg-[#0c2340] text-white px-5 py-3 flex items-center gap-2 font-sans font-extrabold text-xs uppercase tracking-wider shrink-0 select-none border-b md:border-b-0 md:border-r border-slate-700 z-10">
                <Megaphone className="h-3.5 w-3.5 text-st-orange animate-bounce" />
                <span>Recent Highlights</span>
                <span className="hidden md:inline h-1.5 w-1.5 rounded-full bg-st-green" />
              </div>
              <div className="flex-1 overflow-hidden py-3 relative bg-slate-50/50 flex items-center">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs font-semibold text-slate-700 select-none">
                  <span className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-st-orange shrink-0 animate-pulse" />
                    <span><strong className="text-slate-900 uppercase tracking-wider text-[10px] font-extrabold bg-st-orange/10 text-st-orange px-1.5 py-0.5 rounded mr-1">Global Ranking</strong> Prof. Ganti S. Murthy has been ranked among the top 2% of scientists worldwide by Stanford University!</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-st-green shrink-0" />
                    <span><strong className="text-slate-900 uppercase tracking-wider text-[10px] font-extrabold bg-st-green/10 text-st-green px-1.5 py-0.5 rounded mr-1">Fellowship</strong> Mr. Mohanchaitanya Reddy selected for the prestigious national Adani Indological Fellowship!</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-st-blue shrink-0" />
                    <span><strong className="text-slate-900 uppercase tracking-wider text-[10px] font-extrabold bg-st-blue/10 text-st-blue px-1.5 py-0.5 rounded mr-1">Chair</strong> Dr. Ganti S. Murthy serves as the prestigious Adani Indology Chair Professor (Agriculture) at IIT Indore!</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-st-orange shrink-0" />
                    <span><strong className="text-slate-900 uppercase tracking-wider text-[10px] font-extrabold bg-st-orange/10 text-st-orange px-1.5 py-0.5 rounded mr-1">UIUC Outbound</strong> Ms. Kavita Singh has been selected for the collaborative research fellowship at UIUC, USA!</span>
                  </span>

                  {/* DUPLICATE TO RESEMBLE INFINITE SCROLL */}
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-st-orange shrink-0 animate-pulse" />
                    <span><strong className="text-slate-900 uppercase tracking-wider text-[10px] font-extrabold bg-st-orange/10 text-st-orange px-1.5 py-0.5 rounded mr-1">Global Ranking</strong> Prof. Ganti S. Murthy has been ranked among the top 2% of scientists worldwide by Stanford University!</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-st-green shrink-0" />
                    <span><strong className="text-slate-900 uppercase tracking-wider text-[10px] font-extrabold bg-st-green/10 text-st-green px-1.5 py-0.5 rounded mr-1">Fellowship</strong> Mr. Mohanchaitanya Reddy selected for the prestigious national Adani Indological Fellowship!</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-st-blue shrink-0" />
                    <span><strong className="text-slate-900 uppercase tracking-wider text-[10px] font-extrabold bg-st-blue/10 text-st-blue px-1.5 py-0.5 rounded mr-1">Chair</strong> Dr. Ganti S. Murthy serves as the prestigious Adani Indology Chair Professor (Agriculture) at IIT Indore!</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-st-orange shrink-0" />
                    <span><strong className="text-slate-900 uppercase tracking-wider text-[10px] font-extrabold bg-st-orange/10 text-st-orange px-1.5 py-0.5 rounded mr-1">UIUC Outbound</strong> Ms. Kavita Singh has been selected for the collaborative research fellowship at UIUC, USA!</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Core Narrative Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-2">
              {/* systems lens column */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-extrabold text-[#0c2340] uppercase tracking-wider flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-st-orange inline-block" />
                    Systems Perspective & Sustainable Technologies
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-[13px]">
                    We must address the challenges of meeting the increasing demands for water, food, and energy in a resource-constrained world subjected to climate variations. STL's research is built on a systems perspective that evaluates the nexus of technology, economics, the environment, and policy. We focus on understanding these linkages to develop sustainable technologies and resilient strategies.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 space-y-3 mt-5 shadow-xs">
                  <span className="text-[10px] uppercase tracking-wide text-st-blue font-extrabold block">Current Sponsoring & Funding partners</span>
                  <div className="flex flex-col gap-2 text-xs font-semibold text-slate-650">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-st-green shrink-0" />
                      <span>Department of Biotechnology (DBT), Govt. of India</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-st-orange shrink-0" />
                      <span>Ministry of Education (MoE), India</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span>University Grant Commission (UGC)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>Adani Foundation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* traditional knowledge column */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-extrabold text-[#0c2340] uppercase tracking-wider flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-st-green inline-block" />
                    Indian Knowledge Systems (IKS) & TEK
                  </h4>
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-[13px]">
                    Unique to our lab is the integration of Indian Knowledge Systems (IKS) and Traditional Ecological Knowledge (TEK). By drawing upon the Indian scientific knowledge tradition—including Indian astronomy and traditional agriculture—we bridge ancient predictive frameworks with modern nexus analysis to pioneer new pathways in rural development and technology.
                  </p>
                </div>

                {/* Highly readable academic profile capsule */}
                <div className="bg-[#0c2340] rounded-xl p-4.5 text-white flex flex-col justify-between relative overflow-hidden shadow-md card-3d-bevel mt-5 min-h-40">
                  <div className="space-y-3 z-10 relative">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-st-orange text-white">
                      Principal Investigator
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-base font-extrabold tracking-tight">{people.director.name}</h4>
                      <p className="text-[11px] text-[#ffa34d] font-bold">{people.director.role}</p>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-light">
                      Professor at IITI BSBE Department, former tenured faculty member at Oregon State University, USA, spearheading food-energy-water nexus sustainability.
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-2.5 mt-3 text-[9px] text-slate-400 font-mono flex items-center gap-1.5 shrink-0">
                    <MapPin className="h-3 w-3 text-st-orange" />
                    <span>Helium Building (POD 1C), IIT Indore</span>
                  </div>
                  <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.03] text-[120px] font-bold leading-none select-none">IITI</div>
                </div>
              </div>
            </div>

            {/* Useful Links Section */}
            <div className="border-t border-slate-200/60 pt-8 mt-4.5">
              <h4 className="text-sm font-extrabold text-[#0c2340] uppercase tracking-wider flex items-center gap-2 mb-5">
                <span className="h-2.5 w-2.5 rounded-full bg-st-blue inline-block animate-pulse" />
                Useful & Affiliated Links
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <a 
                  href="https://www.iiti.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white border border-slate-205 rounded-xl p-4 flex flex-col justify-between hover:border-st-orange/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-st-orange border border-orange-100">
                      <Globe className="h-4 w-4" />
                    </div>
                    <h5 className="text-[12px] font-bold text-slate-800 tracking-tight group-hover:text-st-orange transition-colors">
                      IIT Indore (IITI)
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-normal font-sans">
                      The official main web portal of the Indian Institute of Technology Indore.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-450 mt-4 font-mono uppercase tracking-wider">
                    <span>Visit Website</span>
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>

                <a 
                  href="https://bsbe.iiti.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white border border-slate-205 rounded-xl p-4 flex flex-col justify-between hover:border-st-green/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-st-green border border-green-100">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <h5 className="text-[12px] font-bold text-slate-800 tracking-tight group-hover:text-st-green transition-colors">
                      IITI BSBE Department
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-normal font-sans">
                      Department of Biosciences and Biomedical Engineering at IIT Indore.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-450 mt-4 font-mono uppercase tracking-wider">
                    <span>Visit Department</span>
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>

                <a 
                  href="https://crdt.iiti.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white border border-slate-205 rounded-xl p-4 flex flex-col justify-between hover:border-st-orange/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-st-blue border border-sky-100">
                      <Home className="h-4 w-4" />
                    </div>
                    <h5 className="text-[12px] font-bold text-slate-800 tracking-tight group-hover:text-st-blue transition-colors">
                      Centre for Rural Dev. & Tech
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-normal font-sans">
                      Promoting application-driven solutions and micro-technologies for rural development.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-450 mt-4 font-mono uppercase tracking-wider">
                    <span>Visit Center</span>
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>

                <a 
                  href="https://cisks.iiti.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white border border-slate-205 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/60 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <h5 className="text-[12px] font-bold text-slate-800 tracking-tight group-hover:text-amber-600 transition-colors">
                      Centre for IKS (CISKS)
                    </h5>
                    <p className="text-[11px] text-slate-500 leading-normal font-sans">
                      Centre for Indian Knowledge System at IIT Indore, bridging science, culture and tradition.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-450 mt-4 font-mono uppercase tracking-wider">
                    <span>Visit Center</span>
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </div>
            </div>

            {/* Google Interactive Maps Placement Direct Call-out */}
            <div className="border-t border-slate-200 pt-5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#0c2340]/5 rounded-lg border border-[#0c2340]/10">
                  <MapPin className="h-4 w-4 text-st-orange animate-bounce" />
                </div>
                <div className="space-y-0.5 text-left">
                  <p className="text-xs font-bold text-slate-800">Visit Sustainable Technologies Laboratory at IIT Indore</p>
                  <p className="text-[10px] text-slate-500">Khandwa Road, Simrol Campus, Indore, Madhya Pradesh 453552</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a 
                  href="https://maps.app.goo.gl/EP3dxc4qz6pxHgyaA"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0c2340] bg-[#0c2340]/5 hover:bg-[#0c2340]/10 border border-[#0c2340]/10 rounded-lg transition-all cursor-pointer shadow-xs transform hover:-translate-y-0.5"
                >
                  View Floor Map
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a 
                  href="https://maps.app.goo.gl/EP3dxc4qz6pxHgyaA"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#0c2340] hover:bg-[#ffa04d] hover:text-[#0c2340] text-white rounded-lg transition-all shadow-md cursor-pointer transform hover:-translate-y-0.5"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Google Maps Route
                </a>
              </div>
            </div>
            </div>
          </div>
        )}

        {/* News & Announcements Pane */}
        {activeTab === "news" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header section with an elegant banner */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-st-blue">
                <span className="p-1 px-2.5 bg-st-blue/10 text-st-blue text-[10px] font-bold uppercase rounded-md tracking-wider border border-st-blue/20">
                  Bulletin Board
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-st-orange inline-block" />
                <span className="text-xs text-slate-500 font-medium">Updates & Milestones</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#0c2340]">
                News & Announcements
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-sans font-light max-w-3xl">
                Stay updated with the latest achievements, fellowships, publications, and career milestones of the members at Sustainable Technologies Laboratory (STLab), IIT Indore.
              </p>
            </div>

            {/* Sub-tabs for news filtering: Active vs Archive */}
            <div className="flex border-b border-slate-250 gap-1 sm:gap-2">
              <button 
                onClick={() => setNewsFilter("active")}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all relative cursor-pointer ${
                  newsFilter === "active" 
                  ? "border-st-orange text-[#0c2340] font-extrabold" 
                  : "border-transparent text-slate-400 hover:text-slate-600 font-medium"
                }`}
              >
                <span>Recent Announcements</span>
                {newsFilter === "active" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-st-orange" />
                )}
              </button>
              <button 
                onClick={() => setNewsFilter("archive")}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all relative cursor-pointer ${
                  newsFilter === "archive" 
                  ? "border-st-orange text-[#0c2340] font-extrabold" 
                  : "border-transparent text-slate-400 hover:text-slate-600 font-medium"
                }`}
              >
                <span>Archive</span>
                {newsFilter === "archive" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-st-orange" />
                )}
              </button>
            </div>

            {/* List of Announcements with premium styling */}
            {newsFilter === "active" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">

                {/* News: Best Idea Presentation Competition 2026 */}
                <div className="bg-gradient-to-r from-st-orange/5 to-white border-2 border-st-orange/60 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 md:col-span-2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-to-br from-st-orange/10 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="p-3 bg-st-orange/10 rounded-xl text-st-orange shrink-0 border border-st-orange/20 flex items-center justify-center shadow-inner">
                      <Award className="h-7 w-7 animate-pulse" />
                    </div>
                    <div className="space-y-3 flex-1 font-sans">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-st-orange text-white rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                          Best Idea Presentation Winners
                        </span>
                        <span className="px-2.5 py-0.5 bg-st-blue text-white rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                          National Youth Day 2026
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 font-mono">
                          12 January 2026
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-extrabold text-[#0c2340] leading-snug group-hover:text-st-orange transition-colors">
                          Best Idea Presentation Competition 2026!
                        </h4>
                        <p className="text-xs text-slate-650 mt-1.5 leading-relaxed font-light">
                          We are proud to share that STL Lab members <span className="font-bold text-slate-805">Abhishek D Kalbande (First Prize)</span> and <span className="font-bold text-slate-805">Buddhodev Ghosh (Joint-Second Prize)</span> were winners at the Best Idea Presentation Competition.
                        </p>
                      </div>
                      <div className="p-4 bg-white/70 border border-st-orange/15 rounded-xl text-xs text-slate-700 leading-relaxed font-light">
                        The competition was jointly organized by the <span className="font-semibold text-[#0c2340]">Centre for Rural Development and Technology (CRDT)</span> and the <span className="font-semibold text-[#0c2340]">Centre for Indian Scientific Knowledge System (CISKS)</span> at IIT Indore in celebration of <span className="font-bold text-st-blue">National Youth Day (Rashtriya Yuva Diwas)</span> on 12 January 2026. This outstanding double win signals STLab's prominent voice in translational solutions and indigenous science.
                      </div>
                    </div>
                  </div>
                </div>

                {/* News: Youth for Social Change Summit 2026 */}
                <div className="bg-white border border-slate-200/80 hover:border-st-orange/50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-st-orange/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-st-blue/5 rounded-xl text-st-blue border border-st-blue/10 flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 font-mono">
                        Year 2026
                      </span>
                    </div>
                    <div className="space-y-2">
                      <span className="px-2 py-0.5 bg-st-blue/5 border border-st-blue/20 rounded-md text-[9px] font-bold text-st-blue uppercase tracking-wider">
                        Social Innovation Laurels
                      </span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-st-orange transition-colors">
                        Youth for Social Change Summit 2026
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                        We are thrilled to state that <span className="font-bold text-slate-800">Buddhodev Ghosh</span>, representing the <span className="font-semibold text-slate-800">CRDT-IITI team</span>, secured the prestigious <span className="font-bold text-st-orange">Third Runner-Up position</span> in the Grand Finale of the summit held at Devi Ahilyabai University (DAVV), Indore.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500 flex items-center gap-1.5 font-sans justify-between">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      <span>Awarded with a cash prize.</span>
                    </span>
                  </div>
                </div>

                {/* News: Dagguganta PhD Senator Re-election */}
                <div className="bg-white border border-slate-200/80 hover:border-st-orange/50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-st-orange/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-st-orange/5 rounded-xl text-st-orange border border-st-orange/10 flex items-center justify-center">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 font-mono">
                        Year 2026
                      </span>
                    </div>
                    <div className="space-y-2">
                      <span className="px-2 py-0.5 bg-st-orange/5 border border-st-orange/20 rounded-md text-[9px] font-bold text-st-orange uppercase tracking-wider">
                        Senate Leadership
                      </span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-st-orange transition-colors">
                        Institute PhD Senator Re-election
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                        Hearty congratulations to <span className="font-bold text-slate-800">Dagguganta Mohan Chaitanya Reddy</span> for being elected as the <span className="font-semibold text-slate-800">Institute PhD Senator</span> at IIT Indore for the <span className="font-bold text-st-blue">second consecutive year</span>!
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500 flex items-center gap-1.5 font-sans">
                    <Megaphone className="h-3 w-3 text-amber-500" />
                    <span>Selected via direct student franchise to represent doctoral scholars.</span>
                  </div>
                </div>

                {/* News 0: Prof. Ganti S. Murthy - Stanford-Elsevier Top 2% Scientists */}
                <div className="bg-gradient-to-r from-st-blue/5 via-st-orange/5 to-white border-2 border-st-orange/60 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 md:col-span-2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-st-orange/10 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="p-3.5 bg-st-orange/10 rounded-xl text-st-orange shrink-0 border border-st-orange/20 flex items-center justify-center shadow-inner animate-float-3d">
                      <Award className="h-7 w-7" />
                    </div>
                    <div className="space-y-3 flex-1 font-sans">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-st-orange text-white rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                          Global Recognition
                        </span>
                        <span className="px-2 py-0.5 bg-st-blue text-white rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                          Stanford-Elsevier List
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 font-mono">
                          Top 2% scientists Worldwide
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-extrabold text-[#0c2340] leading-snug group-hover:text-st-orange transition-colors">
                          Prof. Ganti S. Murthy (Lab PI) Ranked Among Top 2% Scientists Worldwide
                        </h4>
                        <p className="text-xs text-slate-605 mt-1.5 leading-relaxed font-light">
                          We are thrilled to share that our Principal Investigator, <span className="font-bold text-slate-800">Prof. Ganti Suryanarayana Murthy</span>, is featured in the highly prestigious <span className="font-semibold text-[#0c2340]">Stanford-Elsevier ranking</span>, which lists the top 2% of scientists globally based on standardised citation indicators. This is a recognition of the work of all STL Team members over the years.
                        </p>
                      </div>
                      <div className="p-4 bg-white/70 border border-st-orange/15 rounded-xl text-xs text-slate-700 leading-relaxed font-light">
                        This honors the STLab's decades of research in bioprocess modeling, sustainable technology development, and life-cycle assessments (LCA). It places STLab and IIT Indore at the forefront of global scientific authority, testifying to the rigorous excellence maintained in our laboratory across food-energy-water nexus studies and Indian Knowledge Systems.
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* News 1: Mr. Dagguganta Mohanchaitanya Reddy */}
                <div className="bg-white border border-slate-200/80 hover:border-amber-500/50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 md:col-span-2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0 border border-amber-100 flex items-center justify-center shadow-inner">
                      <Award className="h-6 w-6 animate-pulse" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-md text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                          Adani Indological Fellowship
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 font-mono">
                          Class of 2025
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                          Congratulations to Mr. Dagguganta Mohanchaitanya Reddy!
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          Selected for the prestigious <span className="font-semibold text-slate-900">Adani Indological Fellowship</span> — among <span className="font-bold text-amber-700">only 14 scholars selected across India</span>.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 leading-relaxed font-sans font-light">
                        This highly selective national recognition was awarded for his outstanding research and work on <span className="font-bold text-[#0c2340]">Herbal Kunapajala</span> (a traditional bio-fertilizer formulation in Vrikshayurveda science). His work explores botanical growth promoters to propose ecological, chemical-free farming techniques.
                      </div>
                    </div>
                  </div>
                </div>

                {/* News 2: Ms. Kavita Singh */}
                <div className="bg-white border border-slate-200/80 hover:border-st-orange/50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-st-orange/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-st-orange/5 rounded-xl text-st-orange border border-st-orange/10 flex items-center justify-center">
                        <Globe className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 font-mono">
                        Year 2026
                      </span>
                    </div>
                    <div className="space-y-2">
                      <span className="px-2 py-0.5 bg-st-orange/5 border border-st-orange/20 rounded-md text-[9px] font-bold text-st-orange uppercase tracking-wider">
                        Collaborative Research Fellowship
                      </span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-st-orange transition-colors">
                        Congratulations to Ms. Kavita Singh
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                        Selected for the prestigious <span className="font-semibold text-slate-800">Short-term Collaborative Research Fellowship (Outbound PhD)</span> at the <span className="font-bold text-st-blue">University of Illinois Urbana-Champaign</span>, USA.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500 flex items-center gap-1.5 font-sans">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    <span>Enabling international research scaling and collaboration.</span>
                  </div>
                </div>

                {/* News 3: Mr. Abhishek D Kalbande */}
                <div className="bg-white border border-slate-200/80 hover:border-st-green/50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex flex-col justify-between">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-st-green/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-st-green/5 rounded-xl text-st-green border border-st-green/10 flex items-center justify-center">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 font-mono">
                        Year 2026
                      </span>
                    </div>
                    <div className="space-y-2">
                      <span className="px-2 py-0.5 bg-st-green/5 border border-st-green/20 rounded-md text-[9px] font-bold text-st-green uppercase tracking-wider">
                        Executive Appointment
                      </span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-st-green transition-colors">
                        Congratulations to Mr. Abhishek D Kalbande
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                        Selected as a <span className="font-semibold text-slate-800">Junior Executive Officer</span> at <span className="font-bold text-st-blue">Symbiotec Zenfold Pvt. Ltd, Ujjain (M.P.)</span>.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500 flex items-center gap-1.5 font-sans">
                    <TrendingUp className="h-3 w-3 text-st-green" />
                    <span>Bridging academic excellence with industrial leadership opportunities.</span>
                  </div>
                </div>

                {/* News 5: New Research Publication (Hexadic Tank) */}
                <div className="bg-white border border-slate-200/80 hover:border-st-blue/50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 md:col-span-2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-st-blue/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="p-3 bg-st-blue/5 rounded-xl text-st-blue shrink-0 border border-st-blue/10 flex items-center justify-center shadow-inner">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-st-blue/5 border border-st-blue/10 rounded-md text-[10px] font-bold text-st-blue uppercase tracking-wider">
                          New Research Publication Update
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 font-mono">
                          Published 2026
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-slate-400 block font-mono font-bold uppercase tracking-wider">Research Article</span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-st-blue transition-colors">
                          Design and Analysis of a Hexadic Tank System: Classical and Advanced Control Algorithms
                        </h4>
                        <p className="text-xs text-[#0c2340] font-semibold">
                          Journal: <span className="font-semibold text-slate-800">Systems Microbiology and Biomanufacturing</span>
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-slate-100">
                        <div className="text-xs text-slate-500">
                          Authored by: <span className="font-bold text-slate-700">Sagnik Mitra</span> and <span className="font-bold text-slate-700">Prof. Ganti S. Murthy</span>
                        </div>
                        <a 
                          href="https://www.researchgate.net/publication/403855681_Design_and_Analysis_of_a_Hexadic_Tank_System_Classical_and_Advanced_Control_Algorithms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-slate-100 hover:bg-[#0c2340] hover:text-white transition-all text-[10.5px] font-bold rounded-lg text-slate-600 border border-slate-200 cursor-pointer flex items-center gap-1"
                        >
                          <span>ResearchGate Link</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">

                {/* News Archived: Dagguganta Mohanchaitanya Reddy Elected Head of Biocrats Club */}
                <div className="bg-white border border-slate-200/80 hover:border-amber-500/50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 md:col-span-2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="flex flex-col sm:flex-row gap-5 items-start font-sans">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0 border border-amber-100 flex items-center justify-center shadow-inner">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-md text-[10px] font-bold text-amber-1000 uppercase tracking-wider font-sans">
                          Club Leadership
                        </span>
                        <span className="px-2.5 py-0.5 bg-[#0c2340] text-white rounded-md text-[10px] font-extrabold uppercase tracking-wider font-sans">
                          Biocrats Club
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 font-mono">
                          Year 2025 Archive
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-extrabold text-[#0c2340] group-hover:text-amber-700 transition-colors font-sans">
                          Dagguganta Mohan Chaitanya Reddy Elected Head of Biocrats Club
                        </h4>
                        <p className="text-xs text-slate-650 leading-relaxed font-sans font-light mt-1.5 font-sans">
                          Heartiest congratulations to <span className="font-semibold text-slate-800">Dagguganta Mohan Chaitanya Reddy</span> for being elected as the Student Coordinator / Head of <span className="font-semibold text-[#0c2340]">Biocrats</span>—the prestigious Departmental Club of Bioscience and Biomedical Engineering (BSBE) at IIT Indore.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100 mt-2">
                        <div className="p-3 bg-slate-50 border border-slate-100/50 rounded-xl text-xs text-slate-600 leading-relaxed font-light flex-1 font-sans">
                          The BSBE Departmental Club <span className="font-semibold text-slate-700">Biocrats</span> fosters innovation, collaborative research, and co-curricular enrichment among the bioscience community at IIT Indore.
                        </div>
                        <a 
                          href="https://biocrats.iiti.ac.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-slate-100 hover:bg-[#0c2340] hover:text-white transition-all text-[11px] font-black rounded-lg text-slate-600 border border-slate-200 cursor-pointer flex items-center gap-1 shrink-0 self-end sm:self-center font-sans"
                        >
                          <span>Biocrats Website</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* News New Archived: Buddhodev Ghosh Presentation Award at Adani Global Indology Conclave */}
                <div className="bg-white border border-slate-200/80 hover:border-amber-500/50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 md:col-span-2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="flex flex-col sm:flex-row gap-5 items-start font-sans">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0 border border-amber-100 flex items-center justify-center shadow-inner">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-md text-[10px] font-bold text-amber-1000 uppercase tracking-wider">
                          Poster Presentation Award
                        </span>
                        <span className="px-2.5 py-0.5 bg-[#0c2340] text-white rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                          Adani Global Indology Conclave
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 font-mono">
                          Year 2025 Archive
                        </span>
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                          Buddhodev Ghosh Secures 3rd Best Presentation in PG-PhD Segment
                        </h4>
                        <p className="text-xs text-slate-800 font-semibold mt-1">
                          Research Work: <span className="italic">"Mathematical Combinatorics in Gandhārṇva Perfume-Making: A Critical Study from Bṛhatsaṃhitā"</span>
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed font-light">
                        From approximately <span className="font-semibold text-slate-800">500 national-level entries</span>, Buddhodev Ghosh's innovative mathematical reconstruction of traditional Sanskrit treatises was selected for the finals (under 100 final participants). He successfully pitched his research at the Poster Presentation Competition of the <span className="font-semibold text-slate-800">Adani Global Indology Conclave</span>, winning the prestigious <span className="font-bold text-amber-700">Third-Best Presentation Award</span> in the competitive PG-PhD category.
                      </div>
                    </div>
                  </div>
                </div>

                {/* News 4: New Research Publication (Trickle Bed Reactor) - Moved to 2025 Archive */}
                <div className="bg-white border border-slate-200/80 hover:border-amber-500/50 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 md:col-span-2 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600 shrink-0 border border-amber-100 flex items-center justify-center shadow-inner">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 rounded-md text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                          New Research Journal Publication
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 font-mono">
                          Published August 2025
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-slate-400 block font-mono font-bold uppercase tracking-wider">Research Article</span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-amber-700 transition-colors">
                          Design, construction and evaluation of an innovative horizontal trickle bed reactor for intensification of pectinase production process
                        </h4>
                        <p className="text-xs text-[#0c2340] font-semibold">
                          Journal: <span className="font-semibold text-slate-800">Chemical Engineering and Processing - Process Intensification</span> (Volume 214, 110343)
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-slate-100">
                        <div className="text-xs text-slate-500">
                          Authored by: <span className="font-bold text-slate-700">Kavita Singh</span> and <span className="font-bold text-slate-700">Prof. Ganti S. Murthy</span>
                        </div>
                        <a 
                          href="https://www.sciencedirect.com/science/article/pii/S0255270125001928"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-slate-100 hover:bg-[#0c2340] hover:text-white transition-all text-[10.5px] font-bold rounded-lg text-slate-600 border border-slate-200 cursor-pointer flex items-center gap-1"
                        >
                          <span>ScienceDirect Link</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* Research Pane */}
        {activeTab === "research" && (() => {
          const sustainableTechTopics = [
            "Design and scaleup of bioprocesses in food, nutraceutical and pharmaceutical sectors.",
            "Model, optimize, and control bioprocesses.",
            "Develop strategies for high-solid fermentation of pretreated cellulosic biomass.",
            "Develop novel strategies for the hydrothermal liquefaction of biomass.",
            "Evaluate the use of microbial consortia in bioremediation applications."
          ];

          const engineeringSystemsTopics = [
            "Engineer and analyze resilient agroecological systems.",
            "Conduct comprehensive, integrated techno-economic analyses (TEA) and life cycle assessments (LCA) of biofuels and bioproducts.",
            "Understand the resilience of global food networks through systems analysis.",
            "Identify metabolic network bottlenecks for xylose utilization in Saccharomyces cerevisiae.",
            "Quantify and understand key sources of uncertainty in the LCA of biofuels and bioproducts.",
            "Perform realistic assessments of bioprocess technologies under diverse future scenarios.",
            "Study carbon partitioning in algae under various growth regimes, environmental conditions, and nutrient profiles."
          ];

          const iksRuralTopics = [
            "Bridge traditional Indian agricultural practices with modern agroecological engineering to enhance agro-ecological system health, food and water security and resilience.",
            "Analyze the Indian scientific knowledge tradition, integrating principles from Indian astronomy and historical meteorological methods into contemporary analytical frameworks.",
            "Investigate traditional ecological knowledge (TEK) in Indian Knowledge Systems (IKS) to inform modern climate resilience and resource management."
          ];

          return (
            <div className="space-y-8 animate-fadeIn">
              {/* Introductory Focus Hero Box */}
              <div className="bg-gradient-to-br from-st-blue/5 via-slate-50 to-st-orange/5 border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0d56a6] text-white shadow-xs">
                  Our Research Focus
                </span>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-[13px] font-sans">
                  We live in a resource-constrained world subjected to uncertain climate variations. We must address the challenges of meeting the increasing demands for water, food, and energy from growing populations within the context of the nutrient-food-energy-water-land nexus. A systems perspective considering the nexus of technology, economics, the environment, and policy is at the heart of our research program.
                </p>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-[13px] font-sans">
                  Our research is focused on understanding these linkages at the systems level to perform integrated analyses, develop sustainable technologies, and build resilient strategies.
                </p>

                {/* YouTube presentation hook */}
                <div className="bg-white border-2 border-st-orange/20 rounded-xl p-4.5 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:border-st-orange/40 transition-colors">
                  <div className="flex gap-3.5 items-center">
                    <div className="h-11 w-11 rounded-lg bg-st-orange/10 flex items-center justify-center border border-st-orange/20 text-st-orange shrink-0">
                      <Play className="h-5 w-5 fill-st-orange" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#0d56a6] uppercase tracking-wide">Overview Presentation</h4>
                      <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                        For a comprehensive summary of our foundational research philosophy, watch our <span className="font-bold text-[#0d56a6]">Research Overview Presentation</span>.
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://www.youtube.com/watch?v=b965BddtPkE"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#0d56a6] hover:bg-[#ffa04d] hover:text-[#0d56a6] text-white rounded-lg transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    Watch Talk
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Research Topics Header */}
              <div className="space-y-1.5 pt-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0d56a6] tracking-tight uppercase">Research Topics</h3>
                <p className="text-xs text-slate-500">Pioneering core solutions structured across three major domains of ecological systems research.</p>
              </div>

              {/* Research Topics Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Card 1: Sustainable Technologies Development */}
                <div className="bg-white border border-slate-200 hover:border-st-orange/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm card-3d-bevel transition-all duration-300 hover:shadow-md flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-st-orange/10 text-st-orange rounded-xl border border-st-orange/15 shadow-inner">
                      <Zap className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs font-extrabold text-[#0c2340] tracking-tight leading-snug uppercase font-sans">
                      Sustainable Technologies Development
                    </h4>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <ul className="space-y-3.5 flex-1 text-xs text-slate-600">
                    {sustainableTechTopics.map((topic, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span className="h-5 w-5 rounded-md bg-st-orange/10 text-st-orange flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed text-slate-705">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 2: Engineering Systems Analysis */}
                <div className="bg-white border border-slate-200 hover:border-st-blue/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm card-3d-bevel transition-all duration-300 hover:shadow-md flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-st-blue/10 text-st-blue rounded-xl border border-st-blue/15 shadow-inner">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs font-extrabold text-[#0c2340] tracking-tight leading-snug uppercase font-sans">
                      Engineered Systems Analysis
                    </h4>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <ul className="space-y-3.5 flex-1 text-xs text-slate-600">
                    {engineeringSystemsTopics.map((topic, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span className="h-5 w-5 rounded-md bg-st-blue/10 text-st-blue flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed text-slate-705">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 3: Indian Knowledge Systems (IKS) */}
                <div className="bg-white border border-slate-200 hover:border-st-green/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm card-3d-bevel transition-all duration-300 hover:shadow-md flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-st-green/10 text-st-green rounded-xl border border-st-green/15 shadow-inner">
                      <Sprout className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs font-extrabold text-[#0c2340] tracking-tight leading-snug uppercase font-sans">
                      Indian Knowledge Systems
                    </h4>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <ul className="space-y-3.5 flex-1 text-xs text-slate-600">
                    {iksRuralTopics.map((topic, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span className="h-5 w-5 rounded-md bg-st-green/10 text-st-green flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed text-slate-705">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Current Projects Section */}
              <div className="space-y-4 pt-6 mt-4 border-t border-slate-150">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0c2340] tracking-tight uppercase">Current Projects</h3>
                  <p className="text-xs text-slate-500">Active research investigations, theoretical modeling, and experimental trials currently underway at STLab.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 hover:border-st-green/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between card-3d-bevel">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-st-green/10 text-st-green rounded-lg border border-st-green/15">
                          <Sprout className="h-4.5 w-4.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Plant-microbiome-soil</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        Investigating and standardising the preparation of Kunapajala (a traditional Indian liquid bio-fertiliser) to enhance sustainable agricultural practices.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 hover:border-st-orange/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between card-3d-bevel">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-st-orange/10 text-st-orange rounded-lg border border-st-orange/15">
                          <Cpu className="h-4.5 w-4.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Bioprocess scaleup and control</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        Designing, modeling, and optimizing bioreactor systems for advanced bioprocessing and sustainable technology applications.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 hover:border-st-blue/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between card-3d-bevel">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-st-blue/10 text-st-blue rounded-lg border border-st-blue/15">
                          <Atom className="h-4.5 w-4.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Pest management using IKS approaches</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        Formulating and evaluating traditional, plant-based pesticide formulations for eco-friendly and sustainable pest management.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 hover:border-slate-300 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between card-3d-bevel">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-lg border border-slate-200">
                          <Layers className="h-4.5 w-4.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Toxicity of non-stick cookware under Indian cooking conditions</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        Analysis, Characterization and In-Vitro Toxicity Evaluation of By-products from Teflon Coated Cookware Under Cooking Temperature Conditions.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 hover:border-sky-300 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between card-3d-bevel">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-sky-50 text-sky-600 rounded-lg border border-sky-100">
                          <Database className="h-4.5 w-4.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Hexadic Tank Modeling</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        Developing and implementing advanced process control strategies and theoretical simulations utilising an hexadic tank system.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 hover:border-amber-300 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between card-3d-bevel">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg border border-amber-100">
                          <Globe className="h-4.5 w-4.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Rainfall Models of Bharat</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        Analysing algorithmic and observational frameworks in Indian Knowledge Systems (IKS) for understanding and improving the rainfall prediction methods.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* People Team Pane */}
        {activeTab === "people" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800">Sustainable Technologies Lab Roster</h3>
              <p className="text-xs text-slate-500">List of researchers, Principal Investigator, and alumni of STLab.</p>
            </div>

            {/* Parallel sub-tabs: Principal Investigator VS Researchers & Alumni */}
            <div className="flex border-b border-slate-200 gap-1 sm:gap-2">
              <button 
                onClick={() => setPeopleSubTab("pi")}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all relative cursor-pointer ${
                  peopleSubTab === "pi" 
                  ? "border-st-orange text-[#0c2340] font-extrabold" 
                  : "border-transparent text-slate-400 hover:text-slate-600 font-medium"
                }`}
              >
                <span>Principal Investigator (PI)</span>
                {peopleSubTab === "pi" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-st-orange" />
                )}
              </button>
              <button 
                onClick={() => setPeopleSubTab("students")}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all relative cursor-pointer ${
                  peopleSubTab === "students" 
                  ? "border-st-orange text-[#0c2340] font-extrabold" 
                  : "border-transparent text-slate-400 hover:text-slate-600 font-medium"
                }`}
              >
                <span>Researchers & Alumni</span>
                {peopleSubTab === "students" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-st-orange" />
                )}
              </button>
            </div>

            {peopleSubTab === "pi" ? (
              <div className="space-y-6 animate-fadeIn">
                {/* Principal Investigator biography card (Bento Board Presentation) */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col gap-6.5 card-3d-bevel">
              
              {/* Header Profile Info Card */}
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-gradient-to-r from-st-blue/5 to-transparent p-5 rounded-xl border border-slate-200 shadow-sm">
                
                {/* PI Photo Frame (With Dual Fallback support) */}
                <div className="h-32 w-32 md:h-36 md:w-36 rounded-2xl bg-[#072138] border-2 border-st-orange/30 overflow-hidden shadow-md shrink-0 relative group flex items-center justify-center">
                  {!imgError ? (
                    <img 
                      src="/assets/ganti_murthy.jpeg" 
                      alt="Prof. Ganti Suryanarayana Murthy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={() => setImgError(true)}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0d56a6] to-[#052449] flex flex-col justify-center items-center text-white p-3 text-center">
                      <span className="text-3xl font-extrabold tracking-tight">GSM</span>
                      <span className="text-[8.5px] font-mono tracking-widest text-[#ffa04d] font-bold mt-1 uppercase bg-black/30 px-1.5 py-0.5 rounded">DIRECTOR</span>
                    </div>
                  )}
                  {/* Subtle Accent overlay */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
                </div>

                {/* PI Identity Details */}
                <div className="space-y-3 flex-1">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-st-green/10 text-st-green border border-st-green/15 inline-block">
                      Principal Investigator
                    </span>
                    <h3 className="text-2xl font-extrabold text-st-blue tracking-tight">
                      Prof. Ganti Suryanarayana Murthy
                    </h3>
                    <p className="text-sm font-bold text-slate-800 leading-snug">
                      {people.director.role}
                    </p>
                  </div>

                  {/* Sub-Roles list */}
                  <div className="space-y-1.5 text-xs text-slate-600 font-sans">
                    {people.director.subRoles.map((role, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-orange rounded-full mt-1.5 shrink-0" />
                        <span className="font-medium text-slate-700 leading-tight">{role}</span>
                      </div>
                    ))}
                  </div>

                  {/* Communication tags */}
                  <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-slate-500 font-mono border-t border-slate-200 pb-2">
                    <span className="flex items-center gap-1.5 hover:text-st-blue transition-colors">
                      <Mail className="h-3.5 w-3.5 text-st-orange shrink-0" />
                      ganti.murthy@iiti.ac.in
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-st-green shrink-0" />
                      {people.director.office}
                    </span>
                  </div>

                  {/* Academic & Professional Profiles */}
                  <div className="pt-2.5 border-t border-slate-200">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1.5">
                      Academic & Professional Portals
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {people.director.links?.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          referrerPolicy="no-referrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[10.5px] font-bold text-st-blue bg-neutral-100 hover:bg-st-blue hover:text-white border border-slate-200 hover:border-transparent rounded-md transition-all cursor-pointer"
                        >
                          <Globe className="h-3 w-3 shrink-0" />
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5.5">
                
                {/* Grid Col L: About / Bio */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5 h-full">
                    <h4 className="text-xs font-bold text-st-blue uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                      <Award className="h-4 w-4 text-st-orange" />
                      About & Philosophy
                    </h4>
                    <div className="space-y-3 text-xs text-slate-650 leading-relaxed font-sans">
                      {people.director.about.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grid Col R: Current Leadership & Affiliations */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-st-blue uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                        <Building className="h-4 w-4 text-st-green" />
                        Current Leadership
                      </h4>
                      <div className="space-y-3 pt-2 text-xs">
                        {people.director.leadership.map((lead, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <span className="font-bold text-slate-900 leading-tight">{lead.role}</span>
                              <span className="text-[10px] text-slate-400 font-mono shrink-0">{lead.period}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-medium">{lead.org}</p>
                            {lead.note && (
                              <div className="mt-1 pb-1.5">
                                <p className="text-[10px] text-slate-500 bg-amber-50/50 border-l-2 border-st-orange/40 p-2 rounded-r-lg italic leading-normal">
                                  {lead.note}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2 Grid: Academic Experience (OSU Timeline) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5">
                    <h4 className="text-xs font-bold text-st-blue uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-st-orange" />
                      Academic Tenure USA
                    </h4>
                    
                    {/* OSU Academic Timeline */}
                    <div className="space-y-4 pt-1.5 relative before:absolute before:left-2 cursor-default before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-150">
                      {people.director.experience.map((exp, idx) => (
                        <div key={idx} className="relative pl-6 space-y-1 group">
                          {/* Timeline dot */}
                          <div className="absolute left-[5px] top-1.5 h-2 w-2 rounded-full border border-st-orange bg-white group-hover:bg-st-orange transition-colors" />
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="text-xs font-bold text-slate-800 leading-none">{exp.role}</span>
                            <span className="text-[9.5px] text-slate-400 font-mono shrink-0">{exp.period}</span>
                          </div>
                          <p className="text-[10.5px] text-slate-500 leading-none">Oregon State University, USA</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2 Grid: Entrepreneurship & Corporate Career */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5 h-full">
                    <h4 className="text-xs font-bold text-st-blue uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                      <Sprout className="h-4 w-4 text-st-green" />
                      Entrepreneurship & Industry
                    </h4>
                    <div className="space-y-3.5 text-xs">
                      {people.director.entrepreneurship.map((ent, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-bold text-slate-900 leading-tight">{ent.role}</span>
                            <span className="text-[9.5px] text-slate-400 font-mono shrink-0">{ent.period}</span>
                          </div>
                          <p className="text-[11px] text-slate-650 font-medium">{ent.org}</p>
                          {ent.note && (
                            <p className="text-[10.5px] text-slate-500 italic leading-snug mt-1 border-t border-dashed border-slate-100 pt-1">
                              {ent.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2 Grid: Education Credentials */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5 h-full">
                    <h4 className="text-xs font-bold text-st-blue uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-st-orange" />
                      Educational Lineage
                    </h4>
                    <div className="space-y-4 pt-1 text-xs">
                      {people.director.education.map((edu, idx) => (
                        <div key={idx} className="relative pl-6 space-y-1.5 group">
                          {/* Graduation Cap locator */}
                          <div className="absolute left-0 top-0.5">
                            <GraduationCap className="h-4 w-4 text-st-green" />
                          </div>
                          <div>
                            <div className="flex justify-between items-baseline gap-2">
                              <span className="font-bold text-slate-800 leading-tight">{edu.degree}</span>
                              <span className="text-[9.5px] text-slate-400 font-mono shrink-0">{edu.period}</span>
                            </div>
                            <p className="text-[10.5px] text-slate-500 leading-snug">{edu.inst}</p>
                            {edu.note && (
                              <p className="text-[9.5px] text-slate-400 font-normal italic mt-0.5">{edu.note}</p>
                            )}
                          </div>
                          {edu.coursesTaken && (
                            <div className="pt-1.5 border-t border-dashed border-slate-100/80">
                              <span className="text-[8.5px] font-bold text-st-orange uppercase tracking-wider block mb-1">Academic Courses Taken:</span>
                              <div className="flex flex-wrap gap-1">
                                {edu.coursesTaken.map((course, cIdx) => (
                                  <span key={cIdx} className="text-[9.5px] font-medium bg-slate-50 border border-slate-200/60 rounded px-1.5 py-0.5 text-slate-600 block">
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 3 Grid: Key Awards & Recognitions */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5 h-full">
                    <h4 className="text-xs font-bold text-st-blue uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                      <Award className="h-4 w-4 text-st-orange" />
                      Academic Awards & Honors
                    </h4>
                    <div className="space-y-3 pt-1 text-xs font-sans">
                      <div className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-orange rounded-full mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 leading-tight">Adani Indology Chair Professor (Agriculture)</span>
                          <span className="text-[9.5px] text-slate-400 font-mono ml-2">(2025)</span>
                          <p className="text-[10px] text-slate-500">Established to lead pioneering research in traditional ecological agriculture & advanced modern systems.</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-orange rounded-full mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 leading-tight">ASABE Honorable Mention Paper Award</span>
                          <span className="text-[9.5px] text-slate-400 font-mono ml-2">(2013)</span>
                          <p className="text-[10px] text-slate-500">American Society of Agricultural and Biological Engineers, recognized for outstanding publication impact.</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-orange rounded-full mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 leading-tight">ASABE Outstanding Reviewer Award</span>
                          <span className="text-[9.5px] text-slate-400 font-mono ml-2">(2009 & 2011)</span>
                          <p className="text-[10px] text-slate-500">For peer review quality and contribution to academic society development.</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-orange rounded-full mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 leading-tight">ARF Faculty Fellowship</span>
                          <span className="text-[9.5px] text-slate-400 font-mono ml-2">(2009)</span>
                          <p className="text-[10px] text-slate-500">Agricultural Research Foundation, OSU, for biofuel system dynamic modeling.</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-orange rounded-full mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 leading-tight">IIT Kharagpur Silver Medal</span>
                          <span className="text-[9.5px] text-slate-400 font-mono ml-2">(2003)</span>
                          <p className="text-[10px] text-slate-500">Awarded for the highest academic performance (1st rank) in Food and Agricultural Engineering at M.Tech level.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3 Grid: Courses Taught & Developed */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3.5 h-full">
                    <h4 className="text-xs font-bold text-st-blue uppercase tracking-widest border-b border-slate-100 pb-1.5 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-st-green" />
                      Courses Taught & Developed
                    </h4>
                    <div className="space-y-3 pt-1 text-xs font-sans">
                      <div className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-green rounded-full mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 leading-tight">BSE 624: Bioprocess Engineering & Technology</span>
                          <p className="text-[10px] text-slate-500">Core postgraduate/doctoral curriculum covering reaction kinetics, upstream processes, and scale-up dynamics at IIT Indore.</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-green rounded-full mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 leading-tight">BEE 472/572: Ecological Engineering Design</span>
                          <p className="text-[10px] text-slate-500">Signature senior design course at Oregon State University combining ecosystem kinetics, thermodynamics, and physical design principles.</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-green rounded-full mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 leading-tight">BEE 482/582: Ecological Systems Analysis</span>
                          <p className="text-[10px] text-slate-500">Pioneering course developed at OSU addressing cradle-to-grave life cycle impacts (LCA), techno-economics (TEA), and process carbon accounting.</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="h-1.5 w-1.5 bg-st-green rounded-full mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 leading-tight">Indian Knowledge Systems (IKS) & Scientific Foundations</span>
                          <p className="text-[10px] text-slate-500">State-level and AICTE reference curriculum mapping ancient Indian agronomy, mathematics, forestation, and water management standards into modern ecological curricula.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Advising & Supervision Dashboard Board */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-2.5 gap-2.5">
                <div>
                  <h4 className="text-xs font-bold text-st-blue uppercase tracking-widest flex items-center gap-2">
                    <Users className="h-4.5 w-4.5 text-st-orange" />
                    Mentorship & Collaboration Dashboard
                  </h4>
                  <p className="text-[10px] text-slate-500 font-sans mt-0.5">Statistical summary of scholarly advising, committees, and collaborative networks worldwide.</p>
                </div>
                <span className="text-[9px] bg-slate-50 border border-slate-200 font-mono text-slate-500 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                  Global Record
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans text-[11px]">
                {/* Block 1: Major Professor */}
                <div className="bg-slate-50/60 border border-slate-200 p-3.5 rounded-xl space-y-2.5 hover:border-st-orange/20 transition-all">
                  <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <GraduationCap className="h-4 w-4 text-st-orange shrink-0" />
                    <span className="font-bold text-slate-700">As Major Professor</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">Ph.D. Graduates</span>
                      <span className="font-extrabold text-[#0c2340] bg-[#ffa04d]/20 px-2 py-0.5 rounded-md text-[10px]">14</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">M.S. Graduates</span>
                      <span className="font-extrabold text-[#0c2340] bg-[#ffa04d]/20 px-2 py-0.5 rounded-md text-[10px]">13</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">B.S. Graduates</span>
                      <span className="font-extrabold text-[#0c2340] bg-[#ffa04d]/20 px-2 py-0.5 rounded-md text-[10px]">7</span>
                    </div>
                  </div>
                </div>

                {/* Block 2: Minor & Committee */}
                <div className="bg-slate-50/60 border border-slate-200 p-3.5 rounded-xl space-y-2.5 hover:border-st-blue/20 transition-all">
                  <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <Users className="h-4 w-4 text-st-blue shrink-0" />
                    <span className="font-bold text-slate-700">As Minor / Committee</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">Ph.D. Advisory</span>
                      <span className="font-extrabold text-st-blue bg-st-blue/10 px-2 py-0.5 rounded-md text-[10px]">3</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">M.S. Advisory</span>
                      <span className="font-extrabold text-st-blue bg-st-blue/10 px-2 py-0.5 rounded-md text-[10px]">4</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">Grad Council Rep</span>
                      <span className="font-extrabold text-st-blue bg-st-blue/10 px-2 py-0.5 rounded-md text-[10px]">8</span>
                    </div>
                  </div>
                </div>

                {/* Block 3: Scholars & Interns */}
                <div className="bg-slate-50/60 border border-slate-200 p-3.5 rounded-xl space-y-2.5 hover:border-st-green/20 transition-all">
                  <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <Award className="h-4 w-4 text-st-green shrink-0" />
                    <span className="font-bold text-slate-700">Scholars & Mentoring</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">PostDoc Scholars</span>
                      <span className="font-extrabold text-st-green bg-st-green/10 px-2 py-0.5 rounded-md text-[10px]">3</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">Research Visitors</span>
                      <span className="font-extrabold text-st-green bg-st-green/10 px-2 py-0.5 rounded-md text-[10px]">3</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-[1px] border-slate-100">
                      <span className="text-slate-500">High School Interns</span>
                      <span className="font-extrabold text-st-green bg-st-green/10 px-2 py-0.5 rounded-md text-[10px]">16</span>
                    </div>
                  </div>
                </div>

                {/* Block 4: Collaborators */}
                <div className="bg-slate-50/60 border border-slate-200 p-3.5 rounded-xl space-y-2.5 hover:border-amber-500/20 transition-all">
                  <div className="flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <Globe className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="font-bold text-slate-700">Collaborator Network</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">Oregon State (OSU)</span>
                      <span className="font-extrabold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md text-[10px]">25</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">Other Universities</span>
                      <span className="font-extrabold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md text-[10px]">17</span>
                    </div>
                    <div className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <span className="text-slate-500">Industry & Agencies</span>
                      <span className="font-extrabold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md text-[10px]">11</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
              <div className="space-y-6 animate-fadeIn">
                {/* Active scholars and alumni split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
                  {/* Active list */}
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active Researchers
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {people.scholars.map((s, idx) => (
                        <div key={idx} className="bg-white border border-slate-150 rounded-xl p-3 flex justify-between items-center text-xs">
                          <div>
                            <h5 className="font-bold text-slate-800">{s.name}</h5>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{s.designation}</p>
                          </div>
                          <span className="text-[11px] text-slate-500 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded italic">
                            {s.topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alumni list */}
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      STLab Alumni & Last Affiliation
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {people.alumni.map((a, idx) => (
                        <div key={idx} className="bg-white border border-slate-150 rounded-xl p-3 flex justify-between items-center text-xs">
                          <div>
                            <h5 className="font-bold text-slate-800">{a.name}</h5>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{a.designation}</p>
                          </div>
                          <span className="text-[11px] text-st-blue bg-st-blue/10 border border-st-blue/15 px-2 py-0.5 rounded font-bold">
                            {a.current}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Publications Pane */}
        {(() => {
          const journalsList = OTHER_PUBLICATIONS.filter(pub => {
            const c = pub.citation.toLowerCase();
            if (c.includes("patent")) return false;
            return !(
              c.includes("biomass, biofuels, biochemicals") ||
              c.includes("elsevier") ||
              c.includes("handbook") ||
              c.includes("soil fertility management") ||
              c.includes("microorganisms for green revolution") ||
              c.includes("developments in microbial biotechnology") ||
              c.includes("phytochemicals, plant growth") ||
              c.includes("biofuels, 415-437") ||
              c.includes("systems analysis frameworks for biorefineries") ||
              c.includes("publishing") ||
              c.includes("press")
            );
          });

          const booksList = OTHER_PUBLICATIONS.filter(pub => {
            const c = pub.citation.toLowerCase();
            if (c.includes("patent")) return false;
            return (
              c.includes("biomass, biofuels, biochemicals") ||
              c.includes("elsevier") ||
              c.includes("handbook") ||
              c.includes("soil fertility management") ||
              c.includes("microorganisms for green revolution") ||
              c.includes("developments in microbial biotechnology") ||
              c.includes("phytochemicals, plant growth") ||
              c.includes("biofuels, 415-437") ||
              c.includes("systems analysis frameworks for biorefineries") ||
              c.includes("publishing") ||
              c.includes("press")
            );
          });

          return activeTab === "publications" && (

          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-[#0d56a6] uppercase tracking-tight">Publications & Patents</h3>
                <p className="text-xs text-slate-500 font-sans">Research output, patents, and doctoral/graduate dissertations from STLab.</p>
              </div>
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={pubSearch}
                  onChange={(e) => setPubSearch(e.target.value)}
                  className="w-full text-xs bg-slate-50 hover:bg-white focus:bg-white text-slate-700 placeholder-slate-400 pl-3 pr-10 py-2 border border-slate-200 focus:border-st-orange/50 rounded-lg outline-none transition-all duration-200"
                />
                <button className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sub-tabs for filtering */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 pb-3">
              <button
                onClick={() => setPubFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-200 ${
                  pubFilter === "all"
                    ? "bg-[#0d56a6] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Publications ({DISSERTATIONS.length + PATENTS.length + journalsList.length + booksList.length})
              </button>
              <button
                onClick={() => setPubFilter("dissertations")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-200 ${
                  pubFilter === "dissertations"
                    ? "bg-[#0d56a6] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                🎓 Dissertations ({DISSERTATIONS.length})
              </button>
              <button
                onClick={() => setPubFilter("patents")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-200 ${
                  pubFilter === "patents"
                    ? "bg-[#0d56a6] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                💡 Patents ({PATENTS.length})
              </button>
              <button
                onClick={() => setPubFilter("journals")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-200 ${
                  pubFilter === "journals"
                    ? "bg-[#0d56a6] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                📄 Journal Papers ({journalsList.length})
              </button>
              <button
                onClick={() => setPubFilter("books")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-200 ${
                  pubFilter === "books"
                    ? "bg-[#0d56a6] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                📚 Books & Book Chapters ({booksList.length})
              </button>
            </div>

            {/* List of items */}
            <div className="space-y-6">
              {/* Featured High Cited & Notable Publications Banner */}
              {pubFilter === "all" && !pubSearch && (
                <div className="space-y-4 bg-gradient-to-r from-st-orange/5 via-st-blue/5 to-st-orange/5 p-5 rounded-2xl border border-st-orange/15 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-st-orange/15 text-st-orange rounded-lg">
                      <Award className="h-4 w-4 animate-bounce" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Notable & Highly Cited Research Highlights</h4>
                      <p className="text-[10px] text-slate-500 font-sans">Seminal papers and commercialized inventions with significant global impact.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Item 1 */}
                    <div className="bg-white border border-slate-200/80 hover:border-st-orange/30 rounded-xl p-4 transition-all hover:shadow-md card-3d-bevel">
                      <div className="flex justify-between items-start gap-2">
                        <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-mono tracking-widest">
                          ★ Highly Cited (500+ Cites)
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">2010</span>
                      </div>
                      <p className="text-[12px] text-slate-700 font-medium leading-relaxed mt-2">
                        Sander, K., Murthy, G. S. (2010). Life cycle analysis of algae biodiesel. <strong>The International Journal of Life Cycle Assessment</strong> 15 (7), 704-714.
                      </p>
                      <div className="mt-2 text-[10px] text-st-blue bg-st-blue/5 px-2 py-1.5 rounded-lg flex gap-1 items-start font-sans">
                        <span>💡</span>
                        <span><strong>LCA Milestone:</strong> Widely cited global benchmark paper establishing environmental performance boundaries for algae biofuels.</span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white border border-slate-200/80 hover:border-st-blue/30 rounded-xl p-4 transition-all hover:shadow-md card-3d-bevel">
                      <div className="flex justify-between items-start gap-2">
                        <span className="bg-sky-100 text-sky-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-mono tracking-widest">
                          ★ Highly Cited (400+ Cites)
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">2011</span>
                      </div>
                      <p className="text-[12px] text-slate-700 font-medium leading-relaxed mt-2">
                        Kumar, D., Murthy, G. S. (2011). Impact of pretreatment and downstream processing technologies on economics and energy in cellulosic ethanol production. <strong>Biotechnology for Biofuels</strong> 4 (1), 27.
                      </p>
                      <div className="mt-2 text-[10px] text-st-blue bg-st-blue/5 px-2 py-1.5 rounded-lg flex gap-1 items-start font-sans">
                        <span>📊</span>
                        <span><strong>Bioprocess Economics:</strong> Foundational techno-economic assessment mapping cellulosic ethanol pre-treatment limits.</span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-white border border-slate-200/80 hover:border-st-orange/30 rounded-xl p-4 transition-all hover:shadow-md card-3d-bevel">
                      <div className="flex justify-between items-start gap-2">
                        <span className="bg-indigo-100 text-indigo-805 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-mono tracking-widest">
                          ★ Licensed Commercial Patent
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">2011</span>
                      </div>
                      <p className="text-[12px] text-slate-700 font-medium leading-relaxed mt-2">
                        Murthy, G. S., Singh, V. (2011). Dynamic fermentation controller. <strong>US Patent 7,862,992.</strong>
                      </p>
                      <div className="mt-2 text-[10px] text-st-blue bg-st-blue/5 px-2 py-1.5 rounded-lg flex gap-1 items-start font-sans">
                        <span>⚙️</span>
                        <span><strong>Industrial Scaling:</strong> Commercialized system deployed in multiple industrial dry-grind corn ethanol biorefineries across the US.</span>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="bg-white border border-slate-200/80 hover:border-st-green/30 rounded-xl p-4 transition-all hover:shadow-md card-3d-bevel">
                      <div className="flex justify-between items-start gap-2">
                        <span className="bg-green-100 text-green-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase font-mono tracking-widest">
                          ★ High-Impact Model (150+ Cites)
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">2013</span>
                      </div>
                      <p className="text-[12px] text-slate-700 font-medium leading-relaxed mt-2">
                        Kumar, D., Murthy, G. S. (2013). Stochastic molecular model of enzymatic hydrolysis of cellulose for ethanol production. <strong>Biotechnology for Biofuels</strong> 6 (1), 63.
                      </p>
                      <div className="mt-2 text-[10px] text-st-blue bg-st-blue/5 px-2 py-1.5 rounded-lg flex gap-1 items-start font-sans">
                        <span>🧬</span>
                        <span><strong>Molecular Cybernetics:</strong> Advanced stochastic simulation of multi-enzyme synergistic cellulose hydrolysis.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 1. Dissertations Section */}
              {(pubFilter === "all" || pubFilter === "dissertations") && (
                <div className="space-y-3">
                  {pubFilter === "all" && (
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-l-2 border-st-orange pl-2">
                      Graduate Dissertations ({DISSERTATIONS.length})
                    </h4>
                  )}
                  <div className="grid grid-cols-1 gap-3">
                    {DISSERTATIONS.filter(item => {
                      if (!pubSearch) return true;
                      const searchLower = pubSearch.toLowerCase();
                      return (
                        item.title.toLowerCase().includes(searchLower) ||
                        item.author.toLowerCase().includes(searchLower) ||
                        item.institution.toLowerCase().includes(searchLower) ||
                        item.year.includes(searchLower)
                      );
                    }).map((diss, index) => (
                      <div key={index} className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 hover:border-slate-350 rounded-xl p-4 transition-all duration-200 flex items-start gap-3.5 shadow-sm">
                        <div className="p-2.5 bg-st-orange/10 text-st-orange border border-st-orange/15 rounded-lg shrink-0 mt-0.5">
                          <GraduationCap className="h-4.5 w-4.5" />
                        </div>
                        <div className="space-y-1.5">
                          <h5 className="text-[13px] font-bold text-slate-800 leading-snug">
                            {diss.title}
                          </h5>
                          <p className="text-xs text-slate-600 font-sans font-medium">
                            Author: <span className="text-slate-800 font-bold">{diss.author}</span> ({diss.year})
                          </p>
                          <p className="text-[11px] text-slate-500 font-sans italic">
                            University: {diss.institution}
                          </p>
                        </div>
                      </div>
                    ))}
                    {DISSERTATIONS.filter(item => {
                      if (!pubSearch) return true;
                      const searchLower = pubSearch.toLowerCase();
                      return (
                        item.title.toLowerCase().includes(searchLower) ||
                        item.author.toLowerCase().includes(searchLower) ||
                        item.institution.toLowerCase().includes(searchLower) ||
                        item.year.includes(searchLower)
                      );
                    }).length === 0 && pubFilter === "dissertations" && (
                      <p className="text-xs text-slate-400 font-mono italic">No matching dissertations found.</p>
                    )}
                  </div>
                </div>
              )}

              {/* 2. Patents Section */}
              {(pubFilter === "all" || pubFilter === "patents") && (
                <div className="space-y-3 pt-2">
                  {pubFilter === "all" && (
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-l-2 border-st-blue pl-2">
                      Patents & Innovations ({PATENTS.length})
                    </h4>
                  )}
                  <div className="grid grid-cols-1 gap-3">
                    {PATENTS.filter(item => {
                      if (!pubSearch) return true;
                      const searchLower = pubSearch.toLowerCase();
                      return (
                        item.title.toLowerCase().includes(searchLower) ||
                        item.number.toLowerCase().includes(searchLower) ||
                        item.inventors.toLowerCase().includes(searchLower) ||
                        item.office.toLowerCase().includes(searchLower) ||
                        (item.details && item.details.toLowerCase().includes(searchLower))
                      );
                    }).map((pat, index) => (
                      <div key={index} className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 hover:border-slate-350 rounded-xl p-4 transition-all duration-200 flex items-start gap-3.5 shadow-sm relative overflow-hidden group">
                        {pat.type === "Patent" && (
                          <div className="absolute top-0 right-0 bg-st-blue/10 text-st-blue text-[9px] font-bold px-2 py-0.5 rounded-bl-lg border-l border-b border-st-blue/15 uppercase font-mono">
                            Licensed / Commercialized
                          </div>
                        )}
                        <div className="p-2.5 bg-st-blue/10 text-st-blue border border-st-blue/15 rounded-lg shrink-0 mt-0.5">
                          <Cpu className="h-4.5 w-4.5" />
                        </div>
                        <div className="space-y-1.5 pr-20">
                          <h5 className="text-[13px] font-bold text-slate-800 leading-snug">
                            {pat.title}
                          </h5>
                          <p className="text-xs text-slate-600 font-sans font-medium">
                            Inventors: <span className="text-slate-800 font-bold">{pat.inventors}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">
                            {pat.number} — <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-sans font-bold">{pat.date}</span>
                          </p>
                          <p className="text-[11px] text-slate-500 font-sans">
                            {pat.office}
                          </p>
                          {pat.details && (
                            <div className="mt-2 text-[11px] text-[#0d56a6] bg-st-orange/5 border border-st-orange/10 p-2 rounded-lg font-sans leading-relaxed">
                              💡 <strong className="font-bold">Impact:</strong> {pat.details}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {PATENTS.filter(item => {
                      if (!pubSearch) return true;
                      const searchLower = pubSearch.toLowerCase();
                      return (
                        item.title.toLowerCase().includes(searchLower) ||
                        item.number.toLowerCase().includes(searchLower) ||
                        item.inventors.toLowerCase().includes(searchLower) ||
                        item.office.toLowerCase().includes(searchLower) ||
                        (item.details && item.details.toLowerCase().includes(searchLower))
                      );
                    }).length === 0 && pubFilter === "patents" && (
                      <p className="text-xs text-slate-400 font-mono italic">No matching patents found.</p>
                    )}
                  </div>
                </div>
              )}

              {/* 3. Journal Papers Section */}
              {(pubFilter === "all" || pubFilter === "journals") && (
                <div className="space-y-3 pt-2">
                  {pubFilter === "all" && (
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-l-2 border-st-green pl-2">
                      Journal Papers ({journalsList.length})
                    </h4>
                  )}
                  
                  {/* Google Scholar Link Banner */}
                  <div className="bg-[#0b223f]/5 border border-[#0b223f]/15 rounded-xl p-3.5 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#0b223f]/10 text-[#0b223f] rounded-lg shrink-0">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#0b223f] uppercase tracking-wider font-sans">Prof. Ganti S. Murthy's Citations</h4>
                        <p className="text-[11px] text-slate-500 font-sans">Access full citation metrics, h-index, and real-time research updates on Google Scholar.</p>
                      </div>
                    </div>
                    <a
                      href="https://scholar.google.com/citations?user=PInw77gAAAAJ&hl=en"
                      target="_blank"
                      rel="noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0b223f] hover:bg-st-orange text-white rounded-lg text-xs font-extrabold transition-all hover:shadow-md cursor-pointer shrink-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Google Scholar Profile</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {journalsList.filter(item => {
                      if (!pubSearch) return true;
                      const searchLower = pubSearch.toLowerCase();
                      return (
                        item.citation.toLowerCase().includes(searchLower) ||
                        item.year.toString().includes(searchLower)
                      );
                    }).map((pub, index) => (
                      <div key={index} className="bg-slate-50/50 hover:bg-white border hover:border-slate-350 rounded-xl px-4 py-3.5 transition-all duration-200 flex items-start gap-3 shadow-inner shadow-slate-50">
                        <div className="p-1 px-1.5 bg-st-green/10 text-st-green border border-st-green/15 rounded text-[10px] font-bold shrink-0 font-mono mt-0.5">
                          {pub.year}
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <p className="text-[12px] text-slate-700 leading-relaxed font-sans">
                            {pub.citation}
                          </p>
                          {(pub.doi || pub.link) && (
                            <div className="flex flex-wrap gap-2 pt-1 items-center">
                              {pub.doi && (
                                <span className="text-[10px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 font-mono text-slate-500">
                                  DOI: {pub.doi}
                                </span>
                              )}
                              {pub.link && (
                                <a
                                  href={pub.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  referrerPolicy="no-referrer"
                                  className="inline-flex items-center gap-1 text-[10.5px] font-bold text-st-blue hover:text-st-orange bg-st-blue/5 border border-st-blue/10 hover:border-st-orange/20 rounded px-2 py-0.5 transition-all"
                                >
                                  <ExternalLink className="h-2.5 w-2.5" />
                                  <span>View Article</span>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {journalsList.filter(item => {
                      if (!pubSearch) return true;
                      const searchLower = pubSearch.toLowerCase();
                      return (
                        item.citation.toLowerCase().includes(searchLower) ||
                        item.year.toString().includes(searchLower)
                      );
                    }).length === 0 && pubFilter === "journals" && (
                      <p className="text-xs text-slate-400 font-mono italic">No matching journal papers found.</p>
                    )}
                  </div>
                </div>
              )}

              {/* 4. Books and Book Chapters Section */}
              {(pubFilter === "all" || pubFilter === "books") && (
                <div className="space-y-3 pt-4 border-t border-slate-100/50 mt-4">
                  {pubFilter === "all" && (
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono border-l-2 border-indigo-500 pl-2">
                      Books & Book Chapters ({booksList.length})
                    </h4>
                  )}
                  <div className="grid grid-cols-1 gap-2">
                    {booksList.filter(item => {
                      if (!pubSearch) return true;
                      const searchLower = pubSearch.toLowerCase();
                      return (
                        item.citation.toLowerCase().includes(searchLower) ||
                        item.year.toString().includes(searchLower)
                      );
                    }).map((pub, index) => (
                      <div key={index} className="bg-slate-50/50 hover:bg-white border hover:border-slate-350 rounded-xl px-4 py-3.5 transition-all duration-200 flex items-start gap-3 shadow-inner shadow-slate-50">
                        <div className="p-1 px-1.5 bg-indigo-50 text-indigo-705 border border-indigo-200 rounded text-[10px] font-bold shrink-0 font-mono mt-0.5">
                          {pub.year}
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <p className="text-[12px] text-slate-700 leading-relaxed font-sans">
                            {pub.citation}
                          </p>
                          {(pub.doi || pub.link) && (
                            <div className="flex flex-wrap gap-2 pt-1 items-center">
                              {pub.doi && (
                                <span className="text-[10px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 font-mono text-slate-500">
                                  DOI: {pub.doi}
                                </span>
                              )}
                              {pub.link && (
                                <a
                                  href={pub.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  referrerPolicy="no-referrer"
                                  className="inline-flex items-center gap-1 text-[10.5px] font-bold text-st-blue hover:text-st-orange bg-st-blue/5 border border-st-blue/10 hover:border-st-orange/20 rounded px-2 py-0.5 transition-all"
                                >
                                  <ExternalLink className="h-2.5 w-2.5" />
                                  <span>View Article</span>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {booksList.filter(item => {
                      if (!pubSearch) return true;
                      const searchLower = pubSearch.toLowerCase();
                      return (
                        item.citation.toLowerCase().includes(searchLower) ||
                        item.year.toString().includes(searchLower)
                      );
                    }).length === 0 && pubFilter === "books" && (
                      <p className="text-xs text-slate-400 font-mono italic">No matching books or book chapters found.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )})()}

        {/* Learning Resources pane */}
        {activeTab === "learning" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Intro banner */}
            <div className="bg-gradient-to-br from-st-green/5 via-slate-50 to-st-blue/5 border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm animate-fadeIn">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-st-green text-white shadow-xs">
                Academic Materials & Syllabi
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0d56a6] tracking-tight uppercase">
                Learning Resources
              </h3>
              <p className="text-slate-705 leading-relaxed text-xs sm:text-[13px] font-sans">
                Open-source lecture materials, course directories, and academic syllabi from our ongoing and past teaching programs across institutions.
              </p>
            </div>

            {/* Courses Grid/List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* 1. Biofuels Production Technologies */}
              <div className="bg-white border border-slate-200 hover:border-st-orange/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between card-3d-bevel">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-st-orange/10 text-st-orange rounded-lg">
                      <Zap className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0d56a6] uppercase tracking-wide">1. Biofuels Production Technologies</h4>
                      <p className="text-[10px] text-slate-400 font-mono">Foundational Course</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    A foundational course exploring traditional and advanced biofuel generation methodologies.
                  </p>
                  
                  <div className="space-y-2 pt-1 font-sans">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="font-bold text-st-orange font-mono">🔗</span>
                      <span>Lecture Slides & Notes:</span>
                    </div>
                    <a 
                      href="https://github.com/gsnmurthy/Biofuels_LectureSlides_Notes" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-st-orange hover:text-white transition-all text-[11px] text-[#0d56a6] rounded-md font-bold font-sans cursor-pointer hover:shadow-sm"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Biofuels Lecture Slides & Notes Repository
                    </a>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-slate-100 font-sans">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="font-bold text-st-orange font-mono">📺</span>
                      <span>Media Feature:</span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] text-slate-500 italic">Watch a brief conceptual overview of biofuels on the Green Science Oregon YouTube Channel.</p>
                      <a 
                        href="https://www.youtube.com/watch?v=Nib8f1Wgx3M" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-st-orange hover:text-white transition-all text-[11px] text-[#0d56a6] rounded-md font-bold font-sans cursor-pointer hover:shadow-sm"
                      >
                        <Play className="h-3 w-3" />
                        Green Science Oregon YouTube Channel (segment at 2:30 min)
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Ecological Systems Sustainability */}
              <div className="bg-white border border-slate-200 hover:border-st-orange/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between card-3d-bevel">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-st-blue/10 text-st-blue rounded-lg">
                      <Sprout className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0d56a6] uppercase tracking-wide">2. Ecological Systems Sustainability</h4>
                      <p className="text-[10px] text-slate-400 font-mono">Systems Analysis of Biofuels and Bioproducts</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    An interdisciplinary curriculum focusing on resource mapping, life cycle assessments (LCA), and techno-economic modeling within the food-energy-water nexus.
                  </p>

                  <div className="space-y-2 pt-1 font-sans">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="font-bold text-st-blue font-mono">🔗</span>
                      <span>Lecture Slides on GitHub:</span>
                    </div>
                    <a 
                      href="https://github.com/gsnmurthy/SystemsAnalysis_Course" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-st-blue hover:text-white transition-all text-[11px] text-[#0d56a6] rounded-md font-bold font-sans cursor-pointer hover:shadow-sm"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Systems Analysis Course Repository
                    </a>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-slate-100 font-sans">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="font-bold text-st-blue font-mono">📺</span>
                      <span>Video Lectures:</span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] text-slate-500 italic">Stream full programmatic lecture recordings.</p>
                      <a 
                        href="https://www.youtube.com/playlist?list=PLM8HMFlrLIScXW7p_9Pi_Fedjmc5J2uwR" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-st-blue hover:text-white transition-all text-[11px] text-[#0d56a6] rounded-md font-bold font-sans cursor-pointer hover:shadow-sm"
                      >
                        <Play className="h-3 w-3" />
                        Systems Analysis YouTube Playlist
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Bioprocess Control Systems */}
              <div className="bg-white border border-slate-200 hover:border-st-green/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 card-3d-bevel">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-st-green/10 text-st-green rounded-lg">
                      <Cpu className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0d56a6] uppercase tracking-wide">3. Bioprocess Control Systems</h4>
                      <p className="text-[10px] text-slate-400 font-mono">Advanced Curriculum</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    An advanced curriculum treating the implementation of classic and advanced process control algorithms (such as model predictive control) to monitor and optimize biomanufacturing and cellular environments.
                  </p>
                </div>
              </div>

              {/* 4. Ecological Engineering Design */}
              <div className="bg-white border border-slate-200 hover:border-st-orange/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 card-3d-bevel">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-st-orange/10 text-st-orange rounded-lg">
                      <Layers className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0d56a6] uppercase tracking-wide">4. Ecological Engineering Design</h4>
                      <p className="text-[10px] text-slate-400 font-mono">Senior Capstone / Oregon State University</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    A senior capstone design curriculum developed and co-taught alongside <strong>Prof. John Selker</strong> at Oregon State University, tasking engineering students with solving complex, multi-variable environmental and resource-nexus challenges.
                  </p>
                </div>
              </div>

              {/* 6. Scientific Research Methodology */}
              {/* 5. Bioprocess Engineering and Technology (BSE 624) */}
              <div className="bg-white border border-slate-200 hover:border-st-green/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 card-3d-bevel">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-st-green/10 text-st-green rounded-lg">
                      <GraduationCap className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0d56a6] uppercase tracking-wide">5. Bioprocess Engineering and Technology (BSE 624)</h4>
                      <p className="text-[10px] text-slate-400 font-mono">IIT Indore / BSBE Department</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    A core graduate-level course examining the fundamentals of bioprocess technology, upstream and downstream cultivation metrics, material and energy process calculations, bioreactor control, and fermentation economics.
                  </p>
                </div>
              </div>

              {/* 6. Scientific Research Methodology */}
              <div className="bg-white border border-slate-200 hover:border-st-blue/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 card-3d-bevel">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-st-blue/10 text-st-blue rounded-lg">
                      <Atom className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0d56a6] uppercase tracking-wide">6. Scientific Research Methodology</h4>
                      <p className="text-[10px] text-slate-400 font-mono">Core Graduate-Level Course / IIT Indore</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    A core graduate-level course focusing on rigorous experimental design, data validation, statistical uncertainty quantification, research ethics, and effective technical communication protocols for peer-reviewed engineering documentation.
                  </p>
                </div>
              </div>

              {/* 7. ChE 2035 Transport Phenomena */}
              <div className="bg-white border border-slate-200 hover:border-st-orange/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 card-3d-bevel">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-st-orange/10 text-st-orange rounded-lg">
                      <Layers className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0d56a6] uppercase tracking-wide">7. ChE 2035 Transport Phenomena</h4>
                      <p className="text-[10px] text-slate-400 font-mono">IIT Indore / Chemical Engineering Department</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    The main aim of this course is to provide a detailed understanding of Transport Phenomena. The learning outcomes for this course are: 1) Demonstrate a thorough understanding of the fundamental principles underlying mass transfer, momentum transfer, and heat transfer. 2) Apply transport phenomena concepts to the scale-up and design of chemical processes and equipment, ensuring that laboratory-scale findings are accurately translated to industrial operations. 3) Develop the ability to formulate and solve mathematical models representing transport processes.
                  </p>
                </div>
              </div>

              {/* 8. BSE 641 Engineered Systems Analysis */}
              <div className="bg-white border border-slate-200 hover:border-st-blue/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 card-3d-bevel">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-st-blue/10 text-st-blue rounded-lg">
                      <Sprout className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0d56a6] uppercase tracking-wide">8. BSE 641 Engineered Systems Analysis</h4>
                      <p className="text-[10px] text-slate-400 font-mono">IIT Indore / BSBE Department</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    Assessing sustainability of engineered systems is integral part of engineering practice. This course will introduce multiple dimensions of sustainability analysis for engineered systems. Methods and tools to perform technical feasibility and economic viability analysis, environmental risk, resource sustainability and life cycle assessments will be discussed in lectures and case studies.
                  </p>
                </div>
              </div>

              {/* 9. BSE 621 Modeling and Controls in Medical Devices */}
              <div className="bg-white border border-slate-200 hover:border-st-green/30 rounded-xl p-5 hover:shadow-md transition-all duration-300 card-3d-bevel">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 bg-st-green/10 text-st-green rounded-lg">
                      <Cpu className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0d56a6] uppercase tracking-wide">9. BSE 621 Modeling and Controls in Medical Devices</h4>
                      <p className="text-[10px] text-slate-400 font-mono">IIT Indore / BSBE Department</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-sans">
                    This course covers the principles and concepts of control systems and estimation theory for biomedical systems and devices. This course provides an introduction to relevant biomedical applications of the control systems and estimation techniques.
                  </p>
                </div>
              </div>

            </div>

            {/* Talks & Public Seminars section */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-st-orange">
                    <span className="p-1 px-2.5 bg-st-orange/10 text-st-orange text-[10px] font-bold uppercase rounded-md tracking-wider border border-st-orange/20">
                      IKS & Scientific Outreach
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold uppercase tracking-tight text-slate-900 font-sans mt-2">
                    Talks & Public Seminars
                  </h3>
                  <p className="text-xs text-slate-500 font-sans font-light">
                    Public lectures, international guest keynotes, and media broadcasts delivered by Prof. Ganti Suryanarayana Murthy.
                  </p>
                </div>
              </div>

              {/* Filtering + Search bar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                {/* Tabs */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-start">
                  {(["invited", "live"] as const).map((filterVal) => {
                    const labelMap = {
                      invited: "Invited Lectures",
                      live: "Live Panels"
                    };
                    const count = PI_TALKS.filter(p => p.category === filterVal).length;

                    return (
                      <button
                        key={filterVal}
                        onClick={() => setTalkFilter(filterVal)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          talkFilter === filterVal
                            ? "bg-st-orange text-white shadow-xs"
                            : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                        }`}
                      >
                        {labelMap[filterVal]} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Search */}
                <div className="relative max-w-sm w-full">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search talks & seminars..."
                    value={talkSearch}
                    onChange={(e) => setTalkSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-st-orange/50 focus:border-st-orange/50 font-sans"
                  />
                </div>
              </div>

              {/* Grid of video list */}
              {(() => {
                const filteredTalks = PI_TALKS.filter((talk) => {
                  const matchesFilter = talk.category === talkFilter;
                  const matchesSearch = talk.title.toLowerCase().includes(talkSearch.toLowerCase());
                  return matchesFilter && matchesSearch;
                });

                if (filteredTalks.length === 0) {
                  return (
                    <div className="text-center py-12 bg-white border border-slate-200 rounded-xl font-sans">
                      <p className="text-sm text-slate-400 italic">No matching public talks found in this category.</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTalks.map((talk, index) => {
                      const isLive = talk.category === "live";
                      const icon = isLive ? <Radio className="h-4 w-4" /> : <Video className="h-4 w-4" />;
                      const tagStyle = isLive
                        ? "bg-sky-50 text-sky-700 bg-sky-500/10 border-sky-500/20"
                        : "bg-amber-50 text-amber-700 bg-amber-500/10 border-amber-500/20";
                      const tagLabel = isLive ? "Live Session" : "Invited Seminar";

                      return (
                        <div 
                          key={index} 
                          className="bg-white hover:bg-slate-55/40 border border-slate-200/80 hover:border-st-orange/20 rounded-xl p-4 transition-all duration-300 flex flex-col justify-between gap-3 group relative overflow-hidden card-3d-bevel"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase rounded-md border tracking-wider font-mono ${tagStyle}`}>
                                {icon}
                                {tagLabel}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">#{index + 1}</span>
                            </div>
                            <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-st-orange transition-colors duration-200 leading-snug font-sans">
                              {talk.title}
                            </h4>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between overflow-hidden">
                            <span className="text-[10px] text-slate-400 font-mono truncate max-w-[150px] sm:max-w-xs">{talk.url}</span>
                            <a 
                              href={talk.url}
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold bg-slate-100 hover:bg-st-orange text-slate-700 hover:text-white rounded-lg transition-all duration-200 border border-slate-200 hover:border-transparent cursor-pointer shadow-xs whitespace-nowrap"
                            >
                              <span>Watch</span>
                              <Play className="h-2.5 w-2.5 shrink-0" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* Lab Gallery Pane */}
        {activeTab === "gallery" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-st-green">
                <span className="p-1 px-2.5 bg-st-green/10 text-st-green text-[10px] font-bold uppercase rounded-md tracking-wider border border-st-green/20">
                  Visual Archive
                </span>
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
                The Place of Memories
              </h3>
              <p className="text-xs text-slate-500 font-sans font-light">
                A serene, clean canvas dedicated to preserving handpicked milestones, academic highlights, and collaborative moments of STLab researchers at IIT Indore.
              </p>
            </div>

            {/* Core Memory Visual Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs card-3d-bevel">
              <div className="text-center max-w-xl mx-auto space-y-3 pb-2">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-st-green/10 text-st-green mb-1">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <h4 className="text-base font-extrabold text-slate-800">A Repository of Shared Journeys</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  This sanctuary serves as a curated archive for key snapshots of our laboratory halls, summits, and academic events.
                </p>
              </div>

              {/* Curated Memories Board Grid */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-2 gap-2">
                  <h5 className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest">
                    Archived Board Snapshots
                  </h5>
                  <span className="text-[10.5px] text-slate-400 italic">
                    Photo Courtesy: Abhishek D Kalbande and Buddhodev Ghosh
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {memories.map((m) => {
                    const yearVal = m.year;
                    return (
                      <div key={m.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between aspect-[4/5] relative overflow-hidden shadow-sm group hover:-rotate-1 hover:scale-[1.01] transition-transform duration-300">
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-900 shadow-inner flex items-center justify-center">
                          <img 
                            src={m.url} 
                            alt={m.displayName || `Memory ${yearVal}`} 
                            className="w-full h-full object-cover transition-transform duration-350 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src.includes('Prof_Murthys_Birthday_2025.jpeg')) {
                                target.src = "/assets/Prof. Murthy's Birthday 2025.jpeg";
                              } else if (target.src.includes("Prof. Murthy's Birthday 2025.jpeg") || target.src.includes("Prof.%20Murthy's%20Birthday%202025.jpeg")) {
                                target.src = "/assets/Prof_Murthys_Birthday_2025.jpg";
                              } else if (target.src.includes('Prof_Murthys_Birthday.jpeg')) {
                                target.src = "/assets/Prof. Murthy's Birthday.jpeg";
                              } else if (target.src.includes("Prof. Murthy's Birthday.jpeg") || target.src.includes("Prof.%20Murthy's%20Birthday.jpeg")) {
                                target.src = "/assets/Prof_Murthys_Birthday.jpg";
                              }
                            }}
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/75 backdrop-blur-xs text-[10px] font-bold text-white rounded-md tracking-wider">
                            {yearVal}
                          </div>
                        </div>
                        <div className="pt-3 border-t border-slate-100 mt-2 flex flex-col gap-1">
                          <div className="font-extrabold text-xs text-slate-800 leading-tight">
                            {m.displayName}
                          </div>
                          {m.errorNotes && (
                            <div className="flex flex-col gap-0.5 text-[10px] text-slate-400 font-mono">
                              <span className="text-emerald-600 font-bold font-sans text-[9px] flex items-center gap-0.5 mt-0.5 animate-pulse">
                                <Check className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
                                {m.errorNotes}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact info pane */}
        {activeTab === "contact" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-800">Contact STLab</h3>
              <p className="text-xs text-slate-500 font-sans">Reach out to Sustainable Technologies Laboratory directory for collaborations or inquiries.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-2">
              {/* Primary Address Column */}
              <div className="md:col-span-8 bg-white border border-slate-200 rounded-xl p-4 shadow-md card-3d-bevel flex flex-col sm:flex-row gap-5 items-stretch min-h-[240px]">
                {/* Left: Physical Address Details in beautiful corporate slate blue */}
                <div className="sm:w-5/12 bg-[#0d56a6] rounded-lg p-4 text-white flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-st-orange text-[10px] font-bold uppercase tracking-wider block">Lab Physical Address</span>
                    <div className="flex gap-2.5 items-start text-xs leading-relaxed font-sans">
                      <MapPin className="h-4.5 w-4.5 text-st-orange shrink-0 mt-0.5 animate-bounce" />
                      <div>
                        <h4 className="font-bold text-white text-sm leading-tight mb-1">Sustainable Technologies Lab (STLab)</h4>
                        <p className="text-slate-100">601-B POD Building</p>
                        <p className="text-slate-100 font-sans">IIT Indore</p>
                        <p className="text-slate-200">Simrol Campus, Simrol</p>
                        <p className="text-slate-200 font-medium">Indore, MP 453552, India</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-2.5 flex flex-col gap-1.5 text-[10px] text-slate-100 font-medium">
                    <span className="flex items-center gap-1.5 font-bold hover:text-white transition-colors">
                      <Mail className="h-3 w-3 text-st-orange animate-pulse" />
                      ganti.murthy@iiti.ac.in
                    </span>
                    <span className="flex items-center gap-1.5 font-bold hover:text-white transition-colors">
                      <Globe className="h-3 w-3 text-st-orange" />
                      iiti.ac.in
                    </span>
                  </div>
                </div>

                {/* Right: Unobstructed, high quality view of the laboratory picture */}
                <div className="sm:w-7/12 flex flex-col">
                  <div className="relative rounded-lg overflow-hidden border border-slate-150 flex-1 aspect-video sm:aspect-auto min-h-[160px] group shadow-inner">
                    <img 
                      src="/assets/STL_POD_1B-601.jpeg" 
                      alt="Sustainable Technologies Laboratory Physical Facility" 
                      className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Shadow overlay at bottom of photo for the caption */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-2 text-white text-[10.5px] font-sans flex items-center justify-between z-10">
                      <span className="font-semibold tracking-wide">601-B POD Building Lab Facility</span>
                      <span className="text-slate-300 italic text-[9px]">Photo: STLab Physical Facility</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informational tip */}
              <div className="md:col-span-4 bg-slate-50 rounded-xl border border-slate-205 p-5 space-y-4 hover:bg-white hover:border-slate-355 hover:shadow-xs transition-all card-3d-bevel">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-st-orange" />
                  Academic Inquiries
                </h4>
                <div className="text-xs text-slate-600 space-y-3.5 font-sans leading-relaxed flex-1">
                  <p>
                    If you are a student interested in pursuing PhD or Postdoctoral research under Ganti S. Murthy at IIT Indore, please apply via the official BSBE department admissions portal.
                  </p>
                  <p>
                    Prospective students must send a clear two-page CV. Along with the CV, please send a one page note describing 1) your research interests and experience, 2) why you are interested in a particular area and 3) how can you contribute to the STL research program. Brevity and specificity is prized by us. You are applying to an Engineering program, not a poetry contest, so do not send us AI slop with generic statements. We are interested in working with you as a person. You are more likely to get a response if you do not use AI generated text. Write in your own language however ‘unpolished’ it may sound.
                  </p>
                </div>
              </div>
            </div>

            {/* Suggestions & Contact Information Fill-up Form */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <h4 className="text-xs font-bold text-[#0d56a6] uppercase tracking-wider border-b border-slate-250 pb-2 mb-4 flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-st-orange" />
                STLab Transmission & Suggestion Form
              </h4>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3 py-6 animate-fadeIn">
                  <div className="h-10 w-10 text-emerald-600 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-lg font-bold">✓</div>
                  <h5 className="text-xs font-bold text-slate-800">Suggestion Transmitted Successfully!</h5>
                  <p className="text-[11px] text-slate-650 max-w-md mx-auto leading-relaxed">
                    Thank you for your feedback. Your suggestion and contact information has been routed and queued for transmission to <span className="font-bold text-[#0d56a6]">ganti.murthy@iiti.ac.in</span>.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 text-xs font-bold text-st-blue hover:text-st-orange transition-colors"
                  >
                    Send Another Suggestion Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:border-st-orange outline-none transition-colors animate-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Designation or Institute *</label>
                    <input 
                      type="text" 
                      required 
                      value={formDesignation}
                      onChange={(e) => setFormDesignation(e.target.value)}
                      placeholder="e.g. Researcher, IIT Indore"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:border-st-orange outline-none transition-colors animate-none" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Valid Institutional Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. student@iiti.ac.in"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:border-st-orange outline-none transition-colors animate-none" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Suggestion or Query *</label>
                    <textarea 
                      required 
                      rows={4}
                      value={formQuery}
                      onChange={(e) => setFormQuery(e.target.value)}
                      placeholder="Please compile your suggestions, process queries, or collaboration questions here..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:border-st-orange outline-none transition-colors animate-none"
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2 border-t border-slate-100 pt-3">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-st-orange hover:bg-[#d95d12] disabled:bg-slate-300 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs font-sans"
                    >
                      {isSubmitting ? "Transmitting Suggested Data..." : "Submit Suggestion to Dr. Ganti Murthy"}
                    </button>
                    <span className="block text-[9.5px] text-center text-slate-400 mt-2">
                      Submissions are automatically delivered to <span className="font-semibold text-slate-500">ganti.murthy@iiti.ac.in</span>
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* Google Interactive Map Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-inner mt-4 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-850 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-st-orange animate-pulse" />
                    Interactive Lab Location Map
                  </h4>
                  <p className="text-[11px] text-slate-500">601-B POD Building, Indian Institute of Technology Indore, Simrol Campus, Khandwa Road, Simrol, Indore, Madhya Pradesh 453552, India</p>
                </div>
                 <a 
                  href="https://maps.app.goo.gl/EP3dxc4qz6pxHgyaA"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#0d56a6] hover:bg-[#ffa04d] hover:text-[#0d56a6] text-white rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open in Google Maps
                </a>
              </div>

              {/* Embedded Google Map Iframe */}
              <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200 shadow-md relative bg-slate-100">
                <iframe
                  title="IIT Indore Google Map"
                  src="https://maps.google.com/maps?q=Indian%20Institute%20of%20Technology%20Indore&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* IITI Weather Statistics pane */}
        {activeTab === "weather" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-st-orange">
                <span className="p-1 px-2.5 bg-st-orange/10 text-st-orange text-[10px] font-bold uppercase rounded-md tracking-wider border border-st-orange/20">
                  Live Station Feed
                </span>
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
                IITI Weather Statistics
              </h3>
              <p className="text-xs text-slate-500 font-sans font-light">
                Explore the weather analytics, telemetry data, and sensor visualization from the weather station hosted directly on the Simrol campus.
              </p>
            </div>

            {/* Seamless Embed Iframe */}
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-md flex flex-col h-[700px] relative">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                    live.streamlit.app (IIT Indore Streamlit Node)
                  </span>
                </div>
                <a 
                  href="https://iitiws-jfmmz866l9.streamlit.app/" 
                  target="_blank" 
                  rel="noreferrer" 
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-st-blue hover:text-white bg-white hover:bg-st-blue border border-slate-200 rounded-lg shadow-2xs transition-all cursor-pointer"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <iframe
                title="IITI Weather Statistics"
                src="https://iitiws-jfmmz866l9.streamlit.app/?embed=true&embed_options=light_theme"
                className="w-full h-full border-0 flex-1 bg-slate-50"
                allowFullScreen
                referrerPolicy="no-referrer"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
