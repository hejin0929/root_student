import { HashRouter } from "react-router-dom";
import { RouterBase } from "@/config/router";
import { Suspense } from "react";
import RenderContext from "@store/index";
import GloBalLoading from "@/widgets/loading";

function App() {
  return (
    <div>
      <Suspense fallback={<GloBalLoading />}>
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
