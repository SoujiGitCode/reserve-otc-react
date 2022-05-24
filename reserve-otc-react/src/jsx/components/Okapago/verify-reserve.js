import React, {useEffect, useMemo, useState, Fragment} from 'react'
import PageTitle from "../../layouts/PageTitle"
import axios from 'axios'
import swal from "sweetalert"
import withReactContent from 'sweetalert2-react-content'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { css } from "@emotion/react"
import Loader from "react-spinners/PacmanLoader"
import swal2 from "sweetalert2";
import { CheckCircleFill } from 'react-bootstrap-icons';
import { XCircleFill } from 'react-bootstrap-icons';



export const VerifyReserve= () => {

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
    const [requestStatus, setRequestStatus] = useState('nuevo');
    const [defaultAlert, setDefaultAlert] = useState(true);
    const clonedStatus= JSON.parse(JSON.stringify(requestStatus));
    const [reserve, setReserve] = useState('nuevo');
    const [error, setError] = useState(false);
    const [id, setId] = useState(0);
    const [code, setCode] = useState('none')
    const [verify, setVerify] = useState(true)


    const postData = {amount, name, reference, transfer_type:2, customer_id: 2, external_id: "okapagoApp", currency_id: 2,
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


    const delay = ms => new Promise(res => setTimeout(res, ms));

    function parseCode (code)  {
        switch (code) {
            case 1:
                setCode('Verificado satisfactoriamente')
                break;
            case 2:
                setCode('Monto errado, verificar nuevamente')
                break;
            case 3:
                setCode('Registro duplicado')
                break;

            case 4:
                setCode('Carlos dime que coloco aca')
                break;

            default:
                setCode('Registro no encontrado')
        }

    }


    async function verifyResponse(response) {

        switch (response) {
            case 'confirmed':

                await showModal().then(async (res) => {
                    //console.dir(res.data.reserve.description)

                    await axios.post(`/request/save`, postData,).then( async (res) => {
                        //setLoader(false)
                        //console.dir(res.data.reserve.description)
                        parseCode(res.data.reserve?.code)
                        setReserve(res.data.reserve?.description)
                        setError(res.data.error)
                        setId(res.data?.id)
                        setVerify(false)
                    });


                });



                //await delayedRequest()
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
            <PageTitle activeMenu="RSV" motherMenu="Requests" />
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Validar RSV </h4>
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

                <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Cargando Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {verify ?
                            <Fragment>
                                <div className={"row justify-content-center"}>
                                    <p>Verificando Transacción en el Sistema</p>
                                    <div className={"col-12 preloaderDiv"}>
                                        <Loader color={color} loading={loader} size={20} />
                                    </div>
                                    Espere unos Segundos. <br/>
                                </div>
                            </Fragment>
                            :
                            <Fragment>
                                <div className={"row justify-content-center"}>

                                    {error
                                        ?  <XCircleFill color="#efefef" size={36}/>
                                        :  <CheckCircleFill color="#13B497" size={36}/>}

                                </div>
                                <div className={"row justify-content-center"}>
                                    <br/>
                                    Estado Reserve:   {code}
                                    <br/>
                                    <br/>
                                    {error
                                        ?  'Estado Okapago:  Nuevo'
                                        :  'Estado Okapago:  Completado'}
                                </div>
                            </Fragment>
                        }

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
export default VerifyReserve;