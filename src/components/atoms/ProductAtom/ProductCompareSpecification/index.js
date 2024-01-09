import {Grid, React, Suspense} from "libraries";

const ProductCompareSpecification = (props) => {
    return(
        <Suspense fallback={null}>
            <div className="mt-20">
                <Grid xs={12} sm={12} md={12} item lg={12} className="fw-b">
                    {props.specification?.attribute?.name}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className="mt-10">
                    {props.specification?.content === '' &&
                        <div>-</div>
                    }
                    {props.specification?.attribute?.type === 'text'  &&
                        <div className="fs-14">{props.specification?.content}</div>
                    }
                    {props.specification?.attribute?.type === 'color' &&
                        <div className={'specification__color'} style={{backgroundColor: props.specification?.content}}></div>
                    }
                    {props.specification?.attribute?.type === "markdown" &&
                        <div className="fs-14" dangerouslySetInnerHTML={{__html: props.specification?.content}} />
                    }
                </Grid>
            </div>
        </Suspense>
    )
}

export default ProductCompareSpecification;