import { React, Button, useTranslation, Notifications } from 'libraries';

const ProductDetailButtonAction = (props) => {

    const t = useTranslation();

    return (
        <div className="product__detail__info">
            {props.detail === true &&
                <div className={'mb-10'}>
                    <Button variant="outlined"
                            className={'product__detail__button product__detail__button--installment'}
                            onClick={props.handleShowSimulation}
                    >
                        {t('label.installmentSimulation')}
                    </Button>
                </div>
            }
            {props.availability === 'available' &&
                <div className={'mb-0'}>
                    <Button
                        variant="outlined"
                        className={'product__detail__button product__detail__button--cart'}
                        onClick={props.handleAddToCart}
                    >
                        {t('label.addCart')}
                    </Button>
                </div>
            }
            {props.availability === 'pre_order' &&
                <div className={'mb-0'}>
                    <Button
                        variant="outlined"
                        className={'product__detail__button product__detail__button--cart'}
                        onClick={props.handleAddToCart}
                    >
                        Preorder
                    </Button>
                </div>
            }
            {props.stock === 0 &&
                <div className={'mb-0'}>
                    <Button variant="outlined" className={'product__detail__button product__detail__button--stock'}
                            startIcon={<Notifications />} onClick={props.handleShowRequestStock}
                    >
                        {t('label.requestStock')}
                    </Button>
                </div>
            }
        </div>
    );
};

export default ProductDetailButtonAction;