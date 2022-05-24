import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";
import Loader from "react-spinners/ClipLoader";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";

function AccountData(props) {
    //console.dir(props)
    //loader vars
    const [copied, setCopied] = useState(false)
    let [loader, setLoader] = useState(true);
    const [query, setQuery] = useState([])


    //acceder a localstorage para obtener customerid
    const storedData = JSON.parse(localStorage.getItem('userDetails'))
    let customer_id = ''
    if (localStorage.getItem('userDetails') !== null) {
        //console.log(storedData.userData)
        //customerId = storedData.userData.customers[0].id
        customer_id = {customerId: storedData.userData.customers.id}
    } else {
        customer_id = {customerId: 0}
    }

    const type = props.viewName === "Comprar" ? 0 : 1


    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.post('account', customer_id).then((res) => {
                       // console.dir(res.data)
                        setQuery(res.data)
                        props.setBankAccount(res.data.find(account => account.type == 0).id)
                        props.setReserve(res.data.find(account => account.type == 1).id)
                        setLoader(false)
                        props.setLoader(false)
                    })

                    console.dir(query)
                } catch (e) {
                    console.log('fail loading accounts');
                }

            }
        )()
    }, []);

    return (
        <div className="card-body">
            <div className="basic-form">
                <form>

                    <div className="form-group row"><label className="col-sm-12 col-form-label fs-12 text-center">Paso
                        final para completar su trade</label>
                    </div>

                    {props.loadingStatus ?
                        <div className={"row justify-content-center"}>
                            <div className={"col-12 preloaderDiv"}>
                                <Loader color={props.color} loading={props.loadingStatus} size={30}/>
                            </div>
                        </div>
                        :
                        <div className=" form-group  row ">
                            {props.viewName === "Comprar" ?
                                <Fragment>
                                    <label className="col-sm-12  text-right col-form-label fs-12 text-center">Seleccione
                                        un RSV asociado</label>
                                    <select id="bank" name="bank" className="form-control  col-sm-12 idType fs-12 ml-3"
                                            defaultValue={props.reserve}

                                            onChange={(e) => props.setReserve(e.target.value)}>
                                        {
                                            query?.map((query) => (
                                                    <option key={query.id} value={query.id}
                                                            className={query.type == 0 ? 'allfinNone' : null}>
                                                        {query.alias}</option>

                                                )
                                            )
                                        }
                                    </select>

                                </Fragment>
                                :
                                <Fragment>
                                    <label className="col-sm-12  text-right col-form-label fs-12 text-center">Seleccione
                                        un Banco asociado</label>
                                    <select id="bank" name="bank" className="form-control  col-sm-12 idType fs-12 ml-3"
                                            defaultValue={props.bankAccount}
                                            onChange={(e) => props.setBankAccount(e.target.value)}>
                                        {
                                            query?.map((query) => (
                                                    <option key={query.id} value={query.id}
                                                            className={query.type == 1 ? 'allfinNone' : null}>
                                                        {query.alias}</option>

                                                )
                                            )
                                        }
                                    </select>

                                </Fragment>
                            }


                            {props.viewName == "Vender" &&
                            <div className="col-12">
                                <div className="col-12 py-2 mt-4 text-center">
                                    Datos de Transferencia:
                                </div>
                                <div className="row justify-content-center">
                                    <table className="styled-table2">
                                        <thead className={"otcBlueBg"}>
                                        <tr>
                                            <th className={"text-center"}>Cantidad Reserve a Enviar</th>
                                            <th className={"text-center"}>Cuenta</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{props.buyAmount}</td>
                                            <td>{"Allfinpayments1"}
                                                <CopyToClipboard
                                                    text={"Allfinpayments1"}
                                                    onCopy={() => setCopied(true)}>
                                                    <span> <i className={"flaticon-381-push-pin ctc"}></i></span>
                                                </CopyToClipboard>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="form-group row justify-content-center mb-n5">
                                    <label className="col-sm-12  text-right col-form-label fs-14 text-center">Referencia
                                        RSV</label>
                                    <div className="col-sm-12">
                                        <input id="refVal" type="text" className="form-control fs-12 text-center"
                                               placeholder="Referencia para validar"
                                               onChange={(e) => props.setReference(e.target.value)}
                                               value={props.reference}
                                        />
                                    </div>
                                </div>

                            </div>
                            }


                        </div>


                    }


                </form>
            </div>
        </div>);
}

export default AccountData