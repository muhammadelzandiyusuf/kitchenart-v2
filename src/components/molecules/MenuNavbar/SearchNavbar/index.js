import {React, faSearch, useTranslation, Suspense, InputBase} from 'libraries';

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const SearchNavbar = (props) => {
    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={props.styleSearch}>
                <div className={props.styleSearchIcon}>
                    <IconAtom icon={faSearch} />
                </div>
                <InputBase
                    placeholder={t('label.clickSearch')}
                    classes={{
                        root: props.styleInputRoot,
                        input: props.styleInputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
        </Suspense>
    );
};

function areEqual(prevProps, nextProps) {
    let status = false;
    if (prevProps.styleSearch === nextProps.styleSearch && prevProps.styleSearchIcon === nextProps.styleSearchIcon && prevProps.styleInputRoot === nextProps.styleInputRoot && prevProps.styleInputInput === nextProps.styleInputInput) status = true;
    return status;
}

export default React.memo(SearchNavbar, areEqual);