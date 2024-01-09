import { React, Suspense, faShoppingCart, faHeart, faUser, useHistory } from 'libraries';

const IconBadgeButton = React.lazy(() => import('components/atoms/IconButtonAtom'));

const MenuButtonIconNavbar = (props) => {

    const history = useHistory();

    const handleToCart = () => {
        history.push('/cart');
    };

    const handleToWishlist = () => {
        history.push('/profile/wishlist');
    };

    const handleToProfile = () => {
        history.push('/profile');
    };

    return (
        <Suspense fallback={null}>
            <div className={props.styleMenu}>
                <div className={props.styleChildMenu}>
                    <IconBadgeButton type="icon-button-badge" color="secondary" label="Show Cart" content={props.badgeCart}
                                     icon={faShoppingCart} styleIcon="tx-c" clicked={handleToCart} />
                    <IconBadgeButton type="icon-button-badge" color="secondary" label="Show Wish List"
                                     content={props.badgeWish} icon={faHeart} styleIcon="tx-c" clicked={handleToWishlist} />
                    <IconBadgeButton type="icon-button" edge="end" label="account of current user"
                                     control={props.controlUser} popup={props.popup}
                                     icon={faUser} styleIcon="tx-c" clicked={handleToProfile} />
                </div>
            </div>
        </Suspense>
    );
}

export default MenuButtonIconNavbar;