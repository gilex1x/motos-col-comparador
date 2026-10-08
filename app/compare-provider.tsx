'use client';

import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { Moto } from '@/types/moto';
import Link from 'next/link';

interface CompareContextType {
    compareList: Moto[];
    addItem: (item: Moto) => void;
    removeItem: (id: string) => void;
    isInCompare: (id: string) => boolean;
    clearCompare: () => void;
}

export const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
    const [compareList, setCompareList] = useState<Moto[]>([]);
    const [toastItem, setToastItem] = useState<{name: string, added: boolean} | null>(null);
    const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

    const showToast = (name: string, added: boolean) => {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToastItem({name, added});
        toastTimerRef.current = setTimeout(() => setToastItem(null), 3000);
    }

    const addItem = (item: Moto) => {
        setCompareList((prev) => {
            if (prev.some((m:Moto) => m.id === item.id)) return prev;
            showToast(item.name, true);
            return [...prev, item];
        });
    };

    const removeItem = (id: string) => {
        const itemToRemove = compareList.find(m => m.id === id);
        if (itemToRemove) showToast(itemToRemove.name, false);
        setCompareList((prev) => prev.filter((item) => item.id !== id));
    };

    const isInCompare = (id: string) => {
        return compareList.some((item) => item.id === id);
    };

    const clearCompare = () => {
        setCompareList([]);
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToastItem(null);
    };

    return (
        <CompareContext.Provider
            value={{
                compareList,
                addItem,
                removeItem,
                isInCompare,
                clearCompare,
            }}
        >
            {children}
            {toastItem && (
                <div className="fixed bottom-6 right-6 z-50 bg-card border border-border shadow-lg px-4 py-3 rounded-xl flex flex-col gap-1 transition-all">
                    <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                        {toastItem.added ? '✅ Agregada' : '🗑️ Eliminada'}
                    </p>
                    <p className="text-xs opacity-70">{toastItem.name}</p>
                    {compareList.length > 0 && (
                        <Link href="/comparador" className="text-xs text-primary font-bold hover:underline mt-1 block">
                            Ver comparador ({compareList.length}) →
                        </Link>
                    )}
                </div>
            )}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare debe ser usado dentro de un CompareProvider');
    }
    return context;
};