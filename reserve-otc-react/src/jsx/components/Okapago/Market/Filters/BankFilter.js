import React, { Fragment } from 'react';

import Select from 'react-select/';


const BankFilter = (props) =>{
    console.log(props.banks[0])
    return (
        <Fragment>
            <Select
                styles={"bankSelect"}
                defaultValue={{"id": "", "name": "Busqueda por Banco",}}
                options={props.banks}
                getOptionLabel ={(option)=>option.name}
                getOptionValue ={(option)=>option.id}
                onChange={(e)=>props.setBankId(e.id)}
            />
        </Fragment>
)
}


export default BankFilter