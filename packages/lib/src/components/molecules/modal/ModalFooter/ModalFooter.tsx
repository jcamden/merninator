import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ModalFooterProps {
  buttons: { title: string }[];
}

const ModalFooter = ({ buttons }: ModalFooterProps) => {
  return (
    <Modal.Footer>
      {buttons.map((button, index) => (
        <Button
          key={`modalButton${index}`}
          variant='primary'
          type='submit'
          onClick={() => {
            console.log("meow");
          }}
        >
          {button.title}
        </Button>
      ))}
    </Modal.Footer>
  );
};

export default ModalFooter;
