import {React, Suspense, Grid, useTranslation, ImgBackgroundLogin, ImgBackgroundLoginMobile, useState, useEffect} from 'libraries';

const BackgroundImage = React.lazy(() => import('components/molecules/BackgroundImage'));
const Typography = React.lazy(() => import('components/atoms/TypographyAtom'));
const FormForgotPassword = React.lazy(() => import('components/molecules/FormMolecule/FormForgotPassword'));
const SkeletonAtom = React.lazy(() => import('components/atoms/SkeletonAtom'));

const ForgotPasswordOrganism =  React.memo(props => {

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
                        <Typography variant="h3" type="title" title={t('label.forgotPassword') + '?'} typographyStyle={'fw-b tx-c mb-0 typography__title'} />
                        <div className="tx-c fs-17">
                            {loading ? <SkeletonAtom variant={'rect'} height={30} /> : t('message.inputEmailForgotPassword')}
                        </div>
                        <FormForgotPassword {...props} />
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );
});

export default ForgotPasswordOrganism;