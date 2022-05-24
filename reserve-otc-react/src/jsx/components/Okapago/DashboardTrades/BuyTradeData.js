import React, {Fragment, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-regular-svg-icons";


const BuyTradeData = (props) => {
    //console.dir(props)
    function parsing(number) {
        return parseFloat(number).toFixed(2)
    }

    const [copied, setCopied] = useState(false)
    const allfinRsv = 'allfin1'

    return(
        <Fragment>

                    <div className="row justify-content-center">
                        <div className="col-12 mb-4 fc-BlueSec">
                            Datos de Pago Bs
                        </div>
                    </div>
                    <div className="d-flex row justify-content-center">

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Banco
                                </div>
                                <div className="col-12">
                                    {props.data?.order[0]?.BS_bankname}
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec ">
                                    Cuenta
                                </div>
                                <div className="col-12 ">
                                    {props.data?.order[0]?.BS_accountnumber}
                                    <CopyToClipboard
                                        text={props.data?.order[0]?.BS_accountnumber}
                                        onCopy={() => setCopied(true)}><span>
                                        <FontAwesomeIcon icon={faCopy} className={"ctc ml-1"}/></span>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec ">
                                    Documento
                                </div>
                                <div className="col-12 ">
                                    {props.data?.order[0]?.BS_RIF}
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Cantidad Bs
                                </div>
                                <div className="col-12">
                                    {parsing(props.data?.amount * props.data?.exchange_rate)} Bs
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Referencia
                                </div>
                                <div className="col-12">
                                    {props.data?.bs_reference}
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Estado de Pago
                                </div>
                                <div className="col-12">

                                </div>
                                <div className="col-12">
                                    {props.data?.deny != 0 && props.data?.bs_status != 2?
                                        <div>
                                            Pago rechazado <br/>
                                            <p className={"fc-Orange"}>
                                                {props.data?.comments}
                                            </p>

                                        </div>
                                        :
                                    {
                                        '2': 'Pago Confirmado',
                                        '1': 'Pago Enviado',
                                        '0': 'Pago no Enviado'
                                    }[props.data?.bs_status]

                                    }
                                </div>
                            </div>
                        </div>

                    </div>


            <div className="row justify-content-center mt-5">
                <div className="col-12 mb-4 fc-Green">
                    Datos de Transferencia RSV
                </div>
            </div>
            <div className="d-flex row justify-content-center">

                <div className="col-2">
                    <div className="row">
                        <div className="col-12 mb-2 fc-Green">
                            Cantidad de RSV
                        </div>
                        <div className="col-12">
                            {props.data.amount}
                        </div>
                    </div>
                </div>


                <div className="col-2">
                    <div className="row">
                        <div className="col-12 mb-2 fc-Green">
                           Cuenta a Recibir
                        </div>
                        <div className="col-12">
                            {props.data?.RSV_reserve_account}
                        </div>
                    </div>
                </div>

                <div className="col-2">
                    <div className="row">
                        <div className="col-12 mb-2 fc-Green">
                            Referencia
                        </div>
                        <div className="col-12">
                            {props.data.rsv_reference}
                        </div>
                    </div>
                </div>

                <div className="col-2">
                    <div className="row">
                        <div className="col-12 mb-2 fc-Green">
                            Estado de Transferencia
                        </div>
                        <div className="col-12">
                            {
                                {
                                    '1': 'RSV Enviado a su cuenta',
                                    '0': 'RSV Custodiado por Allfin'
                                }[props.data?.unlock_status]
                            }

                        </div>
                    </div>
                </div>
            </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-12 mb-2 fc-Orange">
                        Recuerde Enviar el Pago a la brevedad posible
                    </div>
                    <div className="trade-date">
                        Trade Creado:   {props.data.created}
                    </div>
                </div>

        </Fragment>

    )
}

export default BuyTradeData