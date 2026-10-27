'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle,
  ChevronRight,
  Flame,
  Info,
  Network,
  RotateCcw,
  Sparkles,
  TrendingDown,
  X,
  Zap,
} from 'lucide-react';
import { CAUSALITY_NODES } from '@/data/mockData';
import { CausalityNode, Department } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface CausalityMatrixProps {
  onAskAiAboutNode: (node: CausalityNode) => void;
  onJumpToSimulator: () => void;
}

export function CausalityMatrix({ onAskAiAboutNode, onJumpToSimulator }: CausalityMatrixProps) {
  const [selectedNode, setSelectedNode] = useState<CausalityNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedPathway, setSelectedPathway] = useState<'all' | 'burnout' | 'marketing' | 'austerity'>('all');

  // Filter or highlight based on preset toxic loop pathways
  const getActiveNodes = () => {
    switch (selectedPathway) {
      case 'burnout':
        return ['node-hr-turnover', 'node-ops-overtime', 'node-outcome'];
      case 'marketing':
        return ['node-mkt-low-ltv', 'node-ops-stockout', 'node-outcome'];
      case 'austerity':
        return ['node-fin-budget', 'node-hr-turnover', 'node-ops-overtime', 'node-outcome'];
      default:
        return CAUSALITY_NODES.map((n) => n.id);
    }
  };

  const activeNodeIds = getActiveNodes();

  const getDepartmentColor = (dept: Department | 'CrossFunctional') => {
    switch (dept) {
      case 'HR':
        return {
          bg: 'from-amber-500/10 to-amber-900/20',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          badge: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
        };
      case 'Operations':
        return {
          bg: 'from-orange-500/10 to-red-900/20',
          border: 'border-orange-500/40',
          text: 'text-orange-400',
          badge: 'bg-orange-950/60 text-orange-300 border-orange-500/30',
        };
      case 'Marketing':
        return {
          bg: 'from-cyan-500/10 to-blue-900/20',
          border: 'border-cyan-500/40',
          text: 'text-cyan-400',
          badge: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30',
        };
      case 'Finance':
        return {
          bg: 'from-purple-500/10 to-indigo-900/20',
          border: 'border-purple-500/40',
          text: 'text-purple-400',
          badge: 'bg-purple-950/60 text-purple-300 border-purple-500/30',
        };
      default:
        return {
          bg: 'from-red-500/10 to-rose-950/40',
          border: 'border-red-500/50',
          text: 'text-red-400',
          badge: 'bg-red-950/80 text-red-300 border-red-500/40',
        };
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0E1420]/80 p-5 shadow-xl backdrop-blur-md">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-cyan-400" />
            <h2 className="text-base font-bold tracking-tight text-white sm:text-lg">
              Cross-Functional Causality Matrix
            </h2>
            <span className="rounded-full bg-cyan-950/70 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/30">
              Interactive Impact Map
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Click any departmental node or select a feedback loop pathway to trace how isolated decisions aggregate into profit collapse.
          </p>
        </div>

        {/* Pathway filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 p-1">
          <span className="px-2 text-[11px] font-medium text-slate-400">Pathways:</span>
          {[
            { id: 'all', label: 'All Loops' },
            { id: 'burnout', label: 'Burnout & Overtime' },
            { id: 'marketing', label: 'Promo Stockout Loop' },
            { id: 'austerity', label: 'Austerity Trap' },
          ].map((pathway) => (
            <button
              key={pathway.id}
              onClick={() => setSelectedPathway(pathway.id as any)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                selectedPathway === pathway.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {pathway.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Flow Matrix Display */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CAUSALITY_NODES.map((node, index) => {
          const colors = getDepartmentColor(node.department);
          const isHighlighted = activeNodeIds.includes(node.id);
          const isConnected =
            hoveredNodeId === node.id ||
            (hoveredNodeId &&
              CAUSALITY_NODES.find((n) => n.id === hoveredNodeId)?.connectedTo.includes(node.id));

          return (
            <div
              key={node.id}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onClick={() => setSelectedNode(node)}
              className={`group relative flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 cursor-pointer ${
                colors.border
              } bg-gradient-to-br ${colors.bg} ${
                isHighlighted ? 'opacity-100' : 'opacity-30 blur-[0.5px]'
              } ${
                isConnected ? 'ring-2 ring-cyan-400/80 shadow-lg shadow-cyan-500/20 scale-[1.02]' : ''
              } hover:scale-[1.02] hover:shadow-lg`}
            >
              {/* Header inside card */}
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${colors.badge}`}
                  >
                    {node.department}
                  </span>
                  <span className="flex items-center space-x-1 text-xs font-semibold text-rose-400">
                    <Flame className="h-3.5 w-3.5" />
                    <span>{formatCurrency(node.dollarLeakage, true)}</span>
                  </span>
                </div>

                <h3 className="mt-2.5 text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {node.title}
                </h3>

                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-xs font-semibold text-slate-200">
                    {node.metric}
                  </span>
                  <span className="rounded bg-slate-800/80 px-1.5 py-0.2 text-[10px] text-amber-400 font-mono">
                    {node.metricChange}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-2">
                  {node.description}
                </p>
              </div>

              {/* Bottom footer: downstream link indicator */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px] text-slate-400">
                <span className="flex items-center space-x-1 text-cyan-400 group-hover:underline">
                  <span>Inspect Impact Chain</span>
                  <ChevronRight className="h-3 w-3" />
                </span>

                {node.connectedTo.length > 0 && (
                  <span className="text-[10px] text-slate-500">
                    Triggers {node.connectedTo.length} downstream {node.connectedTo.length === 1 ? 'silo' : 'silos'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive Drawer / Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-2">
              <span className="rounded-md border border-cyan-500/30 bg-cyan-950/60 px-2.5 py-1 text-xs font-bold uppercase text-cyan-300">
                {selectedNode.department} Node Deep-Dive
              </span>
              <span className="text-xs text-rose-400 font-semibold">
                Direct Cost Leak: {formatCurrency(selectedNode.dollarLeakage)}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-extrabold text-white">
              {selectedNode.title}
            </h3>

            <div className="mt-2 flex items-center space-x-3 text-xs">
              <span className="rounded bg-slate-800 px-2.5 py-1 font-semibold text-slate-200">
                Current Metric: {selectedNode.metric}
              </span>
              <span className="rounded bg-amber-950/60 px-2.5 py-1 text-amber-300 border border-amber-500/20">
                {selectedNode.metricChange}
              </span>
            </div>

            {/* Description & Root Cause Breakdown */}
            <div className="mt-4 space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs">
              <div>
                <span className="font-semibold uppercase tracking-wider text-slate-400">
                  Silo Perspective (Why It Appeared Fine)
                </span>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="font-semibold uppercase tracking-wider text-red-400 flex items-center space-x-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Downstream Toxic Impact on Adjacent Silos</span>
                </span>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  {selectedNode.downstreamEffect}
                </p>
              </div>
            </div>

            {/* Modal actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setSelectedNode(null)}
                className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setSelectedNode(null);
                  onJumpToSimulator();
                }}
                className="flex items-center justify-center space-x-1.5 rounded-lg border border-purple-500/40 bg-purple-950/50 px-4 py-2 text-xs font-semibold text-purple-200 hover:bg-purple-900/60"
              >
                <Zap className="h-3.5 w-3.5 text-purple-400" />
                <span>Simulate Fix in Scenario Planner</span>
              </button>

              <button
                onClick={() => {
                  const node = selectedNode;
                  setSelectedNode(null);
                  onAskAiAboutNode(node);
                }}
                className="flex items-center justify-center space-x-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-bold text-slate-950 hover:brightness-110"
              >
                <Bot className="h-3.5 w-3.5" />
                <span>Ask AI Analyst to Unpack</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
