import React, {useEffect, useState} from 'react';
import {capitalizeWithTurkish} from "tornavida/text";
import AsyncSelect from "react-select/async";

const TzoneTownSelect = ({handler, province, county}) => {
    const [towns, setTowns] = useState(null);
    const [loading, setLoading] = useState(true);
    const fieldName = 'townName';

    useEffect(() => {
        const getTowns = async () => {
            if (province && county) {
                const request = await fetch(`http://localhost:8080/towns/${province}/${county}`);
                const response = await request.json();
                const countyTowns = response['countyTowns'].map(e => {
                    return {
                        value: e[fieldName],
                        label: e[fieldName]
                    }
                });
                setTowns(countyTowns);
                setLoading(false);
            }
        }
        getTowns();
    }, [county]);

    const filterOptions = inputValue => towns.filter(e => e.value.includes(capitalizeWithTurkish(inputValue)));

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterOptions(inputValue));
            }, 500);
        });

    return (
        <section className='select-container'>
            <AsyncSelect cacheOptions
                         defaultOptions={towns}
                         placeholder={loading ? 'Yükleniyor..' : 'Semti seçiniz..'}
                         loadOptions={promiseOptions}
                         loadingMessage={() => 'Yükleniyor..'}
                         noOptionsMessage={() => 'Sonuç bulunamadı.'}
                         onChange={handler}/>
        </section>
    )
};

export default TzoneTownSelect;
