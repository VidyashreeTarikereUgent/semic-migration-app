import React, { useEffect, useState } from 'react';
import TableOfContents from './TableOfContents';

function ContentSelector(session, webID) {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [sourceLocation, setSourceLocation] = useState<string>('')
    const [userNationality, setUserNationality] = useState<string>('')
    const [chosenLocation, setChosenLocation] = useState<string>('')
    const countryID = session.webID

    // setUserNationality("BE")
    const handleNationality = (countryID) => {
        // WebIds of French, Belgian, Greek nationalities
        // console.log(webID)
        const frenchWebId = 'https://frenchpod.solidcommunity.net/profile/card#me'
        const belgianWebId = 'https://belgianpod.solidcommunity.net/profile/card#me'
        const greekWebId = 'https://greekpod.solidcommunity.net/profile/card#me'

        // console.log(userNationality)
        if (countryID === frenchWebId) {
            setUserNationality('FR')
        }
        if (countryID === belgianWebId) {
            setUserNationality('BE')
        }
        if (countryID === greekWebId) {
            setUserNationality('GR')
        }
    }

    const handleSelectCountry = (selectedCountry) => {
        // console.log(selectedCountry)
        if (selectedCountry === 'Belgium') {
            setSourceLocation('http://localhost:3000/ldes/default/')
            setChosenLocation("BE")
            //address of Belgium dataspace
        }
        else if (selectedCountry === 'France') {
            setSourceLocation('http://localhost:3000/ldes/default/') //address of France dataspace
            setChosenLocation("FR")
        }
        else {
            setSourceLocation('http://localhost:3000/ldes/default/') //address of Greece dataspace
            setChosenLocation("GR")
            // console.log("hi in else")
        }
        handleNationality(countryID)
    }

    useEffect(() => {
        handleSelectCountry(selectedCountry)
    })

    return (
        <div>
            <label htmlFor="country-selector" >Select a country:</label>
            <select id="country-selector" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                <option value="">--Please choose an option--</option>
                <option value="Belgium">Belgium</option>
                <option value="France">France</option>
                <option value="Greece">Greece</option>
            </select>
            <br />
            <br />
            <h1>Selected date : {toDate} {fromDate}</h1>
            <input type="datetime-local" onChange={e => setFromDate(e.target.value) as any as string} />
            &nbsp;
            <input type="datetime-local" onChange={e => setToDate(e.target.value) as any as string} />

            {selectedCountry && fromDate && toDate && (
                <TableOfContents chosenLocation={chosenLocation} country={selectedCountry} location={sourceLocation} fromDate={fromDate} toDate={toDate} session={session} userNationality={userNationality} />
            )}
        </div>
    );
}

export default ContentSelector;
