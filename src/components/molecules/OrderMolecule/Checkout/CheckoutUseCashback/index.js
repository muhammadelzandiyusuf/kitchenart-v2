import {React, Suspense, useTranslation, Slider, withStyles, NumberFormat} from 'libraries';

const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));

const CheckoutUseCashback = (props) => {

    const { handleChangeCashback, cashback, poinCashBack } = props;
    const t = useTranslation();
    const marks = [
        {
            value: poinCashBack
        }
    ];
    const boxShadowStyle = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
    const IOSSlider = withStyles({
        root: {
            color: '#D13135',
            height: 10,
            padding: '15px 0',
        },
        thumb: {
            height: 28,
            width: 28,
            backgroundColor: '#fff',
            boxShadow: boxShadowStyle,
            marginTop: -10,
            marginLeft: -14,
            '&:focus, &:hover, &$active': {
                boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    boxShadow: boxShadowStyle,
                },
            },
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 12px)',
            top: -22,
            '& *': {
                background: 'transparent',
                color: '#000',
            },
        },
        track: {
            height: 10,
        },
        rail: {
            height: 10,
            opacity: 0.5,
            backgroundColor: '#bfbfbf',
        },
        mark: {
            backgroundColor: '#bfbfbf',
            height: 16,
            width: 1,
            marginTop: -3,
        },
        markActive: {
            opacity: 1,
            backgroundColor: 'currentColor',
        },
    })(Slider);

    return (
        <Suspense fallback={null}>
            <div className={'box-shadow-type-one p-24'}>
                <CheckBoxAtom
                    type={'form'}
                    id={`cashback`}
                    name={`cashback`}
                    label={t('label.useCashback')}
                    handleChangeCheckbox={handleChangeCashback}
                    checked={cashback ? true : false}
                    styleCheckbox={'fs-20 fw-400'}
                />
                <IOSSlider aria-label="ios slider" defaultValue={poinCashBack} marks={marks} valueLabelDisplay="off" />
                <div className={'mt-16 fs-18 tx-c'}>
                    Poin :
                    <NumberFormat
                        value={poinCashBack.toFixed(0)}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp'}
                        decimalScale={0}
                        className={'ml-4'}
                    />
                </div>
            </div>
        </Suspense>
    );
};

export default CheckoutUseCashback;