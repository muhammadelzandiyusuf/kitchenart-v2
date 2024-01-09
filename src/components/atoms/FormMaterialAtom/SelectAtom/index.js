import {FormControl, InputLabel, React, Select} from "libraries";

const SelectAtom = (props) => {

    return(
        <FormControl variant={props.variant} fullWidth={props.fullWidth} margin={props.margin} required={props.required}
                     className={props.styleText}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                native
                label={props.label}
                value={props.values}
                inputProps={{
                    name: props.name,
                    id: props.id,
                }}
                inputRef={props.reg}
            >
                {props.data.map((choice, index) => {
                    if (choice.value) {
                        return (
                            <option key={index} value={choice.value}>
                                {choice.displayName}
                            </option>
                        );
                    } else {
                        return (
                            <option key={index} value={choice.postalCode}>
                                {choice.postalCode}
                            </option>
                        );
                    }
                })}
            </Select>
        </FormControl>
    );

}

function areEqual(prevProps, nextProps) {
    let status = false;
    if (nextProps.label === prevProps.label && nextProps.data === prevProps.data) {
        status = true;
    }
    return status;
}

export default React.memo(SelectAtom, areEqual);