/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { DollarSign, ShieldAlert, Zap, Recycle, Leaf, Droplet, Layers, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface FeedstockOption {
  id: string;
  name: string;
  yieldFactor: number; // multiplier for productivity
  feedCostFactor: number; // cost per ton
  carbonFootprint: number; // kg CO2 per kg feed
  waterIntensity: number; // liters per kg feed
  socialImpactLevel: "High Conflict" | "Low Impact" | "Zero Conflict";
  description: string;
}

interface EnergyOption {
  id: string;
  name: string;
  carbonFactor: number; // kg CO2 per kWh
  energyCost: number; // $ per kWh
  capitalCostAdder: number; // $M CapEx addition
  description: string;
}

const FEEDSTOCKS: FeedstockOption[] = [
  {
    id: "glucose",
    name: "1st-Gen Corn Glucose",
    yieldFactor: 1.0,
    feedCostFactor: 0.35,
    carbonFootprint: 1.25,
    waterIntensity: 15.0,
    socialImpactLevel: "High Conflict",
    description: "High yield, easy conversion, but competes directly with food crops."
  },
  {
    id: "stover",
    name: "2nd-Gen Corn Stover",
    yieldFactor: 0.78,
    feedCostFactor: 0.18,
    carbonFootprint: 0.30,
    waterIntensity: 4.5,
    socialImpactLevel: "Zero Conflict",
    description: "Agricultural waste residues. Zero food-use conflict, requires hemicellulose pre-treatment."
  },
  {
    id: "co2",
    name: "Captured Waste Carbon (CO2)",
    yieldFactor: 0.62,
    feedCostFactor: 0.05,
    carbonFootprint: -0.85,
    waterIntensity: 2.0,
    socialImpactLevel: "Zero Conflict",
    description: "Direct gas-scrubbing from emission flues. Carbon-negative feed, requires gas-fermentation setups."
  }
];

const ENERGY_INPUTS: EnergyOption[] = [
  {
    id: "grid",
    name: "Standard Grid Blend",
    carbonFactor: 0.52,
    energyCost: 0.11,
    capitalCostAdder: 0.0,
    description: "Industrial grid electricity. Subject to fossil fuel volatility and higher emissions."
  },
  {
    id: "cogen",
    name: "Biomass Heat Cogeneration",
    carbonFactor: 0.08,
    energyCost: 0.06,
    capitalCostAdder: 4.5,
    description: "Combusting lignin waste residues on-site. Low feedstock fuel cost, small local carbon signature."
  },
  {
    id: "solar",
    name: "Dedicated Solar Storage Grid",
    carbonFactor: 0.01,
    energyCost: 0.03,
    capitalCostAdder: 12.0,
    description: "Zero carbon emissions. High initial investment with long-term extremely low operating energy fees."
  }
];

export default function TealcaAnalyzer() {
  const [selectedFeedstock, setSelectedFeedstock] = useState<string>("stover");
  const [selectedEnergy, setSelectedEnergy] = useState<string>("cogen");
  const [waterRecycling, setWaterRecycling] = useState<boolean>(true);
  const [sellingPrice, setSellingPrice] = useState<number>(3.20); // $ per kg product

  const activeFeed = useMemo(() => {
    return FEEDSTOCKS.find((f) => f.id === selectedFeedstock) || FEEDSTOCKS[1];
  }, [selectedFeedstock]);

  const activeEnergy = useMemo(() => {
    return ENERGY_INPUTS.find((e) => e.id === selectedEnergy) || ENERGY_INPUTS[1];
  }, [selectedEnergy]);

  // Techno-Economic Analysis Calculations
  // Assumes a fixed production base of 15,000,000 kg of bio-product per year (before plant yield scaling)
  const results = useMemo(() => {
    const annualBaseProduction = 15000000;
    const finalProduction = annualBaseProduction * activeFeed.yieldFactor; // Yield penalties

    // Capital Expenditures (CapEx in $M)
    // Base plant cost starts at $35M. Feedstock pre-treatment adds costs, and solar cogen adds costs.
    let baseCapEx = 32.5; 
    if (activeFeed.id === "stover") baseCapEx += 4.8; // Pretreatment equipment
    if (activeFeed.id === "co2") baseCapEx += 11.2; // Gas compressors and specialized bioreactors
    baseCapEx += activeEnergy.capitalCostAdder;
    if (waterRecycling) baseCapEx += 3.2; // Reverse osmosis recycling modules
    const totalCapEx = baseCapEx;

    // Operating Expenditures ($ per kg of finished bio-product)
    const carbonFeedCost = (1.8 / activeFeed.yieldFactor) * activeFeed.feedCostFactor; // Feed conversion stoichiometry
    const utilitiesCost = 0.45 * activeEnergy.energyCost * 10; // Electricity intensity
    const enzymesCost = activeFeed.id === "stover" ? 0.65 : activeFeed.id === "co2" ? 0.35 : 0.15;
    const coolingCost = waterRecycling ? 0.08 : 0.28; // Recycling reduces makeup water sourcing fees
    const operationsMaintenance = (totalCapEx * 0.04 * 1000000) / finalProduction; // 4% of CapEx distributed per kg

    const totalOpExPerKg = Math.round((carbonFeedCost + utilitiesCost + enzymesCost + coolingCost + operationsMaintenance) * 100) / 100;
    const totalAnnualOpEx = totalOpExPerKg * finalProduction;

    // Financial calculations
    const annualRevenues = finalProduction * sellingPrice;
    const annualNetMargin = annualRevenues - totalAnnualOpEx;
    
    // Payback period
    const paybackPeriod = annualNetMargin > 0 ? totalCapEx / (annualNetMargin / 1000000) : 999;
    const minimumPriceToBreakEvenIn5Years = (totalCapEx / 5 * 1000000 + totalAnnualOpEx) / finalProduction;

    // Life Cycle Assessment Calculations
    // kg CO2 equivalent emissions per kg of finished bio-polymer / bio-chemical
    const baseDirectEmission = 0.25;
    const feedEmissionShare = activeFeed.carbonFootprint * 1.5;
    const energyEmissionShare = activeEnergy.carbonFactor * 1.8;
    const recycleEmissionOffset = waterRecycling ? -0.12 : 0.0;
    const totalGhgFootprint = Math.round((baseDirectEmission + feedEmissionShare + energyEmissionShare + recycleEmissionOffset) * 100) / 100;

    // Liters of water consumed per kg of product
    let rawWaterIntensity = activeFeed.waterIntensity * 1.2 + 8.0;
    if (waterRecycling) {
      rawWaterIntensity = rawWaterIntensity * 0.25; // 75% recycling retention
    }
    const finalWaterIntensity = Math.round(rawWaterIntensity * 10) / 10;

    return {
      totalCapEx,
      totalOpExPerKg,
      finalProduction,
      annualRevenues,
      annualNetMargin,
      paybackPeriod,
      minimumPriceToBreakEvenIn5Years,
      totalGhgFootprint,
      finalWaterIntensity,
    };
  }, [activeFeed, activeEnergy, waterRecycling, sellingPrice]);

  // Petroleum baselines to demonstrate footprint offset
  const petroBaselineGhg = 4.25; // kg CO2-eq/kg PET polymer
  const petroBaselineWater = 38.0; // Liters/kg polymer
  const petroBaselinePrice = 2.15; // Current economic cost of fossil alternative

  const carbonDivergent = petroBaselineGhg - results.totalGhgFootprint;
  const isCarbonNegative = results.totalGhgFootprint < 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col md:flex-row gap-6" id="sustainability-analyzer">
      
      {/* Configure Column */}
      <div className="md:w-5/12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-teal-50 border border-teal-100 rounded-xl text-teal-700">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 tracking-tight text-lg">Process Architect</h3>
              <p className="text-xs text-slate-400 font-sans">Assemble core feedstocks & thermal dynamics</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Feedstock Picker */}
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-2">
                1. Prime Carbon Feedstock
              </span>
              <div className="space-y-2">
                {FEEDSTOCKS.map((feed) => (
                  <button
                    key={feed.id}
                    id={`feedstock-opt-${feed.id}`}
                    type="button"
                    onClick={() => setSelectedFeedstock(feed.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      selectedFeedstock === feed.id
                        ? "bg-teal-50/50 border-teal-500 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-800">{feed.name}</span>
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                        feed.socialImpactLevel === "High Conflict"
                          ? "bg-rose-50 text-rose-600 border border-rose-100"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}>
                        {feed.socialImpactLevel}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-normal">{feed.description}</p>
                    <div className="flex gap-3 text-[9px] font-mono mt-1.5 text-slate-400">
                      <span>Convert Factor: {feed.yieldFactor}x</span>
                      <span>Feedstock Carbon: {feed.carbonFootprint > 0 ? `+${feed.carbonFootprint}` : feed.carbonFootprint} kg</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Energy Source Picker */}
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-2">
                2. Process Utility Power Source
              </span>
              <div className="grid grid-cols-1 gap-2">
                {ENERGY_INPUTS.map((energy) => (
                  <button
                    key={energy.id}
                    id={`energy-opt-${energy.id}`}
                    type="button"
                    onClick={() => setSelectedEnergy(energy.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      selectedEnergy === energy.id
                        ? "bg-teal-50/50 border-teal-500 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-800">{energy.name}</span>
                      {energy.capitalCostAdder > 0 && (
                        <span className="text-[9px] text-teal-700 bg-teal-50 px-1 rounded">
                          +${energy.capitalCostAdder}M CapEx
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">{energy.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Waste and Water Loop Toggle */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800">
                  <Recycle className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Wastewater Recovery</span>
                  <span className="text-[9px] text-slate-400 block">RO filtration & water recapture loop</span>
                </div>
              </div>
              <button
                type="button"
                id="water-recycling-toggle"
                onClick={() => setWaterRecycling(!waterRecycling)}
                className={`py-1 px-3.5 rounded-lg text-xs font-semibold border transition-all ${
                  waterRecycling
                    ? "bg-emerald-600 text-white border-emerald-700"
                    : "bg-white text-slate-650 border-slate-250"
                }`}
              >
                {waterRecycling ? "Enabled" : "Disabled"}
              </button>
            </div>

            {/* Selling Price simulation slider */}
            <div className="bg-slate-50 border border-slate-250 rounded-2xl p-3.5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-800">Assumed Product Sale Value</span>
                <span className="text-xs font-mono font-bold text-teal-800">${sellingPrice.toFixed(2)} / kg</span>
              </div>
              <input
                type="range"
                min="1.50"
                max="6.00"
                step="0.10"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-200 accent-teal-600 rounded cursor-pointer"
              />
              <p className="text-[9px] text-slate-400 mt-1">Petroleum equivalent sells at ~${petroBaselinePrice.toFixed(2)}/kg</p>
            </div>

          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="flex-1 bg-slate-900 rounded-3xl p-5 text-white flex flex-col justify-between">
        
        {/* Top Header */}
        <div className="border-b border-slate-800 pb-3 mb-3 flex justify-between items-center">
          <div>
            <span className="text-[10px] text-teal-400 font-mono tracking-widest block font-bold uppercase">Multidimensional Balance sheet</span>
            <h4 className="text-sm font-semibold text-slate-100">TEA & LCA Consolidated Assessments</h4>
          </div>
          <span className="text-[9px] border border-teal-800 bg-teal-950/50 px-2 py-0.5 rounded text-teal-300 font-mono">ISO 14040/44</span>
        </div>

        {/* 2x2 Macro metrics grid */}
        <div className="grid grid-cols-2 gap-3.5 my-3">
          
          <div className="bg-slate-800/80 border border-slate-700/50 p-3.5 rounded-2xl">
            <span className="text-[9px] text-slate-400 font-mono uppercase block">Capital Demands (CapEx)</span>
            <span className="text-xl font-mono font-bold text-teal-300 block mt-1">${results.totalCapEx.toFixed(1)}M</span>
            <span className="text-[10px] text-slate-500 block leading-normal mt-0.5">Fixed facility setup cost</span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/50 p-3.5 rounded-2xl">
            <span className="text-[9px] text-slate-400 font-mono uppercase block">Production Cost (OpEx)</span>
            <span className={`text-xl font-mono font-bold block mt-1 ${results.totalOpExPerKg > petroBaselinePrice ? "text-amber-300" : "text-emerald-300"}`}>
              ${results.totalOpExPerKg.toFixed(2)}<span className="text-xs font-sans text-slate-400">/kg</span>
            </span>
            <span className="text-[10px] text-slate-500 block leading-normal mt-0.5">Fossil target: ${petroBaselinePrice.toFixed(2)}/kg</span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/50 p-3.5 rounded-2xl">
            <span className="text-[9px] text-slate-400 font-mono uppercase block">Payback Cycle</span>
            <span className="text-xl font-mono font-bold text-teal-300 block mt-1">
              {results.paybackPeriod > 50 ? "Infinite" : `${results.paybackPeriod.toFixed(1)} Years`}
            </span>
            <span className="text-[10px] text-slate-500 block leading-normal mt-0.5">At specified index price</span>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/50 p-3.5 rounded-2xl">
            <span className="text-[9px] text-slate-400 font-mono uppercase block">Annual Output Titer</span>
            <span className="text-xl font-mono font-bold text-teal-300 block mt-1">
              {(results.finalProduction / 1000000).toFixed(2)}M <span className="text-xs font-sans text-slate-400">kg</span>
            </span>
            <span className="text-[10px] text-slate-500 block leading-normal mt-0.5">Yield scaled on biological feedstock</span>
          </div>

        </div>

        {/* Dynamic LCA / Carbon Bar comparison */}
        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 space-y-4">
          
          {/* Greenhouse Gas Section */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-350"><Leaf className="h-3.5 w-3.5 text-emerald-400" />Carbon Footprint (GHG Intensity)</span>
              <span className={`font-mono ${isCarbonNegative ? "text-emerald-400 font-bold" : "text-amber-300"}`}>
                {results.totalGhgFootprint.toFixed(2)} kg CO₂-eq/kg
              </span>
            </div>
            
            {/* Visual Bar Comparison */}
            <div className="space-y-1">
              <div className="text-[9px] text-slate-400 flex justify-between">
                <span>Proposed Bioprocess</span>
                <span>Fossil Petroleum Target (4.25 kg)</span>
              </div>
              
              <div className="w-full bg-slate-950 h-5.5 rounded-lg flex items-center p-1 overflow-hidden relative border border-slate-800">
                {/* Proposed process fraction (Normalized to maximum 5.0) */}
                <div 
                  className={`h-full rounded-md transition-all duration-500 flex items-center justify-end px-1.5 text-[8px] font-bold font-mono ${
                    isCarbonNegative 
                      ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white translate-x-2" 
                      : results.totalGhgFootprint > 3.0
                      ? "bg-rose-500 text-white"
                      : "bg-emerald-500 text-slate-900"
                  }`}
                  style={{ width: `${Math.max(8, Math.min(100, (Math.abs(results.totalGhgFootprint) / 5) * 100))}%` }}
                >
                  {isCarbonNegative ? "Negative!" : `${results.totalGhgFootprint}`}
                </div>
                {/* Horizontal marker for petro benchmark */}
                <div className="absolute right-[20%] top-0 bottom-0 w-0.5 bg-rose-500/80 z-10" />
              </div>
            </div>
            
            {carbonDivergent > 0 ? (
              <p className="text-[10px] text-emerald-400 leading-normal">
                ✔ Process offsets <strong>{((carbonDivergent / petroBaselineGhg) * 100).toFixed(0)}%</strong> of standard fossil emissions.
              </p>
            ) : (
              <p className="text-[10px] text-rose-300 leading-normal flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" /> High energy or intensive feed inputs compromise carbon sustainability margins.
              </p>
            )}
          </div>

          {/* Water Footprint Section */}
          <div className="space-y-1.5 border-t border-slate-800 pt-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-350"><Droplet className="h-3.5 w-3.5 text-sky-450" />Water Scarcity Footprint</span>
              <span className="font-mono text-sky-350 font-semibold">{results.finalWaterIntensity} Liters/kg</span>
            </div>

            <div className="space-y-1">
              <div className="text-[9px] text-slate-400 flex justify-between font-mono">
                <span>Proposed Bioprocess</span>
                <span>Fossil Baseline Rate (38.0 L)</span>
              </div>
              
              <div className="w-full bg-slate-950 h-5.5 rounded-lg flex items-center p-1 overflow-hidden relative border border-slate-800">
                {/* Proposed water use bar */}
                <div 
                  className="h-full rounded-md transition-all duration-500 bg-sky-500 text-slate-950 font-bold font-mono text-[8px] flex items-center justify-end px-1.5"
                  style={{ width: `${Math.max(5, Math.min(100, (results.finalWaterIntensity / 40) * 100))}%` }}
                >
                  {results.finalWaterIntensity}L
                </div>
                <div className="absolute right-[5%] top-0 bottom-0 w-0.5 bg-sky-350/85 z-10" />
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Warning of Financial or Environmental Tradeoffs */}
        <div className="mt-3">
          {sellingPrice < results.totalOpExPerKg ? (
            <div className="bg-rose-950/60 border border-rose-800 rounded-xl p-3 text-xs text-rose-200">
              <span className="font-bold block text-rose-350">Negative Operating Margins</span>
              Current selling price (${sellingPrice.toFixed(2)}) is below the required unit cost of feedstock processing (${results.totalOpExPerKg.toFixed(2)}). Consider lowering energy or agricultural feed densities.
            </div>
          ) : results.paybackPeriod > 10 ? (
            <div className="bg-amber-955/60 border border-amber-800 rounded-xl p-3 text-xs text-amber-200">
              <span className="font-bold block text-amber-300">Prolonged Amortization Timeline</span>
              Facility breaks even in {results.paybackPeriod.toFixed(1)} years. To maximize market appeal, increase process efficiency or negotiate green premium selling rates above fossil baselines.
            </div>
          ) : (
            <div className="bg-gradient-to-r from-teal-950 to-emerald-950 border border-teal-850/80 rounded-xl p-3 text-xs text-slate-100">
              <span className="font-bold block text-emerald-350">Financially & Resource Sound Configuration</span>
              Payback rate of <strong>{results.paybackPeriod.toFixed(1)} Years</strong> conforms with standard corporate venture hurdle rates. Carbon footprint satisfies green circular objectives.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
