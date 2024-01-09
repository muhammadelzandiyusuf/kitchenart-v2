import {React, Suspense, useTranslation} from 'libraries';
import {convertDate} from "utils";

const PaymentCountTime = React.lazy(() => import('components/molecules/OrderMolecule/Payment/PaymentCountTime'));

const PaymentVirtualAccountUntilDate = (props) => {

    const {payments} = props;
    const t = useTranslation();

    const dateEnd = convertDate(payments?.payment?.expiryDate, 'dddd, DD MMMM yyyy kk:mm');
    const deadline = {
        validFrom: payments?.created,
        validTo: payments?.payment?.expiryDate
    };

    return (
        <Suspense fallback={null}>
            <div className={'border-bottom pb-32'}>
                <div className={'fs-34 fw-b ta-c mt-32 mb-16'}>{t('label.completeThePaymentIn')}</div>
                <PaymentCountTime
                    deadline={deadline}
                    styleView={'fs-44 ta-c fw-b tc-p mb-16'}
                />
                <div className={'fs-26 ta-c'}>{t('label.paymentDeadline')}</div>
                <div className={'fs-26 ta-c'}>{dateEnd}</div>
            </div>
        </Suspense>
    );
};

export default PaymentVirtualAccountUntilDate;