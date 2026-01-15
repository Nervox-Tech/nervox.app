import { Layout } from './shared/layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './shared/components/common/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="nervox-ui-theme">
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
