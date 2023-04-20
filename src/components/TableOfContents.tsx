import { QueryEngine } from '@comunica/query-sparql';
import React, { useEffect, useState } from 'react';
import { QueryStringContext } from '@comunica/types'
import { ActorHttpInruptSolidClientAuthn } from '@comunica/actor-http-inrupt-solid-client-authn'
import { CitizenInfo } from './model';

function TableOfContents({ chosenLocation, country, location, fromDate, toDate, session, userNationality }): any {
    const [tableOfContents, setTableOfContents] = useState([]);
    const citizenData: CitizenInfo[] = []
    const [citizenArray, setCitizenArray] = useState<CitizenInfo[]>([])

    const fetchData = async (): Promise<void> => {
        console.log("hello")
        // Fetch table of contents data for the selected country
        const myEngine = new QueryEngine
        const context: QueryStringContext = {
            sources: [location],
            lenient: true,
            baseIRI: location,
            [ActorHttpInruptSolidClientAuthn.CONTEXT_KEY_SESSION.name]: session
        }

        //if an officer of a particular country is trying to access his own countries data:
        if (chosenLocation === userNationality) {
            console.log("access everything in resident country") //filter with user nationality with resCountry
            const bindingsStream = await myEngine.queryBindings(
                `SELECT ?id ?name ?nat ?resCity ?resCountry ?registeration ?time WHERE {
                    ?id <http://example.com/ns#name> ?name ;
                <http://example.com/ns#nat> ?nat ;
                <http://example.com/ns#resCity> ?resCity ;
                <http://example.com/ns#resCountry> ?resCountry ;
                <http://example.com/ns#time> ?time ;
                <http://example.com/ns#registeration> ?registeration .
                FILTER (str(?resCountry) = "${userNationality}") 
                FILTER (?time >= "${fromDate}")
                FILTER (?time <= "${toDate}")
                
        }`, context)


            const bindings = await bindingsStream.toArray()
            // console.log(bindings)
            //display the number of citizens present
            // const numberOfCitizens = bindings.length
            bindings.forEach((element) => {

                //No need to display the information of the citizens
                const citizenId: any = element.get('id')!.value
                const citizenName = element.get('name')!.value
                const citizenNationality = element.get('nat')!.value
                const citizenRegisteredCity = element.get('resCity')!.value
                const citizenRegisteredCountry = element.get('resCountry')!.value
                const citizenRegisteration = element.get('registeration')!.value
                const citizenTime = element.get('time')!.value
                const person: CitizenInfo = { citizenId, citizenName, citizenNationality, citizenRegisteredCity, citizenRegisteredCountry, citizenRegisteration, citizenTime }
                // console.log(person)
                citizenData.push(person)
                setCitizenArray([...citizenArray, ...citizenData])
            })
            console.log(citizenData)
        }

        //if an officer of a particular country is trying to access data from other countries:
        if (chosenLocation != userNationality) {
            console.log("access Nat of usernationality in selected country") //filter with usernationality and nat and also res country. Also filter with from and to date.
            const bindingsStream = await myEngine.queryBindings(
                `SELECT ?id ?name ?nat ?resCity ?resCountry ?registeration ?time WHERE {
                    ?id <http://example.com/ns#name> ?name ;
                <http://example.com/ns#nat> ?nat ;
                <http://example.com/ns#resCity> ?resCity ;
                <http://example.com/ns#resCountry> ?resCountry ;
                <http://example.com/ns#time> ?time ;
                <http://example.com/ns#registeration> ?registeration .
            FILTER (str(?resCountry) = "${chosenLocation}")
            FILTER (str(?nat) = "${userNationality}") 
            FILTER (?time >= "${fromDate}")
            FILTER (?time <= "${toDate}")
           
           
        }`, context)


            const bindings = await bindingsStream.toArray()
            //display the number of citizens present
            // const numberOfCitizens = bindings.length
            bindings.forEach((element) => {

                //No need to display the information of the citizens
                const citizenId: any = element.get('id')!.value
                const citizenName = element.get('name')!.value
                const citizenNationality = element.get('nat')!.value
                const citizenRegisteredCity = element.get('resCity')!.value
                const citizenRegisteredCountry = element.get('resCountry')!.value
                const citizenRegisteration = element.get('registeration')!.value
                const citizenTime = element.get('time')!.value
                console.log(citizenTime)
                const person: CitizenInfo = { citizenId, citizenName, citizenNationality, citizenRegisteredCity, citizenRegisteredCountry, citizenRegisteration, citizenTime }
                // console.log(person)
                citizenData.push(person)
                setCitizenArray([...citizenArray, ...citizenData])
            })
            console.log(citizenData)
        }
    }


    useEffect(() => {
        void fetchData()
    }, [country, location, fromDate, toDate]);



    if (chosenLocation === userNationality) {
        return (
            <div>
                <br /><br />
                <h2>Number of citizen entries present : {citizenArray.length}</h2>
                <h2>Table of Contents for {country}:</h2> <br />
                <table>
                    <thead>
                        <tr>
                            <th>Citizen Name</th>
                            <th>Citizen Nationality</th>
                            <th>Resident City</th>
                            <th>Citizen Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citizenArray.map((entry) => {
                            return (
                                <><tr key={entry.citizenId}>
                                    <td>{entry.citizenName}</td>
                                    <td>{entry.citizenNationality}</td>
                                    <td>{entry.citizenRegisteredCity}</td>
                                    <td>{entry.citizenRegisteration} on {entry.citizenTime}</td>
                                </tr></>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <br /><br />
                <h2>Number of citizen entries present : {citizenArray.length}</h2>
                <h2>Table of Contents for {country}:</h2> <br />
                <table>
                    <thead>
                        <tr>
                            <th>Citizen Nationality</th>
                            <th>Resident City</th>
                            <th>Citizen Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citizenArray.map((entry) => {
                            return (
                                <><tr key={entry.citizenId}>
                                    <td>{entry.citizenNationality}</td>
                                    <td>{entry.citizenRegisteredCity}</td>
                                    <td>{entry.citizenRegisteration} on {entry.citizenTime}</td>
                                </tr></>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default TableOfContents;
