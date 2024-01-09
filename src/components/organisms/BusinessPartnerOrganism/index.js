import {React, Suspense, useTranslation} from "libraries";

const FormBusinessPartner = React.lazy(() => import('components/molecules/FormMolecule/FormBusinessPartner'));
const Typography = React.lazy(() => import('components/atoms/TypographyAtom'));
const FormVerification = React.lazy(() => import('components/molecules/FormMolecule/FormVerification'));

const BusinessPartnerOrganism = React.memo(props => {
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            <div className="business-partner-form">
                <Typography title={t("label.businessPartners")} typographyStyle="fw-b tx-c mb-0 typography__register-title" />
                <Typography title={t('label.formRegistration')} typographyStyle="tx-c mb-0 fs-24" />
                <FormBusinessPartner {...props} />
            </div>
            <FormVerification {...props} />
        </Suspense>
    );
});

export default BusinessPartnerOrganism;