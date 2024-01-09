import {React, Suspense, useEffect, useHistory, useState} from "libraries";
import {getBanners, getHelpCategory} from "services";
import {getIdentityFromHref} from "utils";

import 'assets/scss/help/help.scss';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const HelpOrganism = React.lazy(() => import('components/organisms/HelpOrganism/Help'));

const HelpPage = () => {
    const history = useHistory();
    const [meta] = useState({
        title: 'KitchenArt - Help'
    });

    const [helpCategories, setHelpCategories] = useState([]);
    const [banner, setBanner] = useState('');

    useEffect(() => {
        const payload = {
            params: {
                'is_active': true
            }
        }

        getHelpCategory(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const contents = response?.axiosResponse?.data;
                setHelpCategories(contents);
            }
        })

        const payloadBanner = {
            params: {
                'group': 'help_info_banners',
                'is_active': true,
                'per_page': 1
            }
        }

        getBanners(payloadBanner).then(response => {
            if (response.length > 0) {
                setBanner(response[0]);
            }
        })
    }, []);

    const handleDetailHelp = (href) => {
        const identity = getIdentityFromHref(href);
        history.push(`/help/${identity}`);
    }

    return(
        <Suspense fallback={null}>
            <HelmetAtom {...meta} />
            <HelpOrganism helpCategories={helpCategories} banner={banner} handleDetailHelp={handleDetailHelp} />
        </Suspense>
    )
}

export default HelpPage;