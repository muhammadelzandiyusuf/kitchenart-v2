import {React, Suspense, Grid, useTranslation, Skeleton} from 'libraries';

const CheckoutProductItem = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutProductItem'));
const CheckoutShippingAddress = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutShippingAddress'));
const CheckoutShippingCourier = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutShippingCourier'));
const CheckoutShippingInsurance = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutShippingInsurance'));
const CheckoutGetPromo = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutGetPromo'));
const CheckoutShoppingSummary = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutShoppingSummary'));
const CheckoutVoucherModal = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutVoucherModal'));
const CartShoppingSummarySkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/CartShoppingSummarySkeleton'));
const FormShippingAddress = React.lazy(() => import('components/atoms/ShippingAddressAtom/FormShippingAddress'));
const CheckoutChooseShippingAddress = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutChooseShippingAddress'));
const CheckoutPaymentSummary = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutPaymentSummary'));
const CheckoutBillingDetails = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutBillingDetails'));
const CheckoutPaymentMethod = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutPaymentMethod'));
const CheckoutPaymentVirtualAccount = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutPaymentVirtualAccount'));
const CheckoutPaymentCreditCard = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutPaymentCreditCard'));
const CheckoutFrameThreeDS = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutFrameThreeDS'));
const CheckoutPaymentInstallment = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutPaymentInstallment'));
const CheckoutPaymentInstallmentForm = React.lazy(() => import('components/molecules/OrderMolecule/Checkout/CheckoutPaymentInstallmentForm'));
const CheckoutPromoSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/CheckoutPromoSkeleton'));
const CheckoutShippingInsuranceSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/CheckoutShippingInsuranceSkeleton'));
const CheckoutShippingAddressSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/CheckoutShippingAddressSkeleton'));
const CheckoutProductItemSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/CheckoutProductItemSkeleton'));

