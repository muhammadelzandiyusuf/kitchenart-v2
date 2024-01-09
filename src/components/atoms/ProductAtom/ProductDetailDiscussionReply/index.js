import {Avatar, Button, faPaperPlane, FontAwesomeIcon, Grid, React, useForm, useTranslation, Suspense} from 'libraries';

const ProductLinkDiscussion = React.lazy(() => import('components/atoms/ProductAtom/ProductLinkDiscussion'));

const ProductDetailDiscussionReply = (props) => {

    const t = useTranslation();
    const { register, handleSubmit } = useForm();
    const customerName = props.customer?.name.charAt(0);
    const active = props.indexedReplies.find( (data) => data === props.indexKey);

    return (
        <Suspense fallback={null}>
            <div className={`bgc-grey-box box__reply ds-b ps-rv`}>
                {active !== props.indexKey && props.totalReplies > 0 &&
                <div className={'mb-20'}>
                    <div className={'fs-14 tc-p td-u ta-c pointer'} onClick={() => props.handleSeeMoreReplies(props.indexKey, props.href)}>
                        {t('label.seeMoreReplies')}
                    </div>
                </div>
                }
                <Grid container spacing={2}>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <div className={'fl-r mt-10'}>
                            <Avatar className={'discussion__question--avatar'}>
                                {customerName.toUpperCase()}
                            </Avatar>
                        </div>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <ProductLinkDiscussion
                            selectItemShow={props.selectItemShow}
                            itemProductLink={props.itemProductLink}
                            handleRemoveProductLink={props.handleRemoveProductLink}
                            indexKey={props.indexKey}
                        />
                        <div className={'mt-20'}>
                            <form onSubmit={handleSubmit(props.handleReplyDiscussion)}>
                                <input className={'form-control w-98 discussion__question--reply'}
                                       placeholder={t('form.comments')} name={'content'}
                                       ref={register} required={true}
                                />
                                <input type={'hidden'} name={'parent'} value={props.href} ref={register} />
                                <Grid container spacing={0}>
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <div className={'ta-l mt-10'}>
                                            <Button className={'text-transf-cap fs-14 tx-c'}
                                                    onClick={() => props.handleShowAddProductLink(props.indexKey)}>
                                                {t('label.addProductLink')}
                                            </Button>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6}>
                                        <div className={'mt-10 ta-r'}>
                                            <Button type={'submit'}
                                                    className={'bgc-primary tc-white text-transf-cap br-n fs-14'}
                                                    endIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                                            >
                                                {t('label.send')}
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );
};

export default ProductDetailDiscussionReply;