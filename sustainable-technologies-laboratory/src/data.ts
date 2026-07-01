/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SustainablePillar, ResearchScale } from "./types";

export const SUSTAINABLE_PILLARS: SustainablePillar[] = [
  {
    id: "technical",
    title: "Technically Feasible",
    subtitle: "Bioreaction kinetics & control stability",
    description: "Solutions must operate within proven physical, chemical, and biological limits. We use systems biology and experimental bench-scale verification to optimize reaction rates, yield coefficients, and feed-forward control stability.",
    metricLabel: "Mean Process Yield Efficiency",
    metricValue: "88.4%",
    subRequirements: [
      "Robust biocatalyst metabolic stability over 120+ hours",
      "Real-time bioreactor PID closed-loop control deviation < 2%",
      "Predictive process models validated with < 5% variance from actual runs"
    ],
    caseStudy: {
      title: "Closed-Loop Bioreactor Control Optimization",
      challenge: "High substrate feeding volatility led to toxic accumulation and premature yeast strain death during scale-up.",
      approach: "Developed an online feeding algorithm integrating Monod kinetics with real-time turbidity-based feedback loops.",
      outcome: "Maintained optimal substrate concentration within a tight 0.5 g/L band, increasing overall ethanol yield by 14%."
    }
  },
  {
    id: "economic",
    title: "Economically Viable",
    subtitle: "Techno-economic scaling & cost-parity",
    description: "Every technology must show clear paths to capital expenditure (CapEx) amortization and low operating expenses (OpEx). We perform rigorous Techno-Economic Analysis (TEA) to calculate Net Present Value (NPV) and localized Minimum Selling Prices.",
    metricLabel: "Average Payback Horizon",
    metricValue: "4.2 Years",
    subRequirements: [
      "Competitive Minimum Selling Price (MSP) under current market parity",
      "Optimized raw feedstock supply chains representing < 45% of active cash costs",
      "Process intensification to minimize total equipment footprints"
    ],
    caseStudy: {
      title: "Lignocellulosic Biomass Cost Halving",
      challenge: "Pre-treatment enzymes represented over 60% of total operating expenses, making the biofuels process uncompetitive with conventional imports.",
      approach: "Conducted process-modeling-driven heat integration and on-site enzyme production modeling via ASPEN.",
      outcome: "Achieved a 38% reduction in enzyme costs and established a pathway to fuel price parity at $2.85 per gasoline gallon equivalent."
    }
  },
  {
    id: "resource",
    title: "Resource Sustainable",
    subtitle: "Circular inputs & waste avoidance",
    description: "Technologies must utilize renewable feedstocks, agricultural waste streams, and recirculate precious process catalysts, minimizing the exhaustion of non-renewable resources.",
    metricLabel: "Circular Resource Recycle Rate",
    metricValue: "92.1%",
    subRequirements: [
      "Zero-landfill residue recycling through organic bio-char or soil additives",
      "Direct process water recovery loops and purification systems",
      "Utilization of second-generation (non-food-crop) raw materials"
    ],
    caseStudy: {
      title: "Agricultural Stover Valorous Upcycling",
      challenge: "Corn stover was treated as low-value waste, creating secondary disposal and crop burning hazards.",
      approach: "Engineered cellulolytic bacteria capable of co-fermenting both C5 and C6 sugars from agricultural residues without extensive chemical preprocessing.",
      outcome: "Converted 85% of stover fibers into bio-plastics with zero competing demands on agricultural land."
    }
  },
  {
    id: "environmental",
    title: "Environmentally Sound",
    subtitle: "Life cycle footprint mitigation",
    description: "Using global standards for ISO 14040/44 Life Cycle Assessment (LCA), we map cradle-to-gate impact pathways for greenhouse gas emissions, eutrophication potential, and embodied water usage.",
    metricLabel: "GHG Reduction vs. Benchmark",
    metricValue: "-74%",
    subRequirements: [
      "Global warming potential significantly below standard petroleum baselines",
      "Sulfide and ammonia stream neutralization with active gas-scrubbing",
      "Avoidance of heavy metal or toxic synthetic catalysts"
    ],
    caseStudy: {
      title: "Biopolymer Carbon Credit Mapping",
      challenge: "A novel polyhydroxyalkanoate (PHA) polymer suffered unaccounted environmental impacts due to intensive electricity consumption during extraction.",
      approach: "Performed dynamic LCA modeling to integrate on-site solar cogeneration and mechanical dewafing.",
      outcome: "Reduced cradle-to-gate greenhouse gas emissions to 0.45 kg CO2-eq per kg of PHA, making it a carbon-negative bio-plastic."
    }
  },
  {
    id: "social",
    title: "Socially Acceptable",
    subtitle: "Local community, health, & safety compatibility",
    description: "Solutions must operate within ethical guidelines, support circular local economies, guarantee chemical containment safety, and align with global food security standards by avoiding land-use conflicts.",
    metricLabel: "Food Security Conflict Index",
    metricValue: "0.0 (Zero Conflict)",
    subRequirements: [
      "Feedstock cultivation limited to marginal or non-arable lands",
      "Non-toxic process discharges guaranteeing municipal water safety",
      "Job creation and vocational training in agricultural-rural communities"
    ],
    caseStudy: {
      title: "Local Bio-Refinery Integration Dynamics",
      challenge: "Public resistance to local bio-refinery construction due to odor fears and truck congestion.",
      approach: "Engineered biological filtration systems for organic odors and optimized refinery scheduling for off-peak logistics.",
      outcome: "Achieved 96% positive local community sentiment score and direct employment for 45 rural households."
    }
  }
];

