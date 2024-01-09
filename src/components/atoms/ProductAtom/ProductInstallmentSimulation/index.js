import {
    React, Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme, Table, TableBody, TableCell, TableContainer,
    IconButton, Close, useTranslation, TableRow, NumberFormat, Grid, useSelector
} from 'libraries';
import { installmentSimulationSelector, installmentCalculateSelector } from 'modules';
import {getHostUrl} from "utils";

const ProductInstallmentSimulation = (props) => {

    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const installments = useSelector(installmentSimulationSelector);
    const calculates = useSelector(installmentCalculateSelector);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.openSimulation}
            onClose={props.handleCloseSimulation}
            aria-labelledby="responsive-dialog-title"
        >
            <div className={'ps-ab top-right'}>
                <IconButton aria-label="close" onClick={props.handleCloseSimulation}>
                    <Close />
                </IconButton>
            </div>
            <DialogTitle id="responsive-dialog-title" className={'c-black fw-b ta-c'}>
                {t('label.installmentSimulation')}
            </DialogTitle>
            <DialogContent>
                {installments?.length > 0 &&
                    <div>
                        <Grid container spacing={1}>
                            {installments.map((item, key) => {
                                const icon = getHostUrl(item.icon);
                                return (
                                    <div key={key}
                                         className={`product__detail__installment--box pointer ${key === props.indexInstallment ? 'filter__content__color--active' : ''}`}
                                         onClick={() => props.handleChooseBankInstallment(key, item.href)}
                                    >
                                        <img src={icon} className={'w-100'} alt={'imagebank'} />
                                    </div>
                                );
                            })}
                        </Grid>
                        <div className={'product__detail__installment--table w-100'}>
                            <div className={'tx-c fw-400 mt-20'}>
                                {t('label.creditCard')} {installments[props.indexInstallment].name}
                            </div>
                            <TableContainer>
                                <Table aria-label="caption table">
                                    <TableBody>
                                        {calculates?.length > 0 &&
                                            calculates.map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row" className={'tx-c'}>
                                                        {t('label.installment')} {row.tenor} x
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <NumberFormat value={row.installmentPerMonth}
                                                                      displayType={'text'}
                                                                      thousandSeparator={true}
                                                                      prefix={'Rp'}
                                                                      decimalScale={0}
                                                        /> <span className={'tx-c'}>/ {t('label.month')}</span>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className={'mt-20'}>
                                <div className={'c-black fs-16 fw-400 mb-10'}>{t('label.terms')} :</div>
                                <div className={'tx-c fs-15'}
                                     dangerouslySetInnerHTML={{__html: installments[props.indexInstallment].termCondition}}>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </DialogContent>
        </Dialog>
    );
};

export default ProductInstallmentSimulation;