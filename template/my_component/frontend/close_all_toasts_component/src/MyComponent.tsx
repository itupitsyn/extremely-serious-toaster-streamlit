import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"

import React, { FC, useEffect } from "react"

const MyComponent: FC<ComponentProps> = () => {
  useEffect(() => Streamlit.setFrameHeight(0), [])

  useEffect(() => {
    // @ts-ignore
    window.parent.removeAllToasts?.()

    const elems = window.parent.document.querySelectorAll("[src*=my_component]")
    elems.forEach((item) => {
      if (item.parentElement) {
        item.parentElement.style.display = "none"
      }
    })
  }, [])

  return <></>
}

export default withStreamlitConnection(MyComponent)
