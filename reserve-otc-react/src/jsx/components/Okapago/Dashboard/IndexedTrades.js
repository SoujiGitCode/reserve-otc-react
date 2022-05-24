import React, {Fragment, useEffect} from "react";
import {Card} from "react-bootstrap";
import ConfirmAlert from "./Confirm";
import axios from "axios";
import BuyOrderSendPay from "./Buy-SendPay";
import get from "lodash/get"

function IndexedTrades(props) {

   // console.log(props)
    function parsing(number) {
        return parseFloat(number).toFixed(2)
    }

    //parsing Status

    let status = props.trade.status
    switch (status) {
        case '0':
            status = "RSV del vendedor pendiente"
            break;
        case '1':
            switch ( props.trade?.bs_status) {
                case '0':
                    status = "Pago Pendiente"
                    break
                case '1':
                    status = "Pago Enviado"
                    break
                case '2':
                    status = "Pago Confirmado"
                    break
            }
            break;
        case '2':
            status = "Esperando Liberación"
            break;
        case '3':
            status = "RSV Recibido"
            break;
        case '20':
            status = "Eliminado"
            break;
        default:
    }


    return (
        <Fragment>

            <div className="row justify-content-center borderBottomGreen align-items-center fs-10">
                <div className="col-1">
                    {props.trade.id}
                </div>
                <div className="col-1">
                    {props.trade.amount}
                </div>
                <div className="col-1">
                    {props?.order?.exchange_rate}
                </div>
                <div className="col-2">
                    {parsing(props.trade.amount * props.exchange)} Bs
                </div>
                <div className="col-2 fs-10">
                    {status}
                </div>
                <div className="col-2 fs-10">
                    {props.trade?.bs_reference}
                </div>


                <div className="col">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-6">
                            {props.trade.status ==1 && props.trade.bs_status== 0 ?
                                <BuyOrderSendPay
                                    total={parsing(props.trade.amount * props.exchange)}
                                    customer_id={props.customer_id}
                                    order ={props.order}
                                    trade={props.trade}
                                    setReload={val => props.setReload(val)}
                                    setLoader={val => props.setLoader(val)}
                                    confirmData={props.confirmData}

                                />
                                :
                                <Fragment>
                                    {(() => {
                                        switch (props.trade?.bs_status) {
                                            case '0':
                                                return <button className={"btnSmall fc-Blue"}>Pago Pendiente</button>
                                            case '1':
                                                return     <button className={"btnSmall fc-Blue"}>
                                                    Esperando Confirmación
                                                </button>
                                            case '2':
                                                return       <button className={"btnSmall fc-Gold"}>
                                                    Pago Confirmado
                                                </button>
                                            default:
                                                return null
                                        }
                                    })()}
                                </Fragment>

                            }

                        </div>
                        <div className="col-4">
                            <button className={"btnSmall fc-Orange"}>
                                Disputa
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </Fragment>
    );
}

export default IndexedTrades