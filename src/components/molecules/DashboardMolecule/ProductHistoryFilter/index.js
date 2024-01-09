import {React, Suspense, DateRange, useTranslation, Grid, Select, MenuItem, FormControl, Skeleton} from 'libraries';

const ProductHistoryFilter = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    {props.loading ? (
                        <Skeleton variant={'text'} width={'100%'} height={60} />
                    ):(
                        <FormControl size={'small'} className={"bgc-white w-100 select__filter__date"}>
                            <Select
                                value={props.date}
                                displayEmpty
                                variant={"outlined"}
                            >
                                <MenuItem value="" disabled>
                                    <div className={'ds-f'}>
                                        <DateRange />
                                        <div className={'ml-8 mt-4'}>{t('label.byDate')}</div>
                                    </div>
                                </MenuItem>
                                <MenuItem value={7} onClick={() => props.handleFilter(7)}>
                                    <div className={'ds-f'}>
                                        <DateRange />
                                        <div className={'ml-8 mt-4'}>7 {t('label.lastDay')}</div>
                                    </div>
                                </MenuItem>
                                <MenuItem value={30} onClick={() => props.handleFilter(30)}>
                                    <div className={'ds-f'}>
                                        <DateRange />
                                        <div className={'ml-8 mt-4'}>30 {t('label.lastDay')}</div>
                                    </div>
                                </MenuItem>
                                <MenuItem value={90} onClick={() => props.handleFilter(90)}>
                                    <div className={'ds-f'}>
                                        <DateRange />
                                        <div className={'ml-8 mt-4'}>90 {t('label.lastDay')}</div>
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    )}
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default ProductHistoryFilter;