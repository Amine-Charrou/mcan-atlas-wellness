import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Welcome } from "./pages/Welcome";
import { Auth } from "./pages/Auth";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState("welcome");

  // Reset to welcome page when user signs out
  useEffect(() => {
    if (!user && !loading) {
      setCurrentPage("welcome");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show the main app
  if (user) {
    return <Index />;
  }

  // If user is not authenticated, show welcome/auth flow
  const renderPage = () => {
    switch (currentPage) {
      case "welcome":
        return <Welcome onNavigate={setCurrentPage} />;
      case "auth":
        return <Auth onNavigate={setCurrentPage} />;
      default:
        return <Welcome onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
