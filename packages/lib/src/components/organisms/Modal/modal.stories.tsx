import React from "react";
import Modal from "./Modal";

export default {
  title: "organisms/modals",
  component: Modal,
};

const loginForm = [
  { id: "formEmail", type: "email", placeholder: "email" },
  { id: "formPassword", type: "password", placeholder: "password" },
];

const registerForm = [
  { id: "userName", type: "text", placeholder: "username" },
  ...loginForm,
  { id: "confirmPassword", type: "password", placeholder: "confirm password" },
];

const createProjectForm = [
  { id: "projectTitle", type: "text", placeholder: "project title" },
];

export const loginModal = () => (
  <Modal
    heading='Login'
    formGroups={loginForm}
    buttons={[{ title: "Login" }]}
  ></Modal>
);

export const loginModalDark = () => (
  <body className='dark'>
    <Modal
      className='dark'
      heading='Login'
      formGroups={loginForm}
      buttons={[{ title: "Login" }]}
    ></Modal>
  </body>
);

export const registerModal = () => (
  <Modal
    heading='Register'
    formGroups={registerForm}
    buttons={[{ title: "Register" }]}
  ></Modal>
);

export const registerModalDark = () => (
  <Modal
    className='dark'
    heading='Register'
    formGroups={registerForm}
    buttons={[{ title: "Register" }]}
  ></Modal>
);

export const createProjectModal = () => (
  <Modal
    heading='Create Project'
    formGroups={createProjectForm}
    fileLabel='pdf to upload'
    buttons={[{ title: "Create" }]}
  ></Modal>
);

export const createProjectModalDark = () => (
  <Modal
    className='dark'
    heading='Create Project'
    formGroups={createProjectForm}
    fileLabel='pdf to upload'
    buttons={[{ title: "Create" }]}
  ></Modal>
);
