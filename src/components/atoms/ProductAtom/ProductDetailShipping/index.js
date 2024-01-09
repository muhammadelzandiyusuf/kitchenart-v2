import { React, Button, FontAwesomeIcon, faShippingFast, useTranslation, faInfoCircle } from 'libraries';

const ProductDetailShipping = (props) => {

    const t = useTranslation();

    return (
        <div className={'product__detail__info'}>
            <Button startIcon={<FontAwesomeIcon icon={faShippingFast} />} className={'text-transf-cap fs-14'}
                    endIcon={<FontAwesomeIcon icon={faInfoCircle} />}
            >
                {t('label.freeShipping')}
            </Button>
            <div className={'fs-14 tx-c pointer'} onClick={props.handleOpenShippingCost}>
                <span className={'tc-p td-u pointer'}>{t('label.enterZipCode')}</span> {t('label.estimateShippingCost')}
            </div>
        </div>
    );
};

export default ProductDetailShipping;