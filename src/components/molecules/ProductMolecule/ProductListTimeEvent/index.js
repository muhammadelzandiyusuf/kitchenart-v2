import {React, Grid, Suspense} from 'libraries';
import {convertDate} from 'utils';

const ProductDateTimeCountDown = React.lazy(() => import('components/atoms/ProductAtom/ProductDateTimeCountDown'));

const ProductListTimeEvent = (props) => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={4} sm={4} md={4} lg={4}>
                    <div className={`${props.dateActive === 0 ? 'bgc-white' : 'bgc-grey'} box__event ps-rv ds-b pointer transition-5s`}
                        onClick={() => props.handleEventDate(0, null)}
                    >
                        <ProductDateTimeCountDown
                            deadline={props.deadline}
                            detail={false}
                            styleView={`product__count__down w-100 ta-c font__count__date fw-b ps-ab xy-center ${props.dateActive === 0 ? 'tc-p' : 'c-black'}`}
                        />
                    </div>
                </Grid>
                {props.deadline?.next !== null &&
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <div className={`${props.dateActive === 1 ? 'bgc-white' : 'bgc-grey'} box__event ps-rv ds-b pointer transition-5s`}
                             onClick={() => props.handleEventDate(1, props.deadline?.next)}
                        >
                            <div className={`w-100 ps-ab xy-center fw-b font__date ${props.dateActive === 1 ? 'tc-p' : 'c-black'}`}>
                                <div className={'ta-c '}>{convertDate(props.deadline?.next?.validFrom, 'DD MMMM YYYY')}</div>
                                <div className={'ta-c'}>{props.deadline?.next?.name}</div>
                            </div>
                        </div>
                    </Grid>
                }
                {props.deadline?.prev !== null &&
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <div className={`${props.dateActive === 2 ? 'bgc-white' : 'bgc-grey'} box__event ps-rv ds-b pointer transition-5s`}
                             onClick={() => props.handleEventDate(2, props.deadline?.prev)}
                        >
                            <div className={`w-100 ps-ab xy-center fw-b font__date ${props.dateActive === 2 ? 'tc-p' : 'c-black'}`}>
                                <div className={'ta-c'}>{convertDate(props.deadline?.prev?.validFrom, 'DD MMMM YYYY')}</div>
                                <div className={'ta-c'}>{props.deadline?.prev?.name}</div>
                            </div>
                        </div>
                    </Grid>
                }
            </Grid>
        </Suspense>
    );
};

export default ProductListTimeEvent;