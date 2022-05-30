import React, {Fragment, useEffect, useState, useMemo} from "react";
import {Row, Card, Col, ListGroup, Badge, Tab} from "react-bootstrap";
import axios from "axios";
import Loader from "react-spinners/ClipLoader";
import ConfirmOrder from "./ConfirmOrder";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGavel, faHouse, faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

const CreateBuy = () => {


    //loader vars
    let [loader, setLoader] = useState(true);
  const color = "#1a5a6e"
    //acceder a localstorage para obtener customerid
    const storedData = JSON.parse(localStorage.getItem('userDetails'))
    let customer_id = ''
    if (localStorage.getItem('userDetails') !== null) {
        //console.log(storedData.userData)
        //customerId = storedData.userData.customers[0].id
        customer_id = storedData.userData.customers.id
    } else {
        customer_id = 0
    }
    //console.log(customerId)

    //variables

    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)
    const [formStep, setFormStep] = useState(true)

    //postData Vars

    const [amount, setAmount] = useState([])

    const [exchangeRate, setExchangeRate] = useState('')
    const [reference, setReference] = useState('')
    const [account, setAccount] = useState('')
    const [accountFrom, setAccountFrom] = useState('')
    const [maxTime, setMaxTime] = useState("2")
    const [alias, setAlias] = useState('')


    const postData = {order_type: "0", customer_id: customer_id ,rsv_account_id: account, bs_account_id: accountFrom,
        order_time: maxTime, order_date: "", amount: amount, exchange_rate: exchangeRate, rsv_reference: reference};



    function clearForm (){
        setFormStep(true)
        setReload(false)
        setAmount("")
        setExchangeRate("")
        setReference("")
        setAccount("")
        setMaxTime("2")
       // console.log(postData)
    }

    //Main UseEffect
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.post('account', customer_id).then((res) => {
                        //console.dir(res.data)
                        setQuery(res.data)
                        setLoader(false)
                        clearForm()
                    })

                } catch (e) {
                    console.log('fail loading accounts');
                }

            }
        )()
    }, []);

    //account UseEffect
    useEffect(() => {
        (
            async () => {
                try {
                    const selectedAccount = query.find( query => query.id == account )
                    //console.log(selectedAccount)
                    const queryAlias = selectedAccount.alias;
                    if (typeof queryAlias !== 'undefined') {
                        setAlias(queryAlias)
                    }

                } catch (e) {
                    console.log('fail setting alias');
                }

            }
        )()
    }, [account]);


    return (
        <Fragment>
            <Row className={"justify-content-center"}>
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title col-sm-12 text-center"><p className="text-center">
                                Orden de Compra</p></div>
                        </div>
                        {formStep?
                            <div className="card-body">
                                {loader?
                                    <div className={"row justify-content-center"}>
                                        <div className={"col-12 preloaderDiv"}>
                                            <Loader color={color} loading={loader} size={50}/>
                                        </div>
                                    </div>
                                    :
                                    <div className="container">
                                        <div className="form-group row">
                                            <label className="col-sm-2 text-right col-form-label fs-12">Cantidad $Reserve</label>
                                            <div className="col-sm-3">
                                                <input  id="amount" type="text" className="form-control fs-12 " placeholder="Cantidad Reserve a vender"
                                                        onChange={(e) => setAmount(e.target.value)}
                                                        value={amount}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2  text-right col-form-label fs-12">Tasa de Compra Bs:</label>
                                            <div className="col-sm-3">
                                                <input  id="exchange" type="text" className="form-control fs-12" placeholder="Precio por cada $Reserve"
                                                        onChange={(e) => setExchangeRate(e.target.value)}
                                                        value={exchangeRate}
                                                />
                                            </div>
                                        </div>
                                        <div className=" form-group  row ">
                                            <label className="col-sm-2  text-right col-form-label fs-12">Cuenta Reserve</label>
                                            <select id="bank" name="bank" className="form-control  col-sm-4 idType fs-12 ml-3" defaultValue={"none"}
                                                    onChange={(e) => setAccount(e.target.value)}
                                            >
                                                <option value="none" disabled >Seleccione una cuenta</option>
                                                {
                                                    query?.map((query) => (

                                                            <option key={query.id}   value={query.id}
                                                                    className={query.type==0 ? 'allfinNone' : null}>
                                                                {query.alias}</option>

                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className=" form-group  row ">
                                            <label className="col-sm-2  text-right col-form-label fs-12">Pagar desde:</label>
                                            <select id="bank" name="bank" className="form-control  col-sm-4 idType fs-12 ml-3" defaultValue={"none"}
                                                    onChange={(e) => setAccountFrom(e.target.value)}
                                            >
                                                <option value="none" disabled >Seleccione un banco</option>
                                                {
                                                    query?.map((query) => (

                                                            <option key={query.id}   value={query.id}
                                                                    className={query.type==1 ? 'allfinNone' : null}>
                                                                {query.bank}</option>

                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className=" form-group  row ">
                                            <label className="col-sm-2  text-right col-form-label fs-12">Tiempo de Compra:</label>
                                            <select id="maxTime" name="time" className="form-control  col-sm-4 idType fs-12 ml-3"
                                                    defaultValue={maxTime}
                                                    onChange={(e) => setMaxTime(e.target.value)}

                                            >
                                                <option value="1">1:00 hr</option>
                                                <option value="2">2:00 hrs</option>
                                                <option value="3">3:00 hrs</option>
                                                <option value="4">4:00 hrs</option>
                                                <option value="5">5:00 hrs</option>
                                                <option value="6">6:00 hrs</option>
                                            </select>
                                        </div>
                                        <br/><br/>
                                        <div className="row justify-content-center">
                                            <button className={"btn btn-primary text-center "}
                                                    onClick={() => setFormStep(false)}>Siguiente
                                                <FontAwesomeIcon icon={faArrowRight}  size={"lg"}/>
                                            </button>
                                        </div>

                                    </div>
                                }
                            </div>

                            :

                            <div className="card-body stepH">
                                <div className="container">

                                    <div className="row">

                                        <div className="col-12 text-center">
                                            <button className={"btn btn-primary text-center "}
                                                    onClick={() => setFormStep(true)}

                                            > <FontAwesomeIcon icon={faArrowLeft}  size={"lg"}/>  Atras</button>
                                        </div>

                                        <div className="col-12 leftorder mt-4">
                                            <div className="col-12 py-2 text-center">
                                                Datos de su Orden:
                                            </div>

                                            <div className="row justify-content-center">
                                                <table className="styled-table">
                                                    <thead>
                                                    <tr>
                                                        <th>Reserve a Vender</th>
                                                        <th>Tasa de Cambio</th>
                                                        <th>Cuenta</th>
                                                        <th>Tiempo de Orden</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>{amount}</td>
                                                        <td>{exchangeRate}</td>
                                                        <td>{alias}</td>
                                                        <td>{maxTime} {maxTime != 1 ? "Horas" : "Hora"} </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="form-group row justify-content-center">
                                        <ConfirmOrder
                                            clearForm={() => clearForm()}
                                            postData={postData}
                                        />
                                    </div>


                                </div>









                            </div>
                        }



                    </div>
                </div>
            </Row>
        </Fragment>
    );
};

export default CreateBuy;

//components used
