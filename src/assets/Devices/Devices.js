import AirFlow from "./AirFlow.png"
import BodyTemp from './BodyTemp.png'
import ECG from './ECG.png'
import EMG from './EMG.png'
import EOG from './EOG.png'
import Gluco from './Gluco.png'
import GSR from './GSR.png'
import NIBP from './NIBP.png'
import SPO2 from './SPO2.png'
import airflowimoticon from './airflowimoticon.png'



const Devices =
    [{
        id: 1,
        name: "Air FLow 호흡센서",
        img: AirFlow,
        des: "Air FLow 호흡센서",
        imoticon: airflowimoticon
    },
    {
        id: 2,
        name: "Body Temp 체온센서",
        img: BodyTemp,
        des: "Body Temp 체온센서"
    },
    {
        id: 3,
        name: "NIBP 혈압 측정계",
        img: NIBP,
        des: "혈압 측정계"
    },
    // {
    //     id: 4,
    //     name: "GULOMETER 혈당 측정계",
    //     img: Gluco,
    //     des: "혈당 측정계"
    // },
    {
        id: 5,
        name: "SPO2 산소 포화도",
        img: SPO2,
        des: "산소 포화도",
    },
    {
        id: 6,
        name: "EOG 안구전도",
        img: EOG,
        des: "안구전도",
    },
    {
        id: 7,
        name: "ECG 심전도",
        img: ECG,
        des: "심전도",
    },
    {
        id: 8,
        name: "EMG 근전도",
        img: EMG,
        des: "근전도",
    },
    {
        id: 9,
        name: "GSR Galvanic Skin Response",
        img: GSR,
        des: "GSR Galvanic Skin Response",
    },
    ]
export default Devices