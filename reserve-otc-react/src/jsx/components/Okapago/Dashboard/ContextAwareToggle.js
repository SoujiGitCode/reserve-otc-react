import {useContext} from "react";
import {AccordionContext, useAccordionToggle} from "react-bootstrap";

function ContextAwareToggle({ children, eventKey, callback, setHide, hide}) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(

        eventKey,
        () => callback && callback(eventKey),

    );

    function dropDown() {
        decoratedOnClick()
    }

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
        <button
            type="button"
            className={"btnSmall fs-10 fc-LightIBlue"}
            onClick={dropDown}
        >
            {children}
        </button>
    );
}

export default ContextAwareToggle