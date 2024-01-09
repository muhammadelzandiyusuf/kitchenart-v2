import {React, Helmet, useLocation, ImgBackgroundLogin} from 'libraries';
import favIcon from 'assets/images/icon.png';

const HelmetAtom = (props) => {

    let location = useLocation();
    let currentUrl = `${props.url !== undefined ? props.url : process.env.REACT_APP_DOMAIN_NAME + location.pathname}`;
    let quote = props.quote !== undefined ? props.quote : "Cooking, Washing, Cooling, Sanitary, Small Appliances, Cookware, Commercial Kitchen | KitchenArt";
    let titleShare = props.titleShare !== undefined ? props.titleShare : "KitchenArt, Home Appliances, Ariston, Delizia, La Germania, Bertazzoni, Royal";
    let image = props.image !== undefined ? props.image : ImgBackgroundLogin;
    let description = props.description !== undefined ? props.description  :
        "KitchenArt belanja peralatan dapur terlengkap di Indonesia";
    let hashtag = props.hashtag !== undefined ? props.hashtag : "#kitchenArt #homeappliances";

    return (
        <Helmet>
            <title>{props.title}</title>
            <link rel="apple-touch-icon" sizes="180x180" href={favIcon} />
            <link rel="icon" type="image/png" sizes="32x32" href={favIcon} />
            <link rel="icon" type="image/png" sizes="16x16" href={favIcon} />

            <meta charSet="utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="csrf_token" content=""/>
            <meta property="type" content="website"/>
            <meta property="url" content={currentUrl}/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
            <meta name="theme-color" content="#ffffff"/>
            <meta name="_token" content=""/>
            <meta name="robots" content="noodp"/>
            <meta property="title" content={titleShare}/>
            <meta property="quote" content={quote}/>
            <meta name="keyword" content={props.keyword} />
            <meta name="description" content={description}/>
            <meta property="image" content={image}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={titleShare}/>
            <meta property="og:quote" content={quote}/>
            <meta property="og:hashtag" content={hashtag}/>
            <meta property="og:image" content={image}/>
            <meta content="image/*" property="og:image:type"/>
            <meta property="og:url" content={currentUrl}/>
            <meta property="og:site_name" content="CampersTribe"/>
            <meta property="og:description" content={description}/>
        </Helmet>
    );
};

export default HelmetAtom;