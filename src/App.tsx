import { HashRouter, Route, Routes } from "react-router-dom";
import { RouterBase } from "@/config/router";
import { lazy, Suspense } from "react";

const HomeLazy = lazy(() => import("@myPages/home"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>加载中...</div>}>
        {/* <div>{<HomeLazy/>}</div> */}
        <HashRouter>
          <Routes>
            <Route path="/" >
              {RouterBase.map((v) => {
                return <Route key={v.name} path={v.path} element={v.childer} />;
              })}
              <Route path="*" element={<div>404~</div>} />
            </Route>
          </Routes>
        </HashRouter>
      </Suspense>
    </div>
  );
}

export default App;
