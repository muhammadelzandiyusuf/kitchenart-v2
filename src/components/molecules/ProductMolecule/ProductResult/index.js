import {React, Suspense, useTranslation, Skeleton} from 'libraries';

const ProductResult = (props) => {

    const t = useTranslation();

    const pageProduct = (
        <div className={`product__result__text fs-15 ${props.stylePage}`}>
            {props.loading ? <Skeleton variant="text" width={200}/> :
                <div>
                    {t('label.view')}
                    <span
                        className={`${(props.view === 15 ? "tc-p fw-b" : null) || (props.view === '15' ? "tc-p fw-b" : null)} pointer`}
                        onClick={(e) => props.handleView(15, e)}
                    > 15
                    </span> /
                        <span
                            className={`${(props.view === 30 ? 'tc-p fw-b' : null) || (props.view === '30' ? "tc-p fw-b" : null)} pointer`}
                            onClick={(e) => props.handleView(30, e)}
                        > 30
                    </span> /
                        <span
                            className={`${(props.view === 60 ? 'tc-p fw-b' : null) || (props.view === '60' ? "tc-p fw-b" : null)} pointer`}
                            onClick={(e) => props.handleView(60, e)}
                        > 60
                    </span>
                </div>
            }
        </div>
    );

    const topProductResult = (
        <Suspense fallback={null}>
            <div className="product__result">
                {props.loading ? <Skeleton variant="text" /> :
                    <div className="product__result__text fs-15">{t('label.productResult')} <b>( {props.result} )</b></div>
                }
                {pageProduct}
            </div>
        </Suspense>
    );

    switch (props.type) {
        case 'product-result':
            return topProductResult;
        case 'page-product':
            return pageProduct;
        default:
            return topProductResult;
    };
};

export default React.memo(ProductResult);