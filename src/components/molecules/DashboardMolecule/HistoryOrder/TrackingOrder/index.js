import {CopyToClipboard, Grid, ImgCopy, React, Suspense, useTranslation} from "libraries";
import {convertDate} from "utils";

const TrackingOrder = (props) => {
    const { handleCopyTrackingNumber, trackingOrder } = props;
    const t = useTranslation();
    const count = trackingOrder.histories?.length - 1;

    return(
        <Suspense fallback={null}>
            <div className={"fs-18 fw-b p-16"}>{t('label.trackingOrder')}</div>
            <div className={"fs-16 ml-32"}>
                <Grid container spacing={0}>
                    <Grid item xs={6} sm={2} lg={2}>
                        <div className={"mb-10"}>{t('label.courier')} : </div>
                    </Grid>
                    <Grid item xs={6} sm={10} lg={10}>
                        <div className={"mb-10"}>{trackingOrder.shippingVendorName}</div>
                    </Grid>
                    <Grid item xs={6} sm={2} lg={2}>
                        <div className={"mb-10"}>{t('label.service')} : </div>
                    </Grid>
                    <Grid item xs={6} sm={10} lg={10}>
                        <div className={"mb-10"}>
                            {`${trackingOrder.shippingService} (${trackingOrder.logisticProperties?.etdFrom}-
                            ${trackingOrder.logisticProperties?.etdTo} ${t('label.day')})`}
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3} lg={3}>
                        <div className={"mb-10"}>
                            <p className={"mb-5"}>{t('label.airWaybill')}</p> {trackingOrder.logisticProperties?.awbNumber} </div>
                    </Grid>
                    <Grid item xs={6} sm={9} lg={9}>
                        <CopyToClipboard text={trackingOrder.logisticProperties?.awbNumber} onCopy={handleCopyTrackingNumber}>
                            <span>
                                <img src={ImgCopy} width={30} height={30} alt={"img"} className={"pointer pt-12"} />
                            </span>
                        </CopyToClipboard>
                    </Grid>
                    <Grid item xs={10} sm={10} lg={10}>
                        <div className={"mb-32"}>
                            <p className={"mb-5"}>{t('label.receiverAddress')}</p>
                            <p className={"fw-b mb-5"}>{trackingOrder.receiverName}</p>
                            <p>
                                {`${trackingOrder.receiverAddress}, ${trackingOrder.receiverSubDistrict},
                                ${trackingOrder.receiverDistrict}, ${trackingOrder.receiverCity}, 
                                ${trackingOrder.receiverProvince} ${trackingOrder.receiverPostalCode}`}
                            </p>
                        </div>
                    </Grid>
                </Grid>
                {trackingOrder.histories?.map((history, index) => {
                    const date = convertDate(history?.connoteDate, 'DD MMM yyyy kk:mm:ss');

                    return(
                        <div key={index}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} lg={12}>
                                    <span className={index === 0 ? "tracking-dot-active" : "tracking-dot"}> </span>
                                    <span className={"ml-40"}>{date}</span>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={12}
                                      className={index === count ? "tracking-content-last" : "tracking-content"}>
                                    {history.description}
                                </Grid>
                            </Grid>
                        </div>
                    )
                })}
            </div>
        </Suspense>
    )
}

export default TrackingOrder;