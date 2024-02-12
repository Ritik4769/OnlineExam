import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

function ConfirmBoxCompany(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { _id,getRemainingCompany } = props;
  async function deleteFaculty() {
    try {
      const result = await axios.get("http://localhost:3002/admin/deleteCompany", { params: { _id: props._id } })
      getRemainingCompany(result.data.company)
      toggle()
    } catch (error) {
      console.log("Eroor in dleting faculty", error);
    }
  }

  return (
    <div>
      <button type="button" onClick={toggle} className='btn btn-sm btn-outline-danger me-2 d-flex'>Delete</button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <h5> Do you want to remove <b>{props.name}</b> from Company records
          </h5>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteFaculty}>
            Delete Company
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmBoxCompany;