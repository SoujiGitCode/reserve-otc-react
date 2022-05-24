import React, {useEffect, useMemo, useState} from 'react'
import PageTitle from "../../layouts/PageTitle"
import axios from 'axios'
import swal from "sweetalert"
import withReactContent from 'sweetalert2-react-content'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { css } from "@emotion/react"
import Loader from "react-spinners/PacmanLoader"
import swal2 from "sweetalert2";



export const VerifyZelle= () => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        resetFields()
    };
    const handleShow = () => setShow(true);
    const resetFields= () => {
        setName('')
        setAmount('')
        setReference('')
    };


    let [loader, setLoader] = useState(true);
    let [color, setColor] = useState("#0f917a");

    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [reference, setReference] = useState('');

    const today= new Date();

    const [fullData, setFulldata] = useState({code: "",});

    const clonedValue = JSON.parse(JSON.stringify(fullData));

    const [requestStatus, setRequestStatus] = useState('nuevo');
    const [defaultAlert, setDefaultAlert] = useState(true);
    const clonedStatus= JSON.parse(JSON.stringify(requestStatus));




    const postData = {amount, name, reference, transfer_type:0, customer_id: 2, external_id: "okapagoApp", currency_id: 2,
        description:"randomdesc", date: today.toLocaleDateString('en-US')};

    function onVerify(e) {
        e.preventDefault()
        let response = ''
        if(reference!=="" && amount!=="" && name!==""){
            response='confirmed'
        }else {response='failed'}

        verifyResponse(response)
    }

    async function showModal(){
        try {
            handleShow()
        } catch (e) {
            console.log('fail showModal:');
        }
    }

    async function lastRef (){

        const endpoint= 'request/lastref';
    console.dir(fullData)
        try {
            const response = await axios.post(endpoint, fullData).then( (res)=>{
               // console.dir(res.data.data[0].status)
                let responseStatus= res.data.data[0].status;
                if (responseStatus !== 'nuevo') {
                    setRequestStatus(responseStatus)
                }
            })
        } catch (e) {
            console.log('fail customSearchRef func :');
        }
    }

    useEffect(() => {
        (
            async () => {
                try {
                  setFulldata({code: reference})
                } catch (e) {
                    console.log(e)
                    console.log('fail reference useEffect');
                }

            }
        )()
    }, [reference]);

    useEffect(() => {
        (
            async () => {
                try {

                    if (requestStatus !== 'nuevo') {
                        handleClose()
                        setDefaultAlert(false)
                        await swal("Transacción Procesada", "Estado Actual: "+requestStatus, "success", {button: false,});


                    }

                } catch (e) {
                    console.log(e)
                    console.log('fail requestStatus useEffect');
                }

            }
        )()
    }, [requestStatus]);

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const delayedRequest= async () => {
        await delay(3000);
        await lastRef().then()
        await delay(3000);
        await lastRef().then()
        await delay(3000);
        await lastRef().then( (res)=>{
            handleClose()
            if (clonedStatus === 'nuevo' && defaultAlert===true) {
                console.log('clonedStatus es '+clonedStatus)
                handleClose()
                swal("Transacción Registrada", "Estado Actual!!: "+requestStatus, "success", {button: false,});
            }
        })


        //revisar esto porque lo esta tomando desde antes de que se e ejecuten las otras funciones
        //por eso toma el status nuevo desde el inicio, hay que colocar este codigo dentro del ultimo then

    };

    async function verifyResponse(response) {

        switch (response) {
            case 'confirmed':
                //';
                //swal("Transacción Registrada", "Validado!", "success",{ button: false,});

                axios.post(`/request/save`, postData,);

                await showModal().then(
                   // lastRef
                )
                await delayedRequest()
                break;
            case 'failed':
                //';
                swal("Faltan Datos - No es posible Registrar", "Verificar los datos ingresados", "error", {button: false,});
                break;
            case 'pending':
                //';
                swal("Estatus de Transacción", "Pendiente", "info", {button: false,});
                break;
            default:
                return '';
        }
    }


    return(
        <>
            <PageTitle activeMenu="Zelle" motherMenu="Requests" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Validar Zelle </h4>
                </div>

            </div>
            <div className="container">

                <div className="col-12 my-5 text-center"><h4>Formulario de Validación</h4></div>
            < form  onSubmit={onVerify} className="row align-content-center justify-content-center">

                    <div className="row justify-content-center">

                        <div className="col-md-5 input-group mb-4">
                            <input className={'col-12 form-control verifyInput mb-5'} type="text" name={'name'}
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>

                            <label className={'col-12 text-center'} htmlFor="name"><h5>Nombre del Titular</h5></label>
                        </div>

                        <div className="col-md-3 input-group mb-4">

                            <div className="col-12 dollar">
                                <input className={'form-control verifyInput mb-5'} type="number" name={'amount'}
                                       value={amount}
                                       onChange={(e) => setAmount(e.target.value)}/>
                            </div>

                            <label className={'col-12 text-center'} htmlFor="amount"><h5>Cantidad USD</h5></label>
                        </div>

                        <div className="col-md-3 input-group mb-4">
                            <input className={'col-12 form-control verifyInput mb-5'} type="text" name={'reference'}
                                   value={reference}
                                   onChange={(e) => setReference(e.target.value)}/>
                            <label className={'col-12 text-center'} htmlFor="reference"><h5>Referencia</h5></label>
                        </div>

                    </div>
                    <div className="row justify-content-center my-4">
                        <input className={'btn btn-oka-submit'}  type="submit" value={'Validar'}/>
                    </div>
            </form>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cargando Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row justify-content-center"}>
                            <p>

                                Verificando Transacción en el Sistema
                            </p>
                            <div className={"col-12 preloaderDiv"}>
                                <Loader color={color} loading={loader} size={20} />
                            </div>
                            Espere unos Segundos. <br/>
                        </div>

                    </Modal.Body>
                    <Modal.Footer className={"justify-content-center"}>
                        <Button variant="primary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    )

}
export default VerifyZelle;