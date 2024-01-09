import {React, Suspense, Grid, useTranslation, NumberFormat} from 'libraries';

const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));

const CheckoutShippingInsurance = (props) => {

    const { shippingInsurance, handleShippingInsurance, shippingInsurancePrice, couriers, defaultShippingAddress,
        mustInsurance } = props;
    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <div className={'fs-20 fw-400'}>{t('label.shippingInsurance')}</div>
                </Grid>
                {couriers?.length > 0 && defaultShippingAddress &&
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                        <CheckBoxAtom
                            type={'form'}
                            id={`insurance`}
                            name={`insurance`}
                            label={<NumberFormat
                                value={shippingInsurancePrice}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Rp'}
                                decimalScale={0}
                            />}
                            handleChangeCheckbox={handleShippingInsurance}
                            checked={shippingInsurance}
                            styleCheckbox={'fs-20'}
                            disabled={mustInsurance}
                        />
                    </Grid>
                }
            </Grid>
        </Suspense>
    );
};

export default CheckoutShippingInsurance;