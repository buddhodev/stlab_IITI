export interface Dissertation {
  author: string;
  year: string;
  title: string;
  institution: string;
}

export interface Patent {
  type: string;
  title: string;
  office: string;
  number: string;
  date: string;
  inventors: string;
  details?: string;
}

export interface Publication {
  citation: string;
  year: number;
  doi?: string;
  link?: string;
}

export const DISSERTATIONS: Dissertation[] = [
  {
    author: "Deepak Kumar",
    year: "2014",
    title: "Biochemical conversion of lignocellulosic biomass to ethanol: experimental, enzymatic hydrolysis modeling, techno-economic and life cycle assessment studies",
    institution: "Oregon State University"
  },
  {
    author: "Abraham Asmare",
    year: "2014",
    title: "Investigation the potential of the microalgae consortium for algal biomass productivity, carbon sequestration and nutrient recovery from dairy manure",
    institution: "Addis Ababa University, Ethiopia"
  },
  {
    author: "Ankita Juneja",
    year: "2015",
    title: "Model predictive control for optimum algal growth",
    institution: "Oregon State University"
  },
  {
    author: "William Hohenschuh",
    year: "2016",
    title: "The path forward: Using high throughput data and dynamic flux balance modeling to identify bottlenecks in the carbon metabolism of industrial microbes and suggest solutions to improve product yield",
    institution: "Oregon State University"
  },
  {
    author: "S.M.H. Tabatabaie",
    year: "2017",
    title: "Integrated spatio-temporal sustainability analysis of biofuels using biogeochemistry, economic and life cycle analysis",
    institution: "Oregon State University"
  },
  {
    author: "Haider J. Kadhum",
    year: "2019",
    title: "Novel system design and operational strategies for the production of biofuels and bioproducts",
    institution: "Oregon State University"
  },
  {
    author: "Steve White",
    year: "2023",
    title: "A Land Application Treatment Strategy for Landfill Leachate and Water Reclamation",
    institution: "Oregon State University"
  },
  {
    author: "Kyle Proctor",
    year: "2022",
    title: "Harvesting Sunshine: A Modular Integrated Framework for Modelling the Agrivoltaic System",
    institution: "Oregon State University"
  }
];

export const PATENTS: Patent[] = [
  {
    type: "Patent",
    title: "A dynamic optimal controller for control of fermentation processes",
    office: "Office of Technology Management, University of Illinois at Urbana-Champaign",
    number: "US Patent No: 7,862,992",
    date: "Issued 4th January, 2011",
    inventors: "Ganti S. Murthy and Vijay Singh",
    details: "This technology has been successfully tested in two commercial dry-grind corn plants, licensed and installed in several corn dry-grind ethanol plants in the US."
  },
  {
    type: "Provisional Patent",
    title: "A multi-scale control framework for sustainable management of engineered algae production systems",
    office: "Office for Commercialization and Corporate Development, Oregon State University",
    number: "US Provisional Patent No: 62/190,642",
    date: "Filed 9th July, 2015",
    inventors: "Ganti S. Murthy and Ankita Juneja"
  },
  {
    type: "Provisional Patent",
    title: "Wastewater treatment system and method",
    office: "Office for Commercialization and Corporate Development, Oregon State University",
    number: "US Provisional Patent No: 62/738,806",
    date: "Filed 28th September, 2018",
    inventors: "Ganti S. Murthy and Steven White"
  }
];

