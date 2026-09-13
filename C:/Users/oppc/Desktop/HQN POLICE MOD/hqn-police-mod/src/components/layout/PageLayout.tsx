import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export interface PageLayoutProps {
  children: React.ReactNode;
  showStatusBar?: boolean;
}

export function PageLayout({ children, showStatusBar = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
