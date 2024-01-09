import {faRuler, faNewspaper, faBook, FontAwesomeIcon, Grid, React, useTranslation, Suspense, tabStyles,
    Tabs, Tab,
} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const TabPanelAtom = React.lazy(() => import('components/atoms/TabMaterialAtom/TabPanelAtom'));

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
};

const ProductDetailDownload = (props) => {

    const t = useTranslation();
    const classes = tabStyles();

    const baseProductDownload = (
        <Suspense fallback={null}>
            <div className="product__detail__info border-bottom">
                <Grid container spacing={1}>
                    <Grid item lg={12}>
                        <div className="fs-16 fw-400">Downloads</div>
                    </Grid>
                    <Grid item lg={12}>
                        {props.catalogFile !== null &&
                            <ButtonAtom
                                type={'button-start-icon'}
                                icon={<FontAwesomeIcon icon={faNewspaper} color="#D13135" />}
                                name={t('label.catalogue')}
                                styleView="text-transf-cap fs-14 mr-8 tx-c"
                                clicked={() => props.handleDownload(props.catalogFile)}
                        />
                        }
                        {props.manualFile !== null &&
                            <ButtonAtom
                                type={'button-start-icon'}
                                icon={<FontAwesomeIcon icon={faBook} color="#D13135" />}
                                name={t('label.manualBook')}
                                styleView="text-transf-cap fs-14 mr-8 tx-c"
                                clicked={() => props.handleDownload(props.manualFile)}
                            />
                        }
                        {props.cuttingImage !== null &&
                            <ButtonAtom
                                type={'button-start-icon'}
                                icon={<FontAwesomeIcon icon={faRuler} color="#D13135" />}
                                name={`${t('label.cuttingSize')}`}
                                styleView="text-transf-cap fs-14 mr-8 tx-c"
                                clicked={() => props.handleDownload(props.cuttingImage)}
                            />
                        }
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );

    const packageProductDownload = (
        <Suspense fallback={null}>
            <div className="product__detail__info border-bottom">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className="fs-16 fw-400">Downloads</div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={classes.rootTab}>
                            <Tabs
                                value={props.valueDownload}
                                onChange={props.handleChangeDownload}
                                indicatorColor="secondary"
                                textColor="secondary"
                                variant={'scrollable'}
                                scrollButtons={'auto'}
                                aria-label="scrollable auto tabs example"
                            >
                                {props.itemProducts?.length > 0 &&
                                    props.itemProducts.map((product, index) => {
                                    return (
                                        <Tab key={index} className="mw-100" label={product.product.name} {...a11yProps(index)} />
                                    );
                                })}
                            </Tabs>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {props.itemProducts?.length > 0 &&
                            props.itemProducts.map((product, index) => {
                            return (
                                <TabPanelAtom key={index} value={props.valueDownload} index={index}>
                                    {props.fileDownload.catalogFile !== null &&
                                        <ButtonAtom
                                            type={'button-start-icon'}
                                            icon={<FontAwesomeIcon icon={faNewspaper} color="#D13135" />}
                                            name={t('label.catalogue')}
                                            styleView="text-transf-cap fs-14 mr-8 tx-c"
                                            clicked={() => props.handleDownload(props.fileDownload.catalogFile)}
                                        />
                                    }
                                    {props.fileDownload.manualFile !== null &&
                                        <ButtonAtom
                                            type={'button-start-icon'}
                                            icon={<FontAwesomeIcon icon={faBook} color="#D13135" />}
                                            name={t('label.manualBook')}
                                            styleView="text-transf-cap fs-14 mr-8 tx-c"
                                            clicked={() => props.handleDownload(props.fileDownload.manualFile)}
                                        />
                                    }
                                    {props.fileDownload.cuttingImage !== null &&
                                        <ButtonAtom
                                            type={'button-start-icon'}
                                            icon={<FontAwesomeIcon icon={faRuler} color="#D13135" />}
                                            name={`${t('label.cuttingSize')}`}
                                            styleView="text-transf-cap fs-14 mr-8 tx-c"
                                            clicked={() => props.handleDownload(props.fileDownload.cuttingImage)}
                                        />
                                    }
                                </TabPanelAtom>
                            );
                        })}
                    </Grid>
                </Grid>
            </div>
        </Suspense>
    );

    switch (props.type) {
        case 'base-product':
            return baseProductDownload;
        case 'package-product':
            return packageProductDownload;
        default:
            return baseProductDownload;
    };

};

export default ProductDetailDownload;