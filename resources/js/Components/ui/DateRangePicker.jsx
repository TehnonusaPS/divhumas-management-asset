import React, { useState, useEffect } from 'react';
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

function formatDisplay(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
}

function formatValue(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function toDate(str) {
    if (!str) return null;
    return new Date(str + 'T00:00:00');
}

function isSameDay(d1, d2) {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

function isBetween(date, start, end) {
    if (!date || !start || !end) return false;
    const t = date.getTime();
    const s = Math.min(start.getTime(), end.getTime());
    const e = Math.max(start.getTime(), end.getTime());
    return t > s && t < e;
}

export default function DateRangePicker({
    value = { startDate: '', endDate: '' },
    onChange,
    placeholder = 'Pilih Rentang Tanggal',
    disabled = false,
    error = '',
    className = '',
    ...props
}) {
    const today = new Date();
    const initialDate = value.startDate ? new Date(value.startDate) : today;
    const [viewYear, setViewYear] = useState(initialDate.getFullYear());
    const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
    const [pickStage, setPickStage] = useState('start'); // 'start' | 'end'
    const [tempStart, setTempStart] = useState(value.startDate || '');
    const [hoveredDate, setHoveredDate] = useState(null);

    useEffect(() => {
        setTempStart(value.startDate || '');
        setPickStage('start');
    }, [value.startDate, value.endDate]);

    useEffect(() => {
        if (value.startDate) {
            const d = new Date(value.startDate);
            setViewYear(d.getFullYear());
            setViewMonth(d.getMonth());
        }
    }, [value.startDate]);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
        else { setViewMonth(viewMonth - 1); }
    };

    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
        else { setViewMonth(viewMonth + 1); }
    };

    const handleSelect = (day, close) => {
        const selected = new Date(viewYear, viewMonth, day);
        const val = formatValue(selected);

        if (pickStage === 'start') {
            setTempStart(val);
            setPickStage('end');
        } else {
            // pickStage === 'end'
            let start = tempStart;
            let end = val;
            // Ensure start <= end
            if (new Date(start) > new Date(end)) {
                [start, end] = [end, start];
            }
            onChange?.({ startDate: start, endDate: end });
            setPickStage('start');
            close();
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange?.({ startDate: '', endDate: '' });
        setTempStart('');
        setPickStage('start');
    };

    const startDate = toDate(value.startDate);
    const endDate = toDate(value.endDate);
    const tempStartDate = toDate(tempStart);

    const displayValue = value.startDate && value.endDate
        ? `${formatDisplay(value.startDate)} s/d ${formatDisplay(value.endDate)}`
        : value.startDate
            ? `${formatDisplay(value.startDate)} s/d ...`
            : '';

    return (
        <div className={cn('relative', className)} {...props}>
            <HeadlessPopover>
                {({ close }) => (
                    <>
                        <PopoverButton
                            disabled={disabled}
                            className={cn(
                                'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer',
                                error ? 'border-red-500 dark:border-red-400' : 'border-border',
                                'bg-card/50 text-foreground',
                                disabled && 'opacity-50 cursor-not-allowed'
                            )}
                        >
                            <CalendarDaysIcon className="h-5 w-5 text-muted shrink-0" />
                            <span className={cn('flex-1 truncate', !displayValue && 'text-muted/60')}>
                                {displayValue || placeholder}
                            </span>
                            {(value.startDate || value.endDate) && !disabled && (
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
                                {/* Stage Indicator */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={cn(
                                        'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md',
                                        pickStage === 'start'
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-secondary/10 text-secondary'
                                    )}>
                                        {pickStage === 'start' ? 'Pilih Tanggal Mulai' : 'Pilih Tanggal Akhir'}
                                    </span>
                                </div>

                                {/* Header Navigation */}
                                <div className="flex items-center justify-between mb-4">
                                    <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-background transition cursor-pointer">
                                        <ChevronLeftIcon className="h-4 w-4 text-foreground" />
                                    </button>
                                    <span className="text-sm font-bold text-foreground">
                                        {MONTHS_ID[viewMonth]} {viewYear}
                                    </span>
                                    <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-background transition cursor-pointer">
                                        <ChevronRightIcon className="h-4 w-4 text-foreground" />
                                    </button>
                                </div>

                                {/* Day Names */}
                                <div className="grid grid-cols-7 gap-1 mb-1">
                                    {DAYS_ID.map((d) => (
                                        <div key={d} className="text-center text-[10px] font-bold text-muted uppercase tracking-wider py-1">
                                            {d}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {Array.from({ length: firstDay }).map((_, i) => (
                                        <div key={`empty-${i}`} className="h-9" />
                                    ))}
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const cellDate = new Date(viewYear, viewMonth, day);
                                        const isToday = isSameDay(cellDate, today);

                                        // Determine highlighting
                                        const isStart = isSameDay(cellDate, startDate);
                                        const isEnd = isSameDay(cellDate, endDate);
                                        const isInRange = isBetween(cellDate, startDate, endDate);

                                        // Hover preview range when picking end date
                                        const isHoverInRange = pickStage === 'end' && tempStartDate && hoveredDate
                                            ? isBetween(cellDate, tempStartDate, hoveredDate)
                                            : false;
                                        const isTempStart = pickStage === 'end' && isSameDay(cellDate, tempStartDate);
                                        const isHoverEnd = pickStage === 'end' && isSameDay(cellDate, hoveredDate);

                                        const isEdge = isStart || isEnd || isTempStart || isHoverEnd;
                                        const isMiddle = isInRange || isHoverInRange;

                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => handleSelect(day, close)}
                                                onMouseEnter={() => setHoveredDate(cellDate)}
                                                onMouseLeave={() => setHoveredDate(null)}
                                                className={cn(
                                                    'h-9 w-full rounded-lg text-xs font-semibold transition-all cursor-pointer',
                                                    isEdge
                                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                        : isMiddle
                                                            ? 'bg-primary/10 text-primary rounded-md'
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

                                {/* Selected Range Summary */}
                                {(value.startDate || tempStart) && (
                                    <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] font-bold text-muted uppercase tracking-wider">
                                        <span>
                                            {value.startDate && value.endDate
                                                ? `${formatDisplay(value.startDate)} → ${formatDisplay(value.endDate)}`
                                                : tempStart
                                                    ? `${formatDisplay(tempStart)} → ...`
                                                    : ''}
                                        </span>
                                        {(value.startDate || tempStart) && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onChange?.({ startDate: '', endDate: '' });
                                                    setTempStart('');
                                                    setPickStage('start');
                                                }}
                                                className="text-primary hover:text-primary-hover transition cursor-pointer"
                                            >
                                                Reset
                                            </button>
                                        )}
                                    </div>
                                )}
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
