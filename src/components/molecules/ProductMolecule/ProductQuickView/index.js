import {React, Suspense, Dialog, DialogContent, DialogTitle, Grid, Close} from 'libraries';

const ProductImageSlide = React.lazy(() => import('components/molecules/ProductMolecule/ProductImageSlide'));
const ProductBrandName = React.lazy(() => import('components/atoms/ProductAtom/ProductBrandName'));
const ProductDetailAction = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailAction'));
const ProductDetailPrice = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailPrice'));
const ProductDetailVariant = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailVariant'));
const ProductDetailButtonAction = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailButtonAction'));
const ProductDetailSummary = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailSummary'));
const ProductDetailView = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailView'));
const IconButtonAtom = React.lazy(() => import('components/atoms/IconButtonAtom'));

const ProductQuickView = (props) => {

    return(
        <Suspense fallback={null}>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={props.handleOpen}
                onClose={props.handleClose}
                aria-labelledby="max-width-dialog-title">
                <DialogTitle id="customized-dialog-title">
                    <IconButtonAtom type="icon-button-material" clicked={props.handleClose} styleIconButton="ps-ab tx-c top-right product__view">
                        <Close />
                    </IconButtonAtom>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <ProductImageSlide type={'horizontal-slide'} media={props.item?.images} slide={props.slide}
                                handleMultiSlide={props.handleMultiSlide} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <ProductBrandName brand={props.item?.brand} name={props.item?.name} code={props.item?.code}
                                availability={props.item?.availability} stock={props.item?.stock} />
                            <ProductDetailAction warranty={props.item?.warranty} detail={false} action={props.action}
                                                 handleAction={props.handleAction}
                                                 handlePostWishlist={props.handlePostWishlist}
                                                 handleDeleteWishlist={props.handleDeleteWishlist}
                                                 href={props.item?.href}
                                                 isWishlist={props.item?.isWishlist}
                            />
                            {props.action === "item_selection" &&
                                <ProductDetailVariant variants={props.item?.variants} code={props.item?.code}
                                                      styleView="product__detail__info mt-20"
                                                      handleChangeProduct={props.handleChangeProduct} />
                            }
                            {props.action === "item_selection" &&
                                <ProductDetailPrice price={props.item?.price} netPrice={props.item?.netPrice} detail={false}/>
                            }
                            {props.action === "item_selection" &&
                                <ProductDetailView handleUrl={props.handleUrl} href={props.href} />
                            }
                            {props.action === "item_selection" &&
                                <ProductDetailButtonAction availability={props.item?.availability?.value}
                                                           stock={props.item?.stock} detail={false}/>
                            }
                            {props.action === "summary" &&
                                <ProductDetailSummary description={props.item?.description}
                                                      specifications={props.item?.specifications} />
                            }
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Suspense>
    )
}

export default React.memo(ProductQuickView);