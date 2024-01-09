import {React, Suspense, Grid, EmptyProduct, IconButton, faTrash, useTranslation, TextField, useState, useForm,
    FormControlLabel, Checkbox
} from 'libraries';
import {getIdentityFromHref} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));
const CartServiceWarranty = React.lazy(() => import('components/molecules/OrderMolecule/Cart/CartServiceWarranty'));
const CartQuantity = React.lazy(() => import('components/molecules/OrderMolecule/Cart/CartQuantity'));
const CartProductInfo = React.lazy(() => import('components/molecules/OrderMolecule/Cart/CartProductInfo'));

const CartItem = (props) => {

    const t = useTranslation();
    const [maxLengthNotes] = useState(140);
    const { register, watch, handleSubmit } = useForm();

    return (
        <Suspense fallback={null}>
            {props.cart?.length > 0 &&
                props.cart.map((item, index) => {
                    const discount = Math.ceil((item.total?.discount / item.total?.subtotal) * 100);
                    const slug = getIdentityFromHref(item.href);
                    const id = props.addNotes.find((note) => note === slug);
                    const notesWatch = watch(`notes${slug}`);
                    let warrannties = [];
                    let contractServices = [];
                    if (item.availableServices?.length > 0) {
                        item.availableServices.forEach(service => {
                            if (service.type === 'contract_service') {
                                contractServices.push(service);
                            }
                            else{
                                warrannties.push(service);
                            };
                        });
                    };

                    let propertyWarranties = [];
                    let propertyContractServices = [];
                    let allProperties = [];
                    if (item.properties?.services?.length > 0) {
                        item.properties?.services.forEach(property => {
                            allProperties.push(property);
                            if (property.type === 'extended_warranty') {
                                propertyWarranties.push(property);
                            }
                            else {
                                propertyContractServices.push(property);
                            };
                        });
                    };

                    let propertyNotes = null;
                    if (item.properties?.notes !== undefined && item.properties?.notes !== '') {
                        propertyNotes = item.properties?.notes;
                    };
                    const dataNotes = props.notesValue.find((notes) => notes.id === slug);
                    const selectCheck = props.selectDelete.find((check) => check.href === item.href);
                    const valid = item.isValid;
                    const validMessage = item.message;
                    const productSlug = getIdentityFromHref(item.product?.href);

                    return (
                        <div className={'mb-32 border-bottom-mobile ds-b'} key={index}>
                            <Grid container spacing={0}>
                                {props.isDelete &&
                                    <Grid item xs={1} sm={1} md={1} lg={1}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox id={`check${slug}`}
                                                          name={`check${slug}`}
                                                          onChange={props.handleChangeCheckbox}
                                                          checked={selectCheck !== undefined ? true : false}
                                                          onClick={() => props.handleSelectProductToDelete (item.href)}
                                                          className={'fs-14'}
                                                />
                                            }
                                        />
                                    </Grid>
                                }
                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                    <div className={'pr-16 pl-16'}>
                                        <img
                                            src={item.product?.image !== null ? item.product?.image : EmptyProduct}
                                            className={'w-100 pointer'} alt={'cartproductimage'}
                                            onClick={() => props.handleToProductDetail(item.product?.structure, productSlug)}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={props.isDelete ? 8 : 9} sm={props.isDelete ? 8 : 9} md={props.isDelete ? 8 : 9} lg={props.isDelete ? 8 : 9}>
                                    <CartProductInfo
                                        brand={item.product?.brand}
                                        name={item.product?.name}
                                        code={item.product?.code}
                                        savePrice={item.total?.discount}
                                        discount={discount}
                                        netPrice={item.total?.subtotal}
                                        structure={item.structure}
                                        handleToProductDetail={() => props.handleToProductDetail(item.product?.structure, productSlug)}
                                    />
                                    {warrannties?.length > 0 && !props.isDelete && valid &&
                                        <div className={'mb-8'}>
                                            <CartServiceWarranty
                                                serviceWarranty={warrannties}
                                                serviceWarrantyValue={props.selectExtendedWarranty}
                                                name={'extended_warranty'}
                                                label={'Extended Warranty'}
                                                handleCheckedServiceWarranty={(event) => props.handleCheckedExtendedWarranty(event, item.href)}
                                                handleChangeValue={(event) => props.handleChangeValueExtendedWarranty(event, item.href)}
                                                checkedServiceWarranty={props.checkedExtendedWarranty}
                                                slug={slug}
                                                services={propertyWarranties}
                                                handleUncheckService={(event) => props.handleUncheckedWarranty('extended_warranty', allProperties)}
                                            />
                                        </div>
                                    }
                                    {contractServices?.length > 0 && !props.isDelete && valid &&
                                        <div className={'mb-8'}>
                                            <CartServiceWarranty
                                                serviceWarranty={contractServices}
                                                serviceWarrantyValue={props.selectContractService}
                                                name={'contract_service'}
                                                label={'Contract Service'}
                                                handleCheckedServiceWarranty={(event) => props.handleCheckedContractService(event, item.href)}
                                                handleChangeValue={(event) => props.handleChangeValueContractService(event, item.href)}
                                                checkedServiceWarranty={props.checkedContractService}
                                                slug={slug}
                                                services={propertyContractServices}
                                                handleUncheckService={(event) => props.handleUncheckedWarranty('contract_service', allProperties)}
                                            />
                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                                <Grid item xs={12} sm={12} md={!valid ? 3 : 5} lg={!valid ? 3 : 5}>
                                    {!props.isDelete && valid &&
                                        <div className={'mb-8 right-to-left'}>
                                            {id === undefined && propertyNotes === null &&
                                                <ButtonAtom
                                                    type={'button-text'}
                                                    name={t('label.addNotes')}
                                                    styleView={'text-transf-cap tx-c'}
                                                    clicked={() => props.handleAddNotes(item.href)}
                                                />
                                            }
                                            {id === undefined && propertyNotes !== null &&
                                                <div className={'fs-14 tx-c'}>
                                                    <span>{item.properties?.notes.substring(0, 35)}</span>
                                                    <span className={'ml-16 fw-400 tc-p pointer'}
                                                          onClick={() => props.handleChangeNotes(slug, item.properties?.notes)}>
                                                                {t('label.change')}
                                                            </span>
                                                </div>
                                            }
                                            {id !== undefined &&
                                                <form onSubmit={handleSubmit(props.handleSubmitNotes)}>
                                                    <TextField
                                                        id={`notes${slug}`}
                                                        name={`notes${slug}`}
                                                        multiline
                                                        variant="outlined"
                                                        size={'small'}
                                                        rowsMax={4}
                                                        inputRef={register}
                                                        inputProps={{
                                                            maxLength: maxLengthNotes
                                                        }}
                                                        defaultValue={dataNotes !== undefined ? dataNotes.notes : ''}
                                                        className={'w-100 fs-14'}
                                                    />
                                                    <TextField inputRef={register} type={'hidden'} id={'id'}
                                                               value={slug} name={'id'} />
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={2} sm={2} md={2} lg={2}>
                                                            <div className={'fs-11 tx-c mt-16'}>
                                                                {notesWatch !== undefined ? notesWatch.length : 0}/{maxLengthNotes}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={10} sm={10} md={10} lg={10}>
                                                            <div className={'ta-r mt-8'}>
                                                                <ButtonAtom
                                                                    type={'button-text'}
                                                                    typeButton={'submit'}
                                                                    name={t('label.save')}
                                                                    styleView={'text-transf-cap tx-c fw-400 fs-11'}
                                                                />
                                                                <ButtonAtom
                                                                    type={'button-text'}
                                                                    name={t('label.cancel')}
                                                                    styleView={'text-transf-cap tx-c mr-8 fs-11'}
                                                                    clicked={() => props.handleCancelAddNotes(item.href)}
                                                                />
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </form>
                                            }
                                        </div>
                                    }
                                </Grid>
                                <Grid item xs={6} sm={6} md={!valid && !props.isDelete ? 6 : 4} lg={!valid && !props.isDelete ? 6 : 4}>
                                    {!props.isDelete && valid &&
                                        <div className={'mb-8 center-to-left'}>
                                            <CartQuantity
                                                quantity={item.quantity}
                                                maxQuantity={item.maxQuantity}
                                                handleQuantity={props.handleQuantity}
                                                href={item.href}
                                            />
                                        </div>
                                    }
                                    {!valid &&
                                        <div className={`bgc-buttery-white p-16 fs-14 border-radius-5px`}>
                                            {validMessage}
                                        </div>
                                    }
                                </Grid>
                                <Grid item xs={6} sm={6} md={3} lg={3}>
                                    {!props.isDelete &&
                                        <div className={'mb-8 ta-r'}>
                                            <ButtonAtom
                                                type={'button-text'}
                                                name={t('label.moveToWishlist')}
                                                styleView={'text-transf-cap tx-c mr-8'}
                                                clicked={() => props.handleMoveToWishlist(item.product?.href, item.href)}
                                            />
                                            <IconButton
                                                aria-label="delete"
                                                size={'small'}
                                                className={'tx-c'}
                                                onClick={() => props.handleDeleteCartItem(item.href)}
                                            >
                                                <IconAtom icon={faTrash}/>
                                            </IconButton>
                                        </div>
                                    }
                                </Grid>
                            </Grid>
                        </div>
                    )
                })
            }
        </Suspense>
    );
};

export default CartItem;