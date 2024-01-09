import {EmptyProduct, React, Suspense} from "libraries";
import {Grid} from "@material-ui/core";
import {getHostUrl} from "utils";

const CategoryProductLines = (props) => {

    return(
        <Suspense fallback={null}>
            <Grid item lg={12} className="category__product__lines ta-c fw-b">
                Product Lines
            </Grid>
            <Grid container spacing={0} className="category__detail ta-c">
                {props.categories?.length > 0 &&
                    props.categories.map((category, index) => {
                    return(
                        <Grid item xs={6} sm={6} md={6} lg={4} key={index} className="category__product__lines--box">
                            <div>
                                <img src={category.iconImage === null ? EmptyProduct : getHostUrl(category.iconImage)}
                                       className="category__image pointer" alt=''
                                       onClick={() => props.handleUrl(category.href)}  />
                            </div>
                            <div className="category__text">
                                <div className="pointer" onClick={() => props.handleUrl(category.href)}>
                                    {category.name}
                                </div>
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </Suspense>
    )
}

export default CategoryProductLines;