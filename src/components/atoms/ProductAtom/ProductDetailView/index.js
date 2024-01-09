import {React, useTranslation} from 'libraries';
import {getIdentityFromHref} from "utils";

const ProductDetailView = (props) => {
    const t = useTranslation();

    const identity = getIdentityFromHref(props.href);

    return(
        <div className="fs-16 c-black fw-400 lh-2rem lsp-2 mt-30 mb-10 pointer">
            <div onClick={() => props.handleUrl(identity)}>{t('label.viewDetailProduct')}</div>
        </div>
    )
}

export default ProductDetailView;