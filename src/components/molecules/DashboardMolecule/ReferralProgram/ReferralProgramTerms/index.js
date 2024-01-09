import {React, Suspense, Accordion, ExpandMore, AccordionSummary, AccordionDetails, useTranslation, useSelector} from 'libraries';
import {languageSelector} from 'modules';

const ReferralProgramTerms = (props) => {

    const t = useTranslation();
    const lang = useSelector(languageSelector);

    return (
        <Suspense fallback={null}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className={'fs-21 fw-b tx-c lsp-2'}>{t('label.termCondition')}</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={'tradein__terms tradein__content pr-32 w-100'}>
                        {lang.locale === 'en' ? (
                            <div className={'fs-18 tx-c description__html'} dangerouslySetInnerHTML={{__html: props.termCondition?.termsEng}}></div>
                        ):(
                            <div className={'fs-18 tx-c description__html'} dangerouslySetInnerHTML={{__html: props.termCondition?.termsInd}}></div>
                        )}
                    </div>
                </AccordionDetails>
            </Accordion>
        </Suspense>
    );
};

export default ReferralProgramTerms;