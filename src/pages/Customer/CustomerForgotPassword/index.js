import {React, Suspense, useForm, useState, faEnvelope} from 'libraries';
import {forgotPasswordCustomer} from "services";
import {setErrorValidation} from "utils";

const SnackbarAtom = React.lazy(() => import('components/atoms/SnackbarAtom'));
const DialogMolecule = React.lazy(() => import('components/molecules/DialogMolecule'));
const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const ForgotPasswordOrganism = React.lazy(() => import('components/organisms/ForgotPasswordOrganism'));

const CustomerForgotPassword = React.memo(props => {
    const [meta] = useState({
        title: 'KitchenArt - Lupa Kata Sandi'
    });
    const [open, setOpen] = useState(false);
    const [openDialog, setDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({});
    const [validation] = useState({
        detail: {
            email: [null]
        }
    });

    const { errors, setError } = useForm();
    const [content, setContent] = useState({});

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setOpen(false);
    };
    const handleCloseDialog = () => {
        setDialog(false);
    };

    const onSubmit = data => {
        const payload = { body: data };
        forgotPasswordCustomer(payload).then(result => {
            if (result.hasOwnProperty('detail')) {
                setErrorValidation(result, true, setError);
                setSnackbar({type: 'error', message: result.message});
                setOpen(true);
            }
            else{
                setContent({
                    data: 'Kami telah mencoba untuk mengirim tautan riset ke <b>' + data.email + '</b>. Silakan periksa email Anda.'
                });
                setErrorValidation(validation, false, setError);
                setDialog(true);
            };
        });
    };


    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <ForgotPasswordOrganism forgotPasswordSubmit={onSubmit} error={errors} />
            <SnackbarAtom open={open} handleClose={handleClose} {...snackbar} />
            <DialogMolecule handleOpen={openDialog} handleClose={handleCloseDialog} icon={faEnvelope} content={content.data} styleIcon="fs-3rem" buttonName="Ok" />
        </Suspense>
    );
});

export default CustomerForgotPassword;