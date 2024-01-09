import {React, Suspense, useState} from 'libraries';

const PaymentCountTime = (props) => {

    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const getTimeUntil = (deadline) => {
        if (Date.parse(new Date()) >= Date.parse(props.deadline?.validFrom) && Date.parse(new Date()) <= Date.parse(props.deadline?.validTo)) {
            let times = +new Date(deadline) - +new Date();
            if (times < 0) {
                setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
            else {
                let days = Math.floor(times / (1000 * 60 * 60 * 24));
                let hours = Math.floor((times / (1000 * 60 * 60)) % 24);
                let minutes = Math.floor((times / 1000 / 60) % 60);
                let seconds = Math.floor((times / 1000) % 60);
                setTime({ days: days, hours: hours, minutes: minutes, seconds: seconds });
            };
        }
        else{
            setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    };

    const leading0 = (num) => {
        return num < 10 ? "0" + num : num;
    };

    setInterval(() => getTimeUntil(props.deadline?.validTo), 1000);

    return (
        <Suspense fallback={null}>
            <div className={props.styleView}>
                {leading0(time.hours)} : {leading0(time.minutes)} : {leading0(time.seconds)}
            </div>
        </Suspense>
    );
};

export default PaymentCountTime;