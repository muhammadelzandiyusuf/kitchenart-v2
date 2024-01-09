import {EmptyProduct, Grid, React, Skeleton, Suspense, useTranslation} from "libraries";
import {convertDate} from "utils";

const OrderComplaintList = (props) => {
    const { loading, orderComplaints, handleDetail, optionStatus } = props;

    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            {loading ? (
                <div className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                    <div className={'mb-32 p-48 bgc-white'}>
                        <Grid container spacing={0}>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={'mb-32 p-48 bgc-white'}>
                        <Grid container spacing={0}>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                                <Skeleton variant={'text'} width={'80%'} height={40} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            ) : (
                orderComplaints.length > 0 ? (
                    orderComplaints.map((orderComplaint, index) => {
                        const created = convertDate(orderComplaint?.created, 'DD MMM yyyy kk:mm:ss');
                        const imageProduct = orderComplaint.orderItem.productImage;
                        const status = optionStatus.find((item) => item.value === orderComplaint.status);
                        return(
                            <div className={'box-shadow-box border-radius-10px bgc-white mb-32'} key={index}>
                                <div className={'p-16 fs-16 tx-c border-bottom-2px'}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={4} sm={4} md={4} lg={4}>
                                            {created}
                                        </Grid>
                                        <Grid item xs={8} sm={8} md={8} lg={8}>
                                            {t('label.complaintId')} : {orderComplaint.complaintNumber}
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={'p-16 fs-16 tx-c'}>
                                    <Grid container spacing={0} direction="row" justifycontent="center" alignItems="center">
                                        <Grid item xs={2} sm={2} md={2} lg={3}>
                                            <img src={imageProduct !== null ? imageProduct : EmptyProduct}
                                                 alt={"img-product"} className={'w-100'} />
                                        </Grid>
                                        <Grid item xs={4} sm={4} md={3} lg={4}>
                                            <div className={'ml-16'}>
                                                <div className={'fw-400'}>{orderComplaint.orderItem.productBrand}</div>
                                                {`
                                                    ${orderComplaint.orderItem.productName}
                                                    ${orderComplaint.orderItem.productCode}
                                                `}
                                            </div>
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={2} lg={2}>
                                            {orderComplaint.orderItem.quantity} item
                                        </Grid>
                                        <Grid item xs={3} sm={3} md={3} lg={3} className={"ta-c"}>
                                            {status !== undefined ? status.displayName : ''}
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={'p-16 fs-16 tx-c'}>
                                    <Grid container spacing={2} direction="row" justifycontent="center" alignItems="center">
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div className={'td-u pointer ta-r'}
                                                 onClick={() => handleDetail(orderComplaint.complaintNumber)}>
                                                {t('label.seeDetail')}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className={'mb-32 p-48 bgc-white'}>
                        <div className={'fs-24 ta-c tx-c fw-400'}>{t('label.noComplaint')}</div>
                    </div>
                )
            )}
        </Suspense>
    )
}

export default OrderComplaintList;