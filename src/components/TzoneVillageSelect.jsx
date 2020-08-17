import React, {useEffect, useState} from 'react';
import {capitalizeWithTurkish} from "tornavida/text";
import AsyncSelect from "react-select/async";

const TzoneVillageSelect = ({province, county, town, handler}) => {
    const [villages, setVillages] = useState(null);
    const [l, setL] = useState(true); // l = loading
    const fieldName = 'villageName';

    useEffect(() => {
        async function getVillages() {
            if (province && county && town) {
                const request = await fetch(`http://localhost:8080/villages/${province}/${county}/${town}`);
                const response = await request.json();
                const townVillages = response['townVillages'].map(e => {
                    return {
                        value: e[fieldName],
                        label: e[fieldName]
                    }
                });
                setVillages(townVillages);
                setL(false);
            }
        }
        getVillages();
    }, [town]);

    const filterOptions = inputValue => villages.filter(e => e.value.includes(capitalizeWithTurkish(inputValue)));

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterOptions(inputValue));
            }, 500);
        });

    const villageHandler = selectedVillage => {
        const address = `${selectedVillage.value} # ${town}/${county}/${province}`;
        handler(address);
    }

    return (
        <section className='select-container'>
            <AsyncSelect cacheOptions
                         defaultOptions={villages}
                         placeholder={l ? 'Yükleniyor..' : 'Mahalle / köy seçiniz..'}
                         loadOptions={promiseOptions}
                         loadingMessage={() => 'Yükleniyor..'}
                         noOptionsMessage={() => 'Sonuç bulunamadı.'}
                         onChange={villageHandler}

            />
        </section>
    )
}

export default TzoneVillageSelect;
