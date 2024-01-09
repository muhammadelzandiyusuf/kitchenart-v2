import {Button, faSearch, FontAwesomeIcon, React, Suspense, useTranslation} from 'libraries';

const SearchAtom = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <form className={`ds-f ${props.styleForm}`} onSubmit={props.handleSubmit(props.handleSearch)}>
                <input type={'text'} name={'findProduct'}
                       className={`${props.styleSearch} fs-15 p-8 form-control border-radius-right-none outline-none`}
                       placeholder={props.type === 'product' ? t('label.findProduct') : t('form.searchForPromo')} ref={props.register}
                />
                <Button type={'submit'} className={'border-radius-left-none product__detail__add__product--btnSearch'}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </Button>
            </form>
        </Suspense>
    );
};

export default SearchAtom;