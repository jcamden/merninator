import React from 'react';
import { Navbar } from 'react-bootstrap';

interface BrandProps {}

const Brand = (props: BrandProps) => {
  return (
    <Navbar.Brand href="#home">
      <img className="logo-img" alt="no ordinary lamp" src={'https://localhost:5000/djinndexLogo.svg'} />
      <span className="font-logo h4 text-warning ml-1">Merninator by Djinndex</span>
    </Navbar.Brand>
  );
};

export default Brand;
