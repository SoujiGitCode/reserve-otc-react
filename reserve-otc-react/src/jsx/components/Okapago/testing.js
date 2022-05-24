import React, {useEffect, useMemo, useState} from 'react'
import { useSpring, animated } from 'react-spring'
import Wizard from "../Forms/Wizard/Wizard"

export const Testing= () => {

    const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

    const styles = useSpring({
        loop: true,
        from: { rotateZ: 0 },
        to: { rotateZ: 180 }  })


    return(
    <animated.div
        style={{
            width: 80,
            height: 80,
            backgroundColor: '#46e891',
            borderRadius: 16,
            ...styles,
        }}
    />
)

}
export default Testing;