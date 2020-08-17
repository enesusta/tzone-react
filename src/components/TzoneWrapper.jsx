import React, {useState} from "react";
import TzoneProvinceSelect from "./TzoneProvinceSelect";
import TzoneCountySelect from "./TzoneCountySelect";
import TzoneTownSelect from "./TzoneTownSelect";
import TzoneVillageSelect from "./TzoneVilageSelect";

const TzoneWrapper = () => {
    const [province, setProvince] = useState(null);
    const [county, setCounty] = useState(null);
    const [town, setTown] = useState(null);
    const [address, setAddress] = useState(null);

    const provinceHandler = (selectedCity) => {
        setProvince(selectedCity.value);
    };

    const countyHandler = (selectedCounty) => {
        setCounty(selectedCounty.value);
    };

    const townHandler = (selectedTown) => {
        setTown(selectedTown.value);
    };

    return (
        <section className='tzone-container'>
            <form className="tzone-form">
                <label className='label'>İl</label>
                <TzoneProvinceSelect handler={provinceHandler}/>
                <label className='label'>İlçe</label>
                <TzoneCountySelect handler={countyHandler} province={province}/>
                <label className='label'>Belde / Semt</label>
                <TzoneTownSelect handler={townHandler} province={province} county={county}/>
                <label className='label'>Mahalle / Köy</label>
                <TzoneVillageSelect handler={setAddress} province={province} county={county} town={town}/>
            </form>
            <br/>
            <br/>
            Address is
            <br/>
            <br/>
            <code> {address} </code>
        </section>
    );
};

export default TzoneWrapper;
