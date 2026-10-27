'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Sliders,
  TrendingDown,
  Users2,
  Zap,
} from 'lucide-react';
import { INTER_DEPARTMENT_LEAKAGES } from '@/data/mockData';
import { InterDepartmentLeakage } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface LeakageBreakdownProps {
  onSimulateLeakageFix: (leakageId: string) => void;
  onAskAiAboutLeakage: (leakage: InterDepartmentLeakage) => void;
}

export function LeakageBreakdown({
  onSimulateLeakageFix,
  onAskAiAboutLeakage,
}: LeakageBreakdownProps) {
  const [activeTabId, setActiveTabId] = useState<string>('hr-ops');

  const currentLeakage =
    INTER_DEPARTMENT_LEAKAGES.find((l) => l.id === activeTabId) ||
    INTER_DEPARTMENT_LEAKAGES[0];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0E1420]/80 p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-rose-400" />
            <h2 className="text-base font-bold tracking-tight text-white sm:text-lg">
              Inter-Departmental Leakage Breakdown
            </h2>
            <span className="rounded-full bg-rose-950/70 px-2 py-0.5 text-[10px] font-semibold text-rose-300 border border-rose-500/30">
              Total Uncovered: $4.86M / yr
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Inspect the hidden toxic feedback loops where conflicting departmental incentives drain enterprise profitability.
          </p>
        </div>
      </div>

      {/* Department Conflict Tabs */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {INTER_DEPARTMENT_LEAKAGES.map((leakage) => {
          const isActive = leakage.id === activeTabId;
          return (
            <button
              key={leakage.id}
              onClick={() => setActiveTabId(leakage.id)}
              className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                isActive
                  ? 'border-cyan-500/60 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 shadow-lg shadow-cyan-500/10'
                  : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">
                  {leakage.primaryDepartments[0]} ⇄ {leakage.primaryDepartments[1]}
                </span>
                <span
                  className={`text-xs font-extrabold ${
                    isActive ? 'text-cyan-400' : 'text-slate-300'
                  }`}
                >
                  {formatCurrency(leakage.annualLossUSD, true)}
                </span>
              </div>
              <p
                className={`mt-1 text-xs font-semibold line-clamp-1 ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {leakage.id === 'mkt-fin' && 'Marketing vs. Finance'}
                {leakage.id === 'hr-ops' && 'HR vs. Operations'}
                {leakage.id === 'ops-mkt' && 'Ops vs. Marketing'}
                {leakage.id === 'fin-all' && 'Finance vs. All'}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Tab Deep-Dive Content */}
      <div className="mt-5 rounded-xl border border-slate-800/90 bg-slate-950/60 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="rounded-md border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 text-[11px] font-bold text-cyan-300">
                {currentLeakage.primaryDepartments[0]} ⇄ {currentLeakage.primaryDepartments[1]}
              </span>
              <h3 className="text-base font-bold text-white">
                {currentLeakage.title}
              </h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              <strong className="text-white">The Visible Symptom: </strong>
              {currentLeakage.symptom}
            </p>
          </div>

          <div className="flex shrink-0 items-center space-x-2">
            <button
              onClick={() => onAskAiAboutLeakage(currentLeakage)}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              <Bot className="h-3.5 w-3.5 text-cyan-400" />
              <span>Ask AI Analysis</span>
            </button>
            <button
              onClick={() => onSimulateLeakageFix(currentLeakage.id)}
              className="flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:brightness-110 shadow-sm"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Simulate Fix</span>
            </button>
          </div>
        </div>

        {/* 4 Key Metric Cards for this Conflict */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {currentLeakage.metrics.map((m, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
            >
              <span className="text-[11px] text-slate-400 font-medium">
                {m.label}
              </span>
              <div className="mt-1 flex items-baseline space-x-2">
                <span
                  className={`text-lg font-extrabold ${
                    m.status === 'danger'
                      ? 'text-rose-400'
                      : m.status === 'warning'
                      ? 'text-amber-400'
                      : 'text-slate-200'
                  }`}
                >
                  {m.value}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">
                Target: {m.benchmark}
              </span>
            </div>
          ))}
        </div>

        {/* 2-Column Split: Root Cause Chain vs Recommended Cross-Functional SLA */}
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Left: Root Cause Sequence */}
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Compounding Root Cause Chain</span>
            </span>
            <div className="mt-3 space-y-2.5">
              {currentLeakage.rootCauseChain.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-950/80 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                    {idx + 1}
                  </div>
                  <p className="text-slate-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Cross-Functional SLA Governance Recommendation */}
          <div className="flex flex-col justify-between rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 to-slate-900/40 p-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Recommended Cross-Functional SLA Fix</span>
              </span>
              <div className="mt-3 rounded-lg border border-cyan-500/30 bg-cyan-950/40 p-3.5">
                <p className="text-xs leading-relaxed text-cyan-100 font-medium">
                  {currentLeakage.recommendedSla}
                </p>
              </div>

              <div className="mt-3 text-[11px] text-slate-400">
                <strong className="text-slate-300">Underlying Silo Blocker: </strong>
                {currentLeakage.hiddenSiloDriver}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
              <span className="text-emerald-400 font-semibold">
                Recoverable Margin: +{formatCurrency(currentLeakage.annualLossUSD, true)} / yr
              </span>
              <button
                onClick={() => onSimulateLeakageFix(currentLeakage.id)}
                className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>Apply in Simulator</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
