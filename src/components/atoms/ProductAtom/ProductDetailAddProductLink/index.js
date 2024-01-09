import {React, Dialog, useTheme, useTranslation, useMediaQuery, Close, DialogTitle, IconButton, DialogContent, List,
    ListItem, ListItemIcon, Checkbox, ListItemText, EmptyProduct, Grid, NumberFormat, useForm
} from 'libraries';
import {getIdentityFromHref} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const SearchAtom = React.lazy(() => import('components/atoms/SearchAtom'));

const ProductDetailAddProductLink = (props) => {

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const {register, handleSubmit} = useForm();

    return (
        <Dialog fullScreen={fullScreen}
                onClose={props.handleCloseAddProductLink}
                aria-labelledby="responsive-dialog-title"
                open={props.openAddProductLink}
        >
            <div className={'ps-ab top-right'}>
                <IconButton aria-label="close" onClick={props.handleCloseAddProductLink}>
                    <Close />
                </IconButton>
            </div>
            <DialogTitle id="responsive-dialog-title" className={'tx-c fw-b ta-c'}>
                {t('label.addProductLink')}
            </DialogTitle>
            <DialogContent>
                <div className={'mb-20'}>
                    <SearchAtom
                        handleSubmit={handleSubmit}
                        handleSearch={props.handleSearch}
                        styleSearch={'w-40'}
                        register={register}
                        type={'product'}
                    />
                </div>
                <div className={'mb-20 product__detail__add__product'}>
                    <List className={'w-100'}>
                        {props.productLinks?.length > 0 &&
                            props.productLinks.map((item, index) => {
                            const labelId = `checkbox-list-label-${index}`;
                            const diskon = (Math.ceil(item.normalDiscount) * Math.ceil(item.price)) / 100;
                            const netPrice = item.price - diskon;
                            const href = getIdentityFromHref(item.href);
                            const checkedProduct = props.productChosen.filter((value) => value === href);
                            return (
                                <ListItem key={index} className={'border-bottom'} role={undefined} dense button
                                          onClick={props.handleCheckProductLink(item, index, href)}
                                          disabled={props.count === 3 && props.checkedProductLink.indexOf(index) === -1 ? true : false}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checkedProduct[0] === href}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Grid container spacing={2}>
                                            <Grid item xs={2} sm={2} md={2} lg={2}>
                                                {item.media?.length > 0 &&
                                                <img src={item.media[0].image !== null ? item.media[0].image : EmptyProduct}
                                                     className={'w-100'} alt={'imageproduct'} />
                                                }
                                                {item.media?.length === 0 &&
                                                <img src={EmptyProduct}
                                                     className={'w-100'} alt={'imageproduct'} />
                                                }
                                            </Grid>
                                            <Grid item xs={10} sm={10} md={10} lg={10}>
                                                <div className={'fs-14 tx-c'}>
                                                    {`${item.brand?.name}`}
                                                </div>
                                                <div className={'fs-14 tx-c'}>
                                                    {`${item.name}`}
                                                </div>
                                                <div className={'fs-14 tx-c'}>
                                                    {`${item.code}`}
                                                </div>
                                                <div className={'tc-p fs-14 fw-b'}>
                                                    <NumberFormat value={netPrice}
                                                                  displayType={'text'}
                                                                  thousandSeparator={true}
                                                                  prefix={'Rp'}
                                                                  decimalScale={0} />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </ListItemText>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
                <div className={'ta-r fs-14 tx-c'}>
                    {props.count} {t('label.to')} 3 {t('label.productChosen')}
                </div>
                <div className={'ta-c p-20'}>
                    <ButtonAtom clicked={props.handleShowSelectItem} name={t('label.selectItems')}
                                styleView={'product__detail__related--button p-10-40'} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailAddProductLink;