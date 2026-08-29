'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  DollarSign,
  Calendar,
  Percent,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

interface FinanceEstimatorProps {
  financeTitle?: string;
  financeSubtitle?: string;
  financeDescription?: string;
  phone: string;
  dealershipName: string;
}

export const FinanceEstimator: React.FC<FinanceEstimatorProps> = ({
  financeTitle = 'Tailored Vehicle Finance Calculator',
  financeSubtitle = 'Competitive Rates & Flexible Terms',
  financeDescription = 'Estimate your monthly payments in seconds. Our finance specialists work with premier national and regional lenders to secure optimized rates tailored to your structure.',
  phone,
  dealershipName,
}) => {
  const [vehiclePrice, setVehiclePrice] = useState<number>(85000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(5.49);

  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> =
    builderCtx?.templateData?.buttonOverrides || {};

  // Compute finance calculations
  const { downPaymentAmount, loanPrincipal, monthlyPayment, totalPayment } = useMemo(() => {
    const downAmount = (vehiclePrice * downPaymentPercent) / 100;
    const principal = Math.max(0, vehiclePrice - downAmount);
    const monthlyRate = interestRate / 100 / 12;

    let monthly = 0;
    if (principal > 0 && monthlyRate > 0 && loanTermMonths > 0) {
      monthly =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    } else if (loanTermMonths > 0) {
      monthly = principal / loanTermMonths;
    }

    const total = monthly * loanTermMonths + downAmount;

    return {
      downPaymentAmount: Math.round(downAmount),
      loanPrincipal: Math.round(principal),
      monthlyPayment: Math.round(monthly),
      totalPayment: Math.round(total),
    };
  }, [vehiclePrice, downPaymentPercent, loanTermMonths, interestRate]);

  const whatsappFinanceMessage = `Hi ${dealershipName}, I estimated financing for a vehicle at $${vehiclePrice.toLocaleString()} ($${downPaymentAmount.toLocaleString()} down, ${loanTermMonths} months @ ${interestRate}% = ~$${monthlyPayment.toLocaleString()}/mo). I would like to apply for pre-approval.`;

  return (
    <section id="finance" className="w-full py-24 sm:py-32 bg-theme-surface border-t border-theme-border font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-theme-primary" />
            <EditableElement
              as="span"
              id="auto-finance-subtitle"
              field="financeSubtitle"
              value={financeSubtitle}
              type="text"
              className="text-theme-muted font-inter text-xs font-semibold tracking-wider uppercase"
            />
          </div>

          <EditableElement
            as="h2"
            id="auto-finance-title"
            field="financeTitle"
            value={financeTitle}
            type="heading"
            className="font-manrope text-3xl sm:text-5xl font-bold text-theme-foreground tracking-tight leading-tight mb-4"
          />

          <EditableElement
            as="p"
            id="auto-finance-desc"
            field="financeDescription"
            value={financeDescription}
            type="text"
            className="text-base text-theme-muted font-normal leading-relaxed"
          />
        </div>

        {/* Interactive Calculator Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left 7 Columns: Calculator Sliders & Controls */}
          <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-theme-background/80 border border-theme-border flex flex-col justify-between gap-8 shadow-sm font-inter">
            <div className="space-y-8">
              
              {/* 1. Vehicle Price */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-theme-muted uppercase tracking-wider">
                    Vehicle Purchase Price
                  </label>
                  <span className="text-lg font-bold font-manrope text-theme-foreground">
                    ${vehiclePrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={400000}
                  step={2500}
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="w-full h-2 bg-theme-surface rounded-lg appearance-none cursor-pointer accent-theme-primary"
                />
                <div className="flex justify-between text-xs text-theme-muted mt-1.5 font-medium">
                  <span>$15,000</span>
                  <span>$200,000</span>
                  <span>$400,000</span>
                </div>
              </div>

              {/* 2. Down Payment */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-theme-muted uppercase tracking-wider">
                    Down Payment ({downPaymentPercent}%)
                  </label>
                  <span className="text-lg font-bold font-manrope text-theme-foreground">
                    ${downPaymentAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-theme-surface rounded-lg appearance-none cursor-pointer accent-theme-primary"
                />
                <div className="flex justify-between text-xs text-theme-muted mt-1.5 font-medium">
                  <span>5% Min</span>
                  <span>25% Standard</span>
                  <span>50% Custom</span>
                </div>
              </div>

              {/* 3. Loan Term Duration Buttons */}
              <div>
                <label className="text-xs font-semibold text-theme-muted uppercase tracking-wider block mb-3">
                  Loan Duration (Months)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[24, 36, 48, 60, 72, 84].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTermMonths(term)}
                      className={`py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        loanTermMonths === term
                          ? 'bg-theme-primary text-theme-primary-text shadow-md'
                          : 'bg-theme-surface border border-theme-border text-theme-muted hover:text-theme-foreground'
                      }`}
                    >
                      {term} mo
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Estimated APR Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-theme-muted uppercase tracking-wider">
                    Estimated Annual APR Rate
                  </label>
                  <span className="text-sm font-bold font-manrope text-theme-foreground">
                    {interestRate}% APR
                  </span>
                </div>
                <input
                  type="range"
                  min={2.99}
                  max={12.99}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-theme-surface rounded-lg appearance-none cursor-pointer accent-theme-primary"
                />
              </div>

            </div>

            <div className="pt-6 border-t border-theme-border/60 text-xs text-theme-muted leading-relaxed">
              *Estimates are for planning purposes. Final rate, terms, and payment will be confirmed upon credit application review.
            </div>
          </div>

          {/* Right 5 Columns: Resulting Monthly Summary & Pre-Approval CTA */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-theme-background/90 border border-theme-border flex flex-col justify-between gap-8 shadow-xl relative overflow-hidden font-inter">

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-theme-surface border border-theme-border text-theme-foreground uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
                <span>Instant Pre-Approval Estimate</span>
              </div>

              <span className="text-xs font-semibold text-theme-muted uppercase tracking-wider block mb-2">
                Estimated Monthly Payment
              </span>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-manrope text-theme-foreground tracking-tight">
                  ${monthlyPayment.toLocaleString()}
                </span>
                <span className="text-sm text-theme-muted font-medium">/ month</span>
              </div>

              {/* Breakdown Table */}
              <div className="space-y-3 pt-6 border-t border-theme-border text-xs">
                <div className="flex justify-between text-theme-muted">
                  <span>Financed Principal:</span>
                  <span className="text-theme-foreground font-semibold">
                    ${loanPrincipal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-theme-muted">
                  <span>Down Payment ({downPaymentPercent}%):</span>
                  <span className="text-theme-foreground font-semibold">
                    ${downPaymentAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-theme-muted">
                  <span>Loan Term:</span>
                  <span className="text-theme-foreground font-semibold">
                    {loanTermMonths} Months
                  </span>
                </div>
                <div className="flex justify-between text-theme-muted">
                  <span>Estimated APR:</span>
                  <span className="text-theme-foreground font-semibold">
                    {interestRate}% Fixed
                  </span>
                </div>
              </div>
            </div>

            {/* Application Action */}
            <div className="pt-8 border-t border-theme-border flex flex-col gap-3">
              <EditableButton
                buttonKey="auto-finance-cta"
                defaultText="Apply For Pre-Approval"
                defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(whatsappFinanceMessage)}`}
                defaultOpenInNewTab={true}
                className="w-full py-4 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-semibold tracking-wide active:scale-98 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {activeButtonOverrides['auto-finance-cta']?.text || 'Apply For Pre-Approval'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </EditableButton>

              <div className="flex items-center justify-center gap-2 text-xs text-theme-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-theme-primary" />
                <span>No Initial Credit Score Impact</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
