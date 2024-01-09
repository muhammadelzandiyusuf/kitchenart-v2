import {EmptyProduct, faTimes, FontAwesomeIcon, Grid, IconButton, NumberFormat, React} from 'libraries';
import {getIdentityFromHref} from "utils";

const ProductLinkDiscussion = (props) => {

    return (
        <Grid container spacing={2}>
            {props.selectItemShow === props.indexKey && props.itemProductLink?.length > 0 &&
                props.itemProductLink.map((product, index) => {
                const diskon = (Math.ceil(product.normalDiscount) * Math.ceil(product.price)) / 100;
                const netPrice = product.price - diskon;
                const href = getIdentityFromHref(product.href);
                return (
                    <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                        <div className={'discussion__question__product p-8'}>
                            <div className={'ta-r'}>
                                <IconButton aria-label="delete" size={'small'}
                                            onClick={() => props.handleRemoveProductLink(index, href)}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </IconButton>
                            </div>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={4}>
                                    <div className={''}>
                                        {product.media?.length > 0 ? (
                                            <img
                                                src={product.media[0].image}
                                                className={'w-100'}
                                                alt={'imagediscussion'}/>
                                        ):(
                                            <img
                                                src={EmptyProduct}
                                                className={'w-100'}
                                                alt={'imagediscussion'}/>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={8}>
                                    <div className={'fs-12 tx-c'}>
                                        {`${product.brand?.name}`}
                                    </div>
                                    <div className={'fs-12 tx-c'}>
                                        {`${product.name.substring(0, 35)} ...`}
                                    </div>
                                    <div className={'tc-p fs-12 fw-b'}>
                                        <NumberFormat value={netPrice}
                                                      displayType={'text'}
                                                      thousandSeparator={true}
                                                      prefix={'Rp'}
                                                      decimalScale={0} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default ProductLinkDiscussion;