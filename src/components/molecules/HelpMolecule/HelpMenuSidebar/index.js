import {Grid, React, Suspense} from "libraries";

const HelpMenuSidebar = (props) => {
    const { helpCategory, helpContents, handleContent, content } = props;

    return(
        <Suspense fallback={null}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className={"fs-24 mb-10 tx-c"}>
                    {helpCategory.name}
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className={"bl-menu"}>
                    {helpContents.map((helpContent, index) => {
                        return(
                            <div className={`fs-20 mb-5 ml-16 pointer ${helpContent.title === content.title ? 'tc-r' : 'tx-c'}`}
                                 key={index} onClick={() => handleContent(helpContent.href)}>
                                {helpContent.title}
                            </div>
                        )
                    })}
                </div>
            </Grid>
        </Suspense>
    )
}

export default HelpMenuSidebar;