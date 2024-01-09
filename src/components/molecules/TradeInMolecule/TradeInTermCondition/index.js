import {React, Suspense, useTranslation} from 'libraries';

const CheckboxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));

const TradeInTermCondition = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'tradein__contact'}>
                <div className={'ds-f ml-40'}>
                    <div className={'discussion__question__title top-18px fw-b fs-22 p-8'}>{t('label.termCondition')}</div>
                </div>
                <div className={'discussion__question'}>
                    <div className={'tradein__terms tradein__content fs-18 tx-c'} dangerouslySetInnerHTML={{__html: props.termCondition}}></div>
                </div>
                <CheckboxAtom
                    id={'agreeTerms'}
                    name={'agreeTerms'}
                    label={t('label.agreeTerms')}
                    styleCheckbox={'tx-c'}
                    color="default"
                    handleChangeCheckbox={props.handleAgreeTerms}
                />
            </div>
        </Suspense>
    );
};

export default TradeInTermCondition;