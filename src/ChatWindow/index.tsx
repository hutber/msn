import React from 'react'

interface ChatWindow {
  messageData: any;
}

export interface LogItems {
  $: object;
  Message: Array<object>;
}
export interface MessageData {
  Log: any;
}

interface ReturnData {
  messages: Array<object>;
  chatWindowName: string;
}

function messageItem(data) {
  console.info(data)
  return data
}

function getKeyDetailsFromMessage(data: MessageData) {
  const jamie = 'jamie'
  const returnData: ReturnData = {
    messages: [],
    chatWindowName: '',
  }
  if (data && data.Log) {
    console.info(data.Log.Message.map((item) => messageItem(item)))
  }
  return returnData
}

export default function ({ messageData }: ChatWindow) {
  const cleanedData = getKeyDetailsFromMessage(messageData)
  return <div className="chatwindow">Jaamie</div>
}
