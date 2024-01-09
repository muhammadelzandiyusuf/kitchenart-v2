import {React, Grid, useState, setLanguage} from 'libraries';
import IndonesiaImage from "../../../assets/images/indo-icon.png";
import EnglishImage from "../../../assets/images/us-icon.png";
import {postLanguage} from "services";

const LanguageMolecule = React.memo(props => {

    const [data] = useState({
        language: [
            {id: 1, name: 'Indonesia', value: 'id', image: IndonesiaImage},
            {id: 2, name: 'English', value: 'en', image: EnglishImage}
        ]
    });

    const languageHandle = (value) => {
        postLanguage(value).then(res => {
            setLanguage(res);
        });
    };

    return (
        <Grid container spacing={0}>
            {data.language.map(item => {
                return (
                    <Grid key={item.id} item xs={6}>
                        <div className="horizontal" onClick={() => languageHandle(item.value)}>
                            <img src={item.image} alt={item.name} className="w-100 pointer h-25" />
                        </div>
                    </Grid>
                );
            })}
        </Grid>
    );
});

export default LanguageMolecule;