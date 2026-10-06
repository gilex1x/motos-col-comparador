import React from "react";

export default function ListItems({ children }: { children: React.ReactNode }) {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 list-none p-0 w-full mt-8">
            {children}
        </ul>
    );
}