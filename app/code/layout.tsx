import "../globals.css";
export const metadata = {
    title: "ConfidentSpeak | Code Test",
    description: "Where AI meets Confident Communication.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {/* <Navbar /> */}
                {children}
                {/* <Footer /> */}
            </body>
        </html>
    );
}
