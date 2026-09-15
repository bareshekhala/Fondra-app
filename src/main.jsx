import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@/context/theme-provider.jsx';
import { AuthWrapper } from '@/context/auth.context.jsx';

// cool function that refreshes the console when changing the code. thanks to Tim!
if (import.meta.hot) {
  import.meta.hot.on(
    "vite:beforeUpdate",
    () => console.clear()
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ThemeProvider>
    <AuthWrapper>
    <App />
    </AuthWrapper>
    </ThemeProvider>
  </BrowserRouter>,
)
