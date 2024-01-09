import {Grid, React, Suspense, useTranslation} from "libraries";

const CategoryAbout = (props) => {
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Grid item lg={12} className="category__description__text ta-c">
                <div className="fs-20" dangerouslySetInnerHTML={{__html: props.parentCategory?.description}}></div>
            </Grid>
            <Grid item lg={12} className="pb-100 ta-c">
                <div className="fs-20 fw-b pointer">
                    <div onClick={() => props.handleUrl(props.parentCategory?.href)}>{t('label.shopNow')}</div>
                </div>
            </Grid>
        </Suspense>
    )
}

export default CategoryAbout;