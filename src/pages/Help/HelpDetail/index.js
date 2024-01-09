import {React, Suspense, useEffect, useHistory, useParams, useState} from "libraries";
import {getHelpCategory, getHelpContent} from "services";
import {getIdentityFromHref} from "utils";

import 'assets/scss/help/help.scss';

const HelpDetailOrganism = React.lazy(() => import('components/organisms/HelpOrganism/HelpDetail'));

const HelpDetail = () => {
    const history = useHistory();
    const params = useParams();

    const [helpContents, setHelpContents] = useState([]);
    const [helpCategory, setHelpCategory] = useState('')
    const [content, setContent] = useState('');
    const [openMenuContent, setOpenMenuContent] = useState(true);

    useEffect(() => {
        const payload = {
            params: {
                'is_active': true,
                'category': params.category
            }
        };

        getHelpContent(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const contents = response?.axiosResponse?.data;
                setHelpContents(contents);
                setContent(contents[0]);
            }
        });

        const payloadCategory = {
            params: {
                'is_active': true,
            },
            path: params.category
        };

        getHelpCategory(payloadCategory).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const category = response?.axiosResponse?.data;
                setHelpCategory(category);
            }
        });
    }, [params])

    const handleContent = (href) => {
        const identity = getIdentityFromHref(href);
        const payload = {
            path: identity
        }

        getHelpContent(payload).then(response => {
            if (response?.axiosResponse?.status === 200) {
                const contents = response?.axiosResponse?.data;
                setContent(contents);
            }
        })

        setOpenMenuContent(false);
    }

    const handleCloseMenuModal = () => {
        history.push(`/help`);
    }

    const handleCloseContent = () => {
        setOpenMenuContent(true);
    }

    return(
        <Suspense fallback={null}>
            <HelpDetailOrganism
                helpCategory={helpCategory}
                helpContents={helpContents}
                content={content}
                handleContent={handleContent}
                openMenuContent={openMenuContent}
                handleCloseMenuModal={handleCloseMenuModal}
                handleCloseContent={handleCloseContent}
            />
        </Suspense>
    )
}

export default HelpDetail;