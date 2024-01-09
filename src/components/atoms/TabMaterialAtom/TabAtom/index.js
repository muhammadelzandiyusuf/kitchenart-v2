import { React, Tabs, Tab, tabStyles } from 'libraries';
import 'assets/scss/tab/tab.scss';

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
};

const TabAtom = (props) => {
    const { menuTop } = props;
    const classes = tabStyles();

    return (
        <div className={classes.rootTab}>
            <Tabs
                value={props.value}
                onChange={props.handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant={props.variant}
                scrollButtons={props.scrool}
                aria-label="scrollable auto tabs example"
                className={props.styleTab}
                centered={props.centered}
            >
                {menuTop?.length > 0 &&
                    menuTop.map((item, index) => {
                        if(props.typeTab === 'package') {
                                return item.id !== 5 &&
                                    <Tab key={index} className="mw-100" label={item.name} {...a11yProps(index)} />
                        }
                        else{
                            return (
                                <Tab key={index} className="mw-100" label={item.name} {...a11yProps(index)} />
                            );
                        };
                })}
            </Tabs>
        </div>
    );
};

export default React.memo(TabAtom);