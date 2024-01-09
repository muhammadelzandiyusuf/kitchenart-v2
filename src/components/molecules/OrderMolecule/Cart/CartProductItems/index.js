import {React, Suspense, useTranslation, Grid, Skeleton} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const CartItem = React.lazy(() => import('components/molecules/OrderMolecule/Cart/CartItem'));
const CheckboxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));
const CartItemSkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/CartItemSkeleton'));

const CartProductItems = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            {props.loading ? (
                <Skeleton variant={'text'} width={'20%'} height={40} />
            ):(
                <div className={'fs-21 fw-b'}>{t('label.cart')}</div>
            )}
            <div className={'mt-30 pb-10 border-bottom mb-24'}>
                <Grid container spacing={0}>
                    {props.isDelete &&
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <CheckboxAtom
                                id={'selectAll'}
                                name={'selectAll'}
                                label={'Select All'}
                                styleCheckbox={'fs-14'}
                                handleChangeCheckbox={props.handleSelectAll}
                            />
                        </Grid>
                    }
                    <Grid item xs={props.isDelete ? 8 : 12} sm={props.isDelete ? 8 : 12} md={props.isDelete ? 8 : 12} lg={props.isDelete ? 8 : 12}>
                        {!props.isDelete &&
                            <div className={'ta-r'}>
                                {props.loading ? (
                                    <Skeleton variant={'text'} width={'20%'} height={40} className={'fl-r'} />
                                ):(
                                    <ButtonAtom
                                        type={'button-text'}
                                        name={t('label.selectToDelete')}
                                        styleView={'text-transf-cap'}
                                        clicked={props.handleSelectToDelete}
                                    />
                                )}
                            </div>
                        }
                        {props.isDelete &&
                            <div className={'ta-r'}>
                                <ButtonAtom
                                    type={'button-text'}
                                    name={t('label.delete')}
                                    styleView={'text-transf-cap tc-p'}
                                    clicked={props.handleDeleteDialog}
                                />
                                <ButtonAtom
                                    type={'button-text'}
                                    name={t('label.cancel')}
                                    styleView={'text-transf-cap'}
                                    clicked={props.handleSelectToDelete}
                                />
                            </div>
                        }
                    </Grid>
                </Grid>
            </div>
            {props.loading ? (
                <CartItemSkeleton />
            ):(
                <CartItem
                    cart={props.cart}
                    isDelete={props.isDelete}
                    handleDeleteCartItem={props.handleDeleteCartItem}
                    handleQuantity={props.handleQuantity}
                    handleMoveToWishlist={props.handleMoveToWishlist}
                    addNotes={props.addNotes}
                    handleAddNotes={props.handleAddNotes}
                    handleCancelAddNotes={props.handleCancelAddNotes}
                    selectExtendedWarranty={props.selectExtendedWarranty}
                    selectContractService={props.selectContractService}
                    handleChangeValueExtendedWarranty={props.handleChangeValueExtendedWarranty}
                    handleCheckedExtendedWarranty={props.handleCheckedExtendedWarranty}
                    handleChangeValueContractService={props.handleChangeValueContractService}
                    handleCheckedContractService={props.handleCheckedContractService}
                    checkedExtendedWarranty={props.checkedExtendedWarranty}
                    checkedContractService={props.checkedContractService}
                    handleUncheckedWarranty={props.handleUncheckedWarranty}
                    handleSubmitNotes={props.handleSubmitNotes}
                    handleChangeNotes={props.handleChangeNotes}
                    notesValue={props.notesValue}
                    selectDelete={props.selectDelete}
                    handleSelectProductToDelete={props.handleSelectProductToDelete}
                    handleToProductDetail={props.handleToProductDetail}
                />
            )}
        </Suspense>
    );
};

export default CartProductItems;