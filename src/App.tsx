import { HashRouter } from "react-router-dom";
import { RouterBase } from "@/config/router";
import { Suspense } from "react";

function App() {
  return (
    <div>
      <Suspense fallback={<div>加载中...</div>}>
        <HashRouter>
          <RouterBase />
        </HashRouter>
      </Suspense>
    </div>
  );
}

export default App;
