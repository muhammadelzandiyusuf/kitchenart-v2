import { React } from 'libraries';

const ProductDetailTabDescription = (props) => {

    return (
        <div className={'product__detail__description fs-15 tx-c mt-10'} dangerouslySetInnerHTML={{__html: props.description}} />
    );
};

export default ProductDetailTabDescription;