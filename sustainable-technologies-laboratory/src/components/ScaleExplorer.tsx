/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { RESEARCH_SCALES } from "../data";
import { Microscope, Dna, Settings, Factory, Globe2, ChevronRight, Beaker, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SCALE_ICONS: Record<string, React.ComponentType<any>> = {
  molecular: Dna,
  cellular: Microscope,
  bench: Beaker,
  industrial: Factory,
  systems: Globe2,
};

export default function ScaleExplorer() {
  const [activeScaleId, setActiveScaleId] = useState<string>("bench");

  const activeScale = RESEARCH_SCALES.find((s) => s.id === activeScaleId) || RESEARCH_SCALES[2];
  const ActiveIconComponent = SCALE_ICONS[activeScale.id] || Beaker;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[440px]" id="scale-explorer">
      
      {/* Side Tabs Column */}
      <div className="md:w-1/3 bg-slate-50 border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest pl-2">
            Multi-Scale Research Scope
          </span>
          <h4 className="text-sm font-bold text-slate-800 pl-2 mb-4">From Molecules to Global Chains</h4>
          
          <div className="space-y-1">
            {RESEARCH_SCALES.map((scale) => {
              const TabIcon = SCALE_ICONS[scale.id] || Beaker;
              const isActive = scale.id === activeScaleId;
              
              return (
                <button
                  key={scale.id}
                  id={`scale-tab-${scale.id}`}
                  type="button"
                  onClick={() => setActiveScaleId(scale.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? "bg-teal-700 text-white" : "bg-white text-slate-500 border border-slate-150 group-hover:bg-slate-100"
                    }`}>
                      <TabIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block leading-tight">{scale.name}</span>
                      <span className="text-[9px] opacity-75 font-mono block">{scale.range}</span>
                    </div>
                  </div>
                  <ChevronRight className={`h-3.5 w-3.5 transition-transform ${isActive ? "text-teal-400 translate-x-1" : "text-slate-400 opacity-0 group-hover:opacity-100"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Small Lab Context Summary */}
        <div className="mt-8 border-t border-slate-100 pt-4 pl-2 text-xs text-slate-400 leading-normal">
          <p className="mb-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">Experimental & Theoretical</p>
          We employ a dual feedback paradigm, ensuring that molecular strains align with physical bioreactor capabilities and macroeconomic payback scales.
        </div>
      </div>

      {/* Details Showcase Panel */}
      <div className="flex-1 p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScaleId}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
            id={`scale-detail-panel-${activeScaleId}`}
          >
            {/* Header section of detailed view */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full font-bold">
                    {activeScale.range}
                  </span>
                  <span className="text-xs text-slate-400 font-medium font-sans">Dimension Boundary</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">{activeScale.name}</h3>
              </div>
              <div className="p-3 bg-teal-50 text-teal-750 border border-teal-100 rounded-xl">
                <ActiveIconComponent className="h-6 w-6 text-teal-700" />
              </div>
            </div>

            {/* Description and Example System */}
            <div className="space-y-2 border-l-4 border-teal-600 pl-6">
              <h4 className="text-xs font-bold text-teal-700 uppercase tracking-widest">Core Mission Scope</h4>
              <p className="text-sm font-semibold text-slate-700 leading-relaxed italic">"{activeScale.headline}"</p>
              <p className="text-sm text-slate-600 leading-relaxed">{activeScale.description}</p>
            </div>

            {/* Experimental vs Theoretical dual columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-white border border-slate-150 p-4 rounded-xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="h-2 w-2 rounded-full bg-teal-600" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Experimental Benchmarks</span>
                  </div>
                  <ul className="space-y-2">
                    {activeScale.experimentalApproaches.map((app, i) => (
                      <li key={i} className="text-xs text-slate-650 flex gap-1.5 items-start">
                        <span className="text-teal-600 font-bold shrink-0">•</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white border border-slate-150 p-4 rounded-xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="h-2 w-2 rounded-full bg-slate-700" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">Theoretical & Modeling Cores</span>
                  </div>
                  <ul className="space-y-2">
                    {activeScale.theoreticalApproaches.map((app, i) => (
                      <li key={i} className="text-xs text-slate-650 flex gap-1.5 items-start">
                        <span className="text-slate-600 font-bold shrink-0">•</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Example Case Study System */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Active System Example in Lab
              </span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {activeScale.exampleSystem}
              </p>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
}
