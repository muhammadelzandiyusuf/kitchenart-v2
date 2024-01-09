import {React, useTranslation, Button} from 'libraries';
import {getIdentityFromHref} from "utils";

const ProductDetailPackageItem = (props) => {

    const t = useTranslation();
    let baseProduct = null;
    if (props.lineItems?.length > 0) {
        baseProduct = props.lineItems.find( (data) => data['structure'] === 'base' );
    };
    let baseHref = props.baseHref;
    if (baseProduct !== null) {
        baseHref = getIdentityFromHref(baseProduct?.product?.href);
    };

    return (
        <div className={'mb-20'}>
            {props.relatedPackages?.length === 0 && props.type !== 'base' &&
                <>
                    <div className={'fs-14 c-black fw-b mb-8'}>
                        {t('label.packageItems')}
                    </div>
                    <Button variant="outlined"
                            className={`text-transf-cap fs-12 mr-8 mb-8 ${props.type === 'base' ? 'btn-active' : ''}`}
                            onClick={() => props.handleChangePackage('base', baseHref)}
                    >
                        base
                    </Button>
                </>
            }
            {props.relatedPackages?.length > 0 &&
                <>
                    <div className={'fs-14 c-black fw-b mb-8'}>
                        {t('label.packageItems')}
                    </div>
                    <Button variant="outlined"
                            className={`text-transf-cap fs-12 mr-8 mb-8 ${props.type === 'base' ? 'btn-active' : ''}`}
                            onClick={() => props.handleChangePackage('base', baseHref)}
                    >
                        base
                    </Button>
                    {props.relatedPackages.map((product, index) => {
                        const href = getIdentityFromHref(product.href);
                        const type = product.packageMeta?.type;
                        return(
                            <Button key={index}
                                    variant="outlined"
                                    className={`text-transf-cap fs-12 mr-8 mb-8 
                                    ${props.productName === product.packageMeta?.label ? 'btn-active' : ''}`}
                                    onClick={() => props.handleChangePackage(type, href)}
                            >
                                {product.packageMeta?.label}
                            </Button>
                        )
                    })}
                </>
            }
        </div>
    );
};

export default ProductDetailPackageItem;