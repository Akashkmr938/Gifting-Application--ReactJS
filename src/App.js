import React from 'react';
import Header from './app/features/core/header/header';
import Footer from './app/features/core/footer/footer';
import Layout from './app/features/core/Layout/layout';
import { BrowserRouter } from 'react-router-dom';

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Layout />
      <Footer />
    </BrowserRouter>
  )
}

export default App;