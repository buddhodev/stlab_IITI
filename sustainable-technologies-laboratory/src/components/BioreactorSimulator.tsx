/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { Play, Pause, RotateCcw, Sliders, Cpu, Activity, Info, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BioreactorSimulator() {
  // Simulator Controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentHour, setCurrentHour] = useState(24); // Simulate 0 to 24 hours

  // Bioprocess Parameters
  const [temperature, setTemperature] = useState<number>(30); // Optimum at 30°C
  const [feedConcentration, setFeedConcentration] = useState<number>(150); // g/L substrate in feed
  const [oxygenFlow, setOxygenFlow] = useState<number>(1.2); // KLa scaling factor
  const [feedRateMode, setFeedRateMode] = useState<"manual" | "pid">("pid");
  const [manualFeedRate, setManualFeedRate] = useState<number>(0.15); // L/h
  const [pidSetPoint, setPidSetPoint] = useState<number>(3.0); // Target substrate g/L

  // Technical limits for alerts
  const isAnoxic = oxygenFlow < 0.5;
  const isTooHot = temperature > 37;
  const isTooCold = temperature < 22;

  // Real-time calculation of entire 24-hour simulation path
  // Monod kinetics with Euler numerical integration (120 steps, i.e. 0.2 hr increments)
  const simulationData = useMemo(() => {
    const steps = 121;
    const dt = 0.2; // hours
    
    // Initial conditions inside bioreactor
    let V = 1.5;      // Volume in Liters
    const V_max = 5.0;  // Max working volume
    let X = 2.0;      // Biomass concentration g/L
    let S = 25.0;     // Substrate concentration g/L
    let P = 0.0;      // Product concentration g/L

    const pathTime: number[] = [];
    const pathX: number[] = [];
    const pathS: number[] = [];
    const pathP: number[] = [];
    const pathF: number[] = [];
    const pathV: number[] = [];
    const pathMu: number[] = [];

    // Kinetic Constants
    const mu_max = 0.45; // Max growth rate (1/hr)
    const Ks = 2.5;      // Affinity constant (g/L)
    const Y_xs = 0.48;   // Cell yield on carbon substrate (g/g)
    const Y_px = 1.10;   // Product yield on cell biomass (g/g)
    const m_s = 0.04;    // Cell maintenance coefficient (g/g/hr)
    const beta = 0.05;   // Non-growth associated product formation

    // PID gains for substrate setpoint tracking
    const Kp = 0.08;
    const Ki = 0.015;
    let integralError = 0;

    for (let i = 0; i < steps; i++) {
      const t = i * dt;
      
      // Temperature effect on growth rate (bell curve peaking at 30°C)
      const T_opt = 30;
      const T_width = 8;
      const temperatureFactor = Math.exp(-Math.pow((temperature - T_opt) / T_width, 2));
      
      // Oxygen limitation factor
      const oxygenFactor = oxygenFlow / (0.3 + oxygenFlow);
      
      // Compute specific growth rate (Monod kinetics)
      const mu = mu_max * (S / (Ks + S)) * temperatureFactor * oxygenFactor;

      // Determine feed rate (F) in L/hr
      let F = 0;
      if (V < V_max) {
        if (feedRateMode === "manual") {
          F = manualFeedRate;
        } else {
          // PID feeding loop attempting to keep substrate at pidSetPoint
          const error = pidSetPoint - S;
          integralError += error * dt;
          // Clamp integral to avoid windup
          integralError = Math.max(-10, Math.min(10, integralError));
          
          F = Kp * error + Ki * integralError;
          // Base feed proportional to cell biomass to keep up with growth
          F += (mu * X * V) / (Y_xs * feedConcentration);
          F = Math.max(0, Math.min(0.4, F)); // Clamp feed rate between 0 and 0.4 L/hr
        }
      } else {
        F = 0; // Bioreactor is full
      }

      // Record states
      pathTime.push(t);
      pathX.push(X);
      pathS.push(S);
      pathP.push(P);
      pathF.push(F);
      pathV.push(V);
      pathMu.push(mu);

      // Euler update for the next time step (unless it is the final step)
      if (i < steps - 1) {
        // Dynamics of Volume
        const dV_dt = F;
        
        // Dilution rate
        const D = F / V;

        // Dynamics of Biomass
        const dX_dt = mu * X - D * X;

        // Dynamics of Substrate (Monod consumption + maintenance + inlet feeding)
        const dS_dt = D * (feedConcentration - S) - (mu * X) / Y_xs - m_s * X;

        // Dynamics of Product (Luedeking-Piret formation)
        const dP_dt = (beta * mu * X) + (0.05 * X) - D * P;

        // Apply differentials
        V = Math.min(V_max, V + dV_dt * dt);
        X = Math.max(0.1, X + dX_dt * dt);
        S = Math.max(0.1, S + dS_dt * dt);
        P = Math.max(0.0, P + dP_dt * dt);
      }
    }

    return {
      time: pathTime,
      biomass: pathX,
      substrate: pathS,
      product: pathP,
      feedRate: pathF,
      volume: pathV,
      growthRate: pathMu,
    };
  }, [temperature, feedConcentration, oxygenFlow, feedRateMode, manualFeedRate, pidSetPoint]);

  // Tick simulation timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentHour((prev) => {
          if (prev >= 24) {
            return 0; // reset loop
          }
          const next = Math.round((prev + 0.4) * 10) / 10;
          return next > 24 ? 24 : next;
        });
      }, 80);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentIndex = Math.min(
    Math.floor((currentHour / 24) * 120),
    120
  );

  // Key stats at the selected hour
  const currentBiomassValue = simulationData.biomass[currentIndex];
  const currentSubstrateValue = simulationData.substrate[currentIndex];
  const currentProductValue = simulationData.product[currentIndex];
  const currentFeedRateValue = simulationData.feedRate[currentIndex];
  const currentVolumeValue = simulationData.volume[currentIndex];
  const currentGrowthRate = simulationData.growthRate[currentIndex];

  // Global performance parameters (at the end of fermentation)
  const finalProduct = simulationData.product[120];
  const finalVolume = simulationData.volume[120];
  const finalBiomass = simulationData.biomass[120];
  
  const totalBioProductYield = finalProduct * finalVolume; // Total grams of product
  const cumulativeSubstrateFeederUsed = simulationData.time.reduce((acc, t, idx) => {
    if (idx === 0) return 0;
    const dt = 0.2;
    return acc + simulationData.feedRate[idx] * feedConcentration * dt;
  }, 0);
  
  const conversionYield = cumulativeSubstrateFeederUsed > 0 
    ? (totalBioProductYield / cumulativeSubstrateFeederUsed) * 100 
    : 0;

  const productivity = totalBioProductYield / 24; // g/hr production rate

  // SVG dimensions for coordinates
  const svgWidth = 500;
  const svgHeight = 220;
  const padding = { top: 15, right: 15, bottom: 25, left: 35 };

  const getCoordinates = (xArr: number[], yArr: number[], yMax: number) => {
    return xArr.map((x, idx) => {
      const rx = padding.left + (x / 24) * (svgWidth - padding.left - padding.right);
      const ry = svgHeight - padding.bottom - (yArr[idx] / yMax) * (svgHeight - padding.top - padding.bottom);
      return `${rx},${ry}`;
    }).join(" ");
  };

  const maxSubstrate = 150;
  const maxBiomass = 45;
  const maxProduct = 25;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col lg:flex-row h-full" id="laboratory-simulator">
      
      {/* Parameter Control Panel */}
      <div className="lg:w-2/5 p-6 bg-slate-50 border-r border-slate-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-teal-50 border border-teal-100 rounded-xl text-teal-700">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 tracking-tight text-lg">Bioprocess Controls</h3>
              <p className="text-xs text-slate-400 font-sans">Tweak biophysical mechanics in real-time</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Temperature Slider */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-150 shadow-sm">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Reactor Temperature
                </span>
                <span className={`text-sm font-semibold font-mono ${temperature === 30 ? "text-teal-600" : "text-slate-600"}`}>
                  {temperature}°C
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="45"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-teal-600 bg-slate-100 h-1 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>15°C (Lag)</span>
                <span className="text-teal-600/80 font-medium">30°C Optimum</span>
                <span>45°C (Denature)</span>
              </div>
            </div>

            {/* Aeration / Dissolved Oxygen Slider */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-150 shadow-sm">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Dissolved Oxygen Core (K<sub>L</sub>a)
                </span>
                <span className={`text-sm font-semibold font-mono ${oxygenFlow < 0.5 ? "text-amber-500 font-bold" : "text-slate-600"}`}>
                  {(oxygenFlow * 25).toFixed(0)} h⁻¹
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.05"
                value={oxygenFlow}
                onChange={(e) => setOxygenFlow(parseFloat(e.target.value))}
                className="w-full accent-teal-600 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span className="text-amber-500 font-medium">Anoxic (&lt;10)</span>
                <span>Standard (30)</span>
                <span>High Aeration (62)</span>
              </div>
            </div>

            {/* Feed Concentration Slider */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium text-slate-700">
                  Feedstock Density (Carbon concentration)
                </span>
                <span className="text-sm font-semibold font-mono text-slate-600">
                  {feedConcentration} g/L
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={feedConcentration}
                onChange={(e) => setFeedConcentration(parseFloat(e.target.value))}
                className="w-full accent-teal-600 bg-slate-100 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Dilute (50)</span>
                <span>Optimal Complex (150)</span>
                <span>Hyper-concentrated (250)</span>
              </div>
            </div>

            {/* Controller Mode Selector */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
              <label className="text-sm font-medium text-slate-700 block mb-2.5">
                Substrate Feeding Automation
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="feed-manual-button"
                  onClick={() => setFeedRateMode("manual")}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    feedRateMode === "manual"
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Sliders className="h-3.5 w-3.5" />
                  Manual Feed
                </button>
                <button
                  type="button"
                  id="feed-pid-button"
                  onClick={() => setFeedRateMode("pid")}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    feedRateMode === "pid"
                      ? "bg-gradient-to-r from-teal-700 to-teal-900 text-white border-teal-800"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Cpu className="h-3.5 w-3.5 animate-pulse" />
                  Feedback PID
                </button>
              </div>

              {/* Conditional parameters based on mode */}
              <div className="mt-3.5 pt-3 border-t border-slate-100">
                {feedRateMode === "manual" ? (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] text-slate-500">Flow Feed Rate (L/hr):</span>
                      <span className="text-xs font-mono font-bold text-slate-700">{manualFeedRate.toFixed(2)} L/hr</span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="0.4"
                      step="0.02"
                      value={manualFeedRate}
                      onChange={(e) => setManualFeedRate(parseFloat(e.target.value))}
                      className="w-full accent-slate-700 bg-slate-50 h-1 rounded appearance-none cursor-pointer"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] text-teal-600 font-medium">Automatic Substrate Target:</span>
                      <span className="text-xs font-mono font-bold text-teal-850">{pidSetPoint.toFixed(1)} g/L</span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="8.0"
                      step="0.5"
                      value={pidSetPoint}
                      onChange={(e) => setPidSetPoint(parseFloat(e.target.value))}
                      className="w-full accent-teal-600 bg-slate-50 h-1 rounded appearance-none cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Warning messages */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            {isAnoxic && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 text-amber-800 text-xs shadow-sm mb-2"
                id="anoxic-warning"
              >
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Anoxic Fermentation Alert</span>
                  Low K<sub>L</sub>a forces anaerobic metabolism. Yield decreases; secondary alcohols may form.
                </div>
              </motion.div>
            )}

            {isTooHot && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex gap-2 text-rose-800 text-xs shadow-sm mb-2"
                id="thermal-denature-warning"
              >
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Thermal Denaturation Risk</span>
                  Enzyme decay is accelerating. Cellular expansion will decline rapidly.
                </div>
              </motion.div>
            )}

            {!isAnoxic && !isTooHot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-teal-50/50 border border-teal-100 rounded-xl p-3 flex gap-2 text-teal-850 text-xs"
                id="optimal-biomass-indicator"
              >
                <Sparkles className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Optimal Cell Kinetics</span>
                  Balanced temperature & feed ratios allow systems biology pathways to convert resources efficiently.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Analytics Telemetry & Graphs Panel */}
      <div className="flex-1 p-6 flex flex-col justify-between bg-white text-slate-800">
        
        {/* Header telemetry and clock indicator */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-4 gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-xs">Reactor Telemetry Node: STL-01</h4>
              <p className="text-[11px] text-slate-400">Simulation Status: {isPlaying ? "Actively Sweeping" : "Standby"}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Simulation Timeline:</span>
            <div className="bg-slate-100 px-3 py-1 rounded-full text-slate-800 font-mono text-xs font-bold border border-slate-200">
              {currentHour.toFixed(1)} h / 24.0 h
            </div>
            {/* Play, pause, reset buttons */}
            <div className="flex gap-1">
              <button
                type="button"
                id="play-simulation-button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-1.5 rounded-lg border transition-all ${
                  isPlaying 
                    ? "bg-amber-500 border-amber-600 text-white hover:bg-amber-600" 
                    : "bg-teal-600 border-teal-700 text-white hover:bg-teal-700"
                }`}
                title={isPlaying ? "Pause Timeline" : "Auto-Run Continuous Timeline"}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                id="reset-simulation-button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentHour(24);
                }}
                className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                title="Jump to 24 Hours (Full Report)"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Timeline Slider */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="24"
            step="0.2"
            value={currentHour}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentHour(parseFloat(e.target.value));
            }}
            className="w-full accent-teal-600 bg-slate-100 h-2 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Handcrafted Visual Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 my-4">
          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl relative overflow-hidden">
            <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-teal-500" />
            <span className="text-[10px] font-semibold text-teal-600 uppercase tracking-wider block">Biomass (X)</span>
            <span className="text-xl font-mono font-bold text-slate-900 block mt-0.5">{currentBiomassValue.toFixed(2)} <span className="text-xs font-sans text-slate-400 font-normal">g/L</span></span>
            <span className="text-[10px] text-slate-400 block mt-1">Growth rate: {currentGrowthRate.toFixed(2)} h⁻¹</span>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl relative overflow-hidden">
            <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Substrate Residue (S)</span>
            <span className={`text-xl font-mono font-bold block mt-0.5 ${currentSubstrateValue < 1.0 ? "text-amber-600" : "text-slate-900"}`}>{currentSubstrateValue.toFixed(2)} <span className="text-xs font-sans text-slate-400 font-normal">g/L</span></span>
            <span className="text-[10px] text-slate-400 block mt-1">Feeding: {currentFeedRateValue.toFixed(2)} L/h</span>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl relative overflow-hidden">
            <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider block">Target Product (P)</span>
            <span className="text-xl font-mono font-bold text-slate-900 block mt-0.5">{currentProductValue.toFixed(2)} <span className="text-xs font-sans text-slate-400 font-normal">g/L</span></span>
            <span className="text-[10px] text-slate-400 block mt-1">Titer accumulated</span>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl relative overflow-hidden">
            <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-sky-500" />
            <span className="text-[10px] font-semibold text-sky-650 uppercase tracking-wider block">Work Volume (V)</span>
            <span className="text-xl font-mono font-bold text-slate-900 block mt-0.5">{currentVolumeValue.toFixed(2)} <span className="text-xs font-sans text-slate-400 font-normal">Liters</span></span>
            <span className="text-[10px] text-slate-400 block mt-1">Max capacity: 5.0 Liters</span>
          </div>
        </div>

        {/* Handcrafted Animated SVG Graphic Chart */}
        <div className="relative bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-inner flex-1 flex flex-col justify-between min-h-[220px]">
          
          {/* Y-axis labels positioned absolutely on chart */}
          <div className="absolute left-3 top-3 bottom-8 flex flex-col justify-between items-start text-[9px] font-mono text-slate-500 select-none pointer-events-none">
            <span>High (75 g/L)</span>
            <span>Med (35 g/L)</span>
            <span>Low (0 g/L)</span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full h-full flex-1 min-h-[170px]">
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full h-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Chart Grid Lines */}
              <line x1={padding.left} y1={padding.top} x2={svgWidth - padding.right} y2={padding.top} stroke="#2d3748" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1={padding.left} y1={(svgHeight - padding.bottom + padding.top) / 2} x2={svgWidth - padding.right} y2={(svgHeight - padding.bottom + padding.top) / 2} stroke="#2d3748" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1={padding.left} y1={svgHeight - padding.bottom} x2={svgWidth - padding.right} y2={svgHeight - padding.bottom} stroke="#4a5568" strokeWidth="1" />
              
              {/* vertical scale lines */}
              <line x1={padding.left} y1={padding.top} x2={padding.left} y2={svgHeight - padding.bottom} stroke="#4a5568" strokeWidth="1" />
              <line x1={svgWidth - padding.right} y1={padding.top} x2={svgWidth - padding.right} y2={svgHeight - padding.bottom} stroke="#2d3748" strokeWidth="0.5" />
              
              {/* 6h, 12h, 18h vertical dashes */}
              {[6, 12, 18, 24].map((hour) => {
                const rx = padding.left + (hour / 24) * (svgWidth - padding.left - padding.right);
                return (
                  <g key={hour}>
                    <line x1={rx} y1={padding.top} x2={rx} y2={svgHeight - padding.bottom} stroke="#2d3748" strokeWidth="0.5" strokeDasharray="4,4" />
                    <text x={rx} y={svgHeight - padding.bottom + 15} textAnchor="middle" className="fill-slate-400 font-mono text-[9px]">{hour}h</text>
                  </g>
                );
              })}
              
              {/* Substrate Trace Path (Grey-Red Gradient) */}
              <polyline
                fill="none"
                stroke="#a0aec0"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                opacity="0.8"
                points={getCoordinates(simulationData.time, simulationData.substrate, maxSubstrate)}
              />

              {/* Biomass Trace Path (Animated Teal Gradient) */}
              <polyline
                fill="none"
                stroke="#0d9488"
                strokeWidth="2.5"
                points={getCoordinates(simulationData.time.slice(0, currentIndex + 1), simulationData.biomass.slice(0, currentIndex + 1), maxBiomass)}
                className="transition-all duration-300"
              />

              {/* Product Trace Path (Amber Gradient) */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                points={getCoordinates(simulationData.time.slice(0, currentIndex + 1), simulationData.product.slice(0, currentIndex + 1), maxProduct)}
                className="transition-all duration-300"
              />

              {/* Volume (Blue Background Area) */}
              <polygon
                fill="#3182ce"
                fillOpacity="0.08"
                points={`${padding.left},${svgHeight - padding.bottom} ` + 
                  getCoordinates(simulationData.time.slice(0, currentIndex + 1), simulationData.volume.slice(0, currentIndex + 1), 6.0) + 
                  ` ${padding.left + (currentIndex / 120) * (svgWidth - padding.left - padding.right)},${svgHeight - padding.bottom}`}
              />

              {/* Current Hour Indicator Bar */}
              {(() => {
                const currentX = padding.left + (currentHour / 24) * (svgWidth - padding.left - padding.right);
                return (
                  <line 
                    x1={currentX} 
                    y1={padding.top} 
                    x2={currentX} 
                    y2={svgHeight - padding.bottom} 
                    stroke="#10b981" 
                    strokeWidth="1.5"
                  />
                );
              })()}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] border-t border-slate-800 pt-2.5 mt-2 text-slate-400 font-mono select-none">
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-teal-500 inline-block" />Biomass X (Max 45)</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-3.5 border-t-2 border-dashed border-slate-400 inline-block" />Substrate Residue S</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-500 inline-block" />Target Product P</span>
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-2.5 bg-blue-500/20 inline-block" />Reactor Volume V</span>
            </div>
            <span className="text-[9px] text-teal-400 font-sans">Hover/Drag Timeline to sweep experimental states</span>
          </div>
        </div>

        {/* Global Process Efficiency Metrics */}
        <div className="bg-teal-950/90 border border-teal-800/80 rounded-2xl p-4 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg shadow-teal-950/15">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-teal-800/80 flex items-center justify-center border border-teal-700/50">
              <Activity className="h-5 w-5 text-emerald-300" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-300 uppercase tracking-widest block font-semibold font-mono">Continuous Batch Analysis</span>
              <span className="text-sm font-medium text-slate-100 block">Yield efficiency depends on substrate maintenance and heat limits in-silico</span>
            </div>
          </div>

          <div className="flex gap-6 w-full md:w-auto justify-between md:justify-end border-t border-teal-800/60 md:border-t-0 pt-3 md:pt-0">
            <div className="text-left/right">
              <span className="text-[10px] text-slate-405 block">Process Productivity</span>
              <span className="text-base font-mono font-bold text-white block">{(productivity).toFixed(2)} <span className="text-xs font-sans text-slate-400">g/hr</span></span>
            </div>
            <div className="text-left/right border-l border-teal-800/50 pl-6">
              <span className="text-[10px] text-slate-405 block">Input Feed Recovered</span>
              <span className="text-base font-mono font-bold text-teal-300 block">{conversionYield.toFixed(1)}%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
