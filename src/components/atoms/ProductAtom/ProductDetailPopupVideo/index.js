import { React, Dialog, DialogActions, DialogContent, useMediaQuery, Button, useTranslation, YouTube, useTheme } from 'libraries';

const ProductDetailPopupVideo = (props) => {

    const { handleCloseYoutube, fullWidth, maxWidth, openYoutube, youtubeId } = props;
    const theme = useTheme();
    const t = useTranslation();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const opts = {
        height: '450',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openYoutube}
            onClose={handleCloseYoutube}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogContent>
                <YouTube
                    videoId={youtubeId} opts={opts}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseYoutube} color="secondary">
                    {t('label.close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetailPopupVideo;