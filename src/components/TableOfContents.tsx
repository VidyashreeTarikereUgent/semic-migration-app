import { QueryEngine } from '@comunica/query-sparql';
import React, { useEffect, useState } from 'react';
import { QueryStringContext } from '@comunica/types'
import { ActorHttpInruptSolidClientAuthn } from '@comunica/actor-http-inrupt-solid-client-authn'
import { CitizenInfo } from './model';


function TableOfContents({ country, location, fromDate, toDate, session, userNationality }): any {
    const [tableOfContents, setTableOfContents] = useState([]);

    const fetchData = async (): Promise<void> => {
        // Fetch table of contents data for the selected country
        const myEngine = new QueryEngine
        const context: QueryStringContext = {
            sources: [location],
            lenient: true,
            baseIRI: location,
            [ActorHttpInruptSolidClientAuthn.CONTEXT_KEY_SESSION.name]: session
        }
        const bindingsStream = await myEngine.queryBindings(
            `SELECT ?id ?name ?nationality ?registeredDate WHERE {
            ?id <http://semic-example.com/title> ?name ;
                <http://semic-example.com/nationality> ?nationality ;
                <http://semic-example.com/registeredDate> ?registeredDate .
            FILTER (str(?nationality) != "${userNationality}") 
            FILTER (?registeredDate < ${fromDate})
            FILTER (?registeredDate > ${toDate})
        }
        ORDER BY ASC(?registeredDate)
        LIMIT 100`, context
        )
        const citizenData = {}
        const bindings = await bindingsStream.toArray()
        bindings.forEach((element) => {
            const citizenId: any = element.get('id')!.value
            const citizenName = element.get('name')!.value
            const citizenNationality = element.get('nationality')!.value
            const citizenRegisteredDate = element.get('registeredDate')!.value
            const person: CitizenInfo = { citizenId, citizenName, citizenNationality, citizenRegisteredDate }
            citizenData[citizenId] = person
        })
    }

    useEffect(() => {
        void fetchData()
    }, [country, location, fromDate, toDate]);



    return (
        <div>

            <h2>Table of Contents for {country}</h2> <br />
            <table>
                <thead>
                    <tr>
                        <th>Citizen Name</th>
                        <th>Citizen ID</th>
                        <th>Citizen Registered Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/* map the citizenData array here for table body */}

                </tbody>
            </table>
        </div>
    )
}

export default TableOfContents;
