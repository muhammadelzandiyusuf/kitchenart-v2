import {React, Suspense} from 'libraries';

const ReferralProgramBanner = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'fs-53 tc-p fw-b lsp-2 text-transf-up'}>Referral</div>
            <div className={'fs-60 fw-b lsp-2 text-transf-up'}>Program</div>
        </Suspense>
    );
};

export default ReferralProgramBanner;