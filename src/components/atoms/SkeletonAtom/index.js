import { React, Skeleton } from 'libraries';

const SkeletonAtom = (props) => {

    return (
        <Skeleton variant={props.variant} width={props.width} height={props.height} className={props.styleSkeleton} />
    );
}

function areEqual(prevProps, nextProps) {
    let status = false;
    if (prevProps.variant === nextProps.variant && prevProps.width === nextProps.width && prevProps.height === nextProps.height) status = true;
    return status;
}

export default React.memo(SkeletonAtom, areEqual);