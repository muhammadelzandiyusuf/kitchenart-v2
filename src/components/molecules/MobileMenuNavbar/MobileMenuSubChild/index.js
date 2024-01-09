import { React, Suspense, Dialog, DialogContent } from 'libraries';

const MobileMenuHeader = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuHeader'));
const MobileMenuSubProduct = React.lazy(() => import('components/molecules/MobileMenuNavbar/MobileMenuSubProduct'));

const MobileMenuSubChild = (props) => {

    const { title, statusShow, fullScreen, handleClose } = props;

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                open={statusShow}
                aria-labelledby="responsive-dialog-title">
                <MobileMenuHeader handleBack={props.handleBack} title={title} handleClose={handleClose} />
                <DialogContent>
                    <MobileMenuSubProduct
                        childCategory={props.menuItem}
                        styleRootList={props.styleRootList}
                        styleListMulti={props.styleListMulti}
                        handleClickLink={props.handleClickLink}
                    />
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default MobileMenuSubChild;