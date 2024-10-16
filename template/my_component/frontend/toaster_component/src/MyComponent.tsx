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
      function removeToast(toastId) {
        const toaster = document.querySelector(".toaster");
        const toasts = toaster.children;

        for (let i = 0; i < toasts.length; i += 1) {
          const elem = toasts[i];
          if (elem.id === toastId) {
            elem.classList.remove("showToast");
            elem.classList.add("hideToast");
            setTimeout(() => {
              try{
                toaster.removeChild(elem)
              } catch {
                ///
              }
              if (toaster.children.length === 1) {
                removeAllToasts();
              }
            }, 300);
            break;
          }
        }
      }

      function removeAllToasts() {
        const toaster = document.querySelector(".toaster");
        const toasts = toaster.children;

        for (let i = 0; i < toasts.length; i += 1) {
          const elem = toasts[i];
          elem.classList.remove("showToast");
          elem.classList.add("hideToast");
          setTimeout(() => {
            try{
              toaster.removeChild(elem)
            } catch {
              ///
            }
          }, 300);
        }
      }

      function addCloseAllToastsButton() {
        const toaster = document.querySelector(".toaster");
        let closeButton = document.querySelector(".closeAllToastsButton");
        if (closeButton) return;

        closeButton = document.createElement("div");
        closeButton.className = "closeAllToastsButton showToast";

        closeButton.innerHTML = \`
          <div class="shadow">
            <div style="background-color: #ff26e9; flex-grow: 1"></div>
            <div style="background-color: #8000ff; flex-grow: 0.75"></div>
            <div style="background-color: #2656ff; flex-grow: 1"></div>
          </div>
          <div class="toast-bg" style="border-radius: 999px"></div>
          <button class="closeButton" style="padding: 10px; margin: 0">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </div>
        \`

        const button = closeButton.querySelector('button');
        button.addEventListener("click", removeAllToasts);
        toaster.append(closeButton);
      }

      function addToast(text, maxWidth = 300, time = 0) {
        addCloseAllToastsButton();
        const toaster = document.querySelector(".toaster");
        const newToast = document.createElement("div");
        newToast.className = "toast showToast";
        const id = Math.random().toString(32);
        newToast.id = id;

        newToast.innerHTML = \`
          <div class="shadow">
            <div style="background-color: #ff26e9; flex-grow: 1"></div>
            <div style="background-color: #8000ff; flex-grow: 0.75"></div>
            <div style="background-color: #2656ff; flex-grow: 1"></div>
          </div>
          <div class="toast-bg"></div>
          <div class="toast-content" style="max-width:$\{maxWidth}px">
            $\{text}
          </div>
          <button type="button" class="closeButton">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        \`
        const button = newToast.querySelector('button');
        button.addEventListener("click", () => removeToast(id));
        toaster.appendChild(newToast);
        if (time) setTimeout(() => removeToast(id), time);
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
        .showToast {
          animation: showToast 0.3s ease-in-out forwards;
        }
        .toast {
          position: relative;
          padding: 4px;
          display: flex;
          gap: 8px;
          justify-content: space-between;
          align-items: flex-start;
          color: white;
        }
        .shadow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          filter: blur(40px);
          transform: rotate(7deg);
          z-index: -1;
        }
        .toast-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(35deg, #ff26e9 0%, #2655ff 70%);
          border-radius: 12px;
          font-weight: 500;
          color: black;
          z-index: -1;
          filter: blur(3px);
          margin: 4px;
        }
        .toast-content {
          padding: 16px 0 16px 16px;
          font-size: 13px;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .closeButton {
          border: 0;
          outline: none;
          background: none;
          display: block;
          margin: 4px 7px 0 0;
          padding: 0;
          flex: none;
          color: white;
          transition: color 150ms;
        }
        .closeButton:hover {
          cursor: pointer;
          color: #ff26e9;
        }
        .closeButton:focus {
          border: 0;
          outline: none;
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
        .toaster a {
          color: white;
          text-decoration: none;
        }
        .toaster a:hover {
          transition: color 150ms;
          color: #ff26e9;
        }
      `
      window.parent.document.head.appendChild(style)
    }
    //@ts-ignore
    window.parent.addToast(args.name, args.maxWidth, args.time)

    const elems = window.parent.document.querySelectorAll("[src*=my_component]")
    elems.forEach((item) => {
      if (item.parentElement) {
        item.parentElement.style.display = "none"
      }
    })
  }, [args.maxWidth, args.name, args.time])

  return <></>
}

export default withStreamlitConnection(MyComponent)