const CheckoutOrganism = (props) => {

    const { handleChangeCourier, courier, courierService, handleChangeValueCourierService,
        handleShippingInsurance, shippingInsurance, handleCodePromo, handleGetPromoVoucher, openVoucher, promo,
        voucherDiscount, voucherCashback, voucherShipping, handleChooseVoucher, vouchers, giftVoucher,
        handleCancelVoucher, handleToDetailVoucher, handleAddVoucher, casbackPrice, loading, carts, shoppingSummary,
        activeVoucherDiscount, activeVoucherCashback, activeVoucherShipping, activeVoucherGift, activeCoupon,
        buttonLoading, handleShowShippingAddress, handleCloseShippingAddress, openShippingAddress, showLocation,
        shippingAddresses, handleCloseChooseShippingAddress, handleShowChooseShippingAddress, openChooseShippingAddress,
        setShowLocation, errors, shippingAddressSubmit, defaultShippingAddress, handleChooseShippingAddress,
        handleUpdateShippingAddress, shippingAddress, actionShippingAddress, vendorShipment, courierServices,
        insurance, openPayment, handleClosePayment, handleOpenPayment, openBilingDetail, handleCloseBillingDetail,
        handleOpenBillingDetail, shippingMethod, handleClosePaymentMethod, openPaymentMethod, handleOpenPaymentMethod,
        handleClosePaymentVirtualAccount, openPaymentVirtualAccount, handleOpenPaymentVirtualAccount, virtualAccount,
        shippingMethodEtd, handlePay, handlePayCreditCard, openPaymentCreditCard, handleClosePaymentCreditCard,
        handleOpenPaymentCreditCard, redirectUrl, openFrame, orderNumberPayment, openPaymentInstallment,
        handleClosePaymentInstallment, handleOpenPaymentInstallment, handleConfirmInstallmentBank, handleConfirmInstallmentTenor,
        installmentBank, installmentTenor, handleClosePaymentInstallmentForm, openPaymentInstallmentForm,
        handleConfirmInstallment, handlePayInstallment, mustInsurance} = props;
    const t = useTranslation();

    let listPromo = [];
    let notValidVoucher = [];
    if (promo === 'discount') {
        listPromo = voucherDiscount;
        notValidVoucher = activeVoucherDiscount;
    }
    else if (promo === 'cashback') {
        listPromo = voucherCashback;
        notValidVoucher = activeVoucherCashback;
    }
    else if (promo === 'shipping') {
        listPromo = voucherShipping;
        notValidVoucher = activeVoucherShipping;
    }
    else if (promo === 'gift') {
        listPromo = giftVoucher;
        notValidVoucher = activeVoucherGift;
    }

    return (
        <Suspense fallback={null}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {loading ? (
                                <Skeleton variant="text" width={'30%'} height={40} />
                            ):(
                                <div className={'fs-20 fw-b'}>{t('label.checkout')}</div>
                            )}
                            <div className={'border-bottom mt-24'}>
                                {loading ? (
                                    <CheckoutProductItemSkeleton />
                                ):(
                                    <div>
                                        <div className={'fs-20 mb-16 fw-400'}>{t('label.product')}</div>
                                        <CheckoutProductItem
                                            products={carts?.lineItems}
                                        />
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'border-bottom mt-24'}>
                                {loading ? (
                                    <CheckoutShippingAddressSkeleton />
                                ):(
                                    <div>
                                        <div className={'fs-20 mb-16 fw-400'}>{t('label.shippingAddress')}</div>
                                        <CheckoutShippingAddress
                                            handleShowShippingAddress={handleShowShippingAddress}
                                            handleShowChooseShippingAddress={handleShowChooseShippingAddress}
                                            defaultShippingAddress={defaultShippingAddress}
                                        />
                                    </div>
                                )}
                                <FormShippingAddress
                                    handleCloseShippingAddress={handleCloseShippingAddress}
                                    openShippingAddress={openShippingAddress}
                                    showLocation={showLocation}
                                    setShowLocation={setShowLocation}
                                    errors={errors}
                                    shippingAddressSubmit={shippingAddressSubmit}
                                    shippingAddress={shippingAddress}
                                    actionShippingAddress={actionShippingAddress}
                                    buttonLoading={buttonLoading}
                                />
                                <CheckoutChooseShippingAddress
                                    handleCloseChooseShippingAddress={handleCloseChooseShippingAddress}
                                    openChooseShippingAddress={openChooseShippingAddress}
                                    shippingAddresses={shippingAddresses}
                                    handleShowShippingAddress={handleShowShippingAddress}
                                    defaultShippingAddress={defaultShippingAddress}
                                    handleChooseShippingAddress={handleChooseShippingAddress}
                                    handleUpdateShippingAddress={handleUpdateShippingAddress}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'border-bottom pb-24'}>
                                {loading ? (
                                    <Skeleton variant="text" width={'100%'} height={150} />
                                ):(
                                    <div>
                                        {vendorShipment?.length > 0 && defaultShippingAddress &&
                                            <div className={'bgc-buttery-white p-16 fs-20 mt-8'}>
                                                {t('message.youGet')}
                                                <span className={'fw-400'}> {t('message.freeVoucherCourier')} </span>
                                                {t('message.claimVoucherCheckout')}
                                            </div>
                                        }
                                    </div>
                                )}
                                {loading ? (
                                    <Skeleton variant="text" width={'40%'} height={40} />
                                ):(
                                    <div className={'fs-20 mb-16 fw-400 mt-24'}>{t('label.shippingCourier')}</div>
                                )}
                                {loading ? (
                                    <Skeleton variant="text" width={'20%'} height={40} />
                                ):(
                                    <CheckoutShippingCourier
                                        couriers={vendorShipment}
                                        handleChangeCourier={handleChangeCourier}
                                        courier={courier}
                                        courierServices={courierServices}
                                        courierService={courierService}
                                        handleChangeValueCourierService={handleChangeValueCourierService}
                                        defaultShippingAddress={defaultShippingAddress}
                                    />
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'border-bottom pt-24 pb-24'}>
                                {loading ? (
                                    <CheckoutShippingInsuranceSkeleton />
                                ):(
                                    <CheckoutShippingInsurance
                                        shippingInsurancePrice={insurance}
                                        handleShippingInsurance={handleShippingInsurance}
                                        shippingInsurance={shippingInsurance}
                                        couriers={vendorShipment}
                                        defaultShippingAddress={defaultShippingAddress}
                                        mustInsurance={mustInsurance}
                                    />
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {loading ? (
                                <CheckoutPromoSkeleton />
                            ):(
                                <CheckoutGetPromo
                                    handleCodePromo={handleCodePromo}
                                    handleGetPromoVoucher={handleGetPromoVoucher}
                                    vouchers={vouchers}
                                    casbackPrice={casbackPrice}
                                    activeCoupon={activeCoupon}
                                />
                            )}
                            <CheckoutVoucherModal
                                openVoucher={openVoucher}
                                promo={promo}
                                listPromo={listPromo}
                                handleChooseVoucher={handleChooseVoucher}
                                vouchers={vouchers}
                                handleCancelVoucher={handleCancelVoucher}
                                handleToDetailVoucher={handleToDetailVoucher}
                                handleAddVoucher={handleAddVoucher}
                                notValidVoucher={notValidVoucher}
                                buttonLoading={buttonLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {loading ? (
                                <CartShoppingSummarySkeleton />
                            ):(
                                <CheckoutShoppingSummary
                                    summaryShopping={shoppingSummary}
                                    handleOpenPayment={handleOpenPayment}
                                />
                            )}
                            <CheckoutPaymentSummary
                                openPayment={openPayment}
                                handleClosePayment={handleClosePayment}
                                payments={shoppingSummary?.payments}
                                grandTotal={shoppingSummary?.summary?.grandTotal}
                                handleOpenBillingDetail={handleOpenBillingDetail}
                                handleOpenPaymentMethod={handleOpenPaymentMethod}
                                handleOpenPaymentVirtualAccount={handleOpenPaymentVirtualAccount}
                                handleOpenPaymentCreditCard={handleOpenPaymentCreditCard}
                                handleOpenPaymentInstallment={handleOpenPaymentInstallment}
                                buttonLoading={buttonLoading}
                                handlePay={handlePay}
                            />
                            <CheckoutBillingDetails
                                handleCloseBillingDetail={handleCloseBillingDetail}
                                openBilingDetail={openBilingDetail}
                                defaultShippingAddress={defaultShippingAddress}
                                summaryShopping={shoppingSummary}
                                shippingMethods={shippingMethod}
                                shippingMethodEtd={shippingMethodEtd}
                            />
                            <CheckoutPaymentMethod
                                openPaymentMethod={openPaymentMethod}
                                handleClosePaymentMethod={handleClosePaymentMethod}
                                payments={shoppingSummary?.payments}
                                handleOpenPaymentVirtualAccount={handleOpenPaymentVirtualAccount}
                                handleOpenPaymentCreditCard={handleOpenPaymentCreditCard}
                                handleOpenPaymentInstallment={handleOpenPaymentInstallment}
                            />
                            <CheckoutPaymentVirtualAccount
                                openPaymentVirtualAccount={openPaymentVirtualAccount}
                                handleClosePaymentVirtualAccount={handleClosePaymentVirtualAccount}
                                virtualAccount={virtualAccount}
                                grandTotal={shoppingSummary?.summary?.grandTotal}
                                handleOpenBillingDetail={handleOpenBillingDetail}
                                handlePay={handlePay}
                                buttonLoading={buttonLoading}
                            />
                            <CheckoutPaymentCreditCard
                                openPaymentCreditCard={openPaymentCreditCard}
                                handleClosePaymentCreditCard={handleClosePaymentCreditCard}
                                grandTotal={shoppingSummary?.summary?.grandTotal}
                                handleOpenBillingDetail={handleOpenBillingDetail}
                                handlePay={handlePayCreditCard}
                                buttonLoading={buttonLoading}
                            />
                            <CheckoutFrameThreeDS
                                openFrame={openFrame}
                                redirectUrl={redirectUrl}
                                orderNumberPayment={orderNumberPayment}
                            />
                            <CheckoutPaymentInstallment
                                payments={shoppingSummary?.payments}
                                handleClosePaymentInstallment={handleClosePaymentInstallment}
                                openPaymentInstallment={openPaymentInstallment}
                                handleConfirmInstallmentBank={handleConfirmInstallmentBank}
                                handleConfirmInstallmentTenor={handleConfirmInstallmentTenor}
                                installmentBank={installmentBank}
                                installmentTenor={installmentTenor}
                                handleConfirmInstallment={handleConfirmInstallment}
                            />
                            <CheckoutPaymentInstallmentForm
                                openPaymentInstallmentForm={openPaymentInstallmentForm}
                                handleClosePaymentInstallmentForm={handleClosePaymentInstallmentForm}
                                handleOpenBillingDetail={handleOpenBillingDetail}
                                handlePay={handlePayInstallment}
                                buttonLoading={buttonLoading}
                                installmentBank={installmentBank}
                                installmentTenor={installmentTenor}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default CheckoutOrganism;