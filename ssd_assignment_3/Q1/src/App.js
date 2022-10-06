import StarContainer from "./star/StarContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";
import CrowContainer from "./crow/CrowContainer";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='gridbox'>
        <div className='container-1'></div>
        <StarContainer />
        <CrowContainer />
      </div>
    </DndProvider>
  );
}

export default App;
