'use client';

import React, { useState } from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3, HelpCircle, Layers, TrendingDown, TrendingUp } from 'lucide-react';
import { TREND_CHART_DATA } from '@/data/mockData';
import { formatCurrency, formatPercent } from '@/lib/utils';

export function QuarterlyTrendChart() {
  const [activeMetricView, setActiveMetricView] = useState<'paradox' | 'unitEconomics' | 'costLeakage'>('paradox');

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0E1420]/80 p-5 shadow-xl backdrop-blur-md">
      {/* Top Header & Toggle controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            <h2 className="text-base font-bold tracking-tight text-white sm:text-lg">
              Quarterly Paradox: Siloed Green vs. Corporate Red
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Dual-axis comparison illustrating the 3-quarter divergence between self-reported departmental success and actual net margin collapse.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900/90 p-1">
          <button
            onClick={() => setActiveMetricView('paradox')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              activeMetricView === 'paradox'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            The Paradox (Health vs. Profit)
          </button>
          <button
            onClick={() => setActiveMetricView('unitEconomics')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              activeMetricView === 'unitEconomics'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CAC vs. LTV Collapse
          </button>
          <button
            onClick={() => setActiveMetricView('costLeakage')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              activeMetricView === 'costLeakage'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overtime & Waste Surge
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="mt-6 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {activeMetricView === 'paradox' ? (
            <ComposedChart data={TREND_CHART_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="leakageBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7000FF" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#7000FF" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="period" stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              {/* Left Axis: Percentages */}
              <YAxis
                yAxisId="left"
                stroke="#64748B"
                domain={[0, 100]}
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickFormatter={(val) => `${val}%`}
              />
              {/* Right Axis: Dollar Leakage Millions */}
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#A855F7"
                domain={[0, 6]}
                tick={{ fill: '#C084FC', fontSize: 11 }}
                tickFormatter={(val) => `$${val}M`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const health = payload.find((p) => p.dataKey === 'reportedHealth')?.value as number;
                    const margin = payload.find((p) => p.dataKey === 'actualMargin')?.value as number;
                    const leakage = payload.find((p) => p.dataKey === 'leakageCost')?.value as number;
                    const gap = (health - margin).toFixed(1);

                    return (
                      <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="font-bold text-white text-sm">{label} Deep-Dive</span>
                          <span className="rounded bg-red-950 px-1.5 py-0.5 text-[10px] font-mono text-red-400 border border-red-500/20">
                            Silo Gap: Δ {gap}%
                          </span>
                        </div>
                        <div className="mt-2.5 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between space-x-4">
                            <span className="text-emerald-400 flex items-center space-x-1">
                              <span className="h-2 w-2 rounded-full bg-emerald-400" />
                              <span>Reported Silo Health:</span>
                            </span>
                            <span className="font-bold text-white">{health}%</span>
                          </div>
                          <div className="flex items-center justify-between space-x-4">
                            <span className="text-red-400 flex items-center space-x-1">
                              <span className="h-2 w-2 rounded-full bg-red-400" />
                              <span>Actual Net Margin:</span>
                            </span>
                            <span className="font-bold text-white">{margin}%</span>
                          </div>
                          <div className="flex items-center justify-between space-x-4">
                            <span className="text-purple-400 flex items-center space-x-1">
                              <span className="h-2 w-2 rounded-full bg-purple-400" />
                              <span>Quarterly Waste Leak:</span>
                            </span>
                            <span className="font-bold text-white">${leakage}M</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
              />
              <Bar
                yAxisId="right"
                dataKey="leakageCost"
                name="Cross-Dept Waste ($M)"
                fill="url(#leakageBarGrad)"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="reportedHealth"
                name="Avg Silo Self-Reported Health (%)"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 5, fill: '#10B981', strokeWidth: 2, stroke: '#064E3B' }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="actualMargin"
                name="Actual Net Profit Margin (%)"
                stroke="#EF4444"
                strokeWidth={3}
                fill="url(#profitGrad)"
                dot={{ r: 5, fill: '#EF4444', strokeWidth: 2, stroke: '#7F1D1D' }}
              />
            </ComposedChart>
          ) : activeMetricView === 'unitEconomics' ? (
            <ComposedChart data={TREND_CHART_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="period" stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <YAxis
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const cac = payload.find((p) => p.dataKey === 'cac')?.value as number;
                    const ltv = label === 'Q1' ? 1420 : label === 'Q2' ? 1180 : 890;
                    const ratio = (ltv / cac).toFixed(2);
                    return (
                      <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3.5 shadow-2xl">
                        <span className="font-bold text-white text-sm">{label} Unit Economics</span>
                        <div className="mt-2 space-y-1 text-xs">
                          <p className="text-cyan-400">Blended CAC: ${cac}</p>
                          <p className="text-emerald-400">Estimated LTV: ${ltv}</p>
                          <p className="text-amber-400 font-semibold">LTV/CAC: {ratio}x (Q1 was 5.92x)</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }} />
              <Bar dataKey="cac" name="CAC ($)" fill="#00F2FE" radius={[4, 4, 0, 0]} barSize={28} />
              <Line
                type="monotone"
                dataKey="cac"
                name="CAC Trajectory ($)"
                stroke="#38BDF8"
                strokeWidth={2}
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={TREND_CHART_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="period" stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 12 }} />
              <YAxis
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                tickFormatter={(val) => `${val} hrs`}
              />
              <Tooltip />
              <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }} />
              <Bar
                dataKey="overtimeHours"
                name="Ops Overtime Hours Logged"
                fill="#F97316"
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Narrative Milestone Footers */}
      <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-800/80 pt-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">Q1: Nominal Stability</span>
            <span className="rounded bg-emerald-950/80 px-1.5 py-0.2 text-[10px] text-emerald-300">
              20.0% Net
            </span>
          </div>
          <p className="mt-1.5 text-slate-400">
            Departments operating near synergy. Turnover low (11.2%), CAC healthy ($240), normal fulfillment latency (1.8 days).
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">Q2: First Frictions</span>
            <span className="rounded bg-amber-950/80 px-1.5 py-0.2 text-[10px] text-amber-300">
              12.5% Net
            </span>
          </div>
          <p className="mt-1.5 text-slate-400">
            HR turnover spikes to 18.5%. Operations absorbs burden with 7,400 overtime hours. Marketing pushes low-retention promos.
          </p>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-red-300">Q3: Cascading Failure</span>
            <span className="rounded bg-red-950 px-1.5 py-0.2 text-[10px] text-red-400 border border-red-500/30">
              5.8% Net
            </span>
          </div>
          <p className="mt-1.5 text-slate-300">
            Fulfillment latency hits 6.4 days. Promo stockouts jump to 31.4%. Emergency air freight ($1.12M) and contractors ($1.64M) wipe out profits.
          </p>
        </div>
      </div>
    </div>
  );
}
