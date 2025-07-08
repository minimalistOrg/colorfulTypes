import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";

import { ColorfulTypes } from './ColorfulTypes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ColorfulTypes />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
