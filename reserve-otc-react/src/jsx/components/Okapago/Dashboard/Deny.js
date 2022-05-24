import Swal from "sweetalert2";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

function DenyAlert (props) {
    //console.log(props.trade)
    async function confirmToggle(){
        await  Swal.fire({
            title: 'Esta seguro que no recibió el dinero?',
            text: "Indique el motivo del rechazo del pago ",
            icon: 'warning',
            input: 'select',
            inputOptions: {
                "monto incorrecto": 'Monto Incorrecto',
                "referencia errada": 'Referencia errada',
            },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Denegar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {

                props.denyData.comments = result.value
                props.setLoader(true)
                await axios.post(`/payment/deny`, props.denyData,).then(async (res) => {
                    //console.dir(res.data)
                    await Swal.fire(
                        res.data?.code === 200 ? 'Pago Denegado!' : 'Error',
                        res.data?.code === 200 ? 'El pago ha sido denagado.'
                            : 'No se ha podido Denegar el pago, contacte con un operador.',
                        res.data?.code === 200 ? 'success' : "error"

                    )
                });
                props.setReload(true)
            }
        })
    }

    return(
        <button className={"btnSmall fc-Orange "} onClick={()=>confirmToggle() }
                disabled={props.status ==3 ? true :false}
        >Denegar
        </button>
    )
}


export default DenyAlert