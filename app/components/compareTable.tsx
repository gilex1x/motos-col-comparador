'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Moto } from '@/types/moto';

interface CompareTableProps {
    compareList: Moto[];
    removeItem: (id: string) => void;
}

type RowDef = {
    id: string;
    label: string;
    renderCell: (moto: Moto) => React.ReactNode;
};

type SectionDef = {
    id: string;
    label: string;
    rows: RowDef[];
};

const INITIAL_SECTIONS: SectionDef[] = [
    {
        id: 'sec-general', label: 'General',
        rows: [
            { id: 'brand', label: 'Marca', renderCell: m => m.brandName },
            { id: 'year', label: 'Año', renderCell: m => m.modelYear },
            { id: 'price', label: 'Precio', renderCell: m => `$${m.price.totalEstimatedPrice.toLocaleString('es-CO')}` },
        ]
    },
    {
        id: 'sec-motor', label: 'Motor',
        rows: [
            { id: 'cc', label: 'Cilindraje', renderCell: m => `${m.engine.displacement} cc` },
            { id: 'power', label: 'Potencia', renderCell: m => `${m.engine.maxPowerHp} HP` },
            { id: 'torque', label: 'Torque', renderCell: m => `${m.engine.maxTorqueNm} Nm` },
            { id: 'cooling', label: 'Refrigeración', renderCell: m => m.engine.cooling },
            { id: 'fuel', label: 'Alimentación', renderCell: m => m.engine.fuelSystem },
        ]
    },
    {
        id: 'sec-security', label: 'Seguridad y Frenos',
        rows: [
            { id: 'abs', label: 'ABS', renderCell: m => m.chassis.abs },
            { id: 'front-brake', label: 'Freno Delantero', renderCell: m => m.chassis.frontBrake },
        ]
    },
    {
        id: 'sec-dim', label: 'Dimensiones',
        rows: [
            { id: 'weight', label: 'Peso en seco', renderCell: m => `${m.dimensions.kerbWeightKg} kg` },
            { id: 'tank', label: 'Tanque', renderCell: m => `${m.dimensions.tankCapacityGal} gal` },
        ]
    }
];

