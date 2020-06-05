import React from "react";
import DjNavbar from "./DjNavbar";

export default {
  title: "organisms",
  component: DjNavbar,
};

export const navbar = () => (
  <>
    <DjNavbar user='' />
    <p className='bg-light'> </p>
    <div className='dark'>
      <DjNavbar light authd user='John Camden' />
    </div>
  </>
);
