import {React, Suspense, Grid, useTranslation} from 'libraries';

const CommissionWithdrawBreadcumb = React.lazy(() => import('components/molecules/DashboardMolecule/Commission/CommissionWithdrawBreadcumb'));
const CommissionWithdrawForm = React.lazy(() => import('components/molecules/DashboardMolecule/Commission/CommissionWithdrawForm'));
const CommissionWithdrawConfirm = React.lazy(() => import('components/molecules/DashboardMolecule/Commission/CommissionWithdrawConfirm'));

const CommissionWithdrawOrganism = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'border-color-primary bgc-pink p-24 fs-18 box-sizing-border mb-32'}>
                        <div className={'fw-400'}>{t('message.helloKitchenartVisitors')},</div>
                        {t('message.minimumWithdraw')}
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <CommissionWithdrawBreadcumb />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div className={'bgc-white border-radius-10px box-shadow-box mt-16'}>
                        <CommissionWithdrawForm
                            handleAddForm={props.handleAddForm}
                            commission={props.commission}
                            balance={props.balance}
                            handleUseAllBalance={props.handleUseAllBalance}
                            amount={props.amount}
                            handleAmount={props.handleAmount}
                            bank={props.bank}
                            accountNumber={props.accountNumber}
                            completeBank={props.completeBank}
                            handleUpdateBank={props.handleUpdateBank}
                            handleConfirm={props.handleConfirm}
                        />
                    </div>
                </Grid>
            </Grid>
            <CommissionWithdrawConfirm
                amount={props.amount}
                bank={props.bank}
                accountNumber={props.accountNumber}
                openConfirmWithdraw={props.openConfirmWithdraw}
                handleCloseConfirm={props.handleCloseConfirm}
                handleFinalConfirm={props.handleFinalConfirm}
                buttonLoading={props.buttonLoading}
            />
        </Suspense>
    );
};

export default CommissionWithdrawOrganism;