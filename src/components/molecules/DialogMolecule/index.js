import {React, Suspense, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const DialogMolecule = (props) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={fullScreen}
                open={props.handleOpen}
                onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"
                className="ta-c">
                <DialogTitle id="responsive-dialog-title">
                    {props.icon &&
                        <IconAtom icon={props.icon} styleIcon={props.styleIcon}/>
                    }
                    {props.images &&
                        <img src={props.images} className={'w-100 ' + props.styleImage} alt='popup-banner' />
                    }
                    {props.title &&
                        <div className={props.styleTitle}>{props.title}</div>
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={props.styleContent} dangerouslySetInnerHTML={ { __html: props.content } }></DialogContentText>
                </DialogContent>
                <DialogActions className="ds-b ta-c pb-32">
                    {props.secondButton &&
                    <ButtonAtom
                        clicked={props.handleCloseSecond}
                        variant="contained"
                        styleView={'btn__default text-transf-cap'}
                        name={props.secondButtonName} />
                    }
                    <ButtonAtom
                        clicked={props.btnType === 'tradein' ? props.handleButton : props.handleClose}
                        variant="contained" color="secondary"
                        styleView={'btn__primary text-transf-cap'}
                        name={props.buttonName} />
                </DialogActions>
            </Dialog>
        </Suspense>
    );
}

function areEqual(prevProps, nextProps) {
    let status = false;
    if (prevProps.handleOpen === nextProps.handleOpen) status = true;
    return status;
}

export default React.memo(DialogMolecule, areEqual);