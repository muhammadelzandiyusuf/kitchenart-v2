import {React, Suspense, useTranslation, Grid, FontAwesomeIcon} from 'libraries';

import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(far, fas, fab);

const TradeInContact = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'mt-30 mb-32 tradein__contact'}>
                <div className={'tradein__contact__box'}>
                    <div className={'tx-c fs-22 fw-b mb-32'}>{t('label.tradeContact')}</div>
                    <Grid container spacing={0}>
                        {props.contact?.length > 0 &&
                            props.contact.map((item, index) => {
                            return (
                                <Grid item xs={12} sm={12} md={12} lg={4} key={index}>
                                    <div className={'mb-20'}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                                {item.icon !== '' &&
                                                    <FontAwesomeIcon icon={item.icon} className={'fs-18 tx-c'} />
                                                }
                                            </Grid>
                                            <Grid item xs={11} sm={11} md={11} lg={11}>
                                                <div className={'fs-18 tx-c fw-400'}>{item.name}</div>
                                                <div className={`fs-18 ${item.name === 'Email' ? 'tc-p' : 'tx-c' }`}>{item.value}</div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            )
                        })
                        }
                    </Grid>
                </div>
            </div>
        </Suspense>
    );
};

export default TradeInContact;