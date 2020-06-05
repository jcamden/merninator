import React from "react";
import { Modal, Form } from "react-bootstrap";

interface ModalBodyProps {
  formGroups: { id: string; type: string; placeholder: string }[];
  fileLabel?: string;
}

const ModalBody = ({ formGroups, fileLabel }: ModalBodyProps) => {
  return (
    <Modal.Body>
      {formGroups && (
        <Form>
          {formGroups.map((group) => (
            <Form.Group controlId={group.id}>
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control type={group.type} placeholder={group.placeholder} />
            </Form.Group>
          ))}
        </Form>
      )}
      {fileLabel && <Form.File id='custom-file' label={fileLabel} custom />}
    </Modal.Body>
  );
};

export default ModalBody;
