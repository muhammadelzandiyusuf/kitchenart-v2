import {Grid, React, Suspense, Settings, useTranslation, faGoogle, faFacebook, faCheckCircle} from "libraries";
import {convertDate} from "utils";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const ProfileUser = (props) => {

    const { customer, handleToEditProfile, options } = props;
    const t = useTranslation();

    let gender = null;
    const customerGender = options?.actions?.POST?.profile?.children?.gender?.choices;
    if (customerGender?.length > 0) {
        gender = customerGender.find(item => item.value === customer?.profile?.gender);
    };
    const birthDate = convertDate(customer?.birthDate, 'DD MMMM YYYY');

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <div className={'mb-16'}>
                        <div className={'fs-20 fw-400 mb-8'}>{t('form.name')}</div>
                        <div className={'fs-18'}>{customer?.firstName} {customer?.lastName}</div>
                    </div>
                    <div className={'mb-16'}>
                        <div className={'fs-20 fw-400 mb-8'}>{t('form.statusMember')}</div>
                        <div className={'fs-18 text-transf-cap'}>
                            {customer?.customerType === 'customer' ? 'customer' : 'bussiness partner'}
                        </div>
                    </div>
                    <div className={'mb-16'}>
                        <div className={'fs-20 fw-400 mb-8'}>
                            {t('form.phoneNumber')}
                            {customer?.isVerified &&
                                <span className={'ml-4'}><IconAtom icon={faCheckCircle} styleIcon={'c-blue'} /></span>
                            }
                        </div>
                        <div className={'fs-18'}>
                            {customer?.phoneNumber !== null && customer?.phoneNumber !== '' ? customer?.phoneNumber : '-' }
                        </div>
                    </div>
                    <div className={'mb-16'}>
                        <div className={'fs-20 fw-400 mb-8'}>{t('form.emailAddress')}</div>
                        <div className={'fs-18'}>{customer?.email}</div>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <div className={'mb-16'}>
                        <div className={'fs-20 fw-400 mb-8'}>{t('form.birthdate')}</div>
                        <div className={'fs-18'}>
                            {customer?.birthDate !== null && customer?.birthDate !== '' ? birthDate : '-'}
                        </div>
                    </div>
                    <div className={'mb-16'}>
                        <div className={'fs-20 fw-400 mb-8'}>{t('label.gender')}</div>
                        <div className={'fs-18'}>{gender !== undefined ? gender?.displayName : '-'}</div>
                    </div>
                    <div className={'mb-16'}>
                        <ButtonAtom variant="contained" color="secondary"
                                    styleView={'btn__default text-transf-cap'}
                                    icon={<Settings />}
                                    name={"Edit Profile"}
                                    clicked={handleToEditProfile}
                        />
                    </div>
                    <div className={'mb-16'}>
                        {customer?.socialProviders?.length > 0 &&
                            customer?.socialProviders.map((item, index) => {
                                return (
                                    <div key={index}>
                                        {item.isConnect &&
                                            <div className={'mb-16 fs-18'}>
                                                <IconAtom icon={item.provider === 'google-oauth2' ? faGoogle : faFacebook} />
                                                <span className={'text-transf-cap ml-4'}>
                                                    {t('label.connected')} {t('label.with')} {item.provider}
                                                </span>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    )
}

export default ProfileUser;