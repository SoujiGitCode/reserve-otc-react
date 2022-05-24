import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled(props:any ) {
    //console.log(props.count)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {

        /*props.viewName == "Comprar" ?  props.setPage(value) :  props.setPage(value)*/
        props.setPage(value)
    };

    return (
        <Stack spacing={2}>
            <Pagination count={props.count} page={props.page} onChange={handleChange} disabled={props.adminDisabled === false ? props.disabled : true } />
        </Stack>
    );
}
