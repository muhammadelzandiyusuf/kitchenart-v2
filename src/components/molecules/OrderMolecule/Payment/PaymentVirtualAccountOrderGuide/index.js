import {React, Suspense} from 'libraries';

const PaymentVirtualAccountOrderGuide = (props) => {

    const {information} = props;

    return (
        <Suspense fallback={null}>
            <div className={'mt-32 mb-32 fs-20 link__color__primary'} dangerouslySetInnerHTML={{__html: information}}></div>
        </Suspense>
    );
};

export default PaymentVirtualAccountOrderGuide;