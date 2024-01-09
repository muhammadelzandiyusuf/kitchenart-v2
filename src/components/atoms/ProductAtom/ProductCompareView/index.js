import {Grid, React, Suspense, useTranslation} from "libraries";

const ProductCompareView = (props) => {
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Grid item lg={12}>
                <div className="fs-16 c-black fw-400 lh-2rem lsp-2 mt-30 mb-10 pointer">
                    <div onClick={() => props.handleUrl(props.href)}>{t('label.viewMore')}</div>
                </div>
            </Grid>
        </Suspense>
    )
}

export default ProductCompareView;