const CompareTable = ({ compareList, removeItem }: CompareTableProps) => {
    // Column order state
    const [orderedList, setOrderedList] = useState<Moto[]>(compareList);
    const [draggedColIdx, setDraggedColIdx] = useState<number | null>(null);

    // Row / Section order state
    const [orderedSections, setOrderedSections] = useState<SectionDef[]>(INITIAL_SECTIONS);
    const [draggedSecIdx, setDraggedSecIdx] = useState<number | null>(null);
    const [draggedRowInfo, setDraggedRowInfo] = useState<{ secIdx: number, rowIdx: number } | null>(null);

    // Sync local order with external compareList additions/removals
    useEffect(() => {
        setOrderedList(prev => {
            const currentIds = new Set(compareList.map(c => c.id));
            const prevIds = new Set(prev.map(p => p.id));

            let newOrder = prev.filter(p => currentIds.has(p.id));
            const newItems = compareList.filter(c => !prevIds.has(c.id));
            return [...newOrder, ...newItems];
        });
    }, [compareList]);

    if (orderedList.length === 0) return null;

    // --- Column Handlers ---
    const handleColDragStart = (e: React.DragEvent, index: number) => {
        e.stopPropagation();
        setDraggedColIdx(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleColDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedColIdx === null || draggedColIdx === dropIndex) return;

        const newOrder = [...orderedList];
        const [draggedItem] = newOrder.splice(draggedColIdx, 1);
        newOrder.splice(dropIndex, 0, draggedItem);
        setOrderedList(newOrder);
        setDraggedColIdx(null);
    };

    // --- Section Handlers ---
    const handleSecDragStart = (e: React.DragEvent, index: number) => {
        e.stopPropagation();
        setDraggedSecIdx(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleSecDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedSecIdx === null || draggedSecIdx === dropIndex) return;

        const newSections = [...orderedSections];
        const [draggedItem] = newSections.splice(draggedSecIdx, 1);
        newSections.splice(dropIndex, 0, draggedItem);
        setOrderedSections(newSections);
        setDraggedSecIdx(null);
    };

    // --- Row Handlers ---
    const handleRowDragStart = (e: React.DragEvent, secIdx: number, rowIdx: number) => {
        e.stopPropagation();
        setDraggedRowInfo({ secIdx, rowIdx });
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleRowDrop = (e: React.DragEvent, dropSecIdx: number, dropRowIdx: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (!draggedRowInfo) return;
        
        const { secIdx: dragSecIdx, rowIdx: dragRowIdx } = draggedRowInfo;
        
        // Ensure row doesn't leave its section
        if (dragSecIdx !== dropSecIdx || dragRowIdx === dropRowIdx) {
            setDraggedRowInfo(null);
            return;
        }

        const newSections = [...orderedSections];
        const rowsCopy = [...newSections[dragSecIdx].rows];
        
        const [draggedItem] = rowsCopy.splice(dragRowIdx, 1);
        rowsCopy.splice(dropRowIdx, 0, draggedItem);
        
        newSections[dragSecIdx] = { ...newSections[dragSecIdx], rows: rowsCopy };
        setOrderedSections(newSections);
        setDraggedRowInfo(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnd = () => {
        setDraggedColIdx(null);
        setDraggedSecIdx(null);
        setDraggedRowInfo(null);
    };

    return (
        <div className="w-full overflow-x-auto pb-6">
            <table className="w-full text-left border-collapse min-w-max bg-card rounded-xl shadow-sm overflow-hidden border border-border">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-r border-border bg-secondary min-w-[150px] w-48 sticky left-0 z-20"></th>
                        {orderedList.map((moto, index) => (
                            <th
                                draggable
                                onDragStart={(e) => handleColDragStart(e, index)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleColDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                key={`col-${moto.id}`}
                                className={`p-4 border-b border-border align-top min-w-[250px] max-w-[300px] cursor-grab active:cursor-grabbing transition-opacity ${draggedColIdx === index ? 'opacity-50' : 'opacity-100'}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs opacity-50 pointer-events-none">
                                        <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8M8 15h8" />
                                        </svg>
                                        Mover
                                    </span>
                                    <button
                                        onClick={() => removeItem(moto.id)}
                                        className="text-xs text-zinc-400 hover:text-red-500 transition cursor-pointer"
                                        title="Quitar del comparador"
                                    >
                                        ✕ Quitar
                                    </button>
                                </div>
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-secondary mb-3 pointer-events-none">
                                    <Image
                                        src={moto.featuredImage}
                                        alt={moto.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 300px"
                                    />
                                    <span className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                                        {moto.category}
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold text-foreground leading-tight pointer-events-none">
                                    {moto.name}
                                </h2>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                    {orderedSections.map((section, secIndex) => (
                        <React.Fragment key={section.id}>
                            <tr
                                draggable
                                onDragStart={(e) => handleSecDragStart(e, secIndex)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleSecDrop(e, secIndex)}
                                onDragEnd={handleDragEnd}
                                className={`bg-secondary cursor-grab active:cursor-grabbing transition-opacity ${draggedSecIdx === secIndex ? 'opacity-50' : 'opacity-100'}`}
                            >
                                <td colSpan={orderedList.length + 1} className="p-0 border-y border-border">
                                    <div className="flex items-center sticky left-0 px-4 py-3 bg-secondary">
                                        <span className="mr-2 opacity-40 pointer-events-none">
                                            <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                            </svg>
                                        </span>
                                        <span className="font-bold text-xs uppercase tracking-wider opacity-70 pointer-events-none">
                                            {section.label}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            {section.rows.map((row, rowIndex) => (
                                <tr
                                    key={row.id}
                                    draggable
                                    onDragStart={(e) => handleRowDragStart(e, secIndex, rowIndex)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleRowDrop(e, secIndex, rowIndex)}
                                    onDragEnd={handleDragEnd}
                                    className={`hover:bg-primary/10 transition-colors ${draggedRowInfo?.secIdx === secIndex && draggedRowInfo?.rowIdx === rowIndex ? 'opacity-50 bg-primary/5' : ''}`}
                                >
                                    <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border cursor-grab active:cursor-grabbing">
                                        <div className="flex items-center">
                                            <span className="mr-2 opacity-40 pointer-events-none">
                                                <svg className="w-4 h-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                                </svg>
                                            </span>
                                            <span className="pointer-events-none">{row.label}</span>
                                        </div>
                                    </th>
                                    {orderedList.map(moto => (
                                        <td key={`${moto.id}-${row.id}`} className="px-4 py-3 font-semibold text-foreground pointer-events-none max-w-[200px] truncate" title={typeof row.renderCell === 'function' ? String(row.renderCell(moto)) : ''}>
                                            {row.renderCell ? row.renderCell(moto) : null}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompareTable;
