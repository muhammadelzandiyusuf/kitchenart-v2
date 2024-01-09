import {Grid, React, Suspense} from "libraries";

const CategoryAbout = React.lazy(() => import('components/molecules/CategoryMolecule/CategoryAbout'));
const CategoryProductLines = React.lazy(() => import('components/molecules/CategoryMolecule/CategoryProductLines'));

const ParentCategoryOrganism = (props) => {
    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12} className="category__description__box">
                    <CategoryAbout parentCategory={props.parentCategory} handleUrl={props.handleUrl} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <CategoryProductLines categories={props.categories} handleUrl={props.handleUrl} />
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default ParentCategoryOrganism;