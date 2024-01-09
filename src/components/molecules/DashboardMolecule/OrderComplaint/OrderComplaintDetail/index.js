import {EmptyProduct, Grid, React, Skeleton, Suspense, useTranslation} from "libraries";
import {convertDate} from "utils";

const OrderComplaintDetail = (props) => {
    const {loading, orderComplaint, optionStatus} = props;

    const t = useTranslation();

    const created = convertDate(orderComplaint?.created, 'DD MMM yyyy kk:mm:ss');
    const imageProduct = orderComplaint.orderItem?.productImage;
    const status = optionStatus.find((item) => item.value === orderComplaint.status);

    return(
        <Suspense fallback={null}>
            <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                <div className={'p-16 fs-16 tx-c border-bottom-2px'}>
                    <Grid container spacing={0}>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {created}
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {t('label.complaintId')} : {orderComplaint.complaintNumber}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={'p-16 fs-16 tx-c'}>
                    <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                        <Grid item xs={2} sm={2} md={2} lg={3}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <img src={imageProduct !== null ? imageProduct : EmptyProduct}
                                     alt={"img-product"} className={'w-100'} />
                            )}
                        </Grid>
                        <Grid item xs={4} sm={4} md={3} lg={4}>
                            <div className={'ml-16'}>
                                {loading ? (
                                    <Skeleton variant={'text'} width={'80%'} height={40}/>
                                ) : (
                                    <div>
                                        <div className={'fw-400'}>{orderComplaint.orderItem?.productBrand}</div>
                                        {`
                                            ${orderComplaint.orderItem?.productName}
                                            ${orderComplaint.orderItem?.productCode}
                                        `}
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={3} sm={3} md={2} lg={2}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {orderComplaint.orderItem?.quantity} item
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} lg={3} className={"ta-c"}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {status !== undefined ? status.displayName : ''}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={'p-16 fs-16 tx-c'}>
                    <Grid container spacing={2} direction="row" justifycontent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div className={'td-u ta-r'}>
                                {loading ? (
                                    <Skeleton variant={'text'} width={'80%'} height={40}/>
                                ) : (
                                    <a href="https://wa.me/6282211995022"
                                       target={'_blank'}
                                       rel="noreferrer"
                                       className={'pointer tx-c'}>{t('label.contactUs')}</a>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                <div className={'p-16 fs-16 tx-c border-bottom-2px'}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {t('label.complaintDetail')}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className={'p-16 fs-16 tx-c'}>
                    <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {t('label.complaintReason')} :
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={"mt-20 mb-32"}>
                            {loading ? (
                                <Skeleton variant={'text'} width={'80%'} height={40}/>
                            ) : (
                                <div>
                                    {orderComplaint.reason}
                                </div>
                            )}
                        </Grid>
                        {orderComplaint.media?.map((media, index) => {
                            const imageComplaint = media.image;
                            return(
                                <Grid item xs={2} sm={2} md={2} lg={2} key={index}>
                                    <img src={imageComplaint !== null ? imageComplaint : EmptyProduct}
                                         alt={"img-product"} className={'photo-complaint'} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </div>
        </Suspense>
    )
}

export default OrderComplaintDetail;