import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"

import React, { FC, useEffect } from "react"

const MyComponent: FC<ComponentProps> = ({ args }) => {
  useEffect(() => Streamlit.setFrameHeight(0), [])

  useEffect(() => {
    let elem = window.parent.document.querySelector(".toaster")
    if (!elem) {
      elem = window.parent.document.createElement("div")
      elem.className = "toaster"
      const root = window.parent.document.querySelector("#root")
      if (!root) throw new Error("[error]: toaster (root not found!!)")
      root.appendChild(elem)

      const script = window.parent.document.createElement("script")
      script.innerHTML = `
      const TOAST_VISIBILITY_DURATION = 3000;

      function removeToast(toastId) {
        const toaster = document.querySelector(".toaster");
        const toasts = toaster.children;

        for (let i = 0; i < toasts.length; i += 1) {
          const elem = toasts[i];
          if (elem.id === toastId) {
            elem.classList.add("hideToast");
            setTimeout(() => toaster.removeChild(elem), 300);
            break;
          }
        }
      }

      function addToast(text) {
        const toaster = document.querySelector(".toaster");
        const newToast = document.createElement("div");
        newToast.className = "toast showToast";
        const id = Math.random().toString(32);
        newToast.id = id;

        const content = document.createElement("div");
        content.className = "content";
        content.innerText = text;
        newToast.appendChild(content);

        const closeButton = document.createElement("button");
        closeButton.innerText = "x";
        closeButton.className = "closeButton";
        closeButton.addEventListener("click", () => removeToast(id));

        newToast.appendChild(closeButton);

        toaster.appendChild(newToast);
        // setTimeout(() => removeToast(id), [TOAST_VISIBILITY_DURATION]);
      }
      `
      window.parent.document.head.appendChild(script)

      const style = window.parent.document.createElement("style")
      style.innerHTML = `
      @keyframes showToast {
        from {
          opacity: 0;
          transform: translateX(200%);
        }
      }

      @-webkit-keyframes showToast {
        from {
          opacity: 0;
          transform: translateX(200%);
        }
      }

      .toast {
        animation: showToast 0.3s ease-in-out;
      }

      @keyframes hideToast {
        0% {
          opacity: 100;
        }
        100% {
          opacity: 0;
          transform: translateX(200%);
        }
      }

      @-webkit-keyframes hideToast {
        0% {
          opacity: 100;
        }
        100% {
          opacity: 0;
          transform: translateX(200%);
        }
      }

      .hideToast {
        animation: hideToast 0.3s ease-in-out forwards;
      }

      .closeButton {
        border: 0;
        background: none;
        display: block;
        line-height: 1rem;
      }
      .closeButton:hover {
        cursor: pointer;
      }
      .content {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .toast {
        padding: 0.5rem;
        background: rgb(89,195,34);
        background: linear-gradient(35deg, rgba(89,195,34,1) 0%, rgba(252,253,45,1) 70%);
        border: 2px solid #8ab32d;
        border-radius: 4px;
        box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        max-width: 400px;
        overflow: hidden;
        color: black;
      }
      .toaster {
        position: fixed;
        right: 1rem;
        top: 6rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
      }
      `
      window.parent.document.head.appendChild(style)
    }
    //@ts-ignore
    window.parent.addToast(args.name)

    const elems = window.parent.document.querySelectorAll("[src*=my_component]")
    elems.forEach((item) => {
      if (item.parentElement) {
        item.parentElement.style.display = "none"
      }
    })
  }, [args.name])

  return <div className="kek"></div>
}

export default withStreamlitConnection(MyComponent)
