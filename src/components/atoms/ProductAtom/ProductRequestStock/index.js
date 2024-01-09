import {
    React, Dialog, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme,
    IconButton, Close, useTranslation, useForm, useState, faBell, yup
} from 'libraries';

const TextFieldAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const ProductRequestStock = (props) => {

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const requestStockSchema = yup.object().shape({
        email: yup.string().required(),
    });
    const { register, handleSubmit } = useForm({
        validationSchema: requestStockSchema
    });

    const [textEmail] = useState(
        {
            name: 'email',
            margin: 'normal',
            id: 'email',
            variant: 'outlined',
            required: true
        }
    )

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.openRequestStock}
            onClose={props.handleCloseRequestStock}
            aria-labelledby="responsive-dialog-title"
        >
            <div className={'ps-ab top-right'}>
                <IconButton aria-label="close" onClick={props.handleCloseRequestStock}>
                    <Close />
                </IconButton>
            </div>
            <DialogTitle id="responsive-dialog-title" className={'c-black fw-b'}>
                <IconAtom icon={faBell} /> {t('label.requestStockAlert')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{t('message.requestStockAlert')}</DialogContentText>
                <form onSubmit={handleSubmit(props.handleSubmitRequestStock)}>
                    <TextFieldAtom {...textEmail} label={t('form.emailAddress')} reg={register} />
                    <div className={'ta-c p-20'}>
                        {props.buttonLoading ? (
                            <ButtonAtom typeButton={'button'} type={'button-loading'} styleImage={'w-17-5'}
                                        styleView={'product__detail__related--button p-10-4'} />
                        ):(
                            <ButtonAtom typeButton={'submit'} type={'button-text'} name={'Submit'}
                                        styleView={'product__detail__related--button p-10-40'} />
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductRequestStock;