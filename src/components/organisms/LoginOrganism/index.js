import {React, Grid, Suspense, Link, ImgBackgroundLogin, ImgBackgroundLoginMobile, useTranslation, useState, useEffect} from 'libraries';

const BackgroundImage = React.lazy(() => import('components/molecules/BackgroundImage'));
const LoginFormMediaSocial = React.lazy(() => import('components/molecules/SocialMediaLogin'));
const Typography = React.lazy(() => import('components/atoms/TypographyAtom'));
const FormLogin = React.lazy(() => import('components/molecules/FormMolecule/FormLogin'));
const SkeletonAtom = React.lazy(() => import('components/atoms/SkeletonAtom'));

const LoginOrganism = React.memo(props => {

    const t = useTranslation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} lg={6}>
                    {loading ? (
                        <SkeletonAtom variant={'rect'} height={'100%'} />
                    ):(
                        <BackgroundImage ImgBackgroundLogin={ImgBackgroundLogin} ImgBackgroundLoginMobile={ImgBackgroundLoginMobile} />
                    )}
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <div className="bgc-form p-form">
                        <Typography variant="h3" type="title" title="Login KitchenArt" typographyStyle={'fw-b tx-c mb-0 typography__title'} />
                        <div className="tx-c fs-15">
                            {loading ? <SkeletonAtom variant={'text'} width={'60%'} /> : t('label.dontHaveAccount') + '?'}
                            {!loading && <Link className="tc-p td-n" to="/register"> {t('label.registerHere')}</Link>}
                        </div>
                        <FormLogin {...props} buttonLoading={props.buttonLoading} />
                        <LoginFormMediaSocial styleTitle={'tx-c fw-b'} title={t('label.loginWith')} />
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );
});

export default LoginOrganism;