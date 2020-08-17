import React, {useState, useEffect} from 'react';
import AsyncSelect from 'react-select/async';
import {capitalizeWithTurkish} from "tornavida/text";

const TzoneProvinceSelect = ({handler}) => {
    const [provinces, setProvinces] = useState(null);
    const fieldName = 'provinceName';

    useEffect(() => {
        const getProvinces = async () => {
            const url = 'http://localhost:8080/provinces';
            const req = await fetch(url);
            const res = await req.json();
            const resArr = res.map(e => {
                return {
                    value: e[fieldName],
                    label: e[fieldName]
                }
            });
            setProvinces(resArr);
        }
        getProvinces();
    }, []);

    const filterOptions = inputValue => provinces.filter(e => e.value.includes(capitalizeWithTurkish(inputValue)));

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterOptions(inputValue));
            }, 500);
        });

    return (
        <section className='select-container'>
            <AsyncSelect cacheOptions
                         defaultOptions={provinces}
                         placeholder={'Şehri seçiniz..'}
                         loadOptions={promiseOptions}
                         loadingMessage={() => 'Yükleniyor..'}
                         noOptionsMessage={() => 'Sonuç bulunamadı.'}
                         onChange={handler}/>
        </section>
    );
};

export default TzoneProvinceSelect;
