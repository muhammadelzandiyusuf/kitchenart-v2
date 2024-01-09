import {Rating, React, withStyles} from "libraries";

const StyledRating = withStyles({
    iconFilled: {
        color: '#D13135',
    },
})(Rating);

const RateAtom = (props) => {
    return(
        <StyledRating
            name={props.name}
            onChange={(event, newRating) => {
                props.rate(newRating);
            }}
        />
    )
}

export default RateAtom;