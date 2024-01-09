import { React, Snackbar, Alert, useState } from 'libraries';

const SnackbarAtom = (props) => {

    const [origin] = useState({
        vertical: 'top',
        horizontal: 'right',
        variant: 'filled'
    })

    let alertType = (
        <Alert onClose={props.handleClose} variant={origin.variant} severity='success'>
            {props.message}
        </Alert>
    );

    if (props.type === 'success') {
        alertType = (
            <Alert onClose={props.handleClose} variant={origin.variant} severity='success'>
                {props.message}
            </Alert>
        );
    }
    else if (props.type === 'error') {
        alertType = (
            <Alert onClose={props.handleClose} variant={origin.variant} severity='error'>
                {props.message}
            </Alert>
        );
    }
    else if (props.type === 'warning') {
        alertType = (
            <Alert onClose={props.handleClose} variant={origin.variant} severity='warning'>
                {props.message}
            </Alert>
        );
    }
    else {
        alertType = (
            <Alert onClose={props.handleClose} variant={origin.variant} severity='info'>
                {props.message}
            </Alert>
        );
    }

    return (
        <Snackbar
            anchorOrigin={origin}
            open={props.open} autoHideDuration={3000}
            onClose={props.handleClose}
            key={props.vertical + props.horizontal}>
            {alertType}
        </Snackbar>
    );
}

function areEqual(prevProps, nextProps) {
    let status = false;
    if (prevProps.open === nextProps.open) status = true;
    return status;
}

export default React.memo(SnackbarAtom, areEqual);