export const RESEARCH_SCALES: ResearchScale[] = [
  {
    id: "molecular",
    name: "Molecular Scale",
    range: "10⁻¹⁰ to 10⁻⁸ meters",
    headline: "Enzyme engineering and metabolic pathway tuning",
    description: "The spark of every sustainable process begins at the molecular level. We design and optimize synthetic enzymes, direct catalytic active sites, and map metabolic network flux to force bacteria or yeast to maximize carbon utilization.",
    experimentalApproaches: [
      "Molecular cloning and CRISPR gene editing",
      "Enzyme kinetics screening and activity assays",
      "High-pressure liquid chromatography (HPLC) metabolite screening"
    ],
    theoreticalApproaches: [
      "Quantum mechanics / Molecular mechanics (QM/MM) matching",
      "Machine learning-assisted protein fold design",
      "In-silico molecular docking studies"
    ],
    exampleSystem: "Engineered PETase enzymes for rapid room-temperature breakdown of consumer microplastics."
  },
  {
    id: "cellular",
    name: "Cellular Scale",
    range: "10⁻⁷ to 10⁻⁵ meters",
    headline: "Systems biology & strain engineering",
    description: "We orchestrate entire cellular factories. Using systems biology pathways, we model how single organisms manage energy, resist product toxicity, and adapt metabolism to handle raw unpurified industrial waste.",
    experimentalApproaches: [
      "Metabolic flux assays with 13C-labeled glucose tracer cells",
      "Real-time transcriptomic profiling during stress response",
      "Flow cytometry for single-cell viability analysis"
    ],
    theoreticalApproaches: [
      "Genome-scale metabolic reconstructions (GEMs)",
      "Constraint-based flux balance analysis (FBA)",
      "Dynamic metabolic kinetic models"
    ],
    exampleSystem: "Stress-tolerant yeasts capable of co-fermenting toxic lignocellulosic hydrolysates."
  },
  {
    id: "bench",
    name: "Bench Scale / Bioreactor",
    range: "10⁻¹ to 10⁰ meters",
    headline: "Experimental verification & control theory tracking",
    description: "Translating cellular success to physical tanks. We design automated, multi-sensor bench bioreactors. By studying mass transfer (KLa), oxygen demands, and control feedback stability, we bridge cellular science and chemical engineering.",
    experimentalApproaches: [
      "5L to 50L fed-batch bioreactor fermentation",
      "Dynamic mass transfer coefficient (KLa) mapping",
      "Online turbidity, dissolved oxygen (DO), and pH tracking"
    ],
    theoreticalApproaches: [
      "PID control loops tuning and state observers",
      "Monod, Haldane, and Luedeking-Piret kinetic parameter fitting",
      "Heat balance and aeration fluid mechanics modeling"
    ],
    exampleSystem: "Closed-loop micro-aerated bioreactors with automated real-time nutrient feed controllers."
  },
  {
    id: "industrial",
    name: "Industrial scale / Plant",
    range: "10¹ to 10³ meters",
    headline: "Process modeling and techno-economics",
    description: "Determining commercial viability. We program full factory schematics containing pre-treatment reactors, flash separation, distillation, and cooling towers, verifying how millions of gallons of throughput translate into profitability.",
    experimentalApproaches: [
      "Pilot-scale validation trials (1000L+ runs)",
      "Continuous downstream centrifuge and extraction tests",
      "Membrane fouling rates and cleaning protocol testing"
    ],
    theoreticalApproaches: [
      "ASPEN Plus process mass & energy balance flowsheet creation",
      "Heat exchanger network synthesis (Pinch Analysis)",
      "Discounted cash flow rate of return / CapEx/OpEx scheduling"
    ],
    exampleSystem: "A 50-million-gallon-per-year continuous bio-acrylic acid generation facility."
  },
  {
    id: "systems",
    name: "Systems Level",
    range: "Global regional modeling",
    headline: "Life cycle analysis & macro carbon loop tracking",
    description: "Ensuring the system is net-positive. We audit the complete lifecycle of a technology, counting greenhouse gases, indirect land-use shifts, and watershed burdens from raw agricultural mining up to final customer combustion or decay.",
    experimentalApproaches: [
      "Raw soil core sampling for local land organic carbon metrics",
      "Watershed chemical runoff modeling and remote sensing",
      "Feedstock logistical tracking experiments"
    ],
    theoreticalApproaches: [
      "ISO 14040/44 compliant Life Cycle Assessment (LCA) profiling",
      "Global supply chain logistics optimization models",
      "Indirect land use change (ILUC) computable general equilibrium"
    ],
    exampleSystem: "Cradle-to-grave global sustainability audit of aviation bio-fuels vs standard fossil jet-A."
  }
];
