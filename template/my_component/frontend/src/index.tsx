import React from "react"
import ReactDOM from "react-dom/client"
import MyComponent from "./MyComponent"

const foundElement = document.getElementById("root")

if (foundElement) {
  const root = ReactDOM.createRoot(foundElement)
  root.render(
    <React.StrictMode>
      <MyComponent />
    </React.StrictMode>
  )
}
