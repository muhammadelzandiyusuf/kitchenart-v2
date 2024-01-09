import {faMinus, faPlus, IconButton, React, Suspense} from "libraries";

const ButtonAtom = React.lazy(() => import('components/atoms/ButtonAtom'));
const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const ProductQuantity = (props) => {
    return(
        <Suspense fallback={null}>
            <div>
                <label>Quantity</label>
            </div>
            <div>
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
                {props.wholesalePriceLists?.length > 0 &&
                    <label className={"ml-16 pointer td-u"} onClick={props.handleShowWholesale}>
                        Wholesale price Available
                    </label>
                }
            </div>
        </Suspense>
    )
}

export default ProductQuantity;