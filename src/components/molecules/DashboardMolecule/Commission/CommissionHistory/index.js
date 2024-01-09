import {React, Suspense, useTranslation, Grid, NumberFormat, FormControl, Select, MenuItem, useSelector} from 'libraries';
import {languageSelector} from "modules";
import {convertDate} from "utils";

const CommissionHistory = (props) => {

    const t = useTranslation();
    const lang = useSelector(languageSelector);

    return (
        <Suspense fallback={null}>
            <div className={'p-24 fs-18 fw-400 border-bottom'}>
                <div className={'mb-16'}>{t('label.referralTransactionHistory')}</div>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                        <FormControl variant="outlined" className={'w-100'}>
                            <Select
                                id="filterType"
                                name={'filterType'}
                                value={props.filterType}
                                onChange={props.handleFilterType}
                            >
                                {props.filterCommissions.filterType.map((item, index) => (
                                    <MenuItem value={item.value} key={index}>
                                        {lang.locale === 'en' ? item.nameEn : item.nameId}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={4}>
                        <FormControl variant="outlined" className={'w-100'}>
                            <Select
                                id="filterPeriod"
                                name={'filterPeriod'}
                                value={props.filterPeriod}
                                onChange={props.handleFilterPeriod}
                            >
                                {props.filterCommissions.filterPeriod.map((item, index) => (
                                    <MenuItem value={item.value} key={index}>
                                        {lang.locale === 'en' ? item.nameEn : item.nameId}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <div className={'fs-18 commission__history tradein__terms'}>
                {props.histories?.length > 0 &&
                    props.histories.slice(0, props.limit).map((item, index) => {
                        const date = convertDate(item.created, 'DD-MM-YYYY');
                        return (
                            <div className={'p-24 border-bottom'} key={index}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} sm={4} md={6} lg={6}>
                                        <div className={`fw-400 ${item.type === 'debit' ? 'tc-p' : 'c-black'}`}>
                                            {item.description}
                                        </div>
                                        <div className={`${item.type === 'debit' ? 'tc-p' : 'tx-c'}`}>
                                            {item.user.firstName} {item.user.lastName}
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={2} lg={2}>
                                        <div className={`fw-400 ta-r ${item.type === 'debit' ? 'tc-p' : 'tx-c'}`}>
                                            {date}
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <div className={`fw-400 ta-r ${item.type === 'debit' ? 'tc-p' : 'c-black'}`}>
                                            {item.type === 'debit' ? '-' : '+'}
                                            <NumberFormat value={item.amount} displayType={'text'}
                                                          thousandSeparator={true}
                                                           prefix={'Rp'} decimalScale={0} className={'fw-b'} />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    })
                }
                {props.histories?.length === 0 &&
                    <div className={'fs-24 tx-c p-24'}>{t('message.youHaveNoHistory')}</div>
                }
            </div>
            {props.histories?.length > 6 && props.histories?.length > props.limit &&
                <div className={'p-24 fs-18 ta-c tx-c fw-400'}>
                    <span className={'pointer'} onClick={props.handleSeeMore}>{t('label.seeMore')}</span>
                </div>
            }
        </Suspense>
    );
};

export default CommissionHistory;