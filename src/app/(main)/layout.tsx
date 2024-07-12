import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import Modals from "@/components/Modal/Modals";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Wrapper>
            <Modals />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="w-full">{children}</main>
            </div>
        </Wrapper>
    );
}