export const OTHER_PUBLICATIONS: Publication[] = [
  {
    citation: "Mitra, S., Murthy, Ganti S. (2026). Experimental Comparison of Five MPC Variants for Hexadic Tank System Control: A Multi-Criteria Hardware Evaluation.",
    year: 2026,
    doi: "10.1016/j.jprocont.2026.01.002",
    link: "https://doi.org/10.1016/j.jprocont.2026.01.002"
  },
  {
    citation: "Williams, J. D., Robertson, D. S., Long, D. S., Wuest, S. B., Kumar, D., Juneja, A., ... (2025). Ethanol production potential from conservation buffers in the inland Pacific Northwest. Journal of Renewable and Sustainable Energy 8 (5).",
    year: 2025,
    doi: "10.1063/1.4965809",
    link: "https://doi.org/10.1063/1.4965809"
  },
  {
    citation: "Mitra, S., Paliya, S., Mandpe, A., Murthy, Ganti S. (2025). Maximizing resource valorization through bioremediation process intensification: A journey from bench to pilot scale. Microbial Biotechnology: Integrated Microbial Engineering for B3–Bioenergy.",
    year: 2025,
    doi: "10.1111/1751-7915.14321",
    link: "https://doi.org/10.1111/1751-7915.14321"
  },
  {
    citation: "Bhat, A. H., Dayal, D., Pandey, A., Murthy, G. S. (2024). Performance evaluation of canal irrigation system at the tertiary level of Upper Ganga Canal using remote sensing. Tropical Ecology 65 (2), 289-306.",
    year: 2024,
    doi: "10.1007/s42965-023-00320-z",
    link: "https://doi.org/10.1007/s42965-023-00320-z"
  },
  {
    citation: "Mitra, S., Murthy, Ganti S. (2022). Bioreactor control systems in the biopharmaceutical industry: a critical perspective. Systems Microbiology and Biomanufacturing 2 (1), 91-112.",
    year: 2022,
    doi: "10.1007/s43393-021-00045-w",
    link: "https://doi.org/10.1007/s43393-021-00045-w"
  },
  {
    citation: "Murthy, G. S. (2022). Techno-economic assessment. Biomass, Biofuels, Biochemicals, 17-32.",
    year: 2022
  },
  {
    citation: "Murthy, G. S., Pandey, A. (2022). Systems analysis and its relevance for the sustainability transitions. Biomass, Biofuels, Biochemicals, 1-16.",
    year: 2022
  },
  {
    citation: "Murthy, G. S. (2022). Environmental impacts. Biomass, Biofuels, Biochemicals, 33-52.",
    year: 2022
  },
  {
    citation: "Murthy, G. S. (2022). Resource assessment. Biomass, Biofuels, Biochemicals, 75-98.",
    year: 2022
  },
  {
    citation: "Murthy, G. S. (2022). Biofuels and bioproducts in India. Biomass, Biofuels, Biochemicals, 209-230.",
    year: 2022
  },
  {
    citation: "Murthy, G. S. (2022). Policy, governance, and social aspects. Biomass, Biofuels, Biochemicals, 99-112.",
    year: 2022
  },
  {
    citation: "Murthy, G. S. (2022). A systems analysis of first-and second-generation ethanol in the United States. Biomass, Biofuels, Biochemicals, 147-174.",
    year: 2022
  },
  {
    citation: "Murthy, G. S. (2022). Resilience thinking. Biomass, Biofuels, Biochemicals, 113-126.",
    year: 2022
  },
  {
    citation: "Murthy, G. S. (2022). Environmental risk assessment. Biomass, Biofuels, Biochemicals, 53-74.",
    year: 2022
  },
  {
    citation: "Proctor, K., Murthy, G. S. (2022). A systems analysis of solar and wind energy in the United States. Biomass, Biofuels, Biochemicals, 195-208.",
    year: 2022
  },
  {
    citation: "Kadhum, H. J., Murthy, G. S. (2022). Novel system design for high solid lignocellulosic biomass conversion. Bioresource Technology 350, 126897.",
    year: 2022
  },
  {
    citation: "Dhore, R., Murthy, G. S. (2021). Per/polyfluoroalkyl substances production, applications and environmental impacts. Bioresource Technology 341, 125808.",
    year: 2021
  },
  {
    citation: "Al-Agele, H. A., Proctor, K., Murthy, G., Higgins, C. (2021). A Case Study of Tomato (Solanum lycopersicon var. Legend) Production and Water Productivity in Agrivoltaic Systems. Sustainability 13 (5), 2850.",
    year: 2021
  },
  {
    citation: "Proctor, K., Tabatabaie, S. M H., Murthy, G. S. (2021). Gateway to the perspectives of the Food-Energy-Water nexus. Science of The Total Environment 764, 142852.",
    year: 2021
  },
  {
    citation: "Tabatabaie, S. M. H., Murthy, G. S. (2021). Development of an input-output model for food-energy-water nexus in the pacific northwest, USA. Resources, Conservation and Recycling 168, 105267.",
    year: 2021
  },
  {
    citation: "Tanzil, A. H., Zhang, X., Wolcott, M., Brandt, K., Stöckle, C., Murthy, G., ... (2021). Evaluation of dry corn ethanol bio-refinery concepts for the production of sustainable aviation fuel. Biomass and Bioenergy 146, 105937.",
    year: 2021
  },
  {
    citation: "Mahapatra, D. M., Murthy, G. S. (2021). Long term evaluation of a pilot scale multimodal algal bioprocess for treatment of municipal wastewater. Journal of Cleaner Production 311, 127690.",
    year: 2021
  },
  {
    citation: "Murthy, G. S., Gnansounou, E., Khanal, S. K., Pandey, A. (2021). Biomass, biofuels, biochemicals: green-economy: systems analysis for sustainability. Elsevier.",
    year: 2021
  },
  {
    citation: "Hohenschuh, W., Hector, R. E., Chaplen, F., Murthy, G. S. (2021). Using high-throughput data and dynamic flux balance modeling techniques to identify points of constraint in xylose utilization in Saccharomyces cerevisiae. Systems Microbiology and Biomanufacturing 1 (1), 58-75.",
    year: 2021
  },
  {
    citation: "Hohenschuh, W., Hector, R. E., Mertens, J. A., Murthy, G. S. (2021). Development and characterization of Saccharomyces cerevisiae strains genetically modified to over-express the pentose phosphate pathway. Systems Microbiology and Biomanufacturing 1 (1), 42-57.",
    year: 2021
  },
  {
    citation: "Proctor, K., Murthy, G., Higgins, C. (2021). A Site-Level Integrated Analysis of Agrivoltaic Systems. AGU Fall Meeting Abstracts 2021.",
    year: 2021
  },
  {
    citation: "Proctor, K. W., Murthy, G. S., Higgins, C. W. (2020). Agrivoltaics align with green new deal goals while supporting investment in the US’ rural economy. Sustainability 13 (1), 137.",
    year: 2020
  },
  {
    citation: "Cheng, M. H., Kadhum, H. J., Murthy, G. S., Dien, B. S., Singh, V. (2020). High solids loading biorefinery for the production of cellulosic sugars from bioenergy sorghum. Bioresource Technology 318, 124051.",
    year: 2020
  },
  {
    citation: "Murthy, G. S. (2020). An Automatic Disinfection System for Passenger Luggage at Airports and Train/Bus Stations. Transactions of the Indian National Academy of Engineering 5, 295-298.",
    year: 2020
  },
  {
    citation: "Gnansounou, E., Ganti, M. S., Singh, A., Gabrielle, B. (2020). Systems Analysis and Life-Cycle Assessment for energy and environmental sustainability. Bioresource Technology 317, 123988.",
    year: 2020
  },
  {
    citation: "Proctor, K., Murthy, G., Higgins, C. W. (2020). Measuring Tomato production and Water Productivity in Agrivoltaic Systems. AGU Fall Meeting 2020.",
    year: 2020
  },
  {
    citation: "Proctor, K. W., Murthy, G., Higgins, C. W. (2020). Potential of Agrivoltaic Systems to Increase US Food, Energy, and Water Security. AGU Fall Meeting Abstracts 2020.",
    year: 2020
  },
  {
    citation: "Rajendran, K., Murthy, G. S. (2019). Techno-economic and life cycle assessments of anaerobic digestion–A review. Biocatalysis and Agricultural Biotechnology 20, 101207.",
    year: 2019
  },
  {
    citation: "Kadhum, H. J., Mahapatra, D. M., Murthy, G. S. (2019). A comparative account of glucose yields and bioethanol production from separate and simultaneous saccharification and fermentation processes at high solids loading. Bioresource Technology 283, 67-75.",
    year: 2019
  },
  {
    citation: "Kadhum, H. J., Mahapatra, D. M., Murthy, G. S. (2019). A novel method for real-time estimation of insoluble solids and glucose concentrations during enzymatic hydrolysis of biomass. Bioresource Technology 275, 328-337.",
    year: 2019
  },
  {
    citation: "Murthy, G. S. (2019). Systems analysis frameworks for biorefineries. Biofuels: alternative feedstocks and conversion processes....",
    year: 2019
  },
  {
    citation: "Srivastava, A., Chahar, V., Sharma, V., Swain, K. K., Hoyler, F., Murthy, G. S., ... (2019). Study of Toxic Elements in River Water and Wetland Using Water Hyacinth (Eichhornia crassipes) as Pollution Monitor. Global Challenges 3 (6), 1800087.",
    year: 2019
  },
  {
    citation: "Agrawal, A., Vishwakarma, R. K., Tripathi, V. R., Kothari, A. K., Prasad, B., Kumar, J., ... (2019). Improvement in casting practice by controlling the drainage rate and hearth liquid level to develop an efficient casthouse management practice in blast furnace. Ironmaking & Steelmaking 46 (4), 373-382.",
    year: 2019
  },
  {
    citation: "Mahapatra, D. M., Mahapatra, R., Singh, L., Kadhum, H. J., Murthy, G. S., ... (2019). Phosphorus capture, immobilization and channeling through algae for a sustainable agriculture. Soil Fertility Management for Sustainable Development, 1-11.",
    year: 2019
  },
  {
    citation: "Singh, B. K., Ramdasu, B., Patnaik, D., Raj Kumar, V., M GSR, ... (2019). Heat Loss Control in Stave Cooled Blast Furnace by Optimizing Gas Flow Pattern through Burden Distribution. Sustainable Industrial Processing Summit 8, 73-82.",
    year: 2019
  },
  {
    citation: "Babbar-Sebens, M., Rivera, S. J., Giles, N. A., Tilt, J., Reimer, J., Murthy, G., ... (2019). InterACTWEL Science Gateway for Adaptation Planning in Food-Energy-Water Sectors of Local Communities. AGU Fall Meeting Abstracts.",
    year: 2019
  },
  {
    citation: "Mahapatra, D. M., Joshi, N. V., Murthy, G. S., Ramachandra, T. V. (2019). Natural Algal Photobioreactors for Sustainable Wastewater Treatment. Handbook of Algal Technologies and Phytochemicals, 23-36.",
    year: 2019
  },
  {
    citation: "Mahapatra, D. M., Chanakya, H. N., Joshi, N. V., Ramachandra, T. V., Murthy, G. S. (2018). Algae-based biofertilizers: a biorefinery approach. Microorganisms for Green Revolution: Volume 2.",
    year: 2018
  },
  {
    citation: "Tabatabaie, S. M. H., Tahami, H., Murthy, G. S. (2518). A regional life cycle assessment and economic analysis of camelina biodiesel production in the Pacific Northwestern US. Journal of Cleaner Production 172, 2389-2400.",
    year: 2018
  },
  {
    citation: "Kadhum, H. J., Rajendran, K., Murthy, G. S. (2018). Optimization of surfactant addition in cellulosic ethanol process using integrated techno-economic and life cycle assessment for bioprocess design. ACS Sustainable Chemistry & Engineering 6 (11), 13687-13695.",
    year: 2018
  },
  {
    citation: "Tabatabaie, S. M. H., Bolte, J. P., Murthy, G. S. (2018). A regional scale modeling framework combining biogeochemical model with life cycle and economic analysis for integrated assessment of cropping systems. Science of the Total Environment 625, 428-439.",
    year: 2018
  },
  {
    citation: "Juneja, A., Murthy, G. S. (2018). Model predictive control coupled with economic and environmental constraints for optimum algal production. Bioresource Technology 250, 556-563.",
    year: 2018
  },
  {
    citation: "Mellbye, B. L., Giguere, A. T., Murthy, G. S., Bottomley, P. J., Sayavedra-Soto, L. A., ... (2018). Genome-Scale, Constraint-Based Modeling of Nitrogen Oxide Fluxes during Coculture of Nitrosomonas europaea and Nitrobacter winogradskyi. Msystems 3 (3).",
    year: 2018
  },
  {
    citation: "Rivera, S. J., Giles, N. A., Babbar-Sebens, M., Tabatabai, H., Reimer, J., Murthy, G., ... (2018). A Secure Decision Support System for Coordination of Adaptation Planning Among FEW Actors. AGU Fall Meeting Abstracts.",
    year: 2018
  },
  {
    citation: "Mirkouei, A., Haapala, K. R., Sessions, J., Murthy, G. S. (2017). A review and future directions in techno-economic modeling and optimization of upstream forest biomass to bio-oil supply chains. Renewable and Sustainable Energy Reviews 67, 15-35.",
    year: 2017
  },
  {
    citation: "Mirkouei, A., Haapala, K. R., Sessions, J., Murthy, G. S. (2017). A mixed biomass-based energy supply chain for enhancing economic and environmental sustainability benefits: A multi-criteria decision making framework. Applied Energy 206, 1088-1101.",
    year: 2017
  },
  {
    citation: "Juneja, A., Murthy, G. S. (2017). Evaluating the potential of renewable diesel production from algae cultured on wastewater: techno-economic analysis and life cycle assessment. Aims Energy 5 (2), 239.",
    year: 2017
  },
  {
    citation: "Kadhum, H. J., Rajendran, K., Murthy, G. S. (2017). Effect of solids loading on ethanol production: Experimental, economic and environmental analysis. Bioresource Technology 244, 108-116.",
    year: 2017
  },
  {
    citation: "Rajendran, K., Murthy, G. S. (2017). How does technology pathway choice influence economic viability and environmental impacts of lignocellulosic biorefineries? Biotechnology for Biofuels 10 (1), 268.",
    year: 2017
  },
  {
    citation: "Tabatabaie, S. M. H., Murthy, G. S. (2017). Effect of geographical location and stochastic weather variation on life cycle assessment of biodiesel production from camelina in the northwestern USA. The International Journal of Life Cycle Assessment 22 (6), 867-882.",
    year: 2017
  },
  {
    citation: "Kumar, D., Murthy, G. S. (2017). Development and validation of a stochastic molecular model of cellulose hydrolysis by action of multiple cellulase enzymes. Bioresources and Bioprocessing 4 (1), 54.",
    year: 2017
  },
  {
    citation: "Tabatabaie, S. M. H., Murthy, G. S. (2016). Cradle to farm gate life cycle assessment of strawberry production in the United States. Journal of Cleaner Production 127, 548-554.",
    year: 2016
  },
  {
    citation: "Mirkouei, A., Mirzaie, P., Haapala, K. R., Sessions, J., Murthy, G. S. (2016). Reducing the cost and environmental impact of integrated fixed and mobile bio-oil refinery supply chains. Journal of Cleaner Production 113, 495-507.",
    year: 2016
  },
  {
    citation: "Juneja, A., Chaplen, F. W. R., Murthy, G. S. (2016). Genome scale metabolic reconstruction of Chlorella variabilis for exploring its metabolic potential for biofuels. Bioresource Technology 213, 103-110.",
    year: 2016
  },
  {
    citation: "Kumar, D., Murthy, G. S. (2016). Enzymatic hydrolysis of cellulose for ethanol production: fundamentals, optimal enzyme ratio, and hydrolysis modeling. New and Future Developments in Microbial Biotechnology and Bioengineering, 65-78.",
    year: 2016
  },
  {
    citation: "Mirkouei, A., Haapala, K. R., Sessions, J., Murthy, G. S. (2016). Reducing greenhouse gas emissions for sustainable bio-oil production using a mixed supply chain. International Design Engineering Technical Conferences.",
    year: 2016
  },
  {
    citation: "Ault, K., Viswanath, V., Jayawickrama, J., Ma, C., Eaton, J., Meilan, R., ... (2016). Improved growth and weed control of glyphosate-tolerant poplars. New Forests 47 (5), 653-667.",
    year: 2016
  },
  {
    citation: "Arbuckle, P., Kahn, E., Loneman, A., McCarthy, S., Tabatabaie, S. M. H., ... (2016). Unit process data collection for specialty crop production. Proceedings of the 9th International Conference on Life Cycle Assessment.",
    year: 2016
  },
  {
    citation: "Hohenschuh, W., Hector, R., Murthy, G. S. (2015). A dynamic flux balance model and bottleneck identification of glucose, xylose, xylulose co-fermentation in Saccharomyces cerevisiae. Bioresource Technology 188, 153-160.",
    year: 2015
  },
  {
    citation: "Kumar, D., Prasad, S., Murthy, G. S. (2014). Optimization of microwave-assisted hot air drying conditions of okra using response surface methodology. Journal of Food Science and Technology 51 (2), 221-232.",
    year: 2014
  },
  {
    citation: "Mochizuki, J., Yanagida, J. F., Kumar, D., Takara, D., Murthy, G. S. (2014). Life cycle assessment of ethanol production from tropical banagrass (Pennisetum purpureum) using green and dry processing technologies in Hawaii. Journal of Renewable and Sustainable Energy 6 (4).",
    year: 2014
  },
  {
    citation: "Merculieff, Z., Ramnath, S., Sankoli, S. M., Venkataramegowda, S., Murthy, G. S., ... (2014). Phytochemical, antioxidant and antibacterial potential of Elaeagnus kologa (Schlecht.) leaf. Asian Pacific Journal of Tropical Medicine 7, S599-S602.",
    year: 2014
  },
  {
    citation: "Asmare, A. M., Demessie, B. A., Murthy, G. S. (2014). Investigation of microalgae Co-cultures for nutrient recovery and algal BiomassProduction from dairy manure. Applied Engineering in Agriculture 30 (2), 335-342.",
    year: 2014
  },
  {
    citation: "Hohenschuh, W., Kumar, D., Murthy, G. S. (2014). Economic and cradle-to-gate life cycle assessment of poly-3-hydroxybutyrate production from plastic producing, genetically modified hybrid poplar leaves. Journal of Renewable and Sustainable Energy 6 (6).",
    year: 2014
  },
  {
    citation: "Hashimoto, A., Arnold, J., Ayars, J., Crow, S., Eggeman, T., Jakeway, L., ... (2014). High-yield tropical biomass for advanced biofuels. Proceedings from Sun Grant National Conference.",
    year: 2014
  },
  {
    citation: "Kumar, D., Murthy, G. S. (2013). Stochastic molecular model of enzymatic hydrolysis of cellulose for ethanol production. Biotechnology for Biofuels 6 (1), 63.",
    year: 2013
  },
  {
    citation: "Juneja, A., Kumar, D., Murthy, G. S. (2013). Economic feasibility and environmental life cycle assessment of ethanol production from lignocellulosic feedstock in Pacific Northwest US. Journal of Renewable and Sustainable Energy 5 (2).",
    year: 2013
  },
  {
    citation: "Bozorgirad, M. A., Zhang, H., Haapala, K. R., Murthy, G. S. (2013). Environmental impact and cost assessment of incineration and ethanol production as municipal solid waste management strategies. The International Journal of Life Cycle Assessment 18 (8), 1502-1512.",
    year: 2013
  },
  {
    citation: "Asmare, A. M., Demessie, B. A., Murthy, G. S. (2013). Theoretical estimation the potential of algal biomass for biofuel production and carbon sequestration in Ethiopia. International Journal of Renewable Energy Research 3 (3), 560-570.",
    year: 2013
  },
  {
    citation: "Avanasi, R. N., Murthy, G. S., Chaplen, F. W. R., Beatty, C. (2013). Fermentation of Glucose/Xylose/Xylulose in the Presence of Furfural by Yeast for Ethanol Production. Biological Engineering Transactions 6 (3), 157-172.",
    year: 2013
  },
  {
    citation: "Ceballos, R., Sankoli, S. M., Ramnath, S., Venkataramegowda, S., Murthy, G. S., ... (2013). Evaluation of phytochemicals and in vitro antioxidant studies of Toddalia asiatica leaf. Medicinal Plants-International Journal of Phytomedicines and Related Industries.",
    year: 2013
  },
  {
    citation: "Kumar, D., Murthy, G. S. (2012). Life cycle assessment of energy and GHG emissions during ethanol production from grass straws using various pretreatment processes. The International Journal of Life Cycle Assessment 17 (4), 388-401.",
    year: 2012
  },
  {
    citation: "Murthy, G. S., Johnston, D. B., Rausch, K. D., Tumbleson, M. E., Singh, V. (2012). A simultaneous saccharification and fermentation model for dynamic growth environments. Bioprocess and Biosystems Engineering 35 (4), 519-534.",
    year: 2012
  },
  {
    citation: "Kumar, D., Juneja, A., Hohenschuh, W., Williams, J. D., Murthy, G. S. (2012). Chemical composition and bioethanol potential of different plant species found in Pacific Northwest conservation buffers. Journal of Renewable and Sustainable Energy 4 (6).",
    year: 2012
  },
  {
    citation: "Murthy, G. S., Johnston, D. B., Rausch, K. D., Tumbleson, M. E., Singh, V. (2012). Design and evaluation of an optimal controller for simultaneous saccharification and fermentation process. Applied Biochemistry and Biotechnology 166 (1), 87-111.",
    year: 2012
  },
  {
    citation: "Dalton, D. A., Murthy, G., Strauss, S. H. (2012). Production of traditional and novel biopolymers in transgenic woody plants. Phytochemicals, Plant Growth, and the Environment, 59-78.",
    year: 2012
  },
  {
    citation: "Hohenschuh, W., Ma, C., Dalton, D., Murthy, G. S. (2012). Optimization of a Poly-3-hydroxybutyrate Quantification Method for Rapid Detection in Plant Based Systems. Journal of Bioprocess Engineering and Biorefinery 1 (150), 120-126.",
    year: 2012
  },
  {
    citation: "Kumar, D., Murthy, G. S. (2011). Impact of pretreatment and downstream processing technologies on economics and energy in cellulosic ethanol production. Biotechnology for Biofuels 4 (1), 27.",
    year: 2011,
    doi: "10.1186/1754-6834-4-27",
    link: "https://doi.org/10.1186/1754-6834-4-27"
  },
  {
    citation: "Murthy, G. S., Johnston, D. B., Rausch, K. D., Tumbleson, M. E., Singh, V. (2011). Starch hydrolysis modeling: application to fuel ethanol production. Bioprocess and Biosystems Engineering 34 (7), 879-890.",
    year: 2011
  },
  {
    citation: "Murthy, G. S. (2011). Overview and assessment of algal biofuels production technologies. Biofuels, 415-437.",
    year: 2011
  },
  {
    citation: "Kumar, D., Murthy, G. S. (2011). Pretreatments and enzymatic hydrolysis of grass straws for ethanol production in the Pacific Northwest US. Biological Engineering Transactions 3 (2), 97-110.",
    year: 2011
  },
  {
    citation: "Juneja, A., Kumar, D., Williams, J. D., Wysocki, D. J., Murthy, G. S. (2011). Potential for ethanol production from conservation reserve program lands in Oregon. Journal of Renewable and Sustainable Energy 3 (6).",
    year: 2011
  },
  {
    citation: "Murthy, G. S., Rausch, K. D., Johnston, D. B., Tumbleson, M. E., Singh, V. (2011). Industrial evaluation of a dynamic controller for simultaneous saccharification and fermentation process. Industrial Biotechnology 7 (4), 298-307.",
    year: 2011
  },
  {
    citation: "Murthy, G. S., Singh, V. (2011). Dynamic fermentation controller. US Patent 7,862,992.",
    year: 2011
  },
  {
    citation: "Sander, K., Murthy, G. S. (2010). Life cycle analysis of algae biodiesel. The International Journal of Life Cycle Assessment 15 (7), 704-714.",
    year: 2010,
    doi: "10.1007/s11367-010-0194-1",
    link: "https://doi.org/10.1007/s11367-010-0194-1"
  },
  {
    citation: "Sander, K. B., Murthy, G. S. (2009). Enzymatic degradation of microalgal cell walls. 2009 Reno, Nevada, June 21-June 24, 2009.",
    year: 2009
  },
  {
    citation: "Murthy, G. S., Sall, E. D., Metz, S. G., Foster, G., Singh, V. (2009). Evaluation of a dry corn fractionation process for ethanol production with different hybrids. Industrial Crops and Products 29 (1), 67-72.",
    year: 2009,
    doi: "10.1016/j.indcrop.2008.04.007",
    link: "https://doi.org/10.1016/j.indcrop.2008.04.007"
  },
  {
    citation: "Miller, W. C., Murthy, G. S. (2009). Evaluation of seven feedstocks for cellulosic ethanol production in the northwestern United States of America. 2009 Reno, Nevada, June 21-June 24, 2009.",
    year: 2009
  },
  {
    citation: "Amezcua, C. M., Parsons, C. M., Singh, V., Srinivasan, R., Murthy, G. S. (2007). Nutritional characteristics of corn distillers dried grains with solubles as affected by the amounts of grains versus solubles and different processing techniques. Poultry Science 86 (12), 2624-2630.",
    year: 2007
  },
  {
    citation: "Murthy, G. S., Singh, V., Johnston, D. B., Rausch, K. D., Tumbleson, M. E. (2006). Evaluation and strategies to improve fermentation characteristics of modified dry‐grind corn processes. Cereal Chemistry 83 (5), 455-459.",
    year: 2006
  },
  {
    citation: "Murthy, G. S., Singh, V., Johnston, D. B., Rausch, K. D., Tumbleson, M. E. (2006). Improvement in fermentation characteristics of degermed ground corn by lipid supplementation. Journal of Industrial Microbiology and Biotechnology 33 (8), 655-660.",
    year: 2006
  },
  {
    citation: "Murthy, G. S., Townsend, D. E., Meerdink, G. L., Bargren, G. L., Tumbleson, M. E., ... (2005). Effect of aflatoxin B1 on dry‐grind ethanol process. Cereal Chemistry 82 (3), 302-304.",
    year: 2005
  }
];
