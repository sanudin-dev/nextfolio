import Header from "@/ui/layout/header";
import Footer from "@/ui/layout/footer";

export default function BlogLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
