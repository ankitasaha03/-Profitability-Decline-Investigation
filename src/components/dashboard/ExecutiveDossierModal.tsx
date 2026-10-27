'use client';

import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  ShieldAlert,
  TrendingDown,
  X,
} from 'lucide-react';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { QUARTERLY_DATA } from '@/data/mockData';

interface ExecutiveDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExecutiveDossierModal({ isOpen, onClose }: ExecutiveDossierModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Modal Action Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="h-5 w-5 text-red-400" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Board Executive Briefing Dossier
              </h3>
              <p className="text-[11px] text-slate-400">
                Investigation #INV-2026-Q3 • Profitability Divergence Remediation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Formal Report Printable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200 text-xs leading-relaxed font-sans">
          {/* Header Memo Block */}
          <div className="border-b border-slate-800 pb-5">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p>
                  <strong className="text-slate-400">TO: </strong>
                  Board of Directors & Executive Committee
                </p>
                <p className="mt-1">
                  <strong className="text-slate-400">FROM: </strong>
                  Dr. Maya Vance, Principal Cross-Functional Intelligence Architect
                </p>
              </div>
              <div className="text-right">
                <p>
                  <strong className="text-slate-400">DATE: </strong>
                  October 2026
                </p>
                <p className="mt-1">
                  <strong className="text-slate-400">STATUS: </strong>
                  <span className="text-red-400 font-bold uppercase">Critical Divergence</span>
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-cyan-500/20 pb-1">
              1. Executive Summary & Diagnostic Findings
            </h4>
            <p className="mt-2 text-slate-300">
              For three consecutive quarters (Q1 to Q3), corporate top-line revenue has remained stable, expanding slightly from <strong>$24.5M to $25.1M</strong>. Concurrently, all four functional divisions (Marketing, Human Resources, Operations, and Finance) reported satisfactory individual performance ratings averaging <strong>88.5%</strong>.
            </p>
            <p className="mt-2 text-slate-300">
              Despite this nominal success, corporate Net Profit Margin has suffered an alarming collapse, plunging from <strong>20.0% ($4.9M) in Q1 to 5.8% ($1.45M) in Q3</strong>, representing a net <strong>-14.2% YoY margin degradation</strong>.
            </p>
            <div className="mt-3 rounded-xl border border-red-500/30 bg-red-950/20 p-4">
              <p className="text-red-300 font-semibold">
                Core Finding: This decline was not precipitated by macroeconomic contraction or external demand destruction. It is the direct consequence of uncoordinated inter-departmental optimization—where isolated targets generated massive collateral costs for adjacent departments, culminating in an uncovered <strong>$4.86M annualized cost leakage</strong>.
              </p>
            </div>
          </div>

          {/* Section 2: Departmental Silo Illusion Matrix */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-cyan-500/20 pb-1">
              2. The "Silo Illusion" Audit
            </h4>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-800/80 font-bold text-slate-200">
                  <tr>
                    <th className="p-2.5">Division</th>
                    <th className="p-2.5">Reported Metric</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Hidden Inter-Departmental Externalities</th>
                    <th className="p-2.5">Cost Drag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-bold text-white">Marketing</td>
                    <td className="p-2.5">31.5k Leads (+73%)</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">92% (Green)</td>
                    <td className="p-2.5 text-slate-300">Lowered quality threshold to hit raw volume; CAC doubled ($480) with 41% 30-day retention</td>
                    <td className="p-2.5 text-rose-400 font-bold">$1.45M</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">HR</td>
                    <td className="p-2.5">42 Requisitions Filled</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">87% (Green)</td>
                    <td className="p-2.5 text-slate-300">Placed under-qualified staff to hit quota; 24.8% turnover created 67-day gaps in warehouse leads</td>
                    <td className="p-2.5 text-rose-400 font-bold">$1.64M</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Operations</td>
                    <td className="p-2.5">Uptime Maintained</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">86% (Green)</td>
                    <td className="p-2.5 text-slate-300">Logged 14,800 overtime hours and hired spot agencies at $85/hr; 31.4% stockout rate on promos</td>
                    <td className="p-2.5 text-rose-400 font-bold">$2.10M</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Finance</td>
                    <td className="p-2.5">Core Spend Frozen</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">89% (Green)</td>
                    <td className="p-2.5 text-slate-300">Enforced blanket hiring freezes, driving plant leads to bypass procurement with expensive consultants</td>
                    <td className="p-2.5 text-rose-400 font-bold">$0.55M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Recommended 90-Day Turnaround Framework */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-cyan-500/20 pb-1">
              3. Immediate 90-Day Cross-Functional SLA Remediation
            </h4>
            <div className="mt-3 space-y-3">
              <div className="flex items-start space-x-2.5 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Action 1: Tie Marketing Budgets to Contribution Margin & Stock Availability</strong>
                  <p className="mt-0.5 text-slate-400">
                    Mandate a real-time inventory API gateway. Promotional ad spend is automatically throttled if warehouse buffer drops below 20 days of sales.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Action 2: Permanent Re-hiring to Eliminate $85/hr Contractors</strong>
                  <p className="mt-0.5 text-slate-400">
                    Unfreeze permanent operations headcount and institute a 90-day retention bonus, converting $1.64M in agency contractor drain back into institutional equity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Action 3: Establish Cross-Functional SLA Governance Committee</strong>
                  <p className="mt-0.5 text-slate-400">
                    Executive bonuses are contingent on the company-wide Cross-Functional Synergy Score (&gt;75) rather than isolated departmental scorecards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Signoff */}
          <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-slate-500 text-[11px]">
            <span>Generated by SynapseIQ Enterprise Intelligence System</span>
            <span>Document ID: DOC-BOARD-2026-Q3-REV4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
