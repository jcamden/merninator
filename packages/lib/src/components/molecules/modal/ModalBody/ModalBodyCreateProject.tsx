import React from "react";
import { Modal, Form } from "react-bootstrap";

interface ModalBodyCreateProjectProps {
  formGroups: { id: string; type: string; placeholder: string }[];
}

const ModalBodyCreateProject = ({
  formGroups,
}: ModalBodyCreateProjectProps) => {
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
          <Form.File id='custom-file' label='Custom file input' custom />
        </Form>
      )}
    </Modal.Body>
  );
};

export default ModalBodyCreateProject;
