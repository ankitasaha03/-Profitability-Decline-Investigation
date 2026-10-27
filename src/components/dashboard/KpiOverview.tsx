'use client';

import React from 'react';
import {
  AlertOctagon,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  Layers,
  Percent,
  Sparkles,
  TrendingDown,
  Users,
} from 'lucide-react';
import { QuarterData, SimulationResults } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface KpiOverviewProps {
  currentData: QuarterData;
  simulationResults?: SimulationResults;
  simulationActive: boolean;
  onExploreLeakage?: () => void;
  onExploreCausality?: () => void;
}

export function KpiOverview({
  currentData,
  simulationResults,
  simulationActive,
  onExploreLeakage,
  onExploreCausality,
}: KpiOverviewProps) {
  const { financial, siloAverageHealth, crossFunctionalSynergyScore, totalIdentifiedLeakage } =
    currentData;

  const displayNetMargin = simulationActive && simulationResults
    ? simulationResults.projectedNetMargin
    : financial.netMargin;

  const displaySynergy = simulationActive && simulationResults
    ? simulationResults.projectedSynergyScore
    : crossFunctionalSynergyScore;

  const displayLeakage = simulationActive && simulationResults
    ? Math.max(0, totalIdentifiedLeakage - (simulationResults.annualLeakageRecovered / 4))
    : totalIdentifiedLeakage;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Net Profit Margin */}
      <div className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 shadow-lg backdrop-blur-md transition-all hover:border-red-500/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Net Profit Margin
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
            <TrendingDown className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold tracking-tight text-white">
            {formatPercent(displayNetMargin)}
          </span>
          {simulationActive && simulationResults ? (
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
              <ArrowUpRight className="h-3.5 w-3.5" />
              +{simulationResults.marginDelta}% sim
            </span>
          ) : (
            <span className="inline-flex items-center text-xs font-semibold text-red-400">
              <ArrowDownRight className="h-3.5 w-3.5" />
              -14.2% YoY
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Q1: 20.0% → Q3: 5.8%</span>
          <span className="rounded bg-red-950/70 px-2 py-0.5 text-[11px] font-medium text-red-300 border border-red-500/20">
            3-Qtr Fall
          </span>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-400 transition-all duration-700"
            style={{ width: `${Math.min(100, (displayNetMargin / 22) * 100)}%` }}
          />
        </div>
      </div>

      {/* 2. Departmental Satisfaction Avg ("The Silo Illusion") */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 shadow-lg backdrop-blur-md transition-all hover:border-amber-500/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Dept. Silo Health
            </span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold tracking-tight text-white">
            {siloAverageHealth.toFixed(1)}%
          </span>
          <span className="rounded-md border border-amber-500/40 bg-amber-950/60 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-300">
            Silo Illusion
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400 line-clamp-1">
          Marketing (92%), HR (87%), Ops (86%) all report green
        </p>

        <div className="mt-3 flex items-center justify-between text-[11px] text-amber-400/90 font-medium">
          <span>False positive disconnect</span>
          <span className="text-xs text-slate-500 font-mono">Δ 82.7pt vs Net</span>
        </div>
      </div>

      {/* 3. Cross-Functional Synergy Score */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 shadow-lg backdrop-blur-md transition-all hover:border-purple-500/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Synergy & Friction Score
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <Layers className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold tracking-tight text-white">
            {displaySynergy}
            <span className="text-sm font-normal text-slate-400">/100</span>
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[11px] font-bold uppercase ${
              displaySynergy < 50
                ? 'border border-red-500/40 bg-red-950/60 text-red-400'
                : 'border border-purple-500/40 bg-purple-950/60 text-purple-300'
            }`}
          >
            {displaySynergy < 50 ? 'Critical Danger' : 'Stabilizing'}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Severe cross-dept drag</span>
          <button
            onClick={onExploreCausality}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            Inspect Matrix →
          </button>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-cyan-400 transition-all duration-700"
            style={{ width: `${displaySynergy}%` }}
          />
        </div>
      </div>

      {/* 4. Uncovered Annual Leakage */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-5 shadow-lg backdrop-blur-md transition-all hover:border-cyan-500/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Uncovered Annual Leakage
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            <DollarSign className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold tracking-tight text-white">
            {formatCurrency(simulationActive && simulationResults ? displayLeakage * 4 : 4_860_000, true)}
          </span>
          {simulationActive && simulationResults ? (
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
              <Sparkles className="h-3.5 w-3.5 mr-0.5" />
              -{formatCurrency(simulationResults.annualLeakageRecovered, true)} saved
            </span>
          ) : (
            <span className="text-xs font-semibold text-amber-400">Identified</span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>4 Cross-Dept Leaks</span>
          <button
            onClick={onExploreLeakage}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-medium"
          >
            View Breakdown →
          </button>
        </div>

        <div className="mt-3 flex space-x-1 text-[10px]">
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
            HR-Ops: $1.68M
          </span>
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
            Mkt-Fin: $1.45M
          </span>
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
            Ops-Mkt: $1.14M
          </span>
        </div>
      </div>
    </div>
  );
}
