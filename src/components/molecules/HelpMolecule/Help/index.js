import {Grid, React, Suspense} from "libraries";

const HelpMolecule = (props) => {
    const { helpCategories, handleDetailHelp } = props;

    let categories = [];
    if (helpCategories?.length > 0) {
        helpCategories.forEach(item => {
            if (item.totalContents > 0) {
                categories.push(item);
            };
        });
    };

    return(
        <Suspense fallback={null}>
            <Grid container spacing={2}>
                {categories?.length > 0 &&
                    categories.map((helpCategory, index) => {
                    return(
                        <Grid item xs={6} sm={4} md={4} lg={4} key={index}
                              onClick={() => handleDetailHelp(helpCategory.href)}>
                            <div className={"bgc-f5 mb-10 border-radius-5px pointer"}>
                                <Grid container spacing={0}>
                                    <Grid item xs={3} sm={4} md={4} lg={4}>
                                        <img src={helpCategory.iconImage} alt={helpCategory.name}
                                             className={"icon-img"} />
                                    </Grid>
                                    <Grid item xs={9} sm={8} md={8} lg={8}>
                                        <div className={"tx-c ta-r text__help-list"}>
                                            {helpCategory.name}
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </Suspense>
    )
}

export default HelpMolecule;