import {React, FormControlLabel, Radio} from 'libraries';

const RadioButtonAtom = (props) => {

    return (
        <FormControlLabel
            inputRef={props.reg}
            id={props.id}
            name={props.name}
            value={props.value}
            control={<Radio />}
            label={props.label}
            color={props.color}
            checked={props.checked}
            labelPlacement={props.placement}
            onChange={props.handleChangeRadio}
            onClick={props.clicked}
        />
    );
};

export default RadioButtonAtom;