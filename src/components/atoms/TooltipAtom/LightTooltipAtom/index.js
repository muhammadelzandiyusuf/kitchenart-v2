import {React, withStyles, Tooltip, Button, faInfoCircle, FontAwesomeIcon} from 'libraries';
import 'assets/scss/button/button.scss';

const LightTooltipAtom = (props) => {

    const LightTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#FFFFFF',
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }))(Tooltip);

    return (
        <LightTooltip placement="top" title={props.title}>
            <Button className={'tooltip'}><FontAwesomeIcon icon={faInfoCircle} /></Button>
        </LightTooltip>
    );
};

export default React.memo(LightTooltipAtom);