import {
    Close, Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    React,
    Suspense,
    useMediaQuery,
    useTheme,
    useTranslation
} from "libraries";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CheckoutChooseShippingAddress = (props) => {
    const { openChooseShippingAddress, handleCloseChooseShippingAddress, shippingAddresses, handleShowShippingAddress,
        defaultShippingAddress, handleChooseShippingAddress, handleUpdateShippingAddress } = props;
    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Dialog
            fullScreen={fullScreen}
            open={openChooseShippingAddress}
            onClose={handleCloseChooseShippingAddress}
            aria-labelledby="responsive-dialog-title"
        >
            <div className={'ps-ab top-right'}>
                <IconButton aria-label="close" onClick={handleCloseChooseShippingAddress}>
                    <Close/>
                </IconButton>
            </div>
            <DialogTitle id="responsive-dialog-title" className={'c-black fw-b ta-c'}>
                <div>{t('label.chooseAddress')}</div>
            </DialogTitle>
            <DialogContent>
                <Suspense fallback={null}>
                    <ButtonAtom
                        type={'button-text'}
                        variant={'outlined'}
                        name={t('label.titleAddAddress')}
                        styleView={'fs-20 text-transf-cap border-radius-10px mb-10 w-100'}
                        clicked={handleShowShippingAddress}
                    />
                    {shippingAddresses.map((shippingAddress, index) => {
                        return(
                            <div key={index}
                                 className={`mb-10 ${
                                defaultShippingAddress?.href === shippingAddress?.href ? 
                                    'list-shipping-address__active' 
                                    : 
                                    'list-shipping-address'}`
                            }>
                                <div className={'mb-10'} onClick={() => handleChooseShippingAddress(shippingAddress.href)}>
                                    <div className={'mb-8'}><b>{shippingAddress.receiptName}</b> ({shippingAddress.label})</div>
                                    <div className={'mb-8'}>{shippingAddress.phoneNumber}</div>
                                    <div className={'lh-2rem'}>
                                        <span>{shippingAddress.address}, {shippingAddress.subDistrict}, </span>
                                        <span>{shippingAddress.district}, {shippingAddress.city}, </span>
                                        <span>{shippingAddress.province}, {shippingAddress.postalCode} </span>
                                    </div>
                                </div>
                                <div className={'btn__update-address'}
                                     onClick={() => handleUpdateShippingAddress(shippingAddress.href)}>
                                    {t('label.updateAddress')}
                                </div>
                            </div>
                        )
                    })}
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutChooseShippingAddress;