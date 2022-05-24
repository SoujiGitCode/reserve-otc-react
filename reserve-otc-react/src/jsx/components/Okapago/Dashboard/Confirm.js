import Swal from "sweetalert2";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";


function ConfirmAlert (props) {
    //console.log(props.trade)

    async function confirmToggle(){
        await  Swal.fire({
            title: 'Esta seguro que recibió el dinero?',
            text: "no podra revertir esta acción ni apelar a una disputa una vez confirme el trade.! ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar Trade',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                props.setLoader(true)
                await axios.post(`/payment/confirm`, props.confirmData,).then(async (res) => {
                    //console.dir(res.data)
                    await Swal.fire(
                        res.data?.code === 200 ? 'Confirmado!' : 'Error',
                        res.data?.code === 200 ? 'El pago ha sido confirmado.'
                            : 'No se ha podido confirmar el pago, contacte con un operador.',
                        res.data?.code === 200 ? 'success' : "error"

                    )
                });
                props.setReload(true)
            }
        })
    }

    return(
        <button className={"btnSmall fc-Green "} onClick={()=>confirmToggle() }
            disabled={props.status ==3 ? true :false}
        >
            {props.status == 3
                ?
               "Confirmado"
                :
              "Confirmar"
            }
        </button>
    )
}


export default ConfirmAlert