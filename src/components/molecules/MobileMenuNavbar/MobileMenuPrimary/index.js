import {
    React,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Suspense,
    faChevronRight,
    DialogTitle,
    Grid,
    DialogContent,
    Dialog,
    faTimes
} from 'libraries';

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));
const IconButtonAtom = React.lazy(() => import('components/atoms/IconButtonAtom'));

const MobileMenuPrimary = (props) => {

    const { menus } = props;

    return (
        <Suspense fallback={null}>
            <Dialog
                fullScreen={props.fullScreen}
                open={props.menuPrimary}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" className="bgc-grey title__menu___mobile__navbar fl-r c-black">
                    <Grid container spacing={0}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <div className="ta-c">
                                <img src={props.image} className="title__image__menu" alt="Logo-kitchenArt" />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButtonAtom icon={faTimes} clicked={props.handleClose} styleIconButton="fl-r" />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <List component="nav" aria-label="secondary menu" className={props.styleList}>
                        {menus?.length > 0 &&
                            menus.map((item, index) => (
                            <ListItem key={index} button className={props.styleListMobileMenu}
                                      onClick={(event) => props.clicked(event, item.name)}
                            >
                                <ListItemText secondary={item.name} />
                                {item.icon &&
                                <ListItemIcon className={`${props.styleListMobileIcon} fw-b`}>
                                    <IconAtom icon={faChevronRight} />
                                </ListItemIcon>
                                }
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        </Suspense>
    );
};

export default React.memo(MobileMenuPrimary);