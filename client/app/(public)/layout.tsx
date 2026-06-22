import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageWrapper from "@/components/shared/PageWrapper";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </PageWrapper>
  );
}
