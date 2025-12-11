import './global.css';
import MainHeader from '././components/main-header';
import Footer from '././components/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <MainHeader />
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}