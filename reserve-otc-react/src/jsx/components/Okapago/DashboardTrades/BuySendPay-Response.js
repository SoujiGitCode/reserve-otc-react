import React, {Fragment, useEffect, useState} from "react";
import Loader from "react-spinners/ClipLoader";
import axios from "axios";

function BuySendPayResponse(props) {
    const [response, setResponse] = useState(null)
    const [code, setCode] = useState('')
    const [rsv_code, setRsv_Code] = useState('')
    let [loader, setLoader] = useState(true);
    let [color, setColor] = useState("#1a5a6e");

    //console.dir(props)
    useEffect(() => {
        (
            async () => {
                try {
                    props.next(false)
                    const response = await axios.post('payment/send', props.sendPay).then((res) => {
                        console.dir(res.data)
                        // console.log(get(res, 'res.data.verify_rsv.code', 'miss'))
                        setResponse(res.data)
                        setLoader(false)
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
                            Procesando su solicitud de Pago
                        </p>
                        <div className={"col-12 preloaderDiv"}>
                            <Loader color={color} loading={true} size={30} />
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

                            {response.code=== 200 ?
                                <p>Pago Enviado</p>
                                :
                                <p>Contacte con un operador de Reserve </p>
                            }


                        </div>
                    </div>
                }



            </div>

        </Fragment>


    );
}

export  default BuySendPayResponse