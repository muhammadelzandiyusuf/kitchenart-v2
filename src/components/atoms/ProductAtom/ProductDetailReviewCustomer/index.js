import {React, Suspense, Grid, faUserCircle, Rating} from 'libraries';
import {convertDate, getHostUrl} from "utils";

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const ProductDetailReviewCustomer = (props) => {

    const { reviews } = props;

    return (
        <Suspense fallback={null}>
            {reviews?.length > 0 &&
                reviews.map((item, index) => {
                    const date = convertDate(item.created, 'MMMM DD, YYYY');
                    const fullName = item?.user?.firstName?.length > 3 ? item?.user?.firstName.slice(0, 3) : item?.user?.firstName.slice(0, 2);
                    return (
                        <div className={'bgc-slate-grey discussion p-24 border__left__primary mb-16'} key={index}>
                            <Grid container spacing={2}>
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <div className={'mb-8 fs-16 tx-c'}>
                                        <IconAtom icon={faUserCircle} styleIcon={'fs-35'} />
                                        <span className={'ml-8 ps-ab transform-y-25'}>
                                            {item.isAnonymous ? (
                                                `${fullName}***`
                                            ):(
                                                `${item?.user?.firstName} ${item?.user?.lastName}`
                                            )}
                                        </span>
                                    </div>
                                    <div className={'mb-8 rating__detail'}>
                                        <Rating name="half-rating-read" value={item.rate} precision={0.5} readOnly />
                                    </div>
                                    <div className={'fs-16 tx-c'}>
                                        {date}
                                    </div>
                                </Grid>
                                <Grid item xs={9} sm={9} md={9} lg={9}>
                                    <div className={'fs-16 tx-c mb-16'}>
                                        {item.content}
                                    </div>
                                    {item.media?.length > 0 &&
                                        <Grid container spacing={2}>
                                            {item.media.map((media, number) => {
                                                const image = getHostUrl(media.image);
                                                return (
                                                    <Grid item xs={2} sm={2} md={2} lg={2} key={number}>
                                                        <div className={'bgc-white'}>
                                                            <img src={image} className={'w-100'} alt={'productimagereview'} />
                                                        </div>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </div>
                    )
                })
            }
        </Suspense>
    );
};

export default ProductDetailReviewCustomer;