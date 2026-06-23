/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import StlabWixsiteHub from "./components/StlabWixsiteHub";
import GlitterBackground from "./components/GlitterBackground";
import SustyChatbot from "./components/SustyChatbot";
import { 
  Clock, 
  Home, 
  Cpu, 
  Users, 
  BookOpen, 
  Phone,
  CloudSun
} from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
  }
}

export default function App() {
  // Navigation tab state lifted to share natively with the Sticky Header
  const [activeTab, setActiveTab] = React.useState<"home" | "news" | "people" | "research" | "publications" | "learning" | "contact" | "gallery" | "weather">("home");
  
  // Live local clock updating
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    // Intercept and bypass generic cross-origin "Script error." triggers from external frames
    const handleScriptError = (event: ErrorEvent) => {
      const msg = typeof event?.message === "string" ? event.message : "";
      if (!msg || msg === "Script error." || msg.includes("Script error")) {
        try {
          event.preventDefault();
          event.stopPropagation();
        } catch (e) {}
      }
    };
    window.addEventListener("error", handleScriptError, true);

    const prevOnError = window.onerror;
    window.onerror = function (message, url, line, col, error) {
      const msgStr = typeof message === "string" ? message : "";
      if (
        msgStr.includes("Script error") ||
        msgStr.includes("translate.google") ||
        msgStr.includes("googleTranslateElementInit") ||
        !msgStr
      ) {
        return true; // Prevent default error handling
      }
      if (prevOnError) {
        return prevOnError.apply(window, [message, url, line, col, error]);
      }
      return false;
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleScriptError, true);
      window.onerror = prevOnError;
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format representing our laboratory time
      setLocalTime(now.toLocaleTimeString("en-US", { timeStyle: "medium", hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-slate-800 font-sans antialiased selection:bg-st-orange/35 selection:text-white flex flex-col justify-between relative">
      <GlitterBackground />
      
      {/* Sticky Top Premium Academic Nav Bar */}
      <nav className="sticky top-0 bg-[#0c2340]/90 backdrop-blur-md border-b-[3px] border-st-orange/70 z-40 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.25)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3.5">
              <img 
                src="/assets/stlab-logo.png" 
                alt="STLab Logo" 
                className="h-12 sm:h-14 w-auto object-contain select-none shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-base font-extrabold text-white tracking-tight block leading-none drop-shadow-sm">
                  Sustainable Technologies Laboratory
                </span>
                <span className="text-[10.5px] text-[#ffa34d] font-bold tracking-widest block uppercase mt-0.5">
                  IIT Indore
                </span>
                <span className="text-[11px] text-slate-300 font-bold block font-sanskrit tracking-wide mt-0.5">
                  संवहनीय-तान्त्रिकी-गवेषणशाला (भारतीय-प्राद्यौगिकी-संस्थानम् इन्दौरस्थम्)
                </span>
              </div>
            </div>

            {/* Brand/Branding Section remains clearly on the left and utility tools on the right */}

            {/* Right side Elements: IIT Indore Logo & Google Translate */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* IIT Indore Logo */}
              <a 
                href="https://www.iiti.ac.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block hover:scale-105 transition-transform"
                title="Indian Institute of Technology Indore"
              >
                <img 
                  src="/assets/iiti_logo.jpg" 
                  alt="IIT Indore Logo" 
                  className="h-10 sm:h-11 w-auto object-contain bg-white p-1 rounded-lg border border-slate-200/20 shadow-sm"
                />
              </a>

              {/* Google Translate Element */}
              <div id="google_translate_element" className="google-translate-container text-xs hidden sm:block"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full relative z-10">
        <StlabWixsiteHub activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>



      {/* Sustainable Technologies Lab Footer */}
      <footer className="bg-slate-900 text-white py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Sanskrit Philosophical Motto */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-slate-800/80 mb-6 max-w-3xl mx-auto gap-2">
            <span className="text-sm sm:text-base font-extrabold text-[#f17a1f] tracking-widest uppercase font-sanskrit">
              ज्ञानं प्रसारणाय, सत्यं आत्मशुद्धये
            </span>
            <span className="text-xs text-slate-400 italic max-w-xl">
              "Knowledge is for sharing, and truth is for self-purification."
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8 mb-8">
            <div className="flex items-center">
              <img src="/assets/STL_New_PNG.png" alt="STL Sustainable Technologies Laboratory" className="h-16 sm:h-20 w-auto select-none shrink-0" referrerPolicy="no-referrer" />
            </div>

            <div className="flex flex-col items-start md:items-end gap-3.5">
              <div className="flex flex-wrap gap-x-8 gap-y-2.5 text-xs text-slate-400">
                <a href="https://iksindia.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffa34d] transition-colors cursor-pointer">IKS & Traditional Frameworks</a>
                <a href="https://www.energy.gov/cmei/ito/life-cycle-assessment-and-techno-economic-analysis-training" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffa34d] transition-colors cursor-pointer">TEA & LCA Protocols</a>
                <a href="https://www.eolss.net/Sample-Chapters/C17/E6-58-02-01.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffa34d] transition-colors cursor-pointer">Bioprocess Control Systems</a>
                <a href="https://www.energy.gov/sites/default/files/2023-05/beto-02-project-peer-review-biochem-apr-2023-bomble.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffa34d] transition-colors cursor-pointer">Process Modeling & Simulation</a>
              </div>
              
              {/* Server Time / Local Clock in the footer-right block */}
              <div className="flex items-center gap-2 bg-[#06172a] border border-[#112f54]/60 px-3.5 py-1.5 rounded-full shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] select-none text-[10.5px] font-mono font-bold text-slate-300">
                <Clock className="h-3.5 w-3.5 text-st-orange animate-pulse" />
                <span>{localTime || "00:00:00"} Server Time</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 gap-4">
            <div>
              &copy; {new Date().getFullYear()} Sustainable Technologies Laboratory. All rights reserved.
            </div>
            <div className="flex gap-1.5 items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-st-green inline-block" />
              <span>Website Designed and STL Logo created by Buddhodev Ghosh</span>
            </div>
          </div>

        </div>
      </footer>

      <SustyChatbot />
    </div>
  );
}
