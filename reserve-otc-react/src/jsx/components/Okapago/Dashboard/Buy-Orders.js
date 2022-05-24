import {Card} from "react-bootstrap";
import React, {Fragment, useState} from "react";
import IndexedTrades from "./IndexedTrades";
import get from "lodash/get"


export const BuyOrders = (props) => {
    //console.log(props)
    function parsing(number) {
        return parseFloat(number).toFixed(2)
    }

    // console.dir(props.data.trades)

    //Array of Trades
    const arrayTrades = props.data?.trades
    //parsing Status

    const [hide, setHide] = useState(false)


    let bank = props.data?.BS_bankname
    let rsvAccount= props.data.RSV_reserve_account
    //console.log(bank)
    return (
        <Fragment>
            <Card.Body>
                <div className="row">
                    <div className="col fc-BlueSec">
                        RSV: {rsvAccount}
                        <br/>
                        {bank}
                    </div>


                    <div className="col fc-BlueSec">

                        {props.data.order_type === "1" ?
                            "Vendidos " : "Comprados "
                        } <p className={"fc-Green fs-12 inlineBlock"}>{parsing(props.data.current_amount)} RSV</p>

                    </div>

                    <div className="col fc-BlueSec">
                        <p>
                            {props.data.order_type === "1" ?
                                "Por Vender : " : "Por Comprar: "
                            } <p className={"fc-LightIBlue fs-12 inlineBlock"}>
                            {parsing(props.data.amount - props.data.current_amount)} RSV</p>
                        </p>
                    </div>
                </div>

                <div className="container-fluid" className={arrayTrades.length === 0 ? "allfinNone" : null}>
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="col-12 tradeDetails">
                                Trades Asociados a Orden <b>{props.data.id}</b>
                            </div>
                            <div className="row justify-content-center borderBottomGreen fc-LightIBlue fs-10">
                                <div className="col-1">
                                    Id
                                </div>
                                <div className="col-1">
                                    RSV
                                </div>
                                <div className="col-1">
                                    Tasa
                                </div>
                                <div className="col-2">
                                    Total
                                </div>
                                <div className="col-2">
                                    Estado
                                </div>
                                <div className="col-2">
                                    Referencia de Pago
                                </div>
                                <div className="col">
                                    Acciones
                                </div>
                            </div>

                            {
                                arrayTrades.map((trade, id) => (
                                        <IndexedTrades
                                            key={id}
                                            exchange={get(props.data, 'exchange_rate', 1)}
                                            order={props.data}
                                            customer_id={props.customer_id}
                                            setReload = {value => props.setReload(value)}
                                            trade={trade}
                                        />
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="trade-date mt-5">
                    Orden Creada:   {props.data?.created}
                </div>
            </Card.Body>
        </Fragment>
    )
}

export default BuyOrders