'use client';

import React from 'react';
import {
  Activity,
  AlertTriangle,
  Bot,
  ChevronDown,
  Download,
  Layers,
  Sparkles,
  TrendingDown,
} from 'lucide-react';
import { QuarterId } from '@/types';

interface NavbarProps {
  selectedQuarter: QuarterId;
  onSelectQuarter: (q: QuarterId) => void;
  onOpenAiDrawer: () => void;
  onOpenDossier: () => void;
  simulationActive: boolean;
  simulatedMarginDelta: number;
}

export function Navbar({
  selectedQuarter,
  onSelectQuarter,
  onOpenAiDrawer,
  onOpenDossier,
  simulationActive,
  simulatedMarginDelta,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand & Case Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0B0F17]">
                <Layers className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white">
                  Synapse<span className="text-cyan-400">IQ</span>
                </span>
                <span className="rounded-md border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                  Enterprise AI
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Cross-Functional Profitability Intelligence
              </p>
            </div>
          </div>

          <div className="hidden h-6 w-px bg-slate-800 md:block" />

          {/* Investigation Case Tag */}
          <div className="hidden items-center space-x-2 rounded-lg border border-red-500/30 bg-red-950/20 px-3 py-1.5 md:flex">
            <TrendingDown className="h-4 w-4 animate-pulse text-red-400" />
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-red-300">
                Case #INV-2026-Q3
              </span>
              <span className="text-[10px] text-red-400/80">
                Profitability Decline (3-Quarter Divergence)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls & AI Drawer Button */}
        <div className="flex items-center space-x-3">
          {/* Simulation status pill */}
          {simulationActive && (
            <div className="hidden sm:flex items-center space-x-1.5 rounded-full border border-purple-500/40 bg-purple-950/40 px-3 py-1 text-xs font-medium text-purple-300 shadow-sm shadow-purple-500/20 animate-pulse-subtle">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span>Simulated: +{simulatedMarginDelta}% Net Margin</span>
            </div>
          )}

          {/* Quarter Selector */}
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/80 p-0.5">
            {(['ALL', 'Q1', 'Q2', 'Q3'] as QuarterId[]).map((q) => (
              <button
                key={q}
                onClick={() => onSelectQuarter(q)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  selectedQuarter === q
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Export Board Dossier Modal Trigger */}
          <button
            onClick={onOpenDossier}
            className="hidden sm:flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-700/80"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>Board Dossier</span>
          </button>

          {/* AI Cross-Functional Analyst Drawer Button */}
          <button
            onClick={onOpenAiDrawer}
            className="group relative flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 px-3.5 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-[0.98]"
          >
            <div className="relative">
              <Bot className="h-4 w-4 text-slate-950" />
              <span className="absolute -right-1 -top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-950 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
              </span>
            </div>
            <span className="font-bold">AI Analyst</span>
            <span className="hidden rounded bg-slate-950/20 px-1 py-0.2 text-[10px] font-mono lg:inline">
              ⌘K
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
