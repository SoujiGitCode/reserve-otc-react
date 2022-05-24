import Swal from "sweetalert2";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";


function DeleteAlert (props) {

    async function deleteToggle(){
        await  Swal.fire({
            title: 'Esta seguro que desea Eliminar este Registro?',
            text: "no podra revertir los cambios generados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proceder',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                props.setLoader(true)
                await axios.post(`/orders/delete`, props.deleteData,).then(async (res) => {
                    //console.dir(res.data)

                    props.setReload(true)
                        await Swal.fire(
                            res.data.code === 200 ? 'Eliminado!' : 'Error',
                            res.data.code === 200 ? 'Su orden ha sido dada de baja.'
                                : 'No se ha podido eliminar la orden, contacte con un operador.',
                            res.data.code === 200 ? 'success' : "error"
                        )
                });

            }
        })
    }

    return(
        <button onClick={() => deleteToggle()}  data-bn-type="button" className=" btnSmall fc-Red fs-12">
            <FontAwesomeIcon icon={faTrash} /></button>
    )
}


export default DeleteAlert