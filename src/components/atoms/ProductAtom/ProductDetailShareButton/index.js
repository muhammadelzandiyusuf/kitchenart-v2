import {
    React, Suspense, faShareAlt, useTranslation, faCopy, useHistory, FontAwesomeIcon, FacebookShareButton,
    FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, CopyToClipboard
} from 'libraries';

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const ProductDetailShareButton = (props) => {

    const t = useTranslation();
    const history = useHistory();

    const handleLearnMore = () => {
        history.push('/profile/referral-program');
    };

    return (
        <Suspense fallback={null}>
            <div className={'ps-rv'}>
                <div className={'mb-8'}>
                    <ButtonAtom
                        type={'button-start-icon'}
                        name={t('label.share')}
                        styleView={'text-transf-cap fs-15 tx-c'}
                        icon={<FontAwesomeIcon icon={faShareAlt} />}
                        clicked={props.handleOpenSharingUrl}
                    />
                </div>
                {props.openShortLink &&
                    <div className={'ps-ab shadow__box__share z-index1 box-sizing-border'}>
                        <div className={'bgc-primary tc-white p-8 border-radius-bottom-none'}>
                            <div className={'ds-f'}>
                                <div className={'w-50 fs-15'}>
                                    {t('label.share')} {t('label.and')} {t('label.earn')}
                                </div>
                                <div className={'w-50 fs-13 ta-r'}>
                                    <span
                                        className={'td-u pointer'}
                                        onClick={handleLearnMore}
                                    >
                                        {t('label.learnMore')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={'bgc-white pt-16 pb-16 pr-32 pl-32 ta-c fs-15 border-radius-top-none'}>
                            <div className={'fw-400 mb-16'}>{t('label.wantToEarnCommission')}</div>
                            <div className={'tx-c mb-16'}>{t('message.shareThisLinkToYourFriend')}</div>
                            <div className={'border__box__text border-radius-5px p-8 fs-15 mb-16'}>
                                <div className={'tx-c'}>
                                    <div className={'ta-l box-sizing-border ovf-h'}>
                                        {props.shortLink?.shortUrl}
                                    </div>
                                </div>
                            </div>
                            <div className={'fw-400 mb-16'}>{t('message.ShareItToYourSocialMedia')}</div>
                            <div className={'tx-c ds-f'}>
                                <div className={'w-25 ta-c'}>
                                    <CopyToClipboard text={props.shortLink?.shortUrl}
                                                     onCopy={props.handleCopyShortLink}>
                                        <span>
                                            <IconAtom icon={faCopy} styleIcon={'fs-35 pointer tx-c'} />
                                        </span>
                                    </CopyToClipboard>
                                </div>
                                <div className={'w-25'}>
                                    <FacebookShareButton
                                        url={props.shortLink?.shortUrl}
                                    >
                                        <FacebookIcon size={36} />
                                    </FacebookShareButton>
                                </div>
                                <div className={'w-25'}>
                                    <TwitterShareButton
                                        url={props.shortLink?.shortUrl}
                                        title={`${props.brand?.name} ${props.name} ${props.code}`}
                                    >
                                        <TwitterIcon size={36} />
                                    </TwitterShareButton>
                                </div>
                                <div className={'w-25'}>
                                    <WhatsappShareButton
                                        url={props.shortLink?.shortUrl}
                                        title={`${props.brand?.name} ${props.name} ${props.code}`}
                                        separator={':: '}
                                    >
                                        <WhatsappIcon size={36} />
                                    </WhatsappShareButton>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Suspense>
    );
};

export default ProductDetailShareButton;