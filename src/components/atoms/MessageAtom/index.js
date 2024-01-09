import { React } from 'libraries';

const MessageAtom = (props) => {

    return(
        <div className={`tx-c fs-15 ${props.styleMessage}`}>{props.message}</div>
    );
};

export default MessageAtom;