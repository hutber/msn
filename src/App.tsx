import React, { useEffect, useState } from 'react'
import { parseStringPromise } from 'xml2js'
import './App.css'

import ChatWindow from './ChatWindow'

import xml from './testData'

function App() {
  const [messageData, setMessageData] = useState(null)

  useEffect(() => {
    const sync = async function () {
      const messageInfoRaw = await parseStringPromise(xml)
      setMessageData(messageInfoRaw)
    }
    sync()
  }, [])
  return (
    <div className="App">
      {!messageData && <h1>Sorry no log present</h1>}
      <ChatWindow messageData={messageData} />
    </div>
  )
}

export default App
