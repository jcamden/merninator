import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../../molecules/modal/ModalFooter/ModalFooter';
import ModalBody from '../../molecules/modal/ModalBody/ModalBody';

interface ModalWrapperProps {
  heading: string;
  formGroups: { id: string; type: string; placeholder: string }[];
  fileLabel?: string;
  buttons: { title: string }[];
  className?: string;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  heading,
  buttons,
  formGroups,
  fileLabel,
  className,
}: ModalWrapperProps) => {
  const [show, setShow] = useState(true);

  return (
    <Modal className={className} show={show} onHide={(): void => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <ModalBody formGroups={formGroups} fileLabel={fileLabel}></ModalBody>
      <ModalFooter buttons={buttons} />
    </Modal>
  );
};

export default ModalWrapper;
