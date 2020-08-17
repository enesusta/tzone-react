import React, {useState} from "react";
import TzoneProvinceSelect from "./TzoneProvinceSelect";

const TzoneWrapper = () => {
    const [province, setProvince] = useState(null);
    const [county, setCounty] = useState(null);
    const [town, setTown] = useState(null);

    const provinceHandler = (selectedCity) => {
        setProvince(selectedCity.value);
    };

    const countyHandler = (selectedCounty) => {
        setCounty(selectedCounty.value);
    };

    const townHandler = (selectedTown) => {
        setTown(selectedTown.value);
    };

    return <form className="tzone-container">
        <label className='label'>İl</label>
        <TzoneProvinceSelect/>
    </form>;
};

export default TzoneWrapper;
