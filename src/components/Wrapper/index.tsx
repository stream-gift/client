"use client";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modals from '../Modal/Modals';

export default function Wrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient();

    return (
        <>
            <Toaster />
            <Modals />
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </>
    );
}
