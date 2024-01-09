import {
    Button,
    Grid,
    React, useForm,
    useTranslation
} from 'libraries';

const ProductDetailDiscussionParent = (props) => {

    const t = useTranslation();
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(props.handlePostDiscussion)}>
            <div className={'ds-f jc-c'}>
                <h3 className={'discussion__question__title fw-b'}>{t('label.whatYourQuestion')}</h3>
            </div>
            <div className={'discussion__question top-30px'}>
                <textarea className={'form-control form-control-textarea'} name={'content'} ref={register}
                          required={true} />
            </div>
            <div className={'mt-20 mb-20'}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={'ta-c'}>
                            <Button type={'submit'}
                                    className={'bgc-primary tc-white text-transf-cap w-30 br-n fs-15'}>
                                Submit
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </form>
    );
};

export default ProductDetailDiscussionParent;