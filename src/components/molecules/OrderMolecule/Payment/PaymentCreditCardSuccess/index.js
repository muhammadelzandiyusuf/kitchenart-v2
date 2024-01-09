import {React, Suspense, useTranslation} from 'libraries';

const PaymentCreditCardSuccess = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'border-bottom pb-32'}>
                <div className={'fs-34 fw-b ta-c mt-32 mb-16'}>{t('message.successfulPayment')}</div>
                <div className={'fs-26 ta-c'}>{t('message.thankYouForBuying')}</div>
            </div>
        </Suspense>
    );
};

export default PaymentCreditCardSuccess;