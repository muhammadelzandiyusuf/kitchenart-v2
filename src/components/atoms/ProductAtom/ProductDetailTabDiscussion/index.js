import {React, useTranslation, Button, Grid, useHistory, Avatar, NumberFormat, EmptyProduct, PropTypes, withWidth, Suspense
} from 'libraries';
import {convertDate, getIdentityFromHref} from "utils";

const ProductDetailDiscussionReply = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailDiscussionReply'));
const ProductDetailDiscussionParent = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailDiscussionParent'));
const ProductDetailTapDiscussionReplies = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailTapDiscussionReplies'));

const ProductDetailTabDiscussion = (props) => {

    const t = useTranslation();
    const history = useHistory();
    const access = localStorage.getItem('access');

    const handleLogin = () => {
        history.push('/login');
    };

    return (
        <Suspense fallback={null}>
            <div className={'discussion'}>
                {access !== null &&
                    <ProductDetailDiscussionParent
                        handlePostDiscussion={props.handlePostDiscussion}
                    />
                }
                {access === null &&
                    <div className={'mt-30 ta-c mb-32'}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Grid item lg={12}>
                                <span className={'mr-24 fs-18 tx-c fw-400'}>{t('message.haveQuestion')}</span>
                                <Button onClick={handleLogin}
                                        className={'bgc-primary tc-white text-transf-cap w-25 br-n fs-15'}>
                                    login
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                }
                {props.discussions?.length > 0 &&
                    props.discussions.map((item, key) => {
                    let name = null;
                    if (item.user?.isStaff === true) {
                        name = process.env.REACT_APP_DOMAIN_NAME;
                    }
                    else{
                        name = item.user?.firstName;
                    };
                    const initials = name.charAt(0);
                    const dateParent = convertDate(item.created, 'MMMM YYYY, DD');
                    const slug = getIdentityFromHref(item.href);
                    return (
                        <div className={'discussion__question__detail mb-20'} key={key}>
                            <div className={'p-20 bgc-slate-grey'}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={12} lg={3}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={1} sm={1} md={1} lg={2}>
                                                <Avatar className={'discussion__question--avatar'}>{initials.toUpperCase()}</Avatar>
                                            </Grid>
                                            <Grid item xs={11} sm={11} md={11} lg={10}>
                                                <div className={'tx-c fs-12'}>{name}</div>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <div className={'tx-c fs-12 ta-l'}>
                                                    {dateParent}
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={9}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <div className={'tx-c fs-12'}>{item.content}</div>
                                            </Grid>
                                            {item.productLinks?.length > 0 &&
                                                item.productLinks.map((product, index) => {

                                                return (
                                                    <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                                                        <div className={'discussion__question__product p-8'}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={12} sm={12} md={12} lg={4}>
                                                                    <div className={''}>
                                                                        <img src={product.image !== null ? product.image : EmptyProduct}
                                                                             className={'w-100'}
                                                                             alt={'imagediscussion'} />
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={12} lg={8}>
                                                                    <div className={'fs-12 tx-c'}>
                                                                        {`${product.brand?.name}`}
                                                                    </div>
                                                                    <div className={'fs-12 tx-c'}>
                                                                        {`${product.name.substring(0, 35)} ...`}
                                                                    </div>
                                                                    <div className={'tc-p fs-12 fw-b'}>
                                                                        <NumberFormat value={product.price?.netPrice}
                                                                                      displayType={'text'}
                                                                                      thousandSeparator={true}
                                                                                      prefix={'Rp'}
                                                                                      decimalScale={0} />
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                            {props.indexedReplies.find( (data) => data === slug ) === slug &&
                                <ProductDetailTapDiscussionReplies
                                    replies={props.replies}
                                    indexedReplies={props.indexedReplies}
                                    indexKey={slug}
                                    totalReplies={item.totalReplies}
                                />
                            }
                            {access !== null &&
                                <ProductDetailDiscussionReply indexKey={slug}
                                                              handleReplyDiscussion={props.handleReplyDiscussion}
                                                              href={item.href}
                                                              customer={props.customer}
                                                              handleShowAddProductLink={props.handleShowAddProductLink}
                                                              handleSeeMoreReplies={props.handleSeeMoreReplies}
                                                              indexedReplies={props.indexedReplies}
                                                              selectItemShow={props.selectItemShow}
                                                              itemProductLink={props.itemProductLink}
                                                              handleRemoveProductLink={props.handleRemoveProductLink}
                                                              totalReplies={item.totalReplies}
                                />
                            }
                        </div>
                    )
                })}
            </div>
        </Suspense>
    );
};

ProductDetailTabDiscussion.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(ProductDetailTabDiscussion);