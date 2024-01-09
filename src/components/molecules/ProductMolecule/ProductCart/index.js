import {
    React,
    Suspense,
    useState,
    Dialog,
    IconButton,
    Close,
    useTranslation,
    useMediaQuery, useTheme, Grid,
    DialogContent,
    EmptyProduct,
    DialogTitle
} from 'libraries';
import {getHostUrl, getIdentityFromHref} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const ProductItem = React.lazy(() => import('components/molecules/ProductMolecule/ProductItem'));
const ProductItemSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/ProductItemSkeleton'));

const ProductCart = (props) => {

    const t = useTranslation();
    const theme = useTheme();
    const [fullWidth] = useState(true);
    const [maxWidth] = useState('md');
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={props.handleCloseCart}
                aria-labelledby="max-width-dialog-title"
            >
                <div className={'ta-r'}>
                    <IconButton aria-label="close" onClick={props.handleCloseCart}>
                        <Close />
                    </IconButton>
                </div>
                <DialogTitle>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={7} lg={7}>
                            <div className={'fs-21 fw-b mb-16'}>{t('message.successAddToCart')}</div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <div className={'ta-r'}>
                                <ButtonAtom
                                    type={'button-text'}
                                    name={t('label.cart')}
                                    styleView={'text-transf-cap tx-c fw-b w-40 border-color-primary mr-8'}
                                    clicked={props.handleToCart}
                                />
                                <ButtonAtom
                                    type={'button-text'}
                                    name={t('label.moreItems')}
                                    styleView={'text-transf-cap w-40 fw-b tc-white bgc-primary mr-24'}
                                    clicked={props.handleCloseCart}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <div className={'fs-21'}>{t('label.completeYourProduct')}</div>
                    <div className={'mt-16 tradein__terms content__product p-16'}>
                        <Grid container spacing={0}>
                            {props.productAddCart?.length > 0 &&
                                props.productAddCart.map((item, index) => {
                                if (props.loading) {
                                    return (
                                        <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                            <ProductItemSkeleton />
                                        </Grid>
                                    );
                                }
                                else {
                                    const href = getIdentityFromHref(item.href);
                                    return (
                                        <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                                            <ProductItem
                                                image={item.image === null ? EmptyProduct : getHostUrl(item.image)}
                                                alt="product-image"
                                                brand={item?.brand?.name}
                                                name={item.name}
                                                code={item?.code}
                                                normalPrice={item.price}
                                                price={item.netPrice}
                                                cart={false}
                                                view={false}
                                                index={index + 1}
                                                href={href}
                                                fullHref={item.href}
                                                handleUrl={props.handleUrl}
                                                discountView={false}
                                                compare={false}
                                                disabled={false}
                                                detail={true}
                                                isInstallment={false}
                                            />
                                        </Grid>
                                    );
                                }
                            })
                            }
                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default ProductCart;