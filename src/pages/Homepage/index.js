import {React, Suspense, useState} from 'libraries';

const HelmetAtom = React.lazy(() => import('components/atoms/HelmetAtom'));
const SlideAtom = React.lazy(() => import('components/atoms/SlideAtom'));

const Homepage = () => {
    const [meta] = useState({
        title: 'Selamat Datang di KitchenArt'
    });

    return (
        <Suspense fallback={null}>
            <HelmetAtom title={meta.title} />
            <SlideAtom />
        </Suspense>
    );
};


export default React.memo(Homepage);