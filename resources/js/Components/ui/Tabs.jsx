import React, { createContext, useContext } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { cn } from '@/lib/utils';

const TabsContext = createContext({ variant: 'default' });

export function Tabs({ className = '', variant = 'default', children, ...props }) {
    return (
        <TabsContext.Provider value={{ variant }}>
            <TabGroup className={cn('w-full flex flex-col gap-2', className)} {...props}>
                {children}
            </TabGroup>
        </TabsContext.Provider>
    );
}

export function TabsList({ className = '', children, ...props }) {
    const { variant } = useContext(TabsContext);
    
    return (
        <TabList
            className={cn(
                variant === 'line'
                    ? 'inline-flex items-center border-b border-border/80 w-full justify-start gap-6 bg-transparent rounded-none h-11 p-0 text-muted-foreground'
                    : 'inline-flex h-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-zinc-900/60 p-1 text-muted-foreground border border-border/40',
                className
            )}
            {...props}
        >
            {children}
        </TabList>
    );
}

export function TabsTrigger({ className = '', children, ...props }) {
    const { variant } = useContext(TabsContext);

    return (
        <Tab
            className={({ selected }) =>
                cn(
                    'inline-flex items-center justify-center whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none relative h-full',
                    variant === 'line'
                        ? cn(
                              'px-1 py-3 border-b-2 bg-transparent text-muted-foreground hover:text-foreground',
                              selected 
                                  ? 'border-primary text-primary dark:text-red-400 font-extrabold' 
                                  : 'border-transparent'
                          )
                        : cn(
                              'rounded-lg px-4 py-1.5',
                              selected
                                  ? 'bg-card text-foreground shadow-sm ring-1 ring-border/20'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-slate-200/50 dark:hover:bg-zinc-800/40'
                          ),
                    className
                )
            }
            {...props}
        >
            {children}
        </Tab>
    );
}

export function TabsContent({ className = '', children, ...props }) {
    return (
        <TabPanels className="w-full focus-visible:outline-none">
            <TabPanel
                className={cn(
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 mt-2',
                    className
                )}
                {...props}
            >
                {children}
            </TabPanel>
        </TabPanels>
    );
}

