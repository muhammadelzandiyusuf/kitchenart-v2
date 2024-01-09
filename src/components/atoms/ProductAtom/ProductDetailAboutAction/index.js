import { React, Button, FontAwesomeIcon, faExclamationTriangle, useTranslation } from 'libraries';

const ProductDetailAboutAction = (props) => {

    const t = useTranslation();

    return (
        <div className={'product__detail__info'}>
            <Button startIcon={<FontAwesomeIcon icon={faExclamationTriangle} />}
                    className={'fs-14 tx-c text-transf-cap'}
                    onClick={props.handleShowReport}
            >
                {t('label.reportProduct')}
            </Button>
        </div>
    );
};

export default ProductDetailAboutAction;