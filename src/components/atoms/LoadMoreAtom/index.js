import {React, Suspense, useTranslation} from 'libraries';

const LoadMoreAtom = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={props.syleLoadMore}>
                <p
                    className={'pointer fs-18 tx-c td-u'}
                    onClick={props.handleLoadMore}
                >
                    {t('label.loadMore')}
                </p>
            </div>
        </Suspense>
    );
};

export default LoadMoreAtom;