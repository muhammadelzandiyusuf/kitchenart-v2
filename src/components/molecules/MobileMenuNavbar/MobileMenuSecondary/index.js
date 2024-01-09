import {React, Suspense, Dialog, DialogContent} from 'libraries';

const MenuBrand = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuBrand'));
const MenuProduct = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuProduct'));
const MobileMenuHeader = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuHeader'));

const MobileMenuSecondary = (props) => {

    const { title, statusShow, fullScreen, handleClose } = props;

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                open={statusShow}
                aria-labelledby="responsive-dialog-title">
                <MobileMenuHeader handleBack={props.handleBack} title={title} handleClose={handleClose} />
                <DialogContent>
                    {title === 'Brands' &&
                        <MenuBrand
                            menuItems={props.menuItems}
                            menuItemTop={props.menuItemTop}
                            clicked={props.clicked}
                        />
                    }
                    {title === 'Products' &&
                        <MenuProduct menuItems={props.menuItemProduct} clicked={props.clicked} />
                    }
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default React.memo(MobileMenuSecondary);