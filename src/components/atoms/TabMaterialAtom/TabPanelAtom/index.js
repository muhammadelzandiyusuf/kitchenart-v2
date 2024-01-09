import { React } from 'libraries';

const TabPanelAtom = (props) => {

    return (
        <div role="tabpanel" hidden={props.value !== props.index} id={`scrollable-auto-tabpanel-${props.index}`}
             aria-labelledby={`scrollable-auto-tab-${props.index}`}>
            {props.value === props.index && props.children}
        </div>
    );
};

export default React.memo(TabPanelAtom);