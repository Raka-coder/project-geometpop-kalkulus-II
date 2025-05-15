// Importing libraries
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { MathJaxContext } from 'better-react-mathjax';

// importing ui
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

// Importing components
import { LayoutWithNavbar } from '@/components/LayoutWithNavbar';
import { LayoutWithoutNavbar } from '@/components/LayoutWithoutNavbar';
import Loader from './components/ui/loader';

// Importing pages
const Home = lazy(() => import('@/pages/Home'));
const ModelingPage = lazy(() => import('@/pages/ModelingPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const QuizPage = lazy(() => import('@/pages/QuizPage'));
const HelpPage = lazy(() => import('@/pages/HelpPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const queryClient = new QueryClient();

const config = {
  loader: { load: ['input/tex', 'output/chtml'] },
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
  },
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MathJaxContext version={3} config={config}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <main>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route element={<LayoutWithNavbar />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/modeling" element={<ModelingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                </Route>
                <Route element={<LayoutWithoutNavbar />}>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </MathJaxContext>
  </QueryClientProvider>
);

export default App;
