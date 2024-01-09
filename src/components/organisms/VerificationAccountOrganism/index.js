import {React, Suspense, faCheckCircle, Grid} from 'libraries';

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));
const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));

const VerificationAccountOrganism = React.memo(props => {

    return(
        <Suspense fallback={null}>
            <Grid container spacing={0} className="ta-c p-100">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className="bgc-form">
                        <IconAtom icon={faCheckCircle} styleIcon="fs-3rem" />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <div className="bgc-form tx-c fs-17 p-20">
                        Your email has been verified successfully
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    <div className="bgc-form">
                        <ButtonAtom variant="contained" color="secondary" href="/" name="KitchenArt"/>
                    </div>
                </Grid>
            </Grid>
        </Suspense>
    );
});

export default VerificationAccountOrganism;