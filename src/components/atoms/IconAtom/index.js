import { React, FontAwesomeIcon } from "libraries";

const IconAtom = (props) => {
    return (
        <FontAwesomeIcon icon={props.icon} className={props.styleIcon} size={props.size} onClick={props.clicked} />
    );
};

export default IconAtom;