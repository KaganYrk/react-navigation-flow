import 'reactflow/dist/style.css';
import { ThemeProvider } from './contexts/themeContext';
import Main from './pages/main';
import { ReactFlowProvider } from 'reactflow';
import { BuilderProvider } from './contexts/builderContext';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ReactFlowProvider>
          <ThemeProvider>
            <BuilderProvider>
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                limit={3}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                bodyClassName="toast-body"
                draggable
                pauseOnHover
                theme="dark"
              />
              <Main />
            </BuilderProvider>
          </ThemeProvider>
        </ReactFlowProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default App;
