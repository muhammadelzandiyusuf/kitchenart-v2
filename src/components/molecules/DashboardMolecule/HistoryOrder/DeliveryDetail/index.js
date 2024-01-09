import {faShippingFast, Grid, React, Skeleton, Suspense, useTranslation} from "libraries";

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const DeliveryDetail = (props) => {
    const { historyOrder, loading } = props;

    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <div className={'fs-18 fw-b tx-c p-16 border-bottom-2px'}>
                {loading ?
                    <Skeleton variant={'text'} width={'30%'} height={40} />
                    :
                    t('label.shippingDetail')
                }
            </div>
            <div className={'p-16 fs-16 tx-c'}>
                <Grid container spacing={0}>
                    <Grid item lg={12}>
                        {loading ?
                            <Skeleton variant={'text'} width={'20%'} height={40} />
                            :
                            <div className={'lh-2rem'}>
                                {historyOrder.shippingAddress?.receiptName}
                            </div>
                        }
                    </Grid>
                    <Grid item lg={12}>
                        {loading ?
                            <Skeleton variant={'text'} width={'80%'} height={40} />
                            :
                            <div className={'lh-2rem'}>
                                <span>{historyOrder.shippingAddress?.address}, </span>
                                <span>{historyOrder.shippingAddress?.subDistrict}, </span>
                                <span>{historyOrder.shippingAddress?.district}, </span>
                                <span>{historyOrder.shippingAddress?.city}, </span>
                                <span>{historyOrder.shippingAddress?.province}, </span>
                                <span>{historyOrder.shippingAddress?.postalCode}</span>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        {loading ?
                            <Skeleton variant={'text'} width={'20%'} height={40} />
                            :
                            <div className={'lh-2rem'}>
                                {historyOrder.shippingAddress?.province}
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        {loading ?
                            <Skeleton variant={'text'} width={'20%'} height={40}/>
                            :
                            <div className={'lh-2rem'}>
                                P: {historyOrder.shippingAddress?.phoneNumber}
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        {loading ?
                            <Skeleton variant={'text'} width={'40%'} height={40}/>
                            :
                            <div className={'lh-2rem'}>
                                <IconAtom icon={faShippingFast} styleIcon={'mr-8'} />
                                <span>{historyOrder.shippingVendorName.toUpperCase()} / </span>
                                <span>{historyOrder.shippingServiceName} </span>
                            </div>
                        }
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    )
}

export default DeliveryDetail;