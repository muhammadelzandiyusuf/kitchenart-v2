import {Breadcrumbs, Link, NavigateNext, React, Suspense, Typography} from "libraries";

const OrderCancellationBreadcrumb = () => {
    return(
        <Suspense fallback={null}>
            <Breadcrumbs className="mb-10" aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
                <Link className="breadcrumbs__link fs-14" to={"dashboard"}>
                    Dashboard
                </Link>
                <Link className="breadcrumbs__link fs-14" to={"/profile/order-cancellation"}>
                    Order Cancellation
                </Link>
                <Typography className="breadcrumbs__last fs-14">Cancel Detail</Typography>
            </Breadcrumbs>
        </Suspense>
    )
}

export default OrderCancellationBreadcrumb;