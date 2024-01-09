import {Breadcrumbs, Grid, Link, NavigateNext, React, Suspense, Typography, useTranslation} from "libraries";

const ProductReview = React.lazy(() => import('components/molecules/DashboardMolecule/HistoryOrder/ProductReview'));

const ProductReviewOrganism = (props) => {

    const { historyOrder, loading, handleUploadImage, photoReview, handleSubmitReview, handleCancelReview,
        buttonLoading } = props;
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Suspense fallback={null}>
                <Grid container spacing={0}>
                    <Breadcrumbs className="mb-10" aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
                        <Link className="breadcrumbs__link fs-18" to={"dashboard"}>
                            Dashboard
                        </Link>
                        <Link className="breadcrumbs__link fs-18" to={"/profile/history-order/"}>
                            {t('label.historyOrder')}
                        </Link>
                        <Link className="breadcrumbs__link fs-18" to="#" onClick={handleCancelReview}>
                            {t('label.transactionDetail')}
                        </Link>
                        <Typography className="breadcrumbs__last fs-18">Review</Typography>
                    </Breadcrumbs>
                    <Grid item xs={12} sm={12} lg={12} className={'box-shadow-box border-radius-10px bgc-white mb-32'}>
                        <ProductReview
                            historyOrder={historyOrder}
                            loading={loading}
                            handleUploadImage={handleUploadImage}
                            photoReview={photoReview}
                            handleSubmitReview={handleSubmitReview}
                            handleCancelReview={handleCancelReview}
                            buttonLoading={buttonLoading}
                        />
                    </Grid>
                </Grid>
            </Suspense>
        </Suspense>
    )
}

export default ProductReviewOrganism;