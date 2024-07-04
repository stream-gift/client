import Wrapper from "@/components/Wrapper";

export default function DonationEventLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Wrapper>{children}</Wrapper>;
}
