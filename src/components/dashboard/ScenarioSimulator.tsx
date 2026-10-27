'use client';

import React from 'react';
import {
  ArrowUpRight,
  Bot,
  Check,
  Percent,
  RotateCcw,
  Sliders,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuarterData, SimulationParams, SimulationResults } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface ScenarioSimulatorProps {
  currentData: QuarterData;
  params: SimulationParams;
  onChangeParams: (params: SimulationParams) => void;
  results: SimulationResults;
  onApplyPlanToAi: () => void;
}

export function ScenarioSimulator({
  currentData,
  params,
  onChangeParams,
  results,
  onApplyPlanToAi,
}: ScenarioSimulatorProps) {
  const baseMargin = currentData.financial.netMargin; // 5.8%

  const handleSliderChange = (key: keyof SimulationParams, value: number) => {
    onChangeParams({
      ...params,
      [key]: value,
    });
  };

  const applyPreset = (preset: 'balanced' | 'hr-heavy' | 'marketing-sync' | 'reset') => {
    if (preset === 'balanced') {
      onChangeParams({
        turnoverReductionPct: 55,
        marketingCapacityAlignmentPct: 75,
        overtimeSpendOptimizationPct: 45,
        inventoryBufferRatePct: 88,
      });
    } else if (preset === 'hr-heavy') {
      onChangeParams({
        turnoverReductionPct: 65,
        marketingCapacityAlignmentPct: 40,
        overtimeSpendOptimizationPct: 55,
        inventoryBufferRatePct: 75,
      });
    } else if (preset === 'marketing-sync') {
      onChangeParams({
        turnoverReductionPct: 30,
        marketingCapacityAlignmentPct: 90,
        overtimeSpendOptimizationPct: 30,
        inventoryBufferRatePct: 92,
      });
    } else {
      onChangeParams({
        turnoverReductionPct: 0,
        marketingCapacityAlignmentPct: 0,
        overtimeSpendOptimizationPct: 0,
        inventoryBufferRatePct: 65,
      });
    }
  };

  const handleApplyStrategy = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F2FE', '#7000FF', '#10B981'],
    });
    onApplyPlanToAi();
  };

  const isSimulated =
    params.turnoverReductionPct > 0 ||
    params.marketingCapacityAlignmentPct > 0 ||
    params.overtimeSpendOptimizationPct > 0 ||
    params.inventoryBufferRatePct > 65;

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0E1420]/80 p-5 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="h-5 w-5 text-cyan-400" />
            <h2 className="text-base font-bold tracking-tight text-white sm:text-lg">
              Dynamic Cross-Functional Stress-Testing & Recovery Simulator
            </h2>
            <span className="rounded-full bg-purple-950/70 px-2 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/30">
              Real-Time Sensitivity Engine
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Adjust cross-functional policy levers to observe instantaneous recalculation of Net Profit Margin recovery and cost salvage.
          </p>
        </div>

        {/* Quick Scenario Preset Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => applyPreset('balanced')}
            className="rounded-lg border border-cyan-500/30 bg-cyan-950/50 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/60"
          >
            Optimal Synergy (+9.0%)
          </button>
          <button
            onClick={() => applyPreset('hr-heavy')}
            className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700"
          >
            HR Retention Focus
          </button>
          <button
            onClick={() => applyPreset('marketing-sync')}
            className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700"
          >
            Marketing Capacity Sync
          </button>
          <button
            onClick={() => applyPreset('reset')}
            className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-xs font-medium text-slate-400 hover:text-white"
            title="Reset to Q3 Baseline"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Interactive Policy Sliders (7 cols) */}
        <div className="space-y-5 rounded-xl border border-slate-800/80 bg-slate-950/50 p-5 lg:col-span-7">
          {/* Slider 1: HR Turnover Reduction */}
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">
                1. Reduce HR Staff Turnover
              </span>
              <span className="font-mono font-bold text-cyan-400">
                -{params.turnoverReductionPct}%
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Lowers reliance on $85/hr emergency staffing agencies and restores shift continuity.
            </p>
            <input
              type="range"
              min={0}
              max={70}
              step={5}
              value={params.turnoverReductionPct}
              onChange={(e) =>
                handleSliderChange('turnoverReductionPct', Number(e.target.value))
              }
              className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-400"
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Q3 Status: 24.8% turn)</span>
              <span>-35%</span>
              <span>-70% (Target: ~7.5% turn)</span>
            </div>
          </div>

          {/* Slider 2: Marketing-Ops Capacity Alignment */}
          <div className="border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">
                2. Marketing Ad Alignment to Warehouse Capacity
              </span>
              <span className="font-mono font-bold text-cyan-400">
                {params.marketingCapacityAlignmentPct}% Sync
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Caps promotion spend on out-of-stock SKUs; redirects budget to high-retention customer segments.
            </p>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={params.marketingCapacityAlignmentPct}
              onChange={(e) =>
                handleSliderChange(
                  'marketingCapacityAlignmentPct',
                  Number(e.target.value)
                )
              }
              className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-400"
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% (Siloed targeting)</span>
              <span>50%</span>
              <span>100% (Real-Time API Sync)</span>
            </div>
          </div>

          {/* Slider 3: Overtime Spend Optimization */}
          <div className="border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">
                3. Operations Overtime Spend Optimization
              </span>
              <span className="font-mono font-bold text-cyan-400">
                -{params.overtimeSpendOptimizationPct}%
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Shift scheduling optimization and fatigue capping across fulfillment centers.
            </p>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={params.overtimeSpendOptimizationPct}
              onChange={(e) =>
                handleSliderChange(
                  'overtimeSpendOptimizationPct',
                  Number(e.target.value)
                )
              }
              className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-400"
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% ($2.1M run-rate)</span>
              <span>-30%</span>
              <span>-60% ($840k run-rate)</span>
            </div>
          </div>

          {/* Slider 4: Fulfillment Safety Buffer Rate */}
          <div className="border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">
                4. Warehouse Inventory Safety Buffer
              </span>
              <span className="font-mono font-bold text-cyan-400">
                {params.inventoryBufferRatePct}% Buffer
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Maintains critical inventory buffers to eliminate emergency priority air freight surcharges.
            </p>
            <input
              type="range"
              min={60}
              max={95}
              step={5}
              value={params.inventoryBufferRatePct}
              onChange={(e) =>
                handleSliderChange('inventoryBufferRatePct', Number(e.target.value))
              }
              className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-400"
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono">
              <span>60% (High stockouts)</span>
              <span>75%</span>
              <span>95% (Near-Zero Expedited Air)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Recalculated Impact Board (5 cols) */}
        <div className="flex flex-col justify-between rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 via-slate-900 to-slate-950 p-5 lg:col-span-5 shadow-lg">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Projected Impact Summary
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                  isSimulated
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isSimulated ? 'Active Simulation' : 'Q3 Baseline'}
              </span>
            </div>

            {/* Projected Net Profit Margin Hero Box */}
            <div className="mt-4 rounded-xl border border-purple-500/30 bg-purple-950/40 p-4">
              <span className="text-xs text-purple-200 font-medium">
                Simulated Net Profit Margin
              </span>
              <div className="mt-1 flex items-baseline space-x-3">
                <span className="text-4xl font-extrabold tracking-tight text-white">
                  {formatPercent(results.projectedNetMargin)}
                </span>
                <span className="inline-flex items-center text-sm font-bold text-emerald-400">
                  <ArrowUpRight className="h-4 w-4" />
                  +{results.marginDelta}% recovery
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-300">
                Rebounds from 5.8% towards historical baseline of 20.0%.
              </p>
            </div>

            {/* Secondary Metrics Grid */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <span className="text-[11px] text-slate-400">
                  Annual Capital Saved
                </span>
                <p className="mt-1 text-base font-extrabold text-emerald-400">
                  +{formatCurrency(results.annualLeakageRecovered, true)}
                </p>
                <span className="text-[10px] text-slate-500">
                  from $4.86M total leakage
                </span>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <span className="text-[11px] text-slate-400">
                  Projected LTV / CAC
                </span>
                <p className="mt-1 text-base font-extrabold text-cyan-400">
                  {results.projectedLtvCacRatio}x
                </p>
                <span className="text-[10px] text-slate-500">
                  vs 1.85x in Q3 crisis
                </span>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <span className="text-[11px] text-slate-400">
                  Overtime Spend Saved
                </span>
                <p className="mt-1 text-base font-extrabold text-amber-400">
                  {formatCurrency(results.projectedOvertimeSaved, true)}
                </p>
                <span className="text-[10px] text-slate-500">annualized run-rate</span>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <span className="text-[11px] text-slate-400">
                  Synergy Friction Score
                </span>
                <p className="mt-1 text-base font-extrabold text-purple-400">
                  {results.projectedSynergyScore} / 100
                </p>
                <span className="text-[10px] text-slate-500">
                  up from 42 / 100 danger
                </span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-5 pt-3 border-t border-slate-800">
            <button
              onClick={handleApplyStrategy}
              disabled={!isSimulated}
              className={`flex w-full items-center justify-center space-x-2 rounded-xl py-3 text-xs font-bold transition-all shadow-lg ${
                isSimulated
                  ? 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-slate-950 hover:brightness-110 shadow-cyan-500/20 active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Apply Optimized Scenario to Strategy & AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
