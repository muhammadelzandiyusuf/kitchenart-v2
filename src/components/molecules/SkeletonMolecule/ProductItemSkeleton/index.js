import { React, Skeleton, Card, Grid } from 'libraries';

const ProductItemSkeleton = (props) => {

    return (
        <Card className="skeleton__card__mobile">
            <Skeleton variant="rect" className={'skeleton__image__product'} />
            <div className="skeleton__content__product">
                <Skeleton variant="text" width={100} height={30} />
                <Skeleton variant="text" height={25} />
                <Skeleton variant="text" height={25} width={150} />
            </div>
            <div className="skeleton__price__product">
                <Grid container spacing={0}>
                    <Grid item xs={8} sm={8} md={8} lg={6}>
                        <Skeleton variant="text" height={35} className="w-80" />
                        <Skeleton variant="text" height={40} className="w-100" />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={6}>
                        <Skeleton variant="circle" height={35} width={35} className="fl-r mt-20" />
                    </Grid>
                </Grid>
            </div>
            <div className="skeleton__action__product">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Skeleton variant="rect" height={30} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Skeleton variant="rect" height={30} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton variant="rect" height={30} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Skeleton variant="rect" height={40} />
                    </Grid>
                </Grid>
            </div>
        </Card>
    );
};

export default ProductItemSkeleton;