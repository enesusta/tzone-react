import React, {useEffect, useState} from 'react';
import {capitalizeWithTurkish} from "tornavida/text";
import AsyncSelect from "react-select";

const TzoneCountySelect = ({handler, province}) => {
    const [counties, setCounties] = useState([]);
    const fieldName = 'countyName';

    useEffect(() => {
        const getCounties = async () => {
            if (province) {
                const url = `http://localhost:8080/counties/${province}`;
                const req = await fetch(url);
                const res = await req.json();
                const resArr = res.map(e => {
                    return {
                        value: e[fieldName],
                        label: e[fieldName]
                    }
                });
                setCounties(resArr);
            }
        }
        getCounties();
    }, [province]);

    const filterOptions = inputValue => counties.filter(e => e.value.includes(capitalizeWithTurkish(inputValue)));

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterOptions(inputValue));
            }, 500);
        });

    return (
        <section className='select-container'>
            <AsyncSelect cacheOptions
                         defaultOptions={counties}
                         placeholder={'İlçeyi seçiniz..'}
                         loadOptions={promiseOptions}
                         loadingMessage={() => 'Yükleniyor..'}
                         noOptionsMessage={() => 'Sonuç bulunamadı.'}
                         onChange={handler}/>
        </section>
    )
}
