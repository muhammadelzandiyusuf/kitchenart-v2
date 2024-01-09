import { React } from 'libraries';

const ProductDetailVariant = (props) => {

    const { variants, handleChangeProduct, code } = props;

    let color = [];
    if (variants?.length > 0) {
        variants.forEach(variant => {
            variant.variantItems.forEach(detail => {
                if (detail.product?.code === code) {
                    color.push(detail.label)
                }
            })
        })
    }

    return (
        <div className={props.styleView}>
            {variants?.length > 0 &&
                variants.map((item, key) => {
                    return (
                        <div key={key}>
                            <div className="fs-14 c-black fw-400">
                                {item.typeDisplayName}: <span className="fw-none tx-c">{color[key]}</span>
                            </div>
                            <div className="mt-10">
                                <ul className={'filter__content__color'}>
                                    {item.variantItems?.length > 0 &&
                                        item.variantItems.map((variant, index) => {
                                        return (
                                            <li key={index}
                                                className={`filter__content__color--li pointer 
                                                ${item.type === "grade" ? 'filter__content__border' : ''}
                                                ${variant.product?.code === code ? 'filter__content__color--active' : ''}`}
                                                style={{backgroundColor: item.type === "color" ? variant.value : '#FFFFFF'}}
                                                onClick={() => handleChangeProduct(variant.product?.href)}
                                            >
                                                {item.type === "grade" && variant.label}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ProductDetailVariant;