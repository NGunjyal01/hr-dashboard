import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
