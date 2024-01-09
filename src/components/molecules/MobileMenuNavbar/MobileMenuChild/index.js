import { React, Suspense, Dialog, DialogContent } from 'libraries';

const MobileMenuHeader = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuHeader'));
const MobileMenuBrand = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuBrandChild'));
const MenuProduct = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuProduct'));

const MobileMenuChild = (props) => {

    const { title, titlePrimary, statusShow, fullScreen, handleClose } = props;

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                open={statusShow}
                aria-labelledby="responsive-dialog-title">
                <MobileMenuHeader handleBack={props.handleBack} title={title} handleClose={handleClose} />
                <DialogContent>
                    {titlePrimary === 'Brands' &&
                        <MobileMenuBrand
                            logo={props.logo}
                            menuItem={props.brandItem}
                            styleRootList={props.styleRootList}
                            styleListMulti={props.styleListMulti}
                            handleClickLogo={props.handleClickLogo}
                            handleClickLink={props.handleClickLink}
                            handleClickLinkParent={props.handleClickLinkParent}
                        />
                    }
                    {titlePrimary === 'Products' &&
                        <MenuProduct menuItems={props.menuItem} clicked={props.clicked} />
                    }
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default React.memo(MobileMenuChild);