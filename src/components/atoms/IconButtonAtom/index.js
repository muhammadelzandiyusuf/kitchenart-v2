import { React, IconButton, Suspense, Badge } from 'libraries';
import 'assets/scss/button/button.scss';

const IconAtom = React.lazy(() => import('components/atoms/IconAtom'));

const IconButonAtom = (props) => {

    const iconButtonMenu = (
        <Suspense fallback={null}>
            <IconButton
                edge={props.edge}
                className={props.styleIconButton}
                color="inherit"
                aria-label={props.label}
                aria-controls={props.control}
                aria-haspopup={props.popup}
                onClick={props.clicked}
                size={props.size}
            >
                <IconAtom icon={props.icon} styleIcon={props.styleIcon} />
            </IconButton>
        </Suspense>
    );

    const iconButtonMenuMaterial = (
        <Suspense fallback={null}>
            <IconButton
                edge={props.edge}
                className={props.styleIconButton}
                color="inherit"
                aria-label={props.label}
                aria-controls={props.control}
                aria-haspopup={props.popup}
                onClick={props.clicked}>
                {props.children}
            </IconButton>
        </Suspense>
    );

    const iconButtonBadge = (
        <Suspense fallback={null}>
            <IconButton aria-label={props.label} color="inherit" onClick={props.clicked} className={props.styleIconButton}>
                <Badge badgeContent={props.content} color={props.color} className={props.badgeStyle}>
                    <IconAtom icon={props.icon} styleIcon={props.styleIcon} />
                </Badge>
            </IconButton>
        </Suspense>
    );

    switch (props.type) {
        case 'icon-button':
            return iconButtonMenu;
        case 'icon-button-material':
            return iconButtonMenuMaterial;
        case 'icon-button-badge':
            return iconButtonBadge;
        default:
            return iconButtonMenu;
    }


};

export default IconButonAtom;