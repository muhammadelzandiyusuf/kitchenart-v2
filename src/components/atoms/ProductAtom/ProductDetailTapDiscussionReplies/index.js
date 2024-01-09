import {Avatar, EmptyProduct, Grid, NumberFormat, React} from 'libraries';
import {convertDate} from "utils";

const ProductDetailTapDiscussionReplies = (props) => {
    return (
        <div>
            {props.replies[props.indexKey]?.replies?.length > 0 &&
                props.replies[props.indexKey]?.replies.map((question, number) => {
                let userName = null;
                if (question.user?.isStaff === true) {
                    userName = process.env.REACT_APP_DOMAIN_NAME;
                }
                else{
                    userName = question.user?.firstName;
                }
                const nameReply = userName.charAt(0);
                const dateReply = convertDate(question.created, 'MMMM YYYY, DD');
                return (
                    <div className={`${number % 2 === 0 ? 'bgc-grey-box' : 'bgc-slate-grey'} p-20`} key={number}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                <Grid container spacing={1}>
                                    <Grid item xs={1} sm={1} md={1} lg={2}>
                                        <Avatar className={'discussion__question--avatar'}>
                                            {nameReply.toUpperCase()}
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={11} sm={11} md={11} lg={10}>
                                        <div className={'tx-c fs-12'}>{userName}</div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div className={'tx-c fs-12 ta-l'}>
                                            {dateReply}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div className={'tx-c fs-12'}>{question.content}</div>
                                    </Grid>
                                    {question.productLinks?.length > 0 &&
                                        question.productLinks.map((product, index) => {
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
                )
            })}
        </div>
    );
};

export default ProductDetailTapDiscussionReplies;