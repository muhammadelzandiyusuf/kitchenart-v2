import {
    React,
    Tabs,
    Tab,
    tabStyles
} from 'libraries';

const TabPanelAtom = React.lazy(() => import('components/atoms/TabMaterialAtom/TabPanelAtom'));
const TableAtom = React.lazy(() => import('components/atoms/TableAtom'));

const ProductDetailTabSpecification = (props) => {

    const classes = tabStyles();

    let specificationSection = [];
    if (props.specifications?.length > 0) {
        props.specifications.forEach(item => {
            const current = specificationSection.find(current => current?.section?.value === item?.section?.value);
            if (current === undefined) {
                specificationSection.push(item);
            };
        });
    };

    return (
        <div className={'product__detail__info'}>
            <div className={`style__view--desktop ${classes.rootTab}`}>
                <Tabs
                    value={props.value}
                    onChange={props.handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="tab specification"
                    centered={true}
                >
                    {specificationSection?.length > 0 &&
                        specificationSection.map((item, index) => {
                            return (
                                <Tab key={index} className="mw-100" label={item.section.label} />
                            );
                    })}
                </Tabs>
                {specificationSection?.length > 0 &&
                    specificationSection.map((item, index) => {
                        const filterContents = props.specifications.filter(content => content?.section?.value === item?.section?.value);
                        return (
                            <TabPanelAtom key={index} value={props.value} index={index}>
                                <TableAtom filterContents={filterContents} />
                            </TabPanelAtom>
                        );
                })}
            </div>
            <div className={`style__view--mobile ${classes.rootTab}`}>
                <Tabs
                    value={props.value}
                    onChange={props.handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="tab specification"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {specificationSection?.length > 0 &&
                        specificationSection.map((item, index) => {
                        return (
                            <Tab key={index} className="mw-100" label={item.section.label} />
                        );
                    })}
                </Tabs>
                {specificationSection?.length > 0 &&
                    specificationSection.map((item, index) => {
                    const filterContents = props.specifications.filter(content => content?.section?.value === item?.section?.value);
                    return (
                        <TabPanelAtom key={index} value={props.value} index={index}>
                            <TableAtom filterContents={filterContents} />
                        </TabPanelAtom>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductDetailTabSpecification;