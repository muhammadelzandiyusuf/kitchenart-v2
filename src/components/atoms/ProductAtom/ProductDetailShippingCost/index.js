import {
    React, Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme, AsyncSelect, TableContainer, TableHead, TableRow,
    IconButton, Close, useTranslation, Grid, FreeShipping, useForm, Controller, Table, TableBody, TableCell,
    Paper, NumberFormat, Link, SelectUi
} from 'libraries';
import {addressDestination} from "services";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const MessageAtom = React.lazy(() => import('components/atoms/MessageAtom'));

const ProductDetailShippingCost = (props) => {

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { register, handleSubmit, control } = useForm();

    let vendors = [];
    if (props.vendorShipment?.length > 0) {
          props.vendorShipment.forEach(vendor => {
              vendors.push({
                  label: vendor.displayName,
                  value: vendor.value
              })
          });
    };

    const fetchDestinationAddress = async (inputValue) => {
        let result = [];
        const payload = {
            'params': {
                'q': inputValue
            }
        };
        if (inputValue?.length > 3) {
            await addressDestination(payload).then(response => {
                if (response.axiosResponse?.status === 200) {
                    const addresses = response.axiosResponse?.data;
                    if (addresses?.length > 0) {
                        addresses.forEach(address => {
                            result.push({
                                label: `${address.subDistrict}, ${address.district} (${address.postalCode}) ${address.city} - ${address.province}`,
                                value: `${address.destinationCode}/${address.coordinates?.longitude}/${address.coordinates?.latitude}`
                            });
                        })
                    }
                }
            });
        }
        else {
            result = [];
        };
        return result;
    };

    const loadOptionAddress = (inputValue) => {
        return fetchDestinationAddress(inputValue);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.openShipiingCost}
            onClose={props.handleCloseShippingCost}
            aria-labelledby="responsive-dialog-title"
        >
            <div className={'ps-ab top-right'}>
                <IconButton aria-label="close" onClick={props.handleCloseShippingCost}>
                    <Close />
                </IconButton>
            </div>
            <DialogTitle id="responsive-dialog-title" className={'tx-c fs-22'}>
                <Grid container spacing={2}>
                    <Grid item lg={2}>
                        <img src={FreeShipping} className={'w-100 tc-p'} alt={'imageshippingcost'}/>
                    </Grid>
                    <Grid item lg={10}>
                        <div className={'title'}>
                            {t('message.shippingCost')}
                        </div>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <div className={'fs-16 tx-c fw-b'}>{t('label.checkShippingCost')}</div>
                <form onSubmit={handleSubmit(props.handleCalculate)}>
                    <div className={'mt-10 mb-20'}>
                        <Controller
                            name="vendor"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            as={<SelectUi
                                className="basic-single"
                                classNamePrefix={t('form.selectCourier')}
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="vendor"
                                options={vendors}
                                inputRef={register}
                            />}
                        />
                    </div>
                    <div className={'mb-20'}>
                        <Controller
                            name="postalCode"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            as={<AsyncSelect
                                defaultOptions
                                loadOptions={loadOptionAddress}
                                inputRef={register}
                                placeholder={t('form.postalCode')}
                            />}
                        />
                    </div>
                    <div className={'ta-c p-20'}>
                        {props.buttonLoading ? (
                            <ButtonAtom typeButton={'button'} type={'button-loading'} styleImage={'w-17-5'}
                                        styleView={'product__detail__related--button p-10-4'} />
                        ):(
                            <ButtonAtom typeButton={'submit'} type={'button-text'} name={'Calculate'}
                                        styleView={'product__detail__related--button p-10-40'} />
                        )}
                    </div>
                </form>
                {props.showTable && props.tariff?.length > 0 &&
                    <div>
                        <div className={'mt-20 mb-10'}>
                            <Paper variant="outlined" elevation={0} square>
                                <TableContainer>
                                    <Table aria-label="estimation">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Service</TableCell>
                                                <TableCell>Eta</TableCell>
                                                <TableCell>Cost</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {props.tariff.map((row, key) => (
                                                <TableRow key={key}>
                                                    <TableCell component="th" scope="row">
                                                        {row.vendor?.name} ({row.service?.name})
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.etdTo !== row.etdFrom ? (
                                                            <>
                                                                {row.etdFrom} - {row.etdTo} {t('label.day')}
                                                            </>
                                                        ):(
                                                            <>
                                                                {row.etdFrom} {t('label.day')}
                                                            </>
                                                        )}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        <NumberFormat value={row.rate?.total}
                                                                      displayType={'text'}
                                                                      thousandSeparator={true}
                                                                      prefix={'Rp'}
                                                                      decimalScale={0}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </div>
                    </div>
                }
                {props.message !== null &&
                    <MessageAtom styleMessage={'mt-20 mb-10'} message={props.message} />
                }
                {props.showTable && props.tariff?.length === 0 &&
                    <MessageAtom styleMessage={'mt-20 mb-10'} message={t('message.ratesNotAvailable')} />
                }
                <div className={'mt-24 mb-20 fs-14 tx-c'}>
                    {t('message.termShipment')} <Link className={'td-n tc-p'} to={'/term-condition'}>{t('label.termCondition')}</Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailShippingCost;

