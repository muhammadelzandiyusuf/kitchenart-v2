import {Button, faSearch, FontAwesomeIcon, Grid, React, Skeleton, Suspense, useForm, useTranslation} from "libraries";

const OrderCancellationFilter = (props) => {
    const { loading, handleSearch } = props;
    const {register, handleSubmit} = useForm();
    const t = useTranslation();

    return(
        <Suspense fallback={null}>
            {loading ? (
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={'ds-f fl-r pt-24 pb-24 pr-8 w-40'}>
                            <Skeleton variant={'text'} width={'100%'} height={40} />
                        </div>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <form onSubmit={handleSubmit(handleSearch)} className={'ds-f fl-r pt-24 pb-24 pr-8 search'}>
                            <input type={'text'} name={'search'} placeholder={t('label.searchOrder')}
                                   className={'w-80 fs-15 p-8 form-control border-radius-right-none outline-none'}
                                   ref={register}
                            />
                            <Button type={'submit'}
                                    className={'border-radius-left-none product__detail__add__product--btnSearch'}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            )}
        </Suspense>
    )
}

export default OrderCancellationFilter;