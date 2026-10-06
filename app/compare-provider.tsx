'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Moto } from '@/types/moto';

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

    const addItem = (item: Moto) => {
        setCompareList((prev) => {
            // Evitar duplicados por id
            if (prev.some((m:Moto) => m.id === item.id)) {
                return prev;
            }
            return [...prev, item];
        });
    };

    const removeItem = (id: string) => {
        setCompareList((prev) => prev.filter((item) => item.id !== id));
    };

    const isInCompare = (id: string) => {
        return compareList.some((item) => item.id === id);
    };

    const clearCompare = () => {
        setCompareList([]);
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