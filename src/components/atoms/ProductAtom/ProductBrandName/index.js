import { React } from 'libraries';

const ProductBrandName = (props) => {

    let status = null;
    if (props.availability?.value === 'available') {
        status = null;
    }
    else if (props.availability?.value === 'preorder') {
        status = `[${props.availability?.label}]`;
    };

    if (props.stock === 0) {
        status = `[Out of Stock]`;
    }

    return (
        <div className="product__detail__info">
            {props.productType !== 'package-deals' &&  props.productType !== 'giveaway'?
                <div>
                    <div className="fs-20 c-black fw-400 lh-2rem lsp-2">
                        {props.brand?.name} <span className="tc-p">{status}</span>
                    </div>
                    <div className="fs-20 c-black fw-400 lh-2rem lsp-2">{props.name}</div>
                    <div className="fs-20 c-black fw-400 lh-2rem lsp-2">{props.code}</div>
                </div>
                :
                <div>
                    <div className="fs-20 c-black fw-400 lh-2rem lsp-2">
                        <span className={'text-transf-up'}>{props.productLabel} - </span> {props.name}
                    </div>
                </div>
            }
        </div>
    );
};

export default ProductBrandName;