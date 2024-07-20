import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            id="dashboard"
            className="flex min-h-[calc(100dvh-80px)]"
        >
            <Sidebar />
            <div className="p-16 max-lg:p-4">{children}</div>
        </div>
    )
}