import {
    React,
    Suspense,
    DateRange,
    FormControl,
    Grid,
    MenuItem,
    Select,
    useTranslation,
    Button,
    FontAwesomeIcon, faSearch, useForm
} from "libraries";

const HistoryOrderFilter = (props) => {

    const { handleFilter, day, search, handleSearch } = props;
    const t = useTranslation();
    const {register, handleSubmit} = useForm();

    return(
        <Suspense fallback={null}>
            <div className={'mb-32'}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FormControl size={'small'} className={"bgc-white w-100 select__filter__date"}>
                            <Select
                                value={day}
                                displayEmpty
                                variant={"outlined"}
                            >
                                <MenuItem value="" disabled>
                                    <div className={'ds-f'}>
                                        <DateRange />
                                        <div className={'ml-8 mt-4'}>{t('label.byTransactionDate')}</div>
                                    </div>
                                </MenuItem>
                                <MenuItem value={7} onClick={() => handleFilter(7)}>
                                    <div className={'ds-f'}>
                                        <DateRange />
                                        <div className={'ml-8 mt-4'}>7 {t('label.lastDay')}</div>
                                    </div>
                                </MenuItem>
                                <MenuItem value={30} onClick={() => handleFilter(30)}>
                                    <div className={'ds-f'}>
                                        <DateRange />
                                        <div className={'ml-8 mt-4'}>30 {t('label.lastDay')}</div>
                                    </div>
                                </MenuItem>
                                <MenuItem value={90} onClick={() => handleFilter(90)}>
                                    <div className={'ds-f'}>
                                        <DateRange />
                                        <div className={'ml-8 mt-4'}>90 {t('label.lastDay')}</div>
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} className={"ta-r"}>
                        <form className={'ds-f'} onSubmit={handleSubmit(handleSearch)}>
                            <input type={'text'} name={'search'} placeholder={t('label.searchOrder')}
                                   defaultValue={search} ref={register}
                                   className={'w-80 fs-15 p-8 form-control border-radius-right-none outline-none'}
                            />
                            <Button type={'submit'}
                                    className={'border-radius-left-none product__detail__add__product--btnSearch'}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    )
}

export default HistoryOrderFilter;