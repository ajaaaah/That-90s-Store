import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'

import Heading from './Heading.jsx'
import Footer from './Footer.jsx'
import Navigation from './Navigation.jsx'
import Content from './Content.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Heading />
    <Navigation />
    <Content />
    <Footer />
  </StrictMode>,
)
