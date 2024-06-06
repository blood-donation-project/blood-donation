import React from 'react'
import Sidebar from './Sidebar'
import ChatSection from './ChatSection'

const MainContent = () => {
  return (
    <main className="flex-grow flex flex-row ">
      <Sidebar />
      <ChatSection />
    </main>
  )
}

export default MainContent