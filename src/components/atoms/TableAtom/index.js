import { React, Table, TableBody, TableCell, TableContainer, TableRow, useTranslation } from 'libraries';

const TableAtom = (props) => {

    const t = useTranslation();

    return (
        <TableContainer>
            <Table aria-label="caption table">
                <caption>*{t('label.specificationChange')}</caption>
                <TableBody>
                    {props.filterContents.map((filter, number) => {
                        return (
                            <TableRow key={number}>
                                <TableCell component="th" scope="row">
                                    {filter.attribute?.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {filter.attribute?.type === 'text'  &&
                                        <>
                                            {filter.content !== '' ? filter.content : 'n/a'}
                                        </>
                                    }
                                    {filter.attribute?.type === 'color' &&
                                        <div className={'specification__color'} style={{backgroundColor: filter.content}}></div>
                                    }
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableAtom;