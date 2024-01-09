import {React, Suspense, useHistory, useState, useEffect} from 'libraries';
import {getReferralPrograms} from "services";

import 'assets/scss/dashboard/referral.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const MenuDashboard = React.lazy(() => import('containers/MenuDashboard'));
const ReferralProgramOrganism = React.lazy(() => import('components/organisms/DashboardOrganism/ReferralProgramOrganism'));

const ReferralProgram = () => {

    const history = useHistory();
    const access = localStorage.getItem('access');

    const [meta] = useState({
        title: 'KitchenArt - Referral Program'
    });
    const [termCondition, setTermCondition] = useState({
       termsEng: null,
       termsInd: null
    });

    useEffect(() => {
        if (access !== null) {
            const payload = {
                headers: {
                    'Authorization': access,
                },
                path: 'available'
            };
            getReferralPrograms(payload).then(response => {
                if (response?.axiosResponse?.status === 200) {
                    const data = response?.axiosResponse?.data;
                    setTermCondition({
                        termsEng: data?.termCondition,
                        termsInd: data?.termConditionInd
                    })
                };
            });
        }
        else {
            history.push('/login');
        };
    }, [access, history]);

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <MenuDashboard>
                <ReferralProgramOrganism termCondition={termCondition} />
            </MenuDashboard>
        </Suspense>
    );
};

export default ReferralProgram;