import {React, Suspense, Grid, Button, useTranslation} from 'libraries';

const TradeInContact = React.lazy(() => import('components/molecules/TradeInMolecule/TradeInContact'));
const TradeInTermCondition = React.lazy(() => import('components/molecules/TradeInMolecule/TradeInTermCondition'));
const TradeInForm = React.lazy(() => import('components/molecules/TradeInMolecule/TradeInForm'));
const TradeInQuote = React.lazy(() => import('components/molecules/TradeInMolecule/TradeInQuote'));

const TradeInOrganism = (props) => {

    const t = useTranslation();

    return (
        <Suspense fallback={null}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={12} lg={10}>
                    <div className={'mb-64'}>
                        {props.tradeinQuote?.length > 0 &&
                            props.tradeinQuote.map((item, index) => {
                                return (
                                    <TradeInQuote
                                        key={index}
                                        productExchange={item.productExchange}
                                        condition={item.condition}
                                        description={item.description}
                                        productName={item.productName}
                                        media={item.media[0]}
                                        productImage={item.image}
                                        labelCondition={item.labelCondition}
                                        handleDeleteTradeQuote={() => props.handleDeleteTradeQuote(index)}
                                    />
                                )
                            })
                        }
                        {props.showTradeinQuote && props.tradeinQuote?.length > 0 &&
                            <Button
                                className={'btn__primary--text text-transf-cap fs-18'}
                                onClick={props.handleAnotherTradeIn}
                            >
                                {t('form.addAnotherProduct')}
                            </Button>
                        }
                    </div>
                    {!props.showTradeinQuote &&
                        <TradeInForm
                            register={props.register}
                            control={props.control}
                            acceess={props.acceess}
                            handleSubmit={props.handleSubmit}
                            handleSubmitTradeInQuote={props.handleSubmitTradeInQuote}
                            productPhotoTradein={props.productPhotoTradein}
                            handleUploadImage={props.handleUploadImage}
                        />
                    }
                    <TradeInContact contact={props.contact} />
                    <TradeInTermCondition termCondition={props.termCondition} handleAgreeTerms={props.handleAgreeTerms} />
                </Grid>
            </Grid>
        </Suspense>
    );
};

export default TradeInOrganism;