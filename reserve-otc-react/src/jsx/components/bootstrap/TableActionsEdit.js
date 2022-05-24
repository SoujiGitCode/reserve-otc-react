import React, { Fragment, useState } from 'react'
import { Row, Col, Card, Button, Dropdown, ButtonGroup, Modal } from 'react-bootstrap'
import PageTitle from '../../layouts/PageTitle'

import swal from "sweetalert"
import axios from "axios";

const TableActionsDelete = (props) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formValue, setFormValue] = useState({
    status: props.query.rawStatus, id: props.query.id });


  const clonedValue = JSON.parse(JSON.stringify(formValue));

  const type= props.endpoint;
  let endpoint = 'incoming/edit';
  if (type ==='requests' ) (endpoint = 'request/edit')

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

  async function editId (endpoint){
    //console.log(props.query.id)
    //console.dir(formEdit)
    try {
      const response = await axios.post(endpoint, {
        status: formValue.status, id: props.query.id }).then( (res)=>{
       // console.dir(res.data)
        props.method()
         action(res.data.error)
      })
    } catch (e) {

    //  console.dir(e)
     console.log('fail editID func :');
    }
  }


  function onAction(e) {
    e.preventDefault()

    editId(endpoint)
  }

  function statusChange(e) {
    setFormValue((formValue) => ({
      ...formValue,
      status: parseInt(e),
    }))
  }

  return (
    <Fragment>
      <button className="btn btn-primary actions-buttons" onClick={handleShow}>
        <i className="flaticon-381-edit-1"></i>
      </button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={"modalActionsFont"}>Eliminar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-12">Actualizar Status del siguiente Registro</div>
          <br/>
          <div className="col-12"><b>Id:</b> {props.query.id}</div>
          <div className="col-12"><b>Status</b> </div>
          <div className="col-12">
            <select name="status" id="" onChange={(e) => statusChange(e.target.value)}
                    defaultValue={props.query.rawStatus}>
              <option value="0">Nuevo</option>
              <option value="1">Procesado</option>
              <option value="2">Completado Exitosamente</option>
              <option value="3">Abortado – Terminado con errores</option>
            </select>
          </div>


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
