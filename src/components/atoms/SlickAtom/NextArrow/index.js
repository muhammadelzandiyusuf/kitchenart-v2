import {React, faChevronRight, FontAwesomeIcon} from "libraries";

const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} color="#000"/>
        </div>
    );
};

export default NextArrow;