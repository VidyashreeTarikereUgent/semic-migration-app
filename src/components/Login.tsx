import { useEffect, useState } from 'react'
import { LoginButton, LogoutButton, useSession, CombinedDataProvider } from '@inrupt/solid-ui-react'
import { QueryEngine } from '@comunica/query-sparql'
import CountrySelector from './CountrySelector'

const authOptions = {
  clientName: 'Semic Migration'
}

const Login: React.FC = (): JSX.Element => {
  const { session } = useSession()
  const [oidcIssuer, setOidcIssuer] = useState('')
  const [userName, setUserName] = useState('')

  // To get the oidcIssuer for the user webId input
  async function validate(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const webIdInputValue: string = event.target.value
    const engineForOidc = new QueryEngine()

    const bindingsStream = await engineForOidc.queryBindings(
      `PREFIX solid: <http://www.w3.org/ns/solid/terms#>

      SELECT ?o WHERE {
        ?s <http://www.w3.org/ns/solid/terms#oidcIssuer> ?o .
      }`, { sources: [`${webIdInputValue}`] }
    ).catch((reason: any) => console.log(reason))

    const bindings = await bindingsStream!.toArray()
    bindings[0]?.get('o')!.value as unknown as boolean ? setOidcIssuer(bindings[0].get('o')!.value) : alert('This webId is not found in Open ID Connect discovery!!')
  }

  // To get the name in the webId profile of the user
  async function getName(webID): Promise<any> {
    const engineForOidc = new QueryEngine()

    const getUserName = await engineForOidc.queryBindings(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>

      SELECT ?s ?o WHERE {
        ?s rdf:type foaf:Person .
        ?s (foaf:givenName|foaf:name) ?o .
      }`, { sources: [`${webID as string}`] }
    )
    const bindingsForName = await getUserName.toArray()
    // if(bindingsForName[0] ?? '')setUserName(bindingsForName[0].get('o').value)
    // else setUserName('No name found!!!')
    bindingsForName[0]?.get('o')!.value as unknown as boolean ? setUserName(bindingsForName[0].get('o')!.value) : setUserName('No name found!!!')
    return userName
  }

  const webID = session.info.webId ?? oidcIssuer
  if (session.info.isLoggedIn) {
    void getName(webID)
    return (
      <div>
        <CombinedDataProvider
          datasetUrl={webID}
          thingUrl={webID}
        >
          <div>
            <div className='flex flex-row'>
              <p className='mr-4'>You are logged in as: {userName} </p>
              <br />
            </div>

            <LogoutButton
              onError={function noRefCheck() { }}
              onLogout={function noRefCheck() { }}
            />
            <br />
          </div>
          <div>
            <CountrySelector session={session} webID={webID} />
          </div>
        </CombinedDataProvider>
      </div>
    )
  } else {
    return (
      <div>
        <div className="grid grid-cols-3 gap-2">
          <p className='col-span-3'>You are not logged in.</p>
          <p className='col-span-3'>Login with webID:</p>
          <input
            className="oidc-issuer-input col-span-2"
            type="text"
            name="oidcIssuer"
            placeholder="webID"
            defaultValue={oidcIssuer}
            onChange={(event) => validate(event) as unknown}
          />
          <LoginButton
            oidcIssuer={oidcIssuer}
            redirectUrl={window.location.href}
            authOptions={authOptions}
          />
        </div>
      </div>
    )
  }
}

export default Login
