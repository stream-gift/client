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
                <div className="fixed top-0 left-0 w-full h-full -z-10">
                    <div className="stars"></div>
                    <div className="twinkling"></div>
                </div>
                <main className="w-full">{children}</main>
            </div>
        </Wrapper>
    );
}
