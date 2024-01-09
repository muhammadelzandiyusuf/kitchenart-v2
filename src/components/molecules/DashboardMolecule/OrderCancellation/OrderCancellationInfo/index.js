import {React, Suspense, useTranslation} from "libraries";

const OrderCancellationInfo = () => {
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <div>
                <div className={'bgc-buttery-white p-16 fs-20 mb-20 mt-6 tx-c'}>
                    {t('message.noteCancelOrder')}
                </div>
            </div>
        </Suspense>
    )
}

export default OrderCancellationInfo;