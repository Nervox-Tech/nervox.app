import { Suspense } from "react"
import { Layout } from "./shared/layout/Layout"
import {BrowserRouter } from 'react-router-dom';

function App() {

  return (
   <Suspense fallback={<div>Loading...</div>}>
    <Layout>
      <BrowserRouter>
        {/* Your routes and components go here */}
      </BrowserRouter>
    </Layout>
   </Suspense>
  )
}

export default App
