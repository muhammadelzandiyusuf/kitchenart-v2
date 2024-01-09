import { React, Breadcrumbs, Link, NavigateNext, Typography } from 'libraries';

const ProductBreadcrumbs = (props) => {

    const { category } = props;
    let path = null;
    let slug = null;
    if (category?.fullPath !== null) {
        path = category?.fullPath.split('>');
        slug = category?.fullSlug.split('/');
    }

    const baseProductBreadcumb = (
        <Breadcrumbs className="mb-48" aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
            <Link className="breadcrumbs__link fs-14" to={`${slug !== null ? `/parent-category/${slug[0]}` : ''}`}>
                {path !== null ? path[0] : ''}
            </Link>
            <Link className="breadcrumbs__link fs-14" to={`${slug !== null ? `/parent-category/${slug[1]}` : ''}`}>
                {path !== null ? path[1] : ''}
            </Link>
            <Typography className="breadcrumbs__last fs-14">{path !== null ? path[2] : ''}</Typography>
        </Breadcrumbs>
    );

    const packageProductBreadcumb = (
        <Breadcrumbs className="mb-48" aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
            <Link className="breadcrumbs__link fs-14" to={`${slug !== null ? `/` : ''}`}>
                {path !== null ? path[0] : ''}
            </Link>
            <Link className="breadcrumbs__link fs-14" to={`${slug !== null ? `/promo/${slug[1]}` : ''}`}>
                {path !== null ? path[1] : ''}
            </Link>
            <Typography className="breadcrumbs__last fs-14">{path !== null ? path[2] : ''}</Typography>
        </Breadcrumbs>
    );

    switch (props.type) {
        case 'base-product':
            return baseProductBreadcumb;
        case 'package-product':
            return packageProductBreadcumb;
        default:
            return baseProductBreadcumb;
    };
};

export default ProductBreadcrumbs;