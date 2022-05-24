import React, {Fragment, useEffect, useState} from "react";
import Loader from "react-spinners/ClipLoader";
import axios from "axios";
import get from "lodash/get"
import pluck from "lodash"

import swal from "sweetalert";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilePen, faGavel, faHouse} from "@fortawesome/free-solid-svg-icons";

function AccountResponse(props) {
    //console.log(props)
    //account save endpoint
    const  filteredData = 'okData'

    const [response, setResponse] = useState(null)
    const [code, setCode] = useState('')
    const [rsv_code, setRsv_Code] = useState('')
    const [loader, setLoader] = useState(true)


    useEffect(() => {
        (
            async () => {
                try {
                    props.next(false)
                    const response = await axios.post('trades/create', props.tradeData).then((res) => {
                        //console.dir(res.data)
                       // console.log(get(res, 'res.data.verify_rsv.code', 'miss'))
                        setResponse(res.data)
                        setRsv_Code(get(res, 'data.verify_rsv.code', 'miss'))
                        setCode(get(res, 'data.code', 'missrsv'))
                        setLoader(false)
                        props.clearBuyAmount('');
                        props.setReference('')
                    })
                } catch (e) {
                    console.log(e);
                }

            }
        )()
    }, []);

    return (
        <Fragment>

                <div className="card-body" >
                    {loader ?
                        <div className={"row justify-content-center"}>
                            <p>
                                Procesando su solicitud de crear Trade
                            </p>
                            <div className={"col-12 preloaderDiv"}>
                                <Loader color={props.color} loading={true} size={30} />
                            </div>
                            Esto puede tardar varios segundos. <br/>
                        </div>
                        :
                        <div className="row">
                            <div  className={"col-12 text-center"}>
                                {response.code=== 200 ?
                                    <i className="customCheckmark">✓</i>
                                    :
                                    <i className="customXmark">⮿</i>
                                }
                            </div>
                            <div className="col-12 text-center">
                                {response.code=== 200 ?
                                    <h3 className={"text-white"}>Exitoso</h3>
                                    :
                                    <h3 className={"text-white"}>Error</h3>
                                }

                                {props.viewName === "Vender" &&
                                <div className="row justify-content-center">
                                    <p className={get(response, 'verify_rsv.code') ===1 ? "text-center fc-Green" : "text-center fc-Red"}>
                                        {
                                            {
                                                1: 'Referencia Validada!',
                                                2: 'Referencia con monto incorrecto',
                                                0: 'referencia no encontrada o no enviada'
                                            }[get(response, 'verify_rsv.code')]
                                        }
                                    </p>
                                </div>
                                }


                                {response.code=== 200 ?

                                    <Fragment>
                                        <div className="row">
                                            <div className="col-12 justify-content-center text-center my-1 fs-10">
                                                <p>Trade Creado, verifique la operación en el dashboard<br/> </p>
                                            </div>

                                            <div className="col-12 justify-content-center text-center my-3">
                                                <Link onClick={()=> props.closeModal()} to={"#"}><FontAwesomeIcon icon={faGavel} size={"md"}/> Volver al Order Book</Link>
                                            </div>

                                            <div className="col-12 text-center mt-3 mb-n4">
                                                <Link to="/trades">  <FontAwesomeIcon icon={faHouse} size={"md"}/> Lista de Trades</Link>
                                            </div>
                                        </div>

                                    </Fragment>

                                    :
                                    <p>Contacte con un operador de Reserve<br/> </p>
                                }


                            </div>
                        </div>
                    }



                </div>

        </Fragment>


    );
}

export  default AccountResponse