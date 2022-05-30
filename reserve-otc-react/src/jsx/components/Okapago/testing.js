import React from 'react'
import { useSpring, animated } from 'react-spring'

export const Testing= () => {


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