import {React, Typography, withStyles, Tooltip, useTranslation, Button, HelpIcon, ClickAwayListener, useState} from 'libraries';
import 'assets/scss/button/button.scss';

const TooltipAtom = (props) => {

    const t = useTranslation();
    const [open, setOpen] = useState(false);

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: '#ccc0c9',
            color: '#584b52',
            maxWidth: '100%',
            fontSize: '12px',
            border: '1px solid #d3cbd0',
        },
        arrow: {
            color: '#ccc0c9',
        },
    }))(Tooltip);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
                <HtmlTooltip
                    onClose={handleTooltipClose}
                    open={open}
                    title={
                        <React.Fragment>
                            <Typography color="inherit">
                                <b>{t('label.passwordRules')}</b>
                            </Typography>
                            <ul>
                                <li>{t('label.ruleOne')}</li>
                                <li>{t('label.ruleTwo')}</li>
                                <li>{t('label.ruleThree')}</li>
                            </ul>
                        </React.Fragment>
                    }
                    placement="right"
                    arrow
                >
                    <Button className="fs-13 text-transf-cap" onClick={handleTooltipOpen} endIcon={<HelpIcon className="fs-13" />}>
                        {t('label.passwordRules')}
                    </Button>
                </HtmlTooltip>
            </div>
        </ClickAwayListener>
    );
};

export default React.memo(TooltipAtom);