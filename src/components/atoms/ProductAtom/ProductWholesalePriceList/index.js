import {
    Close,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton, NumberFormat, Paper,
    React, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    useMediaQuery,
    useTheme,
    useTranslation
} from "libraries";

const ProductWholesalePriceList = (props) => {
    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Dialog
            fullScreen={fullScreen}
            open={props.openWholesale}
            onClose={props.handleCloseWholesale}
            aria-labelledby="responsive-dialog-title"
        >
            <div className={'ps-ab top-right'}>
                <IconButton aria-label="close" onClick={props.handleCloseWholesale}>
                    <Close />
                </IconButton>
            </div>
            <DialogTitle id="responsive-dialog-title" className={'c-black fw-b ta-c'}>
                {t('label.wholesale')}
            </DialogTitle>
            <DialogContent>
                <Paper variant="outlined" elevation={0} square>
                    <TableContainer>
                        <Table aria-label="estimation">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price for 1 item</TableCell>
                                    <TableCell>Save</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.wholesalePriceLists?.map((wholesalePriceList, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {wholesalePriceList.maxQuantity ? (
                                                <>
                                                    {`${wholesalePriceList.minQuantity} - ${wholesalePriceList.maxQuantity}`}
                                                </>
                                            ) : (
                                                <>
                                                    {`>${wholesalePriceList.minQuantity}`}
                                                </>
                                            )}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <NumberFormat value={wholesalePriceList.price}
                                                          displayType={'text'}
                                                          thousandSeparator={true}
                                                          prefix={'Rp'}
                                                          decimalScale={0}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <NumberFormat value={props.price - wholesalePriceList.price}
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
            </DialogContent>
        </Dialog>
    )
}

export default ProductWholesalePriceList;