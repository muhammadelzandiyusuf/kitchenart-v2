import {Breadcrumbs, Link, NavigateNext, React, Suspense, Typography} from 'libraries';

const HelpBreadcrumb = (props) => {
    const { helpCategory } = props;

    return (
        <Suspense fallback={null}>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
                <Link className="breadcrumbs__link fs-18" to={`/`}>
                    Home
                </Link>
                <Link className="breadcrumbs__link fs-18" to={`/help`}>
                    Help
                </Link>
                <Typography className="breadcrumbs__last fs-18">
                    {helpCategory.name}
                </Typography>
            </Breadcrumbs>
        </Suspense>
    );
};

export default HelpBreadcrumb;