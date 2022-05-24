import React, {Fragment, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-regular-svg-icons";


const SellTradeData = (props) => {

    const [copied, setCopied] = useState(false)
    const allfinRsv = 'allfin1'

    return(
        <Fragment>
                    <div className="row justify-content-center">
                        <div className="col-12 mb-4 fc-BlueSec">
                            Datos de Transferencia RSV
                        </div>
                    </div>


                    <div className="d-flex row justify-content-center">

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Cantidad de RSV
                                </div>
                                <div className="col-12">
                                    {props.data.amount}
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec ">
                                    Cuenta
                                </div>
                                <div className="col-12 ">
                                    Allfinpayments1
                                    <CopyToClipboard
                                        text={"Allfinpayments1"}
                                        onCopy={() => setCopied(true)}><span>
                                        <FontAwesomeIcon icon={faCopy} className={"ctc ml-1"}/></span>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Referencia
                                </div>
                                <div className="col-12">
                                    {props.data.rsv_reference}
                                </div>
                            </div>
                        </div>

                        <div className="col-2">
                            <div className="row">
                                <div className="col-12 mb-2 fc-BlueSec">
                                    Estado de Transferencia
                                </div>
                                <div className="col-12">
                                    {
                                        {
                                            '2': 'Referencia Validada',
                                            '0': 'Referencia Invalida'
                                        }[props.data?.rsv_status]
                                    }

                                </div>
                            </div>
                        </div>
                    </div>


                <div className="d-flex row justify-content-center mt-5">
                    <div className="col-12 mb-4 fc-Green">
                        Datos de Pago Recibido
                    </div>
                </div>

                <div className="row justify-content-center ">
                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Banco
                            </div>
                            <div className="col-12">
                                {props.data?.BS_bankname}
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Cuenta
                            </div>
                            <div className="col-12">
                                {props.data?.bs_accountnumber}
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Referencia
                            </div>
                            <div className="col-12">
                                {props.data?.bs_reference}
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Cantidad Bs
                            </div>
                            <div className="col-12">
                                {
                                    {
                                        '2': props.data?.amount * props.data.exchange_rate,
                                        '1': props.data?.amount * props.data.exchange_rate,
                                        '0': '  '
                                    }[props.data?.bs_status]
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 mb-2 fc-Green">
                                Estado
                            </div>
                            <div className="col-12">
                                {
                                    {
                                        '2': ' Pago Confirmado',
                                        '1': ' Pago Enviado',
                                        '0': ' Pago no Recibido'
                                    }[props.data?.bs_status]
                                }
                            </div>
                        </div>
                    </div>


                </div>


                <div className="row justify-content-center mt-5">
                    <div className="col-12 mb-2 fc-Orange">
                        Recuerde Enviar la Referencia RSV a la brevedad posible
                    </div>

                    <div className="trade-date">
                        Trade Creado:   {props.data.created}
                    </div>
                </div>


        </Fragment>

    )
}

export default SellTradeData