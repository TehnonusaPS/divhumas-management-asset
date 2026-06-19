import React, { useState, useEffect, useRef } from 'react';
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const DAYS_ID = ['Mg', 'Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'];
const MONTHS_ID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

/**
 * Format YYYY-MM-DD to DD-MM-YYYY for display
 */
function formatDisplay(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
}

/**
 * Format Date object to YYYY-MM-DD for value
 */
function formatValue(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export default function DatePicker({
    value = '',
    onChange,
    placeholder = 'Pilih Tanggal',
    disabled = false,
    error = '',
    className = '',
    ...props
}) {
    const today = new Date();
    const initialDate = value ? new Date(value) : today;
    const [viewYear, setViewYear] = useState(initialDate.getFullYear());
    const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

    useEffect(() => {
        if (value) {
            const d = new Date(value);
            setViewYear(d.getFullYear());
            setViewMonth(d.getMonth());
        }
    }, [value]);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const handleSelect = (day, close) => {
        const selected = new Date(viewYear, viewMonth, day);
        onChange?.(formatValue(selected));
        close();
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange?.('');
    };

    const selectedParts = value ? value.split('-').map(Number) : null;

    return (
        <div className={cn('relative', className)} {...props}>
            <HeadlessPopover>
                {({ close }) => (
                    <>
                        <PopoverButton
                            disabled={disabled}
                            className={cn(
                                'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer',
                                error
                                    ? 'border-red-500 dark:border-red-400'
                                    : 'border-border',
                                'bg-card/50 text-foreground',
                                disabled && 'opacity-50 cursor-not-allowed'
                            )}
                        >
                            <CalendarDaysIcon className="h-5 w-5 text-muted shrink-0" />
                            <span className={cn('flex-1 truncate', !value && 'text-muted/60')}>
                                {value ? formatDisplay(value) : placeholder}
                            </span>
                            {value && !disabled && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="p-0.5 rounded-md hover:bg-background transition cursor-pointer"
                                >
                                    <XMarkIcon className="h-4 w-4 text-muted hover:text-foreground" />
                                </button>
                            )}
                        </PopoverButton>

                        <PopoverPanel
                            anchor="bottom start"
                            className="z-[100] w-[300px] rounded-2xl border border-border bg-card p-4 shadow-xl dark:bg-card/95 backdrop-blur-md focus:outline-none [--anchor-gap:8px] transition duration-200 ease-out data-[closed]:opacity-0 data-[closed]:scale-95"
                        >
                                {/* Header Navigation */}
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        type="button"
                                        onClick={prevMonth}
                                        className="p-1.5 rounded-lg hover:bg-background transition cursor-pointer"
                                    >
                                        <ChevronLeftIcon className="h-4 w-4 text-foreground" />
                                    </button>
                                    <span className="text-sm font-bold text-foreground">
                                        {MONTHS_ID[viewMonth]} {viewYear}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={nextMonth}
                                        className="p-1.5 rounded-lg hover:bg-background transition cursor-pointer"
                                    >
                                        <ChevronRightIcon className="h-4 w-4 text-foreground" />
                                    </button>
                                </div>

                                {/* Day Names */}
                                <div className="grid grid-cols-7 gap-1 mb-1">
                                    {DAYS_ID.map((d) => (
                                        <div
                                            key={d}
                                            className="text-center text-[10px] font-bold text-muted uppercase tracking-wider py-1"
                                        >
                                            {d}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {/* Empty cells */}
                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <div key={`empty-${i}`} className="h-9" />
                                    ))}
                                    {/* Day cells */}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const isSelected =
                                            selectedParts &&
                                            selectedParts[0] === viewYear &&
                                            selectedParts[1] === viewMonth + 1 &&
                                            selectedParts[2] === day;
                                        const isToday =
                                            today.getFullYear() === viewYear &&
                                            today.getMonth() === viewMonth &&
                                            today.getDate() === day;

                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => handleSelect(day, close)}
                                                className={cn(
                                                    'h-9 w-full rounded-lg text-xs font-semibold transition-all cursor-pointer',
                                                    isSelected
                                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                        : isToday
                                                            ? 'border border-primary/40 text-primary font-bold hover:bg-primary/10'
                                                            : 'text-foreground hover:bg-primary/10 hover:text-primary'
                                                )}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </PopoverPanel>
                    </>
                )}
            </HeadlessPopover>
            {error && (
                <p className="text-xs font-semibold text-primary dark:text-red-400 mt-1.5">{error}</p>
            )}
        </div>
    );
}
