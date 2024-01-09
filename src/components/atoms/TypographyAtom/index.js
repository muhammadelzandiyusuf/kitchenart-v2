import { React, Typography, useState, useEffect } from 'libraries';
import SkeletonAtom from "components/atoms/SkeletonAtom";

const TypographyAtom = (props) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
       setLoading(false);
    }, []);

    const typographImage = (
        <Typography className={props.typographyStyle} variant={props.variant} onClick={props.clicked} noWrap>
            {loading ? <SkeletonAtom variant="rect" /> : <img src={props.image} className={props.styleImage} alt={props.alt} />}
        </Typography>
    );

    const typographTitle = (
        <Typography variant={props.variant} className={props.typographyStyle} onClick={props.clicked} gutterBottom>
            {loading ? <SkeletonAtom variant="text" height={120} /> : props.title}
        </Typography>
    );


    switch (props.type) {
        case 'title':
            return typographTitle;
        case 'image':
            return typographImage;
        default:
            return typographTitle;
    }
}

function areEqual(prevProps, nextProps) {
    let status = false;
    if (prevProps.title === nextProps.title && prevProps.image === nextProps.image && prevProps.variant === nextProps.variant && prevProps.typographyStyle === nextProps.typographyStyle) status = true;
    return status;
}

export default React.memo(TypographyAtom, areEqual);