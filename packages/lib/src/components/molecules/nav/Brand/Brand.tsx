import React from "react";
import { Navbar } from "react-bootstrap";

interface BrandProps {}

const Brand = (props: BrandProps) => {
  return (
    <Navbar.Brand href='#home'>
      <img
        alt='no ordinary lamp'
        src={process.env.PUBLIC_URL + "/djinndex-logo-final.svg"}
      />
      <span className='font-logo h4 text-warning ml-1'>Djinndex</span>
    </Navbar.Brand>
  );
};

export default Brand;
