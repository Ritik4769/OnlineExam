import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

function DeleteGallery(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
//   const { getRemainingfaculty } = props;
  async function deleteGallery() {
    try {
      const result = await axios.get("http://localhost:3002/admin/deleteGallery", { params: { id: props.id } })
    //   getRemainingfaculty(result.data.Records)
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
          <h5> Do you want to Delete <b>{props.name}</b> from Gallery 
          </h5>
          
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteGallery}>
            Delete
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteGallery;