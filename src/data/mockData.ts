import {
  CausalityNode,
  InterDepartmentLeakage,
  QuarterData,
  SimulationParams,
  SimulationResults,
} from '@/types';

export const QUARTERLY_DATA: Record<'Q1' | 'Q2' | 'Q3', QuarterData> = {
  Q1: {
    quarter: 'Q1',
    financial: {
      revenue: 24_500_000,
      cogs: 14_100_000,
      grossProfit: 10_400_000,
      grossMargin: 42.4,
      netProfit: 4_900_000,
      netMargin: 20.0,
      operatingExpenses: 5_500_000,
      cac: 240,
      ltv: 1_420,
      ltvCacRatio: 5.92,
      overtimeExpense: 420_000,
      contractorBackfillExpense: 280_000,
      expeditedFreightExpense: 180_000,
    },
    hr: {
      turnoverRate: 11.2,
      timeToHireDays: 34,
      employeeSatisfactionIndex: 78,
      burnoutIndex: 32,
      openHeadcount: 14,
      reportedDepartmentHealth: 88,
    },
    operations: {
      fulfillmentLatencyDays: 1.8,
      errorDefectRate: 1.4,
      overtimeHoursLogged: 3_200,
      stockoutRatePromos: 6.5,
      onTimeInFullRate: 94.8,
      reportedDepartmentHealth: 87,
    },
    marketing: {
      spendPerCampaignAvg: 450_000,
      leadVolume: 18_200,
      customerRetention30Day: 74.0,
      leadToConversionDays: 12,
      cpa: 210,
      reportedDepartmentHealth: 91,
    },
    siloAverageHealth: 88.7,
    crossFunctionalSynergyScore: 68,
    totalIdentifiedLeakage: 880_000,
  },
  Q2: {
    quarter: 'Q2',
    financial: {
      revenue: 24_800_000,
      cogs: 15_800_000,
      grossProfit: 9_000_000,
      grossMargin: 36.3,
      netProfit: 3_100_000,
      netMargin: 12.5,
      operatingExpenses: 5_900_000,
      cac: 345,
      ltv: 1_180,
      ltvCacRatio: 3.42,
      overtimeExpense: 1_150_000,
      contractorBackfillExpense: 890_000,
      expeditedFreightExpense: 620_000,
    },
    hr: {
      turnoverRate: 18.5,
      timeToHireDays: 49,
      employeeSatisfactionIndex: 65,
      burnoutIndex: 58,
      openHeadcount: 26,
      reportedDepartmentHealth: 86,
    },
    operations: {
      fulfillmentLatencyDays: 3.6,
      errorDefectRate: 3.2,
      overtimeHoursLogged: 7_400,
      stockoutRatePromos: 19.8,
      onTimeInFullRate: 85.2,
      reportedDepartmentHealth: 85,
    },
    marketing: {
      spendPerCampaignAvg: 680_000,
      leadVolume: 24_100,
      customerRetention30Day: 58.0,
      leadToConversionDays: 21,
      cpa: 310,
      reportedDepartmentHealth: 89,
    },
    siloAverageHealth: 87.5,
    crossFunctionalSynergyScore: 51,
    totalIdentifiedLeakage: 2_660_000,
  },
  Q3: {
    quarter: 'Q3',
    financial: {
      revenue: 25_100_000,
      cogs: 17_600_000,
      grossProfit: 7_500_000,
      grossMargin: 29.9,
      netProfit: 1_450_000,
      netMargin: 5.8,
      operatingExpenses: 6_050_000,
      cac: 480,
      ltv: 890,
      ltvCacRatio: 1.85,
      overtimeExpense: 2_100_000,
      contractorBackfillExpense: 1_640_000,
      expeditedFreightExpense: 1_120_000,
    },
    hr: {
      turnoverRate: 24.8,
      timeToHireDays: 67,
      employeeSatisfactionIndex: 52,
      burnoutIndex: 76,
      openHeadcount: 42,
      reportedDepartmentHealth: 87,
    },
    operations: {
      fulfillmentLatencyDays: 6.4,
      errorDefectRate: 5.8,
      overtimeHoursLogged: 14_800,
      stockoutRatePromos: 31.4,
      onTimeInFullRate: 72.1,
      reportedDepartmentHealth: 86,
    },
    marketing: {
      spendPerCampaignAvg: 920_000,
      leadVolume: 31_500,
      customerRetention30Day: 41.0,
      leadToConversionDays: 34,
      cpa: 430,
      reportedDepartmentHealth: 92,
    },
    siloAverageHealth: 88.5,
    crossFunctionalSynergyScore: 42,
    totalIdentifiedLeakage: 4_860_000,
  },
};

