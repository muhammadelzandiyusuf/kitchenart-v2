import {FormControl, MenuItem, NumberFormat, React, Select, Suspense} from 'libraries';

const CheckboxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));

const CartServiceWarranty = (props) => {

    let dataChecked = null;
    if (props.checkedServiceWarranty?.length > 0) {
        const data = props.checkedServiceWarranty.find((item) => item.id === props.slug);
        if (data !== undefined) {
            dataChecked = data;
        };
    };

    let dataValue = null;
    if (props.serviceWarrantyValue?.length > 0) {
        const value = props.serviceWarrantyValue.find((item) => item.id === props.slug);
        if (value !== undefined) {
            dataValue = value;
        };
    };

    let dataProperty = null;
    if (props.services?.length > 0) {
        const service = props.services.find((property) => property.id === props.slug && property.type === props.name);
        dataProperty = service?.href;
    };

    return (
        <Suspense fallback={null}>
            {props.services?.length > 0 &&
                <div>
                    <CheckboxAtom
                        name={props.name}
                        label={props.label}
                        styleCheckbox={'fs-14 tx-c'}
                        handleChangeCheckbox={props.handleUncheckService}
                        checked={true}
                    />
                    <div className={'pl-32'}>
                        <FormControl variant="outlined" size={'small'} className={'width60-to-100'}>
                            <Select
                                id="demo-simple-select-outlined"
                                value={dataProperty}
                                className={'fs-14 tx-c'}
                                onChange={props.handleChangeValue}
                            >
                                {props.serviceWarranty.length > 0 &&
                                    props.serviceWarranty.map((item, index) => {
                                    return (
                                        <MenuItem value={item.href} key={index}>
                                            {item.period} year
                                            ( <NumberFormat
                                            value={item.price.toFixed(0)}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'Rp'}
                                            decimalScale={0} /> )
                                        </MenuItem>
                                    )})
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
            }
            {props.services?.length === 0 &&
                <div>
                    <CheckboxAtom
                        name={props.name}
                        label={props.label}
                        styleCheckbox={'fs-14 tx-c'}
                        handleChangeCheckbox={props.handleCheckedServiceWarranty}
                    />
                    {dataChecked?.warranty &&
                        <div className={'pl-32'}>
                            <FormControl variant="outlined" size={'small'} className={'width60-to-100'}>
                                <Select
                                    id="demo-simple-select-outlined"
                                    value={dataValue?.value}
                                    className={'fs-14 tx-c'}
                                    onChange={props.handleChangeValue}
                                >
                                    {props.serviceWarranty.length > 0 &&
                                    props.serviceWarranty.map((item, index) => {
                                        return (
                                            <MenuItem value={item.href} key={index}>
                                                {item.period} year
                                                ( <NumberFormat
                                                value={item.price.toFixed(0)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'Rp'}
                                                decimalScale={0} /> )
                                            </MenuItem>
                                        )})
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    }
                </div>
            }
        </Suspense>
    );
};

export default CartServiceWarranty;