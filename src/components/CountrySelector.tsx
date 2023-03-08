import React, { useState } from 'react';
import TableOfContents from './TableOfContents';

function ContentSelector(session, webID) {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [sourceLocation, setSourceLocation] = useState<string>('')
    const [userNationality, setUserNationality] = useState<string>('')


    const handleNationality = (webID) => {
        // WebIds of French, Belgian, Greek nationalities
        const frenchWebId = ''
        const belgianWebId = ''
        const greekWebId = ''

        if (webID === frenchWebId) {
            setUserNationality('French')
        } else if (webID === belgianWebId) {
            setUserNationality('Belgian')
        } else {
            setUserNationality('Greek')
        }
    }

    const handleSelectCountry = (event) => {
        setSelectedCountry(event.target.value);
        if (selectedCountry === 'Belgium') {
            setSourceLocation('') //address of Belgium dataspace
        }
        else if (selectedCountry === 'France') {
            setSourceLocation('') //address of France dataspace
        }
        else {
            setSourceLocation('') //address of Greece dataspace
        }
        handleNationality(webID)
    };


    const handleFromDateChange = (date) => {
        setFromDate(date);
    };

    const handleToDateChange = (date) => {
        setToDate(date);
    };

    return (
        <div>
            <label htmlFor="country-selector">Select a country:</label>
            <select id="country-selector" value={selectedCountry} onChange={handleSelectCountry}>
                <option value="">--Please choose an option--</option>
                <option value="Belgium">Belgium</option>
                <option value="France">France</option>
                <option value="Greece">Greece</option>
            </select>
            <br />
            <br />
            <label htmlFor="from-date-picker">From date:</label>
            <input type="date" id="from-date-picker" value={fromDate as any} onChange={(event) => handleFromDateChange(event.target.value)} />

            <label htmlFor="to-date-picker">To date:</label>
            <input type="date" id="to-date-picker" value={toDate as any} onChange={(event) => handleToDateChange(event.target.value)} />

            {selectedCountry && fromDate && toDate && (
                <TableOfContents country={selectedCountry} location={sourceLocation} fromDate={fromDate} toDate={toDate} session={session} userNationality={userNationality} />
            )}
        </div>
    );
}

export default ContentSelector;
