import {React, Suspense, Grid} from 'libraries';

const ProductDetailSummary = (props) => {

    return(
        <Suspense fallback={null}>
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {props.specifications?.length > 0 &&
                            props.specifications.map((specification, key) => {
                            return(
                                <div key={key} className={key === 0 || specification.showOnQuickView === false ? "" : "border-top"}>
                                    {specification.showOnQuickView === true &&
                                        <Grid container spacing={0} className="mt-20 mb-20">
                                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                                <b className="fs-16">{specification.attribute?.name}</b>
                                            </Grid>
                                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                                {specification.content === '' &&
                                                    <div>-</div>
                                                }
                                                {specification.attribute?.type === 'text'  &&
                                                    <div className="fs-14">{specification.content}</div>
                                                }
                                                {specification.attribute?.type === 'color' &&
                                                    <div className={'specification__color'} style={{backgroundColor: specification.content}}></div>
                                                }
                                                {specification.attribute?.type === "markdown" &&
                                                    <div className="fs-14" dangerouslySetInnerHTML={{__html: specification.content}} />
                                                }
                                            </Grid>
                                        </Grid>
                                    }
                                </div>
                            )
                        })}
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    )
}

export default ProductDetailSummary;