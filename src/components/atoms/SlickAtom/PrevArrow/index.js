import {faChevronLeft, FontAwesomeIcon, React} from "libraries";

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} color="#000"/>
        </div>
    );
};

export default PrevArrow;