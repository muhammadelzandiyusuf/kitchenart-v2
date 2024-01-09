import { React } from 'libraries';

const BackgroundImage = (props) => {
    return (
        <div className="w-100 background">
            <img src={props.ImgBackgroundLogin} className="w-100 style__view--desktop" alt="background-login" />
            <img src={props.ImgBackgroundLoginMobile} className="w-100 style__view--mobile" alt="background-login" />
        </div>
    );
}

function areEqual(prevProps, nextProps) {
    let status = false;
    if (prevProps.ImgBackgroundLogin === nextProps.ImgBackgroundLogin) status = true;
    return status;
}

export  default React.memo(BackgroundImage, areEqual);