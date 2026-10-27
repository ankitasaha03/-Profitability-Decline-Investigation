'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  BarChart3,
  Bot,
  BrainCircuit,
  Calendar,
  ChevronRight,
  Download,
  Flame,
  Layers,
  Network,
  RotateCcw,
  Sliders,
  Sparkles,
  TrendingDown,
  Zap,
} from 'lucide-react';

import { CausalityNode, InterDepartmentLeakage, QuarterId, SimulationParams } from '@/types';
import { QUARTERLY_DATA, calculateSimulation } from '@/data/mockData';
import { Navbar } from '@/components/layout/Navbar';
import { KpiOverview } from '@/components/dashboard/KpiOverview';
import { CausalityMatrix } from '@/components/dashboard/CausalityMatrix';
import { QuarterlyTrendChart } from '@/components/dashboard/QuarterlyTrendChart';
import { LeakageBreakdown } from '@/components/dashboard/LeakageBreakdown';
import { ScenarioSimulator } from '@/components/dashboard/ScenarioSimulator';
import { AiAnalystDrawer } from '@/components/chatbot/AiAnalystDrawer';
import { ExecutiveDossierModal } from '@/components/dashboard/ExecutiveDossierModal';

export default function Home() {
  const [selectedQuarter, setSelectedQuarter] = useState<QuarterId>('Q3');
  const [activeMainTab, setActiveMainTab] = useState<'overview' | 'matrix' | 'leakages' | 'simulator'>('overview');

  // Simulator Parameters State
  const [simulationParams, setSimulationParams] = useState<SimulationParams>({
    turnoverReductionPct: 0,
    marketingCapacityAlignmentPct: 0,
    overtimeSpendOptimizationPct: 0,
    inventoryBufferRatePct: 65,
  });

  // Modal / Drawer States
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Active Quarter dataset
  const currentQuarterData = useMemo(() => {
    if (selectedQuarter === 'ALL' || selectedQuarter === 'Q3') {
      return QUARTERLY_DATA.Q3;
    }
    return QUARTERLY_DATA[selectedQuarter];
  }, [selectedQuarter]);

  // Dynamic simulation calculation
  const simulationResults = useMemo(() => {
    return calculateSimulation(simulationParams, currentQuarterData);
  }, [simulationParams, currentQuarterData]);

  const simulationActive =
    simulationParams.turnoverReductionPct > 0 ||
    simulationParams.marketingCapacityAlignmentPct > 0 ||
    simulationParams.overtimeSpendOptimizationPct > 0 ||
    simulationParams.inventoryBufferRatePct > 65;

  // Listen for Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsAiDrawerOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAskAiAboutNode = (node: CausalityNode) => {
    setAiInitialQuery(
      `Analyze the systemic root cause and cross-functional externalities of "${node.title}" (${node.department} department), which causes $${(node.dollarLeakage / 1_000_000).toFixed(2)}M in leakage.`
    );
    setIsAiDrawerOpen(true);
  };

  const handleAskAiAboutLeakage = (leakage: InterDepartmentLeakage) => {
    setAiInitialQuery(
      `Diagnose the conflict between ${leakage.primaryDepartments[0]} and ${leakage.primaryDepartments[1]}: "${leakage.title}", generating ${leakage.symptom}`
    );
    setIsAiDrawerOpen(true);
  };

  const handleSimulateLeakageFix = (leakageId: string) => {
    if (leakageId === 'mkt-fin') {
      setSimulationParams((prev) => ({
        ...prev,
        marketingCapacityAlignmentPct: 80,
      }));
    } else if (leakageId === 'hr-ops') {
      setSimulationParams((prev) => ({
        ...prev,
        turnoverReductionPct: 60,
        overtimeSpendOptimizationPct: 50,
      }));
    } else if (leakageId === 'ops-mkt') {
      setSimulationParams((prev) => ({
        ...prev,
        inventoryBufferRatePct: 90,
        marketingCapacityAlignmentPct: 70,
      }));
    } else {
      setSimulationParams((prev) => ({
        ...prev,
        overtimeSpendOptimizationPct: 40,
        turnoverReductionPct: 40,
      }));
    }
    setActiveMainTab('simulator');
  };

  const handleApplySimulationPreset = (paramsToUpdate: Partial<SimulationParams>) => {
    setSimulationParams((prev) => ({
      ...prev,
      ...paramsToUpdate,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Executive Header */}
      <Navbar
        selectedQuarter={selectedQuarter}
        onSelectQuarter={setSelectedQuarter}
        onOpenAiDrawer={() => {
          setAiInitialQuery(null);
          setIsAiDrawerOpen(true);
        }}
        onOpenDossier={() => setIsDossierOpen(true)}
        simulationActive={simulationActive}
        simulatedMarginDelta={simulationResults.marginDelta}
      />

      {/* Main App Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Executive Banner Callout */}
        <div className="relative overflow-hidden rounded-2xl border border-red-500/25 bg-gradient-to-r from-red-950/40 via-slate-900 to-indigo-950/30 p-4 sm:p-5 shadow-xl backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start space-x-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                <AlertOctagon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    Executive Diagnostic Alert
                  </span>
                  <span className="rounded bg-red-950/80 px-2 py-0.2 text-[10px] font-mono text-red-300 border border-red-500/30">
                    Q1–Q3 Profitability Divergence
                  </span>
                </div>
                <h1 className="mt-1 text-sm sm:text-base font-bold text-white">
                  3 Consecutive Quarters of Profit Decline Despite Siloed Departmental Green Status
                </h1>
                <p className="mt-1 text-xs text-slate-300 max-w-3xl">
                  Enterprise profit margin collapsed from <strong className="text-emerald-400">20.0%</strong> in Q1 down to <strong className="text-red-400">5.8%</strong> in Q3 (-14.2% YoY). Cross-functional telemetry reveals <strong className="text-cyan-300">$4.86M in uncoordinated operational waste</strong> across Marketing, HR, Operations, and Finance.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center space-x-2">
              <button
                onClick={() => {
                  setAiInitialQuery('Why are departments green while overall profit is red?');
                  setIsAiDrawerOpen(true);
                }}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <Bot className="h-4 w-4" />
                <span>Explain The Silo Paradox</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. KPI Overview Cards */}
        <KpiOverview
          currentData={currentQuarterData}
          simulationResults={simulationResults}
          simulationActive={simulationActive}
          onExploreLeakage={() => setActiveMainTab('leakages')}
          onExploreCausality={() => setActiveMainTab('matrix')}
        />

        {/* Section Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            {[
              { id: 'overview', label: 'Quarterly Paradox & Trends', icon: BarChart3 },
              { id: 'matrix', label: 'Cross-Functional Causality Matrix', icon: Network },
              { id: 'leakages', label: 'Inter-Departmental Leakages (4 Conflicts)', icon: TrendingDown },
              { id: 'simulator', label: 'Dynamic Stress Simulator', icon: Sliders },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeMainTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMainTab(tab.id as any)}
                  className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Telemetry Synchronized: 4 Departments</span>
          </div>
        </div>

        {/* Dynamic Tabbed Content */}
        {activeMainTab === 'overview' && (
          <div className="space-y-6">
            <QuarterlyTrendChart />
            <CausalityMatrix
              onAskAiAboutNode={handleAskAiAboutNode}
              onJumpToSimulator={() => setActiveMainTab('simulator')}
            />
            <LeakageBreakdown
              onSimulateLeakageFix={handleSimulateLeakageFix}
              onAskAiAboutLeakage={handleAskAiAboutLeakage}
            />
            <ScenarioSimulator
              currentData={currentQuarterData}
              params={simulationParams}
              onChangeParams={setSimulationParams}
              results={simulationResults}
              onApplyPlanToAi={() => {
                setAiInitialQuery(
                  `I have configured an optimized cross-functional scenario recovering +${simulationResults.marginDelta}% Net Margin (${simulationResults.annualLeakageRecovered} in annual savings). Provide executive rollout milestones.`
                );
                setIsAiDrawerOpen(true);
              }}
            />
          </div>
        )}

        {activeMainTab === 'matrix' && (
          <div className="space-y-6">
            <CausalityMatrix
              onAskAiAboutNode={handleAskAiAboutNode}
              onJumpToSimulator={() => setActiveMainTab('simulator')}
            />
            <QuarterlyTrendChart />
          </div>
        )}

        {activeMainTab === 'leakages' && (
          <div className="space-y-6">
            <LeakageBreakdown
              onSimulateLeakageFix={handleSimulateLeakageFix}
              onAskAiAboutLeakage={handleAskAiAboutLeakage}
            />
            <ScenarioSimulator
              currentData={currentQuarterData}
              params={simulationParams}
              onChangeParams={setSimulationParams}
              results={simulationResults}
              onApplyPlanToAi={() => {
                setAiInitialQuery(
                  `I have configured an optimized cross-functional scenario recovering +${simulationResults.marginDelta}% Net Margin. Provide executive rollout milestones.`
                );
                setIsAiDrawerOpen(true);
              }}
            />
          </div>
        )}

        {activeMainTab === 'simulator' && (
          <div className="space-y-6">
            <ScenarioSimulator
              currentData={currentQuarterData}
              params={simulationParams}
              onChangeParams={setSimulationParams}
              results={simulationResults}
              onApplyPlanToAi={() => {
                setAiInitialQuery(
                  `I have configured an optimized cross-functional scenario recovering +${simulationResults.marginDelta}% Net Margin (${simulationResults.annualLeakageRecovered} in annual savings). Provide executive rollout milestones.`
                );
                setIsAiDrawerOpen(true);
              }}
            />
            <QuarterlyTrendChart />
          </div>
        )}
      </main>

      {/* Floating AI Assistant Trigger Pill on bottom-right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setAiInitialQuery(null);
            setIsAiDrawerOpen(true);
          }}
          className="group flex items-center space-x-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 p-[1px] shadow-2xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <div className="flex items-center space-x-2 rounded-full bg-[#0B0F17] px-4 py-2.5">
            <Bot className="h-5 w-5 text-cyan-400 group-hover:animate-bounce" />
            <span className="text-xs font-bold text-white">Ask AI Analyst</span>
            <span className="rounded-full bg-cyan-950 px-2 py-0.5 text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
              Live
            </span>
          </div>
        </button>
      </div>

      {/* Context-Aware AI Analyst Drawer */}
      <AiAnalystDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        selectedQuarter={selectedQuarter}
        simulationParams={simulationParams}
        simulationResults={simulationResults}
        onApplySimulationPreset={handleApplySimulationPreset}
        onOpenDossier={() => {
          setIsAiDrawerOpen(false);
          setIsDossierOpen(true);
        }}
        initialQuery={aiInitialQuery}
      />

      {/* Executive Board Dossier Modal */}
      <ExecutiveDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
    </div>
  );
}
