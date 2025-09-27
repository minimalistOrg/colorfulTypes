import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

import { ColorfulTypes } from './ColorfulTypes.tsx'
import { CodeBubble } from './ui/CodeBubbles/CodeBubble.tsx';
import { CodeMap } from './ui/CodeMap.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ColorfulTypes />} />
        <Route path="/codemap/:org/:repo" element={<CodeMap />} />
        <Route path="/codebubbles/:org/:repo" element={<CodeBubble />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
