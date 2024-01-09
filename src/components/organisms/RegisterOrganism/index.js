import {React, Grid, Suspense, Link, useTranslation, useState, useEffect} from "libraries";

const RegisterFormSocialMedia = React.lazy(() => import('components/molecules/SocialMediaLogin'));
const Typography = React.lazy(() => import('components/atoms/TypographyAtom'));
const FormRegister = React.lazy(() => import('components/molecules/FormMolecule/FormRegister'));
const FormVerification = React.lazy(() => import('components/molecules/FormMolecule/FormVerification'));
const SkeletonAtom = React.lazy(() => import('components/atoms/SkeletonAtom'));

const RegisterOrganism = React.memo(props => {

    const t = useTranslation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Suspense fallback={null}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} lg={6}>
                    <div className="register-form">
                        <Typography variant="h3" type="title" title={t('label.titleRegister')} typographyStyle="fw-b tx-c mb-0 typography__register-title" />
                        <FormRegister {...props} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <div className="register-socmed">
                        <RegisterFormSocialMedia styleTitle={'tx-c fw-b fs-24'} align={'center'} title={t('label.registerWith')} />
                        <div className="tx-c fs-15" align="center">
                            {loading ? <SkeletonAtom variant={'text'} width={200} height={30} /> : t('label.haveAccount')}
                            {!loading && <Link className="tc-p td-n" to="/login"> Log in</Link>}
                        </div>
                    </div>
                </Grid>
            </Grid>
            <FormVerification {...props} />
        </Suspense>
    );
});

export default RegisterOrganism;