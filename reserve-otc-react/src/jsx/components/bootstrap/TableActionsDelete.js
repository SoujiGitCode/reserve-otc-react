import React, { Fragment, useState } from 'react'
import { Row, Col, Card, Button, Dropdown, ButtonGroup, Modal } from 'react-bootstrap'
import PageTitle from '../../layouts/PageTitle'

import swal from "sweetalert"
import axios from "axios";

const TableActionsDelete = (props) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const type= props.endpoint;
  const formDelete = {'id':props.query.id}
  let endpoint = 'incoming/delete';
  if (type ==='requests' ) (endpoint = 'request/delete')

  function action(e) {
    switch (e) {
      case false:
        //';
        swal("Registro Eliminado Correctamente", "Eliminado!", "success",{ button: false,});
        handleClose()

        break;
      case true:
        //';
        swal("Error", "Registro no encontrado", "error",{ button: false,});
        handleClose()
        break;
      default:
        return '';
    }
  }

  async function deleteId (endpoint){
    try {
      const response = await axios.post(endpoint, formDelete).then( (res)=>{
       // console.dir(res.data)
        props.method()
         action(res.data.error)
      })
    } catch (e) {

    //  console.dir(e)
     console.log('fail deleteId func :');
    }
  }


  function onAction(e) {
    e.preventDefault()

deleteId(endpoint)

  }
  return (
    <Fragment>
      <button className="btn btn-danger actions-buttons" onClick={handleShow}>
        <i className="flaticon-381-trash-1" />
      </button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={"modalActionsFont"}>Eliminar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-12">¿Está seguro de que desea eliminar este registro?</div>
          <br/>
          <div className="col-12"><b>Id:</b> {props.query.id}</div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary"  onClick={onAction}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default TableActionsDelete
