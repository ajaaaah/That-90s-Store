// src/Layout.jsx
import Heading from './Heading';
import Footer from './Footer';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Heading />
      <Navigation />
      <main>
        <Outlet /> {/* This renders the matched page */}
      </main>
      <Footer />
    </>
  );
}