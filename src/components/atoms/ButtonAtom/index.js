import { React, Button, SpinGif } from 'libraries';
import 'assets/scss/button/button.scss';

const ButtonAtom = (props) => {

    const ButtonStartIcon = (
        <Button onClick={props.clicked} type={props.typeButton} variant={props.variant} color={props.color}
                className={props.styleView} startIcon={props.icon} disabled={props.disabled} href={props.href}>
            {props.name}
        </Button>
    );

    const ButtonEndIcon = (
        <Button onClick={props.clicked} type={props.typeButton} variant={props.variant} color={props.color}
                className={props.styleView} endIcon={props.icon} disabled={props.disabled} href={props.href}>
            {props.name}
        </Button>
    );

    const ButtonText = (
        <Button onClick={props.clicked} type={props.typeButton} variant={props.variant} color={props.color}
                className={props.styleView} disabled={props.disabled}>
            {props.name}
        </Button>
    );

    const ButtonLoading = (
        <Button onClick={props.clicked} type={props.typeButton} variant={props.variant} color={props.color}
                className={props.styleView} disabled={props.disabled}>
            <img src={SpinGif} className={props.styleImage} alt={'button-loading'} />
        </Button>
    );

    switch (props.type) {
        case 'button-start-icon':
            return ButtonStartIcon;
        case 'button-end-icon':
            return ButtonEndIcon;
        case 'button-text':
            return ButtonText;
        case 'button-loading':
            return ButtonLoading;
        default:
            return ButtonStartIcon;
    };

}

export default ButtonAtom;