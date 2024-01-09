import {
    React, Dialog, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme,
    IconButton, Close, useTranslation, useForm, useState, FormGroup
} from 'libraries';

const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));
const TextFieldAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/TextFieldAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const ProductReportInformation = (props) => {

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { register, handleSubmit } = useForm();

    const [checkboxImage] = useState(
        {
            name: 'allowImage',
            id: 'allowImage',
        }
    );

    const [checkboxDescription] = useState(
        {
            name: 'allowDescription',
            id: 'allowDescription',
        }
    );

    const [checkboxCuttingSize] = useState(
        {
            name: 'allowCuttingSize',
            id: 'allowCuttingSize',
        }
    );

    const [checkboxOthers] = useState(
        {
            name: 'allowOthers',
            id: 'allowOthers',
        }
    );

    const [textNote] = useState(
        {
            name: "note",
            margin: 'normal',
            variant: "outlined",
            id: "note",
            styleText: "w-100",
            required: true,
            rows: 6
        }
    );

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.openReport}
            onClose={props.handleCloseReport}
            aria-labelledby="responsive-dialog-title"
        >
            <div className={'ps-ab top-right'}>
                <IconButton aria-label="close" onClick={props.handleCloseReport}>
                    <Close />
                </IconButton>
            </div>
            <DialogTitle id="responsive-dialog-title" className={'tx-c fw-b ta-c'}>
                {t('label.reportProduct')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{t('message.reportProduct')}</DialogContentText>
                <form onSubmit={handleSubmit(props.handleSubmitReportProduct)}>
                    <FormGroup>
                        <CheckBoxAtom {...checkboxImage} label={t('form.image')} reg={register} styleCheckbox={'tx-c'} />
                        <CheckBoxAtom {...checkboxDescription} label={t('form.description')} reg={register} styleCheckbox={'tx-c'} />
                        <CheckBoxAtom {...checkboxCuttingSize} label={t('form.cuttingSize')} reg={register} styleCheckbox={'tx-c'} />
                        <CheckBoxAtom {...checkboxOthers} label={t('form.others')} reg={register} styleCheckbox={'tx-c'} />
                    </FormGroup>
                    <TextFieldAtom {...textNote} label={t('form.note')} typeForm={'text-multiline'} reg={register} />
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

export default ProductReportInformation;