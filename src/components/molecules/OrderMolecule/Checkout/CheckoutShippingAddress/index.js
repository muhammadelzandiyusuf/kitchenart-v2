import {React, Suspense, useTranslation} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const CheckoutShippingAddress = (props) => {

    const { handleShowShippingAddress, defaultShippingAddress, handleShowChooseShippingAddress } = props;
    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            {defaultShippingAddress ? (
                <>
                    <div className={'fs-20'}>
                        {`${defaultShippingAddress.receiptName} (${defaultShippingAddress.label})`}
                    </div>
                    <div className={'fs-20'}>{defaultShippingAddress.phoneNumber}</div>
                    <div className={'fs-20 mb-24'}>
                        <span>{defaultShippingAddress.address}, {defaultShippingAddress.subDistrict}, </span>
                        <span>{defaultShippingAddress.district}, {defaultShippingAddress.city}, </span>
                        <span>{defaultShippingAddress.province}, {defaultShippingAddress.postalCode} </span>
                    </div>
                    <ButtonAtom
                        type={'button-text'}
                        variant={'outlined'}
                        name={t('label.chooseOthersAddress')}
                        styleView={'fs-20 text-transf-cap border-radius-10px mb-24'}
                        clicked={handleShowChooseShippingAddress}
                    />
                </>
            ) : (
                <ButtonAtom
                    type={'button-text'}
                    variant={'outlined'}
                    name="Tambah Alamat Pengiriman"
                    styleView={'fs-20 text-transf-cap border-radius-10px mb-24'}
                    clicked={handleShowShippingAddress}
                />
            )
            }
        </Suspense>
    );
};

export default CheckoutShippingAddress;