export const TREND_CHART_DATA = [
  {
    period: 'Q1',
    reportedHealth: 88.7,
    actualMargin: 20.0,
    targetMargin: 21.5,
    leakageCost: 0.88,
    overtimeHours: 3200,
    cac: 240,
    burnout: 32,
    synergy: 68,
  },
  {
    period: 'Q2',
    reportedHealth: 87.5,
    actualMargin: 12.5,
    targetMargin: 21.5,
    leakageCost: 2.66,
    overtimeHours: 7400,
    cac: 345,
    burnout: 58,
    synergy: 51,
  },
  {
    period: 'Q3',
    reportedHealth: 88.5,
    actualMargin: 5.8,
    targetMargin: 21.5,
    leakageCost: 4.86,
    overtimeHours: 14800,
    cac: 480,
    burnout: 76,
    synergy: 42,
  },
];

export const CAUSALITY_NODES: CausalityNode[] = [
  {
    id: 'node-hr-turnover',
    department: 'HR',
    title: 'High Skilled Staff Turnover',
    metric: '24.8% (Target < 10%)',
    metricChange: '+13.6% over 3 Qtrs',
    severity: 'critical',
    description:
      'Aggressive hiring targets met with low-retention cohorts. Average time-to-hire stretched to 67 days, resulting in warehouse lead exhaustion.',
    downstreamEffect:
      'Causes severe operational staffing shortages, triggering emergency overtime and dependence on 3x-priced third-party contractors.',
    dollarLeakage: 1_640_000,
    connectedTo: ['node-ops-overtime'],
  },
  {
    id: 'node-ops-overtime',
    department: 'Operations',
    title: 'Overtime Explosion & Temp Agency Spend',
    metric: '14,800 hrs logged ($2.1M OpEx)',
    metricChange: '+362% surge',
    severity: 'critical',
    description:
      'Depleted core teams forced to log massive overtime; onboarding delays led to high defect rates (5.8%) and reliance on temporary contractor agencies.',
    downstreamEffect:
      'Erodes gross margin directly and creates fulfillment latency bottlenecks of 6.4 days.',
    dollarLeakage: 2_100_000,
    connectedTo: ['node-ops-stockout', 'node-outcome'],
  },
  {
    id: 'node-mkt-low-ltv',
    department: 'Marketing',
    title: 'Low-LTV Customer Acquisition Rush',
    metric: 'CAC $480 / LTV $890 (Ratio 1.85x)',
    metricChange: 'CAC doubled YoY',
    severity: 'high',
    description:
      'Marketing hit siloed volume targets (31,500 leads) by purchasing discount-seeking traffic with 30-day retention of just 41%.',
    downstreamEffect:
      'Floods operations with low-margin, high-return orders while Finance pays premium ad spend for unprofitable customer cohorts.',
    dollarLeakage: 1_450_000,
    connectedTo: ['node-ops-stockout', 'node-outcome'],
  },
  {
    id: 'node-ops-stockout',
    department: 'Operations',
    title: 'Campaign Stockouts & Expedited Freight',
    metric: '31.4% Stockout rate on promos',
    metricChange: 'Fulfillment lag: 6.4 days',
    severity: 'critical',
    description:
      'Marketing launched flash promos without checking warehouse inventory buffer. Emergency air freight was chartered to fulfill backorders.',
    downstreamEffect:
      'Led to customer order cancellations ($820k) and $1.12M in emergency expedited logistics fees.',
    dollarLeakage: 1_120_000,
    connectedTo: ['node-outcome'],
  },
  {
    id: 'node-fin-budget',
    department: 'Finance',
    title: 'Siloed Austerity & Hiring Freezes',
    metric: 'CapEx/Headcount Freeze (-15%)',
    metricChange: 'Created shadow contractor burn',
    severity: 'moderate',
    description:
      'Finance initiated blanket departmental hiring freeze to defend Q2 profit. Operations bypassed headcount freeze by hiring agency contractors at double hourly rates.',
    downstreamEffect:
      'Created $890k in higher shadow operating expenses than if permanent roles were filled.',
    dollarLeakage: 550_000,
    connectedTo: ['node-hr-turnover', 'node-ops-overtime'],
  },
  {
    id: 'node-outcome',
    department: 'CrossFunctional',
    title: 'Corporate Net Profit Margin Collapse',
    metric: '5.8% Net Margin (-14.2% YoY)',
    metricChange: 'Annual leakage: $4.86M',
    severity: 'critical',
    description:
      'The compounding effect of siloed optimizations: every department hit local KPIs while creating cascading negative externalities that wiped out $3.45M in net earnings.',
    downstreamEffect:
      'Board intervention required. Systemic cross-functional SLA governance needed to reverse margin drop.',
    dollarLeakage: 4_860_000,
    connectedTo: [],
  },
];

