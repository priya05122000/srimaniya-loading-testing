"use client";
import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface LoaderContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoaderContext = createContext<LoaderContextType>({
    loading: false,
    setLoading: () => { },
});

export const useGlobalLoader = () => useContext(LoaderContext);

export default function GlobalLoaderProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true); // start with loading: true

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    );
}
