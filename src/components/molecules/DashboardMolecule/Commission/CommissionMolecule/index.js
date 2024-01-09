import {NumberFormat, React, Suspense, useTranslation, Grid} from 'libraries';

const CommissionMolecule = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'p-24 fs-18 fw-400 border-bottom'}>{t('label.commissions')}</div>
            <div className={'pr-24 pl-24 pb-40 pt-40'}>
                {props.commission?.message ? (
                    <div className={'fs-18 fw-400 tx-c'}>{props.commission?.message}</div>
                ):(
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <NumberFormat value={props.commission?.balance} displayType={'text'} thousandSeparator={true}
                                          prefix={'Rp'} decimalScale={0} className={'fw-b fs-24'} />
                        </Grid>
                        {props.commission?.balance >= 100000 &&
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <div className={'ta-r fw-400 fs-18'}>
                                    <span
                                        className={'text__color__black-hover pointer'}
                                        onClick={props.handleWithdraw}
                                    >
                                        {t('label.withdrawFunds')}
                                    </span>
                                </div>
                            </Grid>
                        }
                    </Grid>
                )}
            </div>
        </Suspense>
    );
};

export default CommissionMolecule;