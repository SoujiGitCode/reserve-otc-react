import React, {Fragment, useEffect, useState} from 'react'
import { Row, Col, Card, Button, Dropdown, ButtonGroup, Modal } from 'react-bootstrap'
import PageTitle from '../../layouts/PageTitle'

import swal from "sweetalert"
import axios from "axios";

const TableActionsDelete = (props) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formValue, setFormValue] = useState({id: props.query.id});
  const [fullData, setFulldata] = useState({id: props.query.id});

  const clonedValue = JSON.parse(JSON.stringify(fullData));


  const type= props.endpoint;
  let endpoint = 'incoming/id/fulldata';
  if (type ==='requests' ) (endpoint = 'request/id/fulldata')

  function action(e) {
    switch (e) {
      case false:
        //';
        swal("Registro Actualizado Correctamente", "Actualiza do!", "success",{ button: false,});
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

  async function dataId (endpoint){
    //console.dir(props.query.id)
  //console.log(type)
    try {
      const response = await axios.post(endpoint, {id: props.query.id}).then( (res)=>{

        setFulldata(res.data)

      })
    } catch (e) {

      //  console.dir(e)
      console.log('fail dataId func :');
    }
  }


  function onAction(e) {
    e.preventDefault()

    dataId(endpoint).then( (res)=>{
   handleShow()
    })
  }

  function statusChange(e) {
    setFormValue((formValue) => ({
      ...formValue,
      status: e,
    }))
  }

  return (
      <Fragment>
        <button className="btn btn-info actions-buttons" onClick={onAction}>
        Datos
        </button>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={"modalActionsFont"}>Datos del Registro Seleccionado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br/>
            <div className="col-12"><b>Id:</b> {clonedValue.id}</div>
            <div className="col-12"><b>Fecha:</b> {clonedValue.date}</div>
            <div className="col-12"><b>Hora:</b> {clonedValue.time}</div>
            <div className="col-12"><b>Nombre:</b> {clonedValue.holder}</div>

            <div className="col-12"><b>USD $:</b> {clonedValue.amount}</div>
            <div className="col-12"><b>Referencia:</b> {clonedValue.reference}</div>
            <div className="col-12"><b>External Id:</b> {clonedValue.external_id}</div>


            <div className="col-12" ><b>Batch Id:</b> {clonedValue.bach_id}</div>
            <div className="col-12"><b>Estado:</b> {clonedValue.status}</div>
            <div className="col-12"><b>Descripción:</b> {clonedValue.description}</div>




          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Volver
            </Button>

          </Modal.Footer>
        </Modal>
      </Fragment>
  )
}

export default TableActionsDelete
