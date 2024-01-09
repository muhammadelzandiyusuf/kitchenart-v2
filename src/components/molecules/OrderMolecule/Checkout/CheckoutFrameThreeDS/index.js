import {React, Suspense, Dialog, DialogTitle, DialogContent, Container, LogoKitchenArt, Grid, useHistory, useState} from 'libraries';

const TypographAtom = React.lazy(() => import('components/atoms/TypographyAtom'));

const CheckoutFrameThreeDS = (props) => {

    const {redirectUrl, openFrame, orderNumberPayment} = props;
    const history = useHistory();

    const [url, setUrl] = useState(null);
    const [responses, setResponses] = useState([]);

    const options = {
        performAuthentication: function(redirectUrl){
            if (url === null) {
                setUrl(redirectUrl);
            };
        },
        onSuccess: function(response){
            setResponses(response);
            history.push(`/payment/credit-card/${orderNumberPayment}`);
        },
        onFailure: function(response){
            setResponses(response);
        },
        onPending: function(response){
            setResponses(response);
        }
    };

    if (redirectUrl !== null) {
        window.MidtransNew3ds.authenticate(redirectUrl, options);
    };

    return (
        <Suspense fallback={null}>
            <Dialog fullScreen open={openFrame}>
                <Container maxWidth="lg">
                    <DialogTitle>
                        <TypographAtom type="image" image={LogoKitchenArt}
                                       styleImage="h-42" alt="logo-image" />
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <iframe
                                    title={'midtransThreeDS'}
                                    style={{height: '90vh', width: '100%'}}
                                    frameBorder="0" src={redirectUrl}></iframe>
                            </Grid>
                        </Grid>
                        {responses?.status !== 200 &&
                            <span></span>
                        }
                    </DialogContent>
                </Container>
            </Dialog>
        </Suspense>
    );
};

export default CheckoutFrameThreeDS;