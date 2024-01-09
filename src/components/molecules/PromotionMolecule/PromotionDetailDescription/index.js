import {React, Suspense, useTranslation} from 'libraries';
import {getHostUrl} from "utils";

const PromotionDetailDescription = (props) => {

    const thumbnail = getHostUrl(props.promotion?.thumbnail);
    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <div className={'promotion__detail mb-100'}>
                <div className={`${thumbnail !== null ? '' : 'bgc-slate-grey'} `}>
                    {thumbnail !== null ?
                        (<img src={thumbnail} className={'w-100'} alt={'imagepromotiondetail'} />) :
                        (<div className={'ta-c pt-32 mb-32 tc-p fs-3rem fw-b text-transf-up lsp-2'}>
                            {props.path}
                        </div>)
                    }
                </div>
                <div className={'bgc-white p-24'}>
                    <div className={'fs-18 tx-c mb-32 p-m0 lh-2rem'} dangerouslySetInnerHTML={{__html: props.promotion?.description}}></div>
                    <div className={'fs-18 fw-b tx-c'}>{t('label.termCondition')}</div>
                    <div className={'fs-18 tx-c p-m0 lh-2rem'} dangerouslySetInnerHTML={{__html: props.promotion?.termCondition}}></div>
                </div>
            </div>
        </Suspense>
    );
};

export default PromotionDetailDescription;