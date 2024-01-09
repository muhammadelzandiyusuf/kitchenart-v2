import {React, Suspense, Grid} from 'libraries';

const PaymentVirtualAccountUntilDate = React.lazy(() => import('components/molecules/OrderMolecule/Payment/PaymentVirtualAccountUntilDate'));
const PaymentVirtualAccountBank = React.lazy(() => import('components/molecules/OrderMolecule/Payment/PaymentVirtualAccountBank'));
const PaymentVirtualAccountOrderGuide = React.lazy(() => import('components/molecules/OrderMolecule/Payment/PaymentVirtualAccountOrderGuide'));
const PaymentCreditCardSuccess = React.lazy(() => import('components/molecules/OrderMolecule/Payment/PaymentCreditCardSuccess'));

const PaymentVirtualAccount = (props) => {

    const {payments, handleCopyVirtualAccountNumber, params, handleViewPayments} = props;

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    {params.type === 'virtual-account' &&
                        <PaymentVirtualAccountUntilDate
                            payments={payments}
                        />
                    }
                    {params.type === 'credit-card' &&
                        <PaymentCreditCardSuccess />
                    }
                    <PaymentVirtualAccountBank
                        payments={payments}
                        handleCopyVirtualAccountNumber={handleCopyVirtualAccountNumber}
                        handleViewPayments={handleViewPayments}
                    />
                    <PaymentVirtualAccountOrderGuide
                        information={payments?.payment?.information}
                    />
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default PaymentVirtualAccount;