import React, {Fragment, useEffect} from "react";
import {Card} from "react-bootstrap";
import ConfirmAlert from "./Confirm";
import axios from "axios";
import BuyOrderSendPay from "./Buy-SendPay";
import get from "lodash/get"
import Reference from "../DashboardTrades/Reference";
import Confirm from "./Confirm";
import Deny from "./Deny";

function SellIndexedTrades(props) {

   // console.log(props)
    function parsing(number) {
        return parseFloat(number).toFixed(2)
    }

    //parsing Status

    let status =''
    switch (props.trade?.status) {
        case '0':
            status = "Esperando pago"
            break;
        case '1':
            status = "Pago Recibido"
            break;
        case '2':
            status = "Pago Confirmado"
            break;
        case '3':
            status = "Cerrado"
            break;
        default:
    }

    const confirmData = {customer_id: props.customer_id, trade_id: props.trade.id, reference: props.trade.bs_reference}
    const denyData = {customer_id: props.customer_id, trade_id: props.trade.id, reference: props.trade.bs_reference,
        comments: ""}

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
                    {props.trade.bs_reference}
                </div>


                <div className="col">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-6">
                            {props.trade?.bs_status == 1 &&
                            <div className="inlineBlock">
                                <Confirm confirmData={confirmData} setReload={val => props.setReload(val)}
                                         setLoader={val => props.setLoader(val)}/>

                                <Deny denyData={denyData} setReload={val => props.setReload(val)}
                                         setLoader={val => props.setLoader(val)}/>
                            </div>
                            }

                            {props.trade?.bs_status == 0 &&
                            <div className="">
                                <button className={"btnSmall fc-Blue"}>
                                    Esperando Pago
                                </button>
                            </div>
                            }

                            {props.trade?.status == 3  &&
                            <div className="">
                                <button className={"btnSmall fc-Gold"}>
                                   Cerrado
                                </button>
                            </div>
                            }

                            {props.trade?.status == 2  &&
                            <div className="">
                                <button className={"btnSmall fc-Gold"}>
                                    Esperando Cierre
                                </button>
                            </div>
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

export default SellIndexedTrades