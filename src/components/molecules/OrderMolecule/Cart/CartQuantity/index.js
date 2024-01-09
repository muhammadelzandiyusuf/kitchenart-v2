import {faMinus, faPlus, IconButton, React, Suspense} from 'libraries';

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const CartQuantity = (props) => {

    return (
        <Suspense fallback={null}>
            <IconButton
                aria-label="minus"
                size={'small'}
                variant="contained"
                className={'fs-12 bgc-grey'}
                onClick={() => props.handleQuantity('min', props.quantity, props.maxQuantity, props.href)}
            >
                <IconAtom icon={faMinus} />
            </IconButton>
            <ButtonAtom
                type={'button-text'}
                name={props.quantity}
                styleView={'text-transf-cap tx-c border-bottom p-8'}
            />
            <IconButton
                aria-label="plus"
                size={'small'}
                variant="contained"
                className={'fs-12 bgc-grey'}
                onClick={() => props.handleQuantity('plus', props.quantity, props.maxQuantity, props.href)}
            >
                <IconAtom icon={faPlus} />
            </IconButton>
        </Suspense>
    );
};

export default CartQuantity;