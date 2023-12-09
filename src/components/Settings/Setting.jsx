import { useEffect, useState } from 'react';
import React from 'react';

export function Setting({ options, optionsData }) {
    let settingsList = [];
    let localData = JSON.parse(localStorage.getItem('inputGameSettings'));
    let current = localStorage.getItem('inputGameCurrent');

    if (localData == null) {
        localData = {};
    }

    if (localData[current] == null) {
        localData[current] = options;
        localStorage.setItem('inputGameSettings', JSON.stringify(localData));
        localData = JSON.parse(localStorage.getItem('inputGameSettings'));
    }

    for (const option in localData[current]) {
        let value;
        let isHidden = true;

        if (optionsData[option]['type'] == 'select') {
            value = [];

            const [addrtype, setAddrtype] = useState(optionsData[option]['choice']);
            const Add = addrtype.map((Add) => Add);
            const handleAddrTypeChange = (e) => {
                localData[current][option] = e.target.value;
                localStorage.setItem('inputGameSettings', JSON.stringify(localData));
            };

            value = (
                <select defaultValue={localData[current][option]} onChange={(e) => handleAddrTypeChange(e)}>
                    {Add.map((choice, key) => (
                        <option value={key}>{choice}</option>
                    ))}
                </select>
            );

            isHidden = false;
        }

        if (optionsData[option]['type'] === 'boolean') {
            const [booleanOption, setBooleanOption] = useState(localData[current][option]);

            const onclickOption = () => {
                setBooleanOption((prevValue) => !prevValue);
                localData[current][option] = !booleanOption;
                localStorage.setItem('inputGameSettings', JSON.stringify(localData));
            };

            const switchClassName = booleanOption ? 'true' : '';

            value = (
                <div onClick={onclickOption} className={`switch ${switchClassName}`}>
                    <div className="switch-handle"></div>
                    <input type="checkbox" id="switch" checked={booleanOption} readOnly />
                </div>
            );
            isHidden = false;
        }

        if (optionsData[option]['type'] === 'checkbox') {
            const storedData = localData[current][option];
            const [checkboxOption, setCheckboxOption] = useState(storedData['select']);
            const [choiceList, setChoiceList] = useState([]);
        
            useEffect(() => {
                const updatedChoiceList = storedData['all'].map(index => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            value={index}
                            checked={checkboxOption.includes(index)}
                            className="checkbox"
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <span>{index}</span>
                    </div>
                ));
                setChoiceList(updatedChoiceList);
            }, [checkboxOption]);
        
            const handleCheckboxChange = index => {
                const updatedSelect = checkboxOption.includes(index)
                    ? checkboxOption.filter(selectedIndex => selectedIndex !== index)
                    : [...checkboxOption, index];
        
                localData[current][option]['select'] = updatedSelect;
                setCheckboxOption(updatedSelect);
                localStorage.setItem('inputGameSettings', JSON.stringify(localData));
            };
        
            value = <>{choiceList}</>;
            isHidden = false;
        }

        const [inputValue, setInputValue] = useState(localData[current][option]);

        if (optionsData[option]['name'] === 'Timer value' && localData[current]['timer']) {
            value = (
                <>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setInputValue(newValue);

                            localData[current][option] = e.target.value;
                            localStorage.setItem('inputGameSettings', JSON.stringify(localData));
                        }}
                    />
                </>
            );
            isHidden = false;
        }

        if (!isHidden) {
            settingsList.push(
                <React.Fragment key={option}>
                    <tr className="settingCard">
                        <td className="tdText">
                            <p className="settingText">{optionsData[option]['name']}</p>
                        </td>
                        <td className="tdInput">{value}</td>
                    </tr>
                </React.Fragment>
            );
        }
    }

    return (
        <table className="settingBox">
            <tbody>{settingsList}</tbody>
        </table>
    );
}
