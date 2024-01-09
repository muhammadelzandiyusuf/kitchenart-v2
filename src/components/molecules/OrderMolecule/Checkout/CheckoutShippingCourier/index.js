import {React, Suspense, FormControl, Select, MenuItem, useTranslation, NumberFormat} from 'libraries';

const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));

const CheckoutShippingCourier = (props) => {

    const { couriers, handleChangeCourier, courier, courierService, handleChangeValueCourierService, courierServices,
        defaultShippingAddress } = props;
    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            {couriers?.length > 0 && defaultShippingAddress &&
                couriers.map((item, index) => {
                    return (
                        <div key={index}>
                            <CheckBoxAtom
                                type={'form'}
                                id={item.value}
                                name={item.value}
                                label={item.displayName}
                                handleChangeCheckbox={(e) => handleChangeCourier(e)}
                                checked={courier === item.value}
                            />
                            {courier === item.value &&
                                <div className={'ml-32 mb-16'}>
                                    <FormControl variant="outlined" size={'small'} className={'width60-to-100'}>
                                        <Select
                                            id="courierService"
                                            value={courierService}
                                            onChange={handleChangeValueCourierService}
                                        >
                                            {courierServices?.length > 0 &&
                                                courierServices.map((product, number) => {
                                                    return (
                                                        <MenuItem value={`${product.serviceId}/${product.vendor.name}/${product.vendor.code}/${product.service.name}/${product.mustUseInsurance}/${product.rate.price}/${product.rate.insuranceFee}/${product.rate.total}/${product.pricingChecksum}/${product.etdFrom}/${product.etdTo}`}
                                                                  key={number}>
                                                            <span>{product.vendor.name} ({product.service.name}) </span>
                                                            <span> / {product.etdFrom} - {product.etdTo} {t('label.day')} - </span>
                                                             <NumberFormat
                                                                value={product?.rate?.price.toFixed(0)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={'Rp'}
                                                                decimalScale={0}
                                                                className={'ml-4'}
                                                             />
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            }
                        </div>
                    )
                })
            }
        </Suspense>
    );
};

export default CheckoutShippingCourier;