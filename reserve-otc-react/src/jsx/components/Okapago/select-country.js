import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';

const FlagSelect = () => {
    const [selected, setSelected] = useState('');

    //console.log(selected);
    return(
       <ReactFlagsSelect
           selected={selected}
           onSelect={code => setSelected(code)}
           searchable={true}

        />

        )
}

export default FlagSelect;