export const INTER_DEPARTMENT_LEAKAGES: InterDepartmentLeakage[] = [
  {
    id: 'mkt-fin',
    title: 'Marketing vs. Finance: The Volume-over-Value Trap',
    primaryDepartments: ['Marketing', 'Finance'],
    annualLossUSD: 1_450_000,
    symptom: 'Marketing reports record lead volume (+73%), yet overall company gross margin dropped by 12.5%.',
    hiddenSiloDriver:
      'Marketing bonus structure was indexed purely on lead volume and CPA, independent of cohort LTV or return rates.',
    systemicImpact:
      'High acquisition spend was poured into low-intent discount shoppers. LTV/CAC ratio collapsed from a healthy 5.92x to an unsustainable 1.85x.',
    metrics: [
      { label: 'CAC (Blended)', value: '$480', benchmark: '< $250', status: 'danger' },
      { label: 'LTV / CAC Ratio', value: '1.85x', benchmark: '> 3.5x', status: 'danger' },
      { label: '30-Day Customer Retention', value: '41.0%', benchmark: '> 70%', status: 'danger' },
      { label: 'Unprofitable Ad Spend Leak', value: '$1.45M', benchmark: '$0', status: 'warning' },
    ],
    rootCauseChain: [
      'Finance set aggressive top-line revenue targets for Q2/Q3.',
      'Marketing exhausted core high-affinity channels and broadened targeting to low-intent discount seekers.',
      'Reported Marketing health looked stellar (92% target achievement).',
      'Acquired customers had 41% 30-day retention and high support ticket volume, degrading bottom-line margin.',
    ],
    recommendedSla:
      'Tie 50% of Marketing campaign budget allocation to 90-day Contribution Margin rather than raw lead volume.',
  },
  {
    id: 'hr-ops',
    title: 'HR vs. Operations: Burnout & Contractor Flywheel',
    primaryDepartments: ['HR', 'Operations'],
    annualLossUSD: 1_640_000,
    symptom: 'Operations reports satisfactory machinery uptime (86%), while overtime and contractor expenses surged 362%.',
    hiddenSiloDriver:
      'HR hit time-to-fill metric quotas by placing junior workers without adequate warehouse training, leading to 24.8% annualized turnover.',
    systemicImpact:
      'Remaining tenured operations staff worked 14,800 overtime hours. To bridge the gap, plant managers onboarded agency contractors at $85/hr vs. $28/hr base employee cost.',
    metrics: [
      { label: 'Quarterly Overtime Expense', value: '$2.10M', benchmark: '< $500k', status: 'danger' },
      { label: 'Agency Contractor Backfill', value: '$1.64M', benchmark: '< $300k', status: 'danger' },
      { label: 'Annualized Ops Turnover', value: '24.8%', benchmark: '< 10%', status: 'danger' },
      { label: 'Employee Burnout Index', value: '76 / 100', benchmark: '< 35', status: 'danger' },
    ],
    rootCauseChain: [
      'Rapid turnover in fulfillment centers increased from 11.2% in Q1 to 24.8% in Q3.',
      'Time-to-hire blew out to 67 days, creating chronic understaffing.',
      'Operations used emergency overtime ($2.1M) and third-party temp agencies ($1.64M) to avoid delivery shutdowns.',
      'High fatigue caused defect rates to triple from 1.4% to 5.8%.',
    ],
    recommendedSla:
      'Establish a joint HR-Ops retention SLA with a 90-day onboarding buddy program and overtime cap at 8 hours/employee/week.',
  },
  {
    id: 'ops-mkt',
    title: 'Operations vs. Marketing: Unsynchronized Demand Surges',
    primaryDepartments: ['Operations', 'Marketing'],
    annualLossUSD: 1_120_000,
    symptom: 'Marketing celebrated successful flash campaigns while customer satisfaction ratings dropped 26 points due to stockouts.',
    hiddenSiloDriver:
      'No unified demand-planning sync: marketing campaigns were launched without real-time API visibility into warehouse inventory safety stocks.',
    systemicImpact:
      'Promotional items had a 31.4% stockout rate. Operations incurred $1.12M in expedited air freight to scramble replenishment from overseas suppliers.',
    metrics: [
      { label: 'Promo Stockout Rate', value: '31.4%', benchmark: '< 5.0%', status: 'danger' },
      { label: 'Expedited Freight Surcharge', value: '$1.12M', benchmark: '< $200k', status: 'danger' },
      { label: 'Fulfillment Latency', value: '6.4 Days', benchmark: '< 2.0 Days', status: 'danger' },
      { label: 'Customer Order Cancellations', value: '$820k', benchmark: '< $100k', status: 'warning' },
    ],
    rootCauseChain: [
      'Marketing launched 4 large-scale promotional pushes in Q3 without prior notification to warehouse logistics.',
      'Inventory buffer was exhausted in 48 hours, causing massive backorders.',
      'Operations chartered emergency priority air freight at 4.2x standard sea rates.',
      'Late deliveries and canceled orders damaged brand equity and crushed customer retention.',
    ],
    recommendedSla:
      'Mandatory 21-day advance promotional gate requiring Operations sign-off on inventory buffers before ad budget unlock.',
  },
  {
    id: 'fin-all',
    title: 'Finance vs. All: Siloed Austerity & Friction Costs',
    primaryDepartments: ['Finance', 'Operations'],
    annualLossUSD: 550_000,
    symptom: 'Finance enforced blanket departmental budget freezes, inadvertently driving up decentralized shadow spending.',
    hiddenSiloDriver:
      'Departmental budgets were managed in spreadsheets with 45-day reporting lag; cost cuts were applied uniformly across high-ROI and low-ROI functions.',
    systemicImpact:
      'Freezing permanent engineering and ops hiring caused departments to purchase expensive software licenses and spot-contractors on corporate p-cards.',
    metrics: [
      { label: 'Shadow Contractor Premium', value: '$550k', benchmark: '$0', status: 'warning' },
      { label: 'Budget Cycle Lag', value: '45 Days', benchmark: '< 7 Days', status: 'warning' },
      { label: 'Cross-Functional Friction Index', value: '58 / 100', benchmark: '< 20', status: 'warning' },
      { label: 'Uncoordinated Tool Duplication', value: '$240k', benchmark: '< $50k', status: 'neutral' },
    ],
    rootCauseChain: [
      'Finance saw Q2 margin softening and froze all full-time headcount requisitions.',
      'Operations could not hire 18 needed shift supervisors.',
      'Department leads leveraged discretionary project funds to hire external consultants at 2.4x the cost.',
      'Result: higher operational expenses with zero institutional knowledge retention.',
    ],
    recommendedSla:
      'Shift from rigid annual department budgeting to dynamic rolling cross-functional capacity allocation based on unit economics.',
  },
];

