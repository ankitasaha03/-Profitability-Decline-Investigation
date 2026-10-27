export type QuarterId = 'Q1' | 'Q2' | 'Q3' | 'ALL';

export type Department = 'Finance' | 'HR' | 'Operations' | 'Marketing';

export interface FinancialMetrics {
  revenue: number; // in USD
  cogs: number; // in USD
  grossProfit: number;
  grossMargin: number; // percentage
  netProfit: number;
  netMargin: number; // percentage
  operatingExpenses: number;
  cac: number; // Customer Acquisition Cost
  ltv: number; // Customer Lifetime Value
  ltvCacRatio: number;
  overtimeExpense: number;
  contractorBackfillExpense: number;
  expeditedFreightExpense: number;
}

export interface HrMetrics {
  turnoverRate: number; // percentage
  timeToHireDays: number;
  employeeSatisfactionIndex: number; // 0 - 100
  burnoutIndex: number; // 0 - 100
  openHeadcount: number;
  reportedDepartmentHealth: number; // percentage reported internally
}

export interface OperationsMetrics {
  fulfillmentLatencyDays: number;
  errorDefectRate: number; // percentage
  overtimeHoursLogged: number;
  stockoutRatePromos: number; // percentage
  onTimeInFullRate: number; // percentage
  reportedDepartmentHealth: number; // percentage reported internally
}

export interface MarketingMetrics {
  spendPerCampaignAvg: number;
  leadVolume: number;
  customerRetention30Day: number; // percentage
  leadToConversionDays: number;
  cpa: number; // cost per acquisition
  reportedDepartmentHealth: number; // percentage reported internally
}

export interface QuarterData {
  quarter: 'Q1' | 'Q2' | 'Q3';
  financial: FinancialMetrics;
  hr: HrMetrics;
  operations: OperationsMetrics;
  marketing: MarketingMetrics;
  siloAverageHealth: number;
  crossFunctionalSynergyScore: number;
  totalIdentifiedLeakage: number;
}

export interface CausalityNode {
  id: string;
  department: Department | 'CrossFunctional';
  title: string;
  metric: string;
  metricChange: string;
  severity: 'critical' | 'high' | 'medium' | 'moderate';
  description: string;
  downstreamEffect: string;
  dollarLeakage: number;
  connectedTo: string[]; // ids of connected nodes
}

export interface InterDepartmentLeakage {
  id: string;
  title: string;
  primaryDepartments: [Department, Department];
  annualLossUSD: number;
  symptom: string;
  hiddenSiloDriver: string;
  systemicImpact: string;
  metrics: {
    label: string;
    value: string;
    benchmark: string;
    status: 'danger' | 'warning' | 'neutral';
  }[];
  rootCauseChain: string[];
  recommendedSla: string;
}

export interface SimulationParams {
  turnoverReductionPct: number; // 0 - 70%
  marketingCapacityAlignmentPct: number; // 0 - 100%
  overtimeSpendOptimizationPct: number; // 0 - 60%
  inventoryBufferRatePct: number; // 60 - 95%
}

export interface SimulationResults {
  projectedNetMargin: number;
  marginDelta: number;
  annualLeakageRecovered: number;
  projectedLtvCacRatio: number;
  projectedOvertimeSaved: number;
  projectedSynergyScore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  isStreaming?: boolean;
  actionPayload?: {
    type: 'APPLY_SIMULATION' | 'NAVIGATE_TAB' | 'HIGHLIGHT_NODE' | 'OPEN_DOSSIER';
    label: string;
    data?: any;
  };
  metricsHighlight?: {
    label: string;
    value: string;
    delta?: string;
  }[];
}
