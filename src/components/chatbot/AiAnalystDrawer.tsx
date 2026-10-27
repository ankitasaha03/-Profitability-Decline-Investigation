'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Download,
  Flame,
  MessageSquare,
  Send,
  Sliders,
  Sparkles,
  TrendingDown,
  User,
  X,
  Zap,
} from 'lucide-react';
import { ChatMessage, QuarterId, SimulationParams, SimulationResults } from '@/types';
import { PRESET_QUERIES } from '@/data/mockData';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface AiAnalystDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedQuarter: QuarterId;
  simulationParams: SimulationParams;
  simulationResults: SimulationResults;
  onApplySimulationPreset: (params: Partial<SimulationParams>) => void;
  onOpenDossier: () => void;
  initialQuery?: string | null;
}

export function AiAnalystDrawer({
  isOpen,
  onClose,
  selectedQuarter,
  simulationParams,
  simulationResults,
  onApplySimulationPreset,
  onOpenDossier,
  initialQuery,
}: AiAnalystDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `### SynapseIQ Executive Intelligence Ready
I have ingested cross-functional telemetry across **Marketing, HR, Operations, and Finance** for Q1–Q3.

**Current Active Diagnostic**:
* **Corporate Paradox Detected**: Average departmental reported health is **88.5% (Green)**, yet company Net Profit Margin collapsed by **-14.2% YoY to 5.8%**.
* **Identified Systemic Leakage**: **$4.86M / year** in cross-functional friction and uncoordinated execution.

Select one of the executive diagnostic queries below or ask any cross-functional inquiry to begin.`,
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle external query requests (e.g. from matrix or tab clicks)
  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const generateResponse = (prompt: string): ChatMessage => {
    const lower = prompt.toLowerCase();

    if (lower.includes('why are departments green') || lower.includes('green while overall profit is red') || lower.includes('silo paradox')) {
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        timestamp: 'Just now',
        text: `### Root Cause Analysis: The Departmental Silo Illusion

The fundamental cause of the 3-quarter profitability decline is **asymmetric metric optimization without cross-functional guardrails**:

| Department | Silo Metric (Nominal) | Unintended Negative Externality | Dollar Drag |
| :--- | :--- | :--- | :--- |
| **Marketing** | 92% Quota Met (31.5k leads) | Flooded funnel with low-LTV discount traffic; CAC doubled to $480 | **$1.45M** |
| **HR** | 87% Requisition Target Met | Hired low-retention workers; 24.8% turnover created 67-day gaps | **$1.64M** |
| **Operations** | 86% Uptime Maintained | Burned 14,800 overtime hrs ($2.1M) & hired 3x-priced temp agencies | **$2.10M** |
| **Finance** | 89% Core Budget Met | Enforced blanket freezes that forced shadow spend via emergency p-cards | **$0.55M** |

#### The Compounding Causal Chain:
1. **Marketing Promo Surge** ➔ Outstripped inventory buffers (31.4% promo stockouts).
2. **Operations Emergency Charter** ➔ Incurred **$1.12M in emergency air freight** to prevent cancellations.
3. **Core Team Burnout** ➔ 76/100 burnout index accelerated employee exits, requiring **$1.64M in agency backfill**.

**Conclusion**: Each VP receives their performance bonus for local target achievement, while enterprise profit drops by **-14.2% YoY**.`,
        actionPayload: {
          type: 'APPLY_SIMULATION',
          label: 'Simulate Optimal Cross-Functional Governance',
          data: {
            turnoverReductionPct: 50,
            marketingCapacityAlignmentPct: 75,
            overtimeSpendOptimizationPct: 45,
            inventoryBufferRatePct: 85,
          },
        },
      };
    }

    if (lower.includes('hr turnover') || lower.includes('operations overtime') || lower.includes('hidden cost')) {
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        timestamp: 'Just now',
        text: `### The HR-to-Operations Burnout Flywheel

When experienced operations staff depart, the cost is rarely captured on HR's ledger. It surfaces on the P&L as **hyper-inflated Operations OpEx**:

#### Financial Impact Breakdown:
* **Direct Overtime Expense**: Surged from **$420k in Q1** to **$2.10M in Q3** (+362%).
* **Third-Party Contractor Backfill**: Rose to **$1.64M in Q3** as plant managers onboarded agency labor at **$85/hr** vs **$28/hr** base wage.
* **Defect & Error Rework**: Warehouse shipping error rate spiked to **5.8%**, causing **$340k** in return logistics costs.

#### Remediation Recommendation:
Implement a **Joint HR-Ops Retention SLA**:
* Fund a 12% tenure incentive bonus ($220k cost)
* Eliminate reliance on spot contractor agencies
* **Net Projected Recovery**: **+$1.68M annualized gross profit**.`,
        actionPayload: {
          type: 'APPLY_SIMULATION',
          label: 'Apply HR Stabilization levers to Simulator',
          data: {
            turnoverReductionPct: 60,
            overtimeSpendOptimizationPct: 50,
          },
        },
      };
    }

    if (lower.includes('15% reduction in cac') || lower.includes('simulate') || lower.includes('fulfillment limits')) {
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        timestamp: 'Just now',
        text: `### Simulation Output: 15% CAC Reduction with Operational Fulfillment Caps

Running real-time sensitivity analysis against current Q3 operational constraints:

#### Simulation Results:
* **Blended CAC**: Drops from **$480** to **$408** (-15.0%).
* **Lead Volume Filter**: Unprofitable discount-seeking volume reduced by 22%.
* **Warehouse Order Buffer**: Promo stockout rate falls from **31.4% down to 14.2%**.
* **Air Freight Savings**: Scraps **$480,000** in expedited freight surcharges.

| Metric | Current Q3 Baseline | Simulated 15% CAC Sync | Delta |
| :--- | :--- | :--- | :--- |
| **Net Profit Margin** | 5.8% | **9.6%** | **+3.8%** |
| **LTV / CAC Ratio** | 1.85x | **2.65x** | **+43%** |
| **Expedited Freight Surcharge** | $1.12M | **$640k** | **-$480k** |
| **Quarterly Net Earnings** | $1.45M | **$2.41M** | **+$960k** |

**Strategic Takeaway**: Capping ad spend to warehouse throughput immediately halts margin-destroying air freight.`,
        actionPayload: {
          type: 'APPLY_SIMULATION',
          label: 'Push 15% CAC & Fulfillment Sync to Simulator',
          data: {
            marketingCapacityAlignmentPct: 70,
            inventoryBufferRatePct: 85,
          },
        },
      };
    }

    if (lower.includes('board') || lower.includes('report') || lower.includes('dossier') || lower.includes('briefing')) {
      return {
        id: Date.now().toString(),
        sender: 'assistant',
        timestamp: 'Just now',
        text: `### Executive Briefing Prepared for the Board of Directors

**Subject**: Cross-Functional Root Cause Analysis of 3-Quarter Profit Margin Deterioration  
**Classification**: Highly Confidential — C-Suite & Board Distribution Only

#### 1. The Core Paradox
* Individual Department Performance: **Green (88.5% avg)**
* Enterprise Net Profit Margin: **5.8% (down 1,420 bps YoY from 20.0%)**

#### 2. Root Cause Summary
Profit decline was not driven by macro headwinds or demand softening (Revenue remained steady at $25.1M). The decline was driven by **uncoordinated internal optimization**:
* Marketing chased unprofitable volume (CAC $480 / LTV $890).
* Operations absorbed promotions without inventory, chartering $1.12M in emergency freight.
* HR churn triggered $3.74M in annualized overtime and contractor costs.

#### 3. Recommended 90-Day Turnaround Framework
1. **Institute Cross-Functional SLAs**: Replace isolated departmental KPIs with Contribution Margin gating.
2. **Synchronize Inventory & Ad Spend**: Cap flash campaigns to warehouse safety buffers.
3. **Internalize Staffing**: Convert contractor backfill to permanent roles to stabilize knowledge.

*Full formal report available for review and export below.*`,
        actionPayload: {
          type: 'OPEN_DOSSIER',
          label: 'Open Full Board Dossier Memorandum',
        },
      };
    }

    // Default intelligent analyst response
    return {
      id: Date.now().toString(),
      sender: 'assistant',
      timestamp: 'Just now',
      text: `### Diagnostic Feedback for: "${prompt}"

Based on the active **Q1–Q3 cross-functional telemetry**:
* **Active Filter**: Quarter **${selectedQuarter}**
* **Observed Enterprise Leakage**: **$4.86M / year**
* **Projected Simulated Recovery**: **+${simulationResults.marginDelta}% Net Margin (${formatCurrency(simulationResults.annualLeakageRecovered, true)}/yr)**

#### Primary Structural Observation:
The decline is characterized by **friction between isolated silos**:
1. **Marketing** is optimized for top-line lead volume without accountability for return rates.
2. **Operations** absorbs demand spikes via emergency overtime and spot contractors.
3. **Finance** enforces lagging austerity freezes that perversely generate shadow OpEx.

You can run scenario sensitivity models directly on the dashboard or inspect the Causality Matrix to trace specific pathways.`,
      actionPayload: {
        type: 'APPLY_SIMULATION',
        label: 'Apply Balanced Recovery Plan (+9.0%)',
        data: {
          turnoverReductionPct: 55,
          marketingCapacityAlignmentPct: 75,
          overtimeSpendOptimizationPct: 45,
          inventoryBufferRatePct: 88,
        },
      },
    };
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: 'Just now',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and streaming delay
    setTimeout(() => {
      const response = generateResponse(textToSend);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 700);
  };

  const handleActionClick = (actionPayload: ChatMessage['actionPayload']) => {
    if (!actionPayload) return;
    if (actionPayload.type === 'APPLY_SIMULATION' && actionPayload.data) {
      onApplySimulationPreset(actionPayload.data);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `✓ **Applied optimization parameters to the Dynamic Simulator!** Check the dashboard simulator and KPI cards to view the updated Net Margin trajectory.`,
        },
      ]);
    } else if (actionPayload.type === 'OPEN_DOSSIER') {
      onOpenDossier();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex h-full w-full flex-col border-l border-slate-800 bg-[#0B0F17] shadow-2xl sm:max-w-xl md:max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1px]">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#0B0F17]">
                <Bot className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-sm">
                  Dr. Maya Vance
                </h3>
                <span className="rounded bg-cyan-950 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-500/30">
                  Principal AI Analyst
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Context-Aware Cross-Functional Diagnostics
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenDossier}
              className="flex items-center space-x-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700"
              title="Export Executive Dossier"
            >
              <Download className="h-3 w-3" />
              <span className="hidden sm:inline">Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Preset Prompt Buttons Toolbar */}
        <div className="border-b border-slate-800/80 bg-slate-950/60 p-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            One-Click Diagnostic Queries:
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PRESET_QUERIES.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSendMessage(preset.text)}
                className="rounded-lg border border-slate-800 bg-slate-900/90 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                    isUser
                      ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950'
                      : 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                  }`}
                >
                  {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 font-medium text-slate-950 shadow-md'
                      : 'border border-slate-800 bg-slate-900/90 text-slate-200 shadow-md'
                  }`}
                >
                  {/* Content with basic markdown formatting */}
                  <div className="prose prose-invert prose-xs max-w-none space-y-2">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h4 key={pIdx} className="text-sm font-bold text-white pt-1">
                            {paragraph.replace('### ', '')}
                          </h4>
                        );
                      }
                      if (paragraph.startsWith('#### ')) {
                        return (
                          <h5 key={pIdx} className="text-xs font-bold text-cyan-300 pt-1">
                            {paragraph.replace('#### ', '')}
                          </h5>
                        );
                      }
                      if (paragraph.startsWith('|')) {
                        // Simple Table Rendering
                        const rows = paragraph.split('\n').filter((r) => !r.includes('---'));
                        return (
                          <div key={pIdx} className="overflow-x-auto my-2 rounded-lg border border-slate-800">
                            <table className="w-full text-[11px] text-left">
                              <tbody>
                                {rows.map((row, rIdx) => {
                                  const cols = row.split('|').map((c) => c.trim()).filter(Boolean);
                                  return (
                                    <tr
                                      key={rIdx}
                                      className={`border-b border-slate-800 ${
                                        rIdx === 0 ? 'bg-slate-800/80 font-bold text-slate-200' : 'hover:bg-slate-800/30'
                                      }`}
                                    >
                                      {cols.map((col, cIdx) => (
                                        <td key={cIdx} className="p-2">
                                          {col}
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                        return (
                          <ul key={pIdx} className="list-disc pl-4 space-y-1">
                            {paragraph.split('\n').map((item, iIdx) => (
                              <li key={iIdx}>
                                {item.replace(/^[\*\-]\s+/, '')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (paragraph.match(/^\d+\.\s/)) {
                        return (
                          <ol key={pIdx} className="list-decimal pl-4 space-y-1">
                            {paragraph.split('\n').map((item, iIdx) => (
                              <li key={iIdx}>
                                {item.replace(/^\d+\.\s+/, '')}
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      return <p key={pIdx}>{paragraph}</p>;
                    })}
                  </div>

                  {/* Embedded Action Button inside AI message */}
                  {msg.actionPayload && (
                    <div className="mt-3.5 border-t border-slate-800/80 pt-3">
                      <button
                        onClick={() => handleActionClick(msg.actionPayload)}
                        className="flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 px-3 py-1.5 text-xs font-bold text-slate-950 shadow-md hover:brightness-110 active:scale-95 transition-all"
                      >
                        <Zap className="h-3.5 w-3.5" />
                        <span>{msg.actionPayload.label}</span>
                      </button>
                    </div>
                  )}

                  <div className="mt-2 text-[10px] text-slate-400 text-right">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <Bot className="h-4 w-4 animate-spin text-cyan-400" />
              <span>Analyzing cross-functional telemetry and calculating impact...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-800 bg-slate-900/90 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Dr. Vance about hidden feedback loops, CAC, or turnover..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 transition-all hover:brightness-110 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
            <span>Powered by SynapseIQ Cross-Functional Engine</span>
            <span>Context: {selectedQuarter} • Active Leakage: $4.86M</span>
          </div>
        </div>
      </div>
    </div>
  );
}
