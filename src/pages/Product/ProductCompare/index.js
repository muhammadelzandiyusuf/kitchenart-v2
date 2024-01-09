import {React, Suspense, useEffect, useHistory, useState} from 'libraries';
import {getProductDetails} from "services";

import 'assets/scss/product/productCompare.scss';
import {getIdentityFromHref} from "utils";
import Localbase from "localbase";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const ProductCompareOrganism = React.lazy(() => import('components/organisms/ProductOrganism/ProductCompareOrganism'));
const BackDropLoading = React.lazy(() => import('components/atoms/BackDropLoading'));

const ProductCompare = () => {
    const history = useHistory();
    const dbc = new Localbase('db');

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [backDrop, setBackDrop] = useState(false);

    useEffect(() => {
        const payload = {
            url: `core/product/compare/${history.location.search}`
        };

        getProductDetails(payload).then(result => {
            if (result?.axiosResponse?.status === 200) {
                const data = result?.axiosResponse?.data;
                setProducts(data);
                setLoading(false);
            };
        });
    }, [history]);

    const handleResetCompare = () => {
        localStorage.setItem('reset', 'true');
        history.push(`${localStorage.getItem('path')}`);
    };

    const handleUrl = (href) => {
        const identity = getIdentityFromHref(href);

        history.push(`/product/${identity}`);
    };

    const handleOtherItem = () => {
        history.push(`${localStorage.getItem('path')}`);
    };

    const handleDeleteCompare = (href, key) => {
        setBackDrop(true);
        const identity = getIdentityFromHref(href);
        const search = key === 0 ? `product=${identity}` : `&product=${identity}`;
        const queryParam = history.location.search.replace(search, '');

        if (queryParam.split('product=').length === 2) {
            localStorage.setItem('reset', 'true');
            history.push(`${localStorage.getItem('path')}`);
        } else {
            dbc.collection('compare').doc({value: identity}).delete();
            history.push(`/compare/${queryParam}`);

            const payload = {
                url: `core/product/compare/${queryParam}`
            }
            getProductDetails(payload).then(result => {
                if (result?.axiosResponse?.status === 200) {
                    const data = result?.axiosResponse?.data;
                    setProducts(data);
                    setBackDrop(false);
                };
            });
        };
    };

    return(
        <Suspense fallback={null}>
            <HelmetAtom title="KitchenArt - Compared Products" />
            <div className="product__compare">
                <ProductCompareOrganism
                    products={products}
                    handleResetCompare={handleResetCompare}
                    handleUrl={handleUrl}
                    handleOtherItem={handleOtherItem}
                    handleDeleteCompare={handleDeleteCompare}
                    loading={loading}
                />
                <BackDropLoading open={backDrop} />
            </div>
        </Suspense>
    )
}

export default ProductCompare;