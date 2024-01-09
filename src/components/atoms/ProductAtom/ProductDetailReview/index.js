import {React, Suspense, Grid, ratingStyles, Rating, useTranslation} from 'libraries';

const ProgressRatingDetail = React.lazy(() => import('components/atoms/ProductAtom/ProgressRatingDetail'));

const ProductDetailReview = (props) => {

    const t = useTranslation();
    const classes = ratingStyles();

    let fiveStar = 0;
    let fourStar = 0;
    let threeStar = 0;
    let twoStar = 0;
    let oneStar = 0;
    let fiveStarCount = 0;
    let fourStarCount = 0;
    let threeStarCount = 0;
    let twoStarCount = 0;
    let oneStarCount = 0;

    if (props.reviews?.length > 0) {
        if (props.detailReview?.details?.length > 0) {
            props.detailReview?.details?.forEach(item => {
                if (item['5']) {
                    fiveStar = item['5'] / props.detailReview?.totalVotes * 100;
                    fiveStarCount = item['5']
                }
                else if (item['4']) {
                    fourStar = item['4'] / props.detailReview?.totalVotes * 100;
                    fourStarCount = item['4']
                }
                else if (item['3']) {
                    threeStar = item['3'] / props.detailReview?.totalVotes * 100;
                    threeStarCount = item['3']
                }
                else if (item['2']) {
                    twoStar = item['2'] / props.detailReview?.totalVotes * 100;
                    twoStarCount = item['2']
                }
                else {
                    oneStar = item['1'] / props.detailReview?.totalVotes * 100;
                    oneStarCount = item['1']
                }
            });
        }
        else {
            fiveStar = 0;
            fourStar = 0;
            threeStar = 0;
            twoStar = 0;
            oneStar = 0;
            fiveStarCount = 0;
            fourStarCount = 0;
            threeStarCount = 0;
            twoStarCount = 0;
            oneStarCount = 0;
        };
    };

    return (
        <Suspense fallback={null}>
            <div className={'bgc-slate-grey discussion mt-40 mb-24'}>
                <div className={'fs-16 tx-c p-24'}>{props.brand?.name} {props.name} {props.code}</div>
                <Grid container spacing={0}>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <div className={'ta-c tx-c'}>
                            <div className={'fs-44 fw-400'}>
                                {props.detailReview?.averageRate ? props.detailReview?.averageRate : 0}
                                <span className={'fs-18 fw-none'}>/5</span>
                            </div>
                            <div className={`${classes.root} ai-c rating__detail`}>
                                <Rating
                                    name="half-rating-read"
                                    value={props.detailReview?.averageRate ? props.detailReview?.averageRate : 0}
                                    precision={0.5} readOnly />
                            </div>
                            <div className={'mb-32 fs-18'}>
                                {props.detailReview?.totalVotes ? props.detailReview?.totalVotes : 0} {t('label.review')}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} lg={9}>
                        <div className={'mb-8'}>
                            <ProgressRatingDetail
                                stars={5}
                                barRating={fiveStar}
                                reviewCount={fiveStarCount}
                            />
                        </div>
                        <div className={'mb-8'}>
                            <ProgressRatingDetail
                                stars={4}
                                barRating={fourStar}
                                reviewCount={fourStarCount}
                            />
                        </div>
                        <div className={'mb-8'}>
                            <ProgressRatingDetail
                                stars={3}
                                barRating={threeStar}
                                reviewCount={threeStarCount}
                            />
                        </div>
                        <div className={'mb-8'}>
                            <ProgressRatingDetail
                                stars={2}
                                barRating={twoStar}
                                reviewCount={twoStarCount}
                            />
                        </div>
                        <div className={'mb-32'}>
                            <ProgressRatingDetail
                                stars={1}
                                barRating={oneStar}
                                reviewCount={oneStarCount}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default ProductDetailReview;
