/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CaseStudy {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export interface SustainablePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  subRequirements: string[];
  caseStudy: CaseStudy;
}

export interface ResearchScale {
  id: string;
  name: string;
  range: string;
  headline: string;
  description: string;
  experimentalApproaches: string[];
  theoreticalApproaches: string[];
  exampleSystem: string;
}

export interface BioreactorState {
  time: number[];
  biomass: number[];
  substrate: number[];
  product: number[];
}
