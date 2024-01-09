import { React, Suspense, useState, useParams, useEffect } from "libraries";
import {verifyAccount} from "services";

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const VerificationAccountOrganism = React.lazy(() => import('components/organisms/VerificationAccountOrganism'));

const CustomerVerificationAccount = React.memo(props => {
    const [meta] = useState({
        title: "KitchenArt - Verification Account"
    });

    let params = useParams();

    useEffect(() => {
        const payload = {
            url: `uam/auth/verify/email/${params.token}/${params.uid}/`
        };
        verifyAccount(payload).then(result => {});
    }, [params]);

    return(
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <VerificationAccountOrganism />
        </Suspense>
    );
});

export default CustomerVerificationAccount;