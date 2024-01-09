import {Breadcrumbs, Link, NavigateNext, React, Suspense, Typography} from 'libraries';

const ProfileBreadcrumb = (props) => {

    return (
        <Suspense fallback={null}>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
                <Link className="breadcrumbs__link fs-18" to={`/profile/dashboard`}>
                    Dashboard
                </Link>
                <Link className="breadcrumbs__link fs-18" to={`/profile`}>
                    Profile
                </Link>
                <Typography className="breadcrumbs__last fs-18">
                    Edit Profile
                </Typography>
            </Breadcrumbs>
        </Suspense>
    );
};

export default ProfileBreadcrumb;