import { QueryEngine } from '@comunica/query-sparql'
import React, { useEffect } from 'react'
import { useState } from 'react'

interface MigrationProps {
    webId: string
}

const Migration: React.FC<MigrationProps> = (webId) => {
    const [userName, setUserName] = useState<string>('')


    return (
        <>
            <p>You are logged in as: {userName}</p>

        </>
    )
}

export default Migration