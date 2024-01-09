import {React, useState} from 'libraries';

const ProductDateTimeCountDown = (props) => {

    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const getTimeUntil = (deadline) => {
        if (Date.parse(new Date()) >= Date.parse(props.deadline?.validFrom) && Date.parse(new Date()) <= Date.parse(props.deadline?.validTo)) {
            const time = Date.parse(deadline) - Date.parse(new Date());
            if (time < 0) {
                setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
            else {
                const days = Math.floor(time / (1000 * 60 * 60 * 24));
                const daysHours = Math.floor(days * 24);
                const hours = Math.floor(((time / (1000 * 60 * 60)) % 24) + daysHours);
                const minutes = Math.floor((time / 1000 / 60) % 60);
                const seconds = Math.floor((time / 1000) % 60);
                setTime({ days: days, hours: hours, minutes: minutes, seconds: seconds });
            };
        }
        else{
            setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    };

    const leading0 = (num) => {
        return num < 10 ? "0" + num : num;
    }

    setInterval(() => getTimeUntil(props.deadline?.validTo), 1000);

    return (
        <div className={props.styleView}>
            {props.detail &&
                <div>
                    <b>Deal Zone</b>
                    <span>{leading0(time.hours)} h</span><span>{leading0(time.minutes)} m</span><span>{leading0(time.seconds)} s</span>
                </div>
            }
            {!props.detail &&
                <div>
                    <span>{leading0(time.hours)} h :</span><span>{leading0(time.minutes)} m :</span><span>{leading0(time.seconds)} s</span>
                </div>
            }
        </div>
    );
};

export default ProductDateTimeCountDown;