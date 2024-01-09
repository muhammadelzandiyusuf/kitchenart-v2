import { React, FormControlLabel, Checkbox, Favorite, FavoriteBorder } from "libraries";

const CheckboxAtom = (props) => {

    const CheckBoxForm = (
        <FormControlLabel
            control={
                <Checkbox inputRef={props.reg} id={props.id} name={props.name} checked={props.checked}
                          onChange={props.handleChangeCheckbox} color={props.color}
                          fontSize={props.size} value={props.value} required={props.required}
                />
            }
            disabled={props.disabled}
            label={props.label}
            labelPlacement={props.placement}
            className={props.styleCheckbox}
        />
    );

    const CheckBoxIcon = (
        <FormControlLabel
            control={
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} inputRef={props.reg} id={props.id}
                          name={props.name} onChange={props.handleChangeCheckbox} value={props.value}
                          checked={props.checked}
                />
            }
            label={props.label}
            className={props.styleCheckbox}
        />
    );

    switch (props.type) {
        case 'form':
            return CheckBoxForm;
        case 'icon':
            return CheckBoxIcon;
        default:
            return CheckBoxForm;
    };
};

export default React.memo(CheckboxAtom);