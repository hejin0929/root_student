import { HashRouter } from "react-router-dom";
import { RouterBase } from "@/config/router";
import { Suspense } from "react";
import RenderContext from "@store/index";

function App() {
  return (
    <div>
      <Suspense fallback={<div>加载中...</div>}>
        <HashRouter>
          <RenderContext>
            <RouterBase />
          </RenderContext>
        </HashRouter>
      </Suspense>
    </div>
  );
}

export default App;
