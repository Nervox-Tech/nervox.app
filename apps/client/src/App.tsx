import { Suspense } from "react"
import { Layout } from "./shared/layout/Layout"
import {BrowserRouter } from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
   <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
    <Layout>
        <AppRoutes />
    </Layout>
      </BrowserRouter>
   </Suspense>
  )
}

export default App
