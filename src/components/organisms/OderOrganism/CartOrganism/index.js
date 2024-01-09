import {React, Suspense, Grid} from 'libraries';

const CartProductItems = React.lazy(() => import('components/molecules/OrderMolecule/Cart/CartProductItems'));
const CartShoppingSumary = React.lazy(() => import('components/molecules/OrderMolecule/Cart/CartShoppingSumary'));
const CartDialog = React.lazy(() => import('components/molecules/OrderMolecule/Cart/CartDialog'));
const CartShoppingSummarySkeleton = React.lazy(() => import('components/molecules/SkeletonMolecule/CartShoppingSummarySkeleton'));

const CartOrganism = (props) => {

    return (
        <Suspense fallback={null}>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={12} lg={7}>
                    <CartProductItems
                        cart={props.cart?.lineItems}
                        isDelete={props.isDelete}
                        handleSelectToDelete={props.handleSelectToDelete}
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
                        handleSelectAll={props.handleSelectAll}
                        handleDeleteDialog={props.handleDeleteDialog}
                        handleSelectProductToDelete={props.handleSelectProductToDelete}
                        loading={props.loading}
                        handleToProductDetail={props.handleToProductDetail}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={5}>
                    {props.loading ? (
                        <CartShoppingSummarySkeleton />
                    ):(
                        <CartShoppingSumary
                            cart={props.cart}
                            handleToCheckout={props.handleToCheckout}
                        />
                    )}
                </Grid>
            </Grid>
            <CartDialog
                openDialog={props.openDialog}
                handleCloseDialog={props.handleCloseDialog}
                handleDeleteCarts={props.handleDeleteCarts}
            />
        </Suspense>
    );
};

export default CartOrganism;