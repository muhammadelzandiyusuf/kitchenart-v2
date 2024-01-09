import { React, LoadingBar, useRef, useEffect } from 'libraries';

const LoadingBarMolecule = React.memo(() => {

    const barColor = '#D13135';
    const ref = useRef(null);

    useEffect(() => {
        ref.current.continuousStart();
    });

    return (
        <LoadingBar color={barColor} ref={ref} />
    );
});

export default LoadingBarMolecule;