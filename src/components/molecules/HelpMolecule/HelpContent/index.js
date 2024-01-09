import {Grid, React, Suspense} from "libraries";

const HelpContent = (props) => {
    const { content } = props;

    return(
        <Suspense fallback={null}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div dangerouslySetInnerHTML={{__html: content?.content}}></div>
            </Grid>
        </Suspense>
    )
}

export default HelpContent;