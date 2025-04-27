import { useState } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "./components/CodeEditor";
import ProblemInput from "./components/ProblemInput";
import ChatArea from "./components/ChatArea";

export default function App() {
  const [problemText, setProblemText] = useState("");
  const [codeText, setCodeText] = useState("");

  return (
    <div className="w-screen h-screen p-4 bg-gray-200">
      <PanelGroup direction="vertical">
        <Panel defaultSize={30} minSize={20}>
          <ProblemInput value={problemText} onChange={setProblemText} />
        </Panel>
        <PanelResizeHandle className="h-1 bg-gray-400 cursor-row-resize" />
        <Panel>
          <PanelGroup direction="horizontal">
            <Panel defaultSize={50} minSize={30}>
              <ChatArea problemText={problemText} codeText={codeText} />
            </Panel>
            <PanelResizeHandle className="w-1 bg-gray-400 cursor-col-resize" />
            <Panel defaultSize={50} minSize={30}>
              <CodeEditor value={codeText} onChange={setCodeText} />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
