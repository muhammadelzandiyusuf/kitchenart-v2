import {React, Pagination, Suspense, Button, FontAwesomeIcon, faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft,
    faAngleRight, Skeleton
} from 'libraries';

const PaginationAtom = (props) => {

    const fullPagination = (
        <Suspense fallback={null}>
            <div className={props.styleBoxPagination}>
                <Pagination count={props.count} page={props.page} onChange={props.handleChange}
                            variant={props.variant} shape={props.shape} />
            </div>
        </Suspense>
    );

    const simplePagination = (
        <Suspense fallback={null}>
            <div className={props.styleBoxPagination}>
                {props.loading ?
                    <div>
                        <Button>
                            <Skeleton variant="rect" height={40} width={40} />
                        </Button>
                        <Button>
                            <Skeleton variant="rect" height={40} width={40} />
                        </Button>
                        <Button>
                            <Skeleton variant="rect" height={40} width={40} />
                        </Button>
                        <Button>
                            <Skeleton variant="rect" height={40} width={40} />
                        </Button>
                        <Button>
                            <Skeleton variant="rect" height={40} width={40} />
                        </Button>
                    </div>
                    :
                    <div>
                        <Button variant={props.variant} onClick={() => props.handleChange(props.first.value, props.first.href)}
                                className={'simple__pagination'} disabled={props.first.disabled}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} className={props.styleIcon} disabled={props.disabled} />
                        </Button>
                        <Button variant={props.variant} onClick={() => props.handleChange(props.prev.value, props.prev.href)}
                                className={'simple__pagination'} disabled={props.prev.disabled}>
                            <FontAwesomeIcon icon={faAngleLeft} className={props.styleIcon} />
                        </Button>
                        <Button variant={props.variant} className={'simple__pagination'}>
                            {props.page}
                        </Button>
                        <Button variant={props.variant} onClick={() => props.handleChange(props.next.value, props.next.href)}
                                className={'simple__pagination'} disabled={props.next.disabled}>
                            <FontAwesomeIcon icon={faAngleRight} className={props.styleIcon} />
                        </Button>
                        <Button variant={props.variant} onClick={() => props.handleChange(props.last.value, props.last.href)}
                                className={'simple__pagination'} disabled={props.last.disabled}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} className={props.styleIcon} />
                        </Button>
                    </div>
                }
            </div>
        </Suspense>
    );

    switch (props.type) {
        case 'full-pagination':
            return fullPagination;
        case 'simple-pagination':
            return simplePagination;
        default:
            return simplePagination;
    }

};

export default React.memo(PaginationAtom);