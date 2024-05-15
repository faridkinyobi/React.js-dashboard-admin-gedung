import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { listen } from "./redux/listen";
import AppRoutes from "./Routers/index";
function App() {
  useEffect(() => {
    listen();
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
