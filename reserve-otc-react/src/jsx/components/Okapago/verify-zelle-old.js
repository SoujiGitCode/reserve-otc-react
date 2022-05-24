import React, {useMemo, useState} from 'react'
import PageTitle from "../../layouts/PageTitle"
import axios from 'axios'
import swal from "sweetalert"
import withReactContent from 'sweetalert2-react-content'

import { css } from "@emotion/react"
import HashLoader from "react-spinners/HashLoader"
import swal2 from "sweetalert2";




export const VerifyZelle= () => {

    let [loader, setLoader] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [reference, setReference] = useState('');

    const today= new Date();


const preloader = <HashLoader color={color} loading={loader} size={150} />

    function onVerify(e) {
        e.preventDefault()
        const postData = {amount, name, reference, customer_id: 2, external_id: "okapagoApp", currency_id: 2,
            description:"randomdesc", date: today.toLocaleDateString('en-US')};
        let response = ''


        if(reference!=="" && amount!=="" && name!==""){
            response='confirmed'
        }else {response='failed'}

        verifyResponse(response)
        return axios.post(`/request/save`, postData,);

    }

     function verifyResponse(response) {

        switch (response) {
            case 'confirmed':
                //';
                swal("Transacción Registrada", "Validado!", "success",{ button: false,});
                setName('')
                setAmount('')
                setReference('')
                break;
            case 'failed':
                //';
                swal("Faltan Datos - No es posible Registrar", "Verificar los datos ingresados", "error",{ button: false,});
                break;
            case 'pending':
                //';
                swal("Estatus de Transacción", "Pendiente", "info",{ button: false,});
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

                <div className="col-12 my-5 text-center"><h4>Formulario de Validacion</h4></div>
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
            </div>
        </>
    )

}
export default VerifyZelle;