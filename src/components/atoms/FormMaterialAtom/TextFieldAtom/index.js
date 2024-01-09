import {React, TextField, InputAdornment, IconButton} from 'libraries';

const Icon = React.lazy(() => import('components/atoms/IconAtom'));

const TextFieldAtom = (props) => {

    const formTextField = (
        <TextField
            name={props.name}
            inputRef={props.reg}
            label={props.label}
            className={props.styleText}
            margin={props.margin}
            variant={props.variant}
            fullWidth
            id={props.id}
            value={props.values}
            defaultValue={props.defaultValue}
            error={props.error?.status}
            type={props.type}
            helperText={props.error?.status && props.error?.message}
            onChange={props.onChange}
            required={props.required}
            size={props.size}
            placeholder={props.placeholder}
            inputProps={{
                maxLength: props.maxLength
            }}
        />
    );

    const formTextFieldMask = (
        <TextField
            name={props.name}
            inputRef={props.reg}
            label={props.label}
            className={props.styleText}
            margin={props.margin}
            variant={props.variant}
            fullWidth
            id={props.id}
            value={props.values}
            error={props.error?.status}
            type={props.type}
            helperText={props.error?.status && props.error?.message}
            onChange={props.onChange}
            required={props.required}
            size={props.size}
            placeholder={props.placeholder}
            InputProps={{
                inputComponent: props.inputComponent,
                inputProps: { min: props.min, max: props.max }
            }}
        />
    );

    const formTextFieldMultiline = (
        <TextField
            name={props.name}
            inputRef={props.reg}
            label={props.label}
            className={props.styleText}
            margin={props.margin}
            variant={props.variant}
            fullWidth
            id={props.id}
            value={props.values}
            error={props.error?.status}
            type={props.type}
            helperText={props.error?.status && props.error?.message}
            onChange={props.onChange}
            required={props.required}
            multiline
            rows={props.rows}
            size={props.size}
            rowsMax={props.rowsMax}
        />
    );

    const formTextFieldStartAdornment = (
        <TextField
            name={props.name}
            inputRef={props.reg}
            label={props.label}
            className={props.styleText}
            margin={props.margin}
            variant={props.variant}
            fullWidth
            id={props.id}
            error={props.error?.status}
            type={props.type}
            helperText={props.error?.status && props.error?.message}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icon icon={props.icon} />
                    </InputAdornment>
                )
            }}
            required={props.required}
        />
    );

    const formTextFieldStartEndAdornment = (
        <TextField
            name={props.name}
            inputRef={props.reg}
            label={props.label}
            className={props.styleText}
            margin={props.margin}
            variant={props.variant}
            fullWidth
            id={props.id}
            error={props.error?.status}
            type={props.values ? 'text' : 'password'}
            helperText={props.error?.status && props.error?.message}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Icon icon={props.icon} />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={props.showPassword}
                            onMouseDown={props.mouseDownPassword}
                            edge="end">
                            {props.values ? <Icon icon={props.iconStart} /> : <Icon icon={props.iconEnd} />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            required={props.required}
        />
    );

    const formTextFieldEndAdornment = (
        <TextField
            name={props.name}
            inputRef={props.reg}
            label={props.label}
            className={props.styleText}
            margin={props.margin}
            variant={props.variant}
            fullWidth
            id={props.id}
            error={props.error?.status}
            type={props.values ? 'text' : 'password'}
            helperText={props.error?.status && props.error?.message}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={props.showPassword}
                            onMouseDown={props.mouseDownPassword}
                            edge="end">
                            {props.values ? <Icon icon={props.iconStart} /> : <Icon icon={props.iconEnd} />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            required={props.required}
        />
    );

    const formTextFieldNumber = (
        <TextField
            name={props.name}
            inputRef={props.reg}
            label={props.label}
            className={props.styleText}
            margin={props.margin}
            variant={props.variant}
            fullWidth
            id={props.id}
            error={props.error?.status}
            type={props.type}
            helperText={props.error?.status && props.error?.message}
            value={props.values}
            onChange={props.onChange}
            onInput = {(e) =>{
                e.target.value = e.target.value.slice(0,props.max)
            }}
            inputProps={{ readOnly: props.readonly }}
            readOnly={true}
            required={props.required}
        />
    );

    const formTextFieldDate = (
        <TextField
            name={props.name}
            inputRef={props.reg}
            label={props.label}
            className={props.styleText}
            margin={props.margin}
            variant={props.variant}
            fullWidth
            id={props.id}
            error={props.error?.status}
            type={props.type}
            helperText={props.error?.status && props.error?.message}
            InputProps={{inputProps: { max: props.now} }}
            InputLabelProps={{
                shrink: true,
            }}
            required={props.required}
        />
    )

    switch (props.typeForm) {
        case 'text-field':
            return formTextField;
        case 'text-field-mask':
            return formTextFieldMask;
        case 'text-field-start-adornment':
            return formTextFieldStartAdornment;
        case 'text-field-start-end-adornment':
            return formTextFieldStartEndAdornment;
        case 'text-field-end-adornment':
            return formTextFieldEndAdornment;
        case 'text-field-number':
            return formTextFieldNumber;
        case 'text-field-date':
            return formTextFieldDate;
        case 'text-multiline':
            return formTextFieldMultiline;
        default:
            return formTextField;
    }
}

export default React.memo(TextFieldAtom);