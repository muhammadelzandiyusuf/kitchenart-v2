import {Grid, React, Suspense, useTranslation, Skeleton} from "libraries";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const ProductCompareMolecule = (props) => {
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <Grid item xs={12} sm={12} md={12} lg={12} className="product__compare__title">
                {props.loading ? (
                    <Skeleton variant="text" width={'30%'} height={80} className={'ps-rv x-center'} />
                ):(
                    <div className="fw-b">{t('label.comparedProduct')}</div>
                )}
            </Grid>
            <Grid container spacing={0} className="mt-20">
                <Grid item xs={12} sm={12} md={12} lg={6} className="product__compare__title__text">
                    {props.loading ? (
                        <Skeleton variant="text" width={'60%'} height={40} className={'ps-rv fl-r'} />
                    ):(
                      <>
                          {t('label.youHavePicked')} {props.countItem} {t('label.productToCompare')}
                      </>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5} className="product__compare__box__button">
                    {props.loading ? (
                        <div className={'ds-f'}>
                            <div className={'w-20'}>
                                <Skeleton variant="rect" width={'90%'} height={60} />
                            </div>
                            <div className={'w-20'}>
                                <Skeleton variant="rect" width={'100%'} height={60} />
                            </div>
                        </div>
                    ):(
                        <>
                            <ButtonAtom
                                type={'button-start-icon'}
                                name={t('label.otherItem')}
                                clicked={props.handleOtherItem}
                                styleView={`text-transf-cap fs-14 mr-8 tx-c product__compare__button--other`}
                            />
                            <ButtonAtom
                                type={'button-start-icon'}
                                name={t('label.resetCompare')}
                                clicked={props.handleResetCompare}
                                styleView={`text-transf-cap fs-14 mr-8 tx-c product__compare__button--reset`}
                            />
                        </>
                    )}
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default ProductCompareMolecule;