'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { paymentSummaries } from './data';
import type { PaymentSummary } from './types';
import { useRevenue } from '@/api/revenue';
type DisplayCurrency = 'USD' | 'GBP';
const CURRENCIES: { code: DisplayCurrency; label: string }[] = [
  { code: 'USD', label: 'USD' },
  { code: 'GBP', label: 'GBP' },
];
function CurrencyFlag({ code }: { code: DisplayCurrency }) {
  if (code === 'USD') {
    return (
      <span
        className='inline-flex h-4 w-6 overflow-hidden rounded-[4px] ring-1 ring-border'
        aria-hidden
      >
        <span className='flex-1 bg-[#B22234]' />
        <span className='w-2 bg-[#3C3B6E]' />
      </span>
    );
  }
  return (
    <span
      className='inline-flex h-4 w-6 flex-col overflow-hidden rounded-[4px] ring-1 ring-border'
      aria-hidden
    >
      <span className='h-1.5 bg-[#012169]' />
      <span className='h-0.5 bg-white' />
      <span className='h-0.5 bg-[#C8102E]' />
      <span className='flex-1 bg-[#012169]' />
    </span>
  );
}

const helperToneClass: Record<
  NonNullable<PaymentSummary['helperTone']>,
  string
> = {
  neutral: 'text-muted',
  positive: 'text-[hsl(var(--success))]',
  warning: 'text-[hsl(var(--warning))]',
};

function formatCurrency(value: number, currency: DisplayCurrency) {
  const symbol = currency === 'USD' ? '$' : '£';

  if (value >= 1_000_000) return `${symbol}${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${symbol}${(value / 1_000).toFixed(0)}k`;
  return `${symbol}${value}`;
}

const PaymentsSummaryCards = () => {
  const [currency, setCurrency] = useState<DisplayCurrency>('USD');
  const { data, isLoading } = useRevenue();
  const revenue = data?.revenue;
  const values: Record<string, string> = {
    'total-revenue': revenue ? formatCurrency(revenue.total, currency) : '—',

    'client-revenue': revenue
      ? formatCurrency(revenue.subscriptions, currency)
      : '—',

    'trainer-revenue': revenue
      ? formatCurrency(revenue.one_time_sessions, currency)
      : '—',
  };

  return (
    <section className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type='button'
              className='inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-border bg-card px-4 text-sm font-medium text-foreground shadow-sm'
            >
              <CurrencyFlag code={currency} />
              {currency}
              <ChevronDown className='size-4 text-muted' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-40'>
            {CURRENCIES.map((item) => (
              <DropdownMenuItem
                key={item.code}
                onClick={() => setCurrency(item.code)}
                className='flex cursor-pointer items-center gap-2'
              >
                <CurrencyFlag code={item.code} />
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {paymentSummaries.map((summary) => (
          <article
            key={summary.id}
            className='min-h-[130px] rounded-[12px] border border-[#E4E2E9] bg-white p-5'
          >
            <p className='text-sm font-medium text-foreground'>
              {summary.label}
            </p>

            <p className='mt-5 text-2xl font-semibold tracking-normal text-foreground sm:text-3xl'>
              {isLoading ? '...' : (values[summary.id] ?? summary.value)}
            </p>

            <p
              className={`mt-2 text-xs ${
                helperToneClass[summary.helperTone ?? 'neutral']
              }`}
            >
              {summary.helperText}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PaymentsSummaryCards;