export function calculateSimulation(
  params: SimulationParams,
  currentQuarterData: QuarterData = QUARTERLY_DATA.Q3
): SimulationResults {
  const {
    turnoverReductionPct,
    marketingCapacityAlignmentPct,
    overtimeSpendOptimizationPct,
    inventoryBufferRatePct,
  } = params;

  // Base Q3 values
  const baseOvertime = currentQuarterData.financial.overtimeExpense; // $2,100,000
  const baseContractor = currentQuarterData.financial.contractorBackfillExpense; // $1,640,000
  const baseFreight = currentQuarterData.financial.expeditedFreightExpense; // $1,120,000
  const baseCAC = currentQuarterData.financial.cac; // $480
  const baseLTV = currentQuarterData.financial.ltv; // $890
  const baseNetMargin = currentQuarterData.financial.netMargin; // 5.8%

  // Savings calculations
  // 1. HR turnover reduction saves contractor backfill and stabilizes team
  const contractorSavings = (baseContractor * (turnoverReductionPct / 100)) * 0.85;

  // 2. Overtime optimization saves direct overtime costs
  const overtimeSavings = baseOvertime * (overtimeSpendOptimizationPct / 100);

  // 3. Marketing capacity alignment lowers wasteful ad spend on low-LTV cohorts and saves expedited freight
  const adSpendSavings = (1_450_000 / 4) * (marketingCapacityAlignmentPct / 100);
  const freightBufferSavings =
    (baseFreight * 0.7) * Math.min(1, Math.max(0, (inventoryBufferRatePct - 60) / 35));

  const totalQuarterlySavings =
    contractorSavings + overtimeSavings + adSpendSavings + freightBufferSavings;
  const annualLeakageRecovered = totalQuarterlySavings * 4;

  // Margin impact
  const revenue = currentQuarterData.financial.revenue;
  const marginDelta = (totalQuarterlySavings / revenue) * 100;
  const projectedNetMargin = Math.min(22.0, baseNetMargin + marginDelta);

  // LTV / CAC improvement
  const simulatedCac = Math.max(
    220,
    baseCAC * (1 - (marketingCapacityAlignmentPct / 100) * 0.42)
  );
  const simulatedLtv = Math.min(
    1450,
    baseLTV * (1 + (inventoryBufferRatePct - 60) * 0.015 + (turnoverReductionPct / 100) * 0.15)
  );
  const projectedLtvCacRatio = Number((simulatedLtv / simulatedCac).toFixed(2));

  // Synergy score calculation (base 42)
  const projectedSynergyScore = Math.min(
    92,
    Math.round(
      42 +
        (turnoverReductionPct * 0.22) +
        (marketingCapacityAlignmentPct * 0.25) +
        (overtimeSpendOptimizationPct * 0.15) +
        ((inventoryBufferRatePct - 60) * 0.3)
    )
  );

  return {
    projectedNetMargin: Number(projectedNetMargin.toFixed(1)),
    marginDelta: Number(marginDelta.toFixed(1)),
    annualLeakageRecovered: Math.round(annualLeakageRecovered),
    projectedLtvCacRatio,
    projectedOvertimeSaved: Math.round(overtimeSavings * 4),
    projectedSynergyScore,
  };
}

export const PRESET_QUERIES = [
  {
    id: 'query-1',
    label: 'The Silo Paradox',
    text: 'Why are all individual departments reporting green while company profitability has fallen for 3 consecutive quarters?',
  },
  {
    id: 'query-2',
    label: 'HR & Ops Hidden Flywheel',
    text: 'What is the exact financial and operational mechanism linking HR turnover to the Operations overtime explosion?',
  },
  {
    id: 'query-3',
    label: 'Simulate CAC & Fulfillment',
    text: 'Simulate a 15% reduction in CAC with current operational fulfillment limits and show impact on Net Margin.',
  },
  {
    id: 'query-4',
    label: 'Board Executive Report',
    text: 'Generate an executive root-cause briefing and 90-day remediation roadmap for the Board of Directors.',
  },
];
