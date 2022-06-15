import React, { forwardRef } from "react"
import { __DEV__ } from "utils/assertions"

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript
const anExampleVariable = "Hello World"
console.log(anExampleVariable)
export const Button = forwardRef((_a, ref) => {
  var {
      children,
      variant = "solid",
      size = "md",
      fullWidth = false,
      className,
      as = "button",
      isExternal = false,
    } = _a,
    rest = __rest(_a, [
      "children",
      "variant",
      "size",
      "fullWidth",
      "className",
      "as",
      "isExternal",
    ])
  let tempClassNames = []
  const sharedClasses = [
    "capitalize",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-indigo-400",
    "focus:ring-offset-2",
    "focus:ring-offset-indigo-50",
    "font-semibold",
    "rounded-full",
    "inline-flex",
    "flex-shrink-0",
    "items-center",
    "justify-center",
    "transition-colors",
    "ease-in-out",
    "duration-500",
  ]
  if (fullWidth) sharedClasses.push("w-full")
  // handle variants
  let btnSolid = ["bg-indigo-600", "hover:bg-indigo-700", "text-white"]
  let btnOutline = [
    "dark:text-white",
    "hover:text-indigo-700",
    "hover:dark:text-indigo-700",
    "bg-transparent",
    "hover:bg-indigo-50",
    "border",
    "border-indigo-600",
  ]
  let btnGhost = [
    "bg-transparent",
    "dark:text-white",
    "hover:bg-indigo-50",
    "hover:text-indigo-700",
    "hover:dark:text-indigo-700",
  ]
  if (variant === "solid") {
    tempClassNames = [...sharedClasses, ...btnSolid]
  } else if (variant === "outline") {
    tempClassNames = [...sharedClasses, ...btnOutline]
  } else if (variant === "ghost") {
    tempClassNames = [...sharedClasses, ...btnGhost]
  }
  // handle sizes
  let sizeSm = ["h-8", "px-2", "text-sm"]
  let sizeMd = ["h-10", "px-3"]
  let sizeLg = ["h-12", "px-4", "text-lg"]
  if (size === "sm") {
    tempClassNames = [...tempClassNames, ...sizeSm]
  } else if (size === "md") {
    tempClassNames = [...tempClassNames, ...sizeMd]
  } else if (size === "lg") {
    tempClassNames = [...tempClassNames, ...sizeLg]
  }
  let classes = tempClassNames.join(" ")
  let Element = as
    ? React.createElement(
        as,
        Object.assign(
          {
            className: `${classes} ${className}`,
            target: isExternal ? "_blank" : undefined,
            rel: isExternal ? "noopener noreferrer" : undefined,
            ref,
          },
          rest
        ),
        children
      )
    : React.createElement(
        "button",
        Object.assign({}, rest, {
          className: `${classes} ${className}`,
          ref: ref,
        }),
        children
      )
  return Element
})
if (__DEV__) {
  Button.displayName = "Button"
}
export const IconButton = forwardRef((_a, ref) => {
  var { children, icon, className, "aria-label": ariaLabel, size = "md" } = _a,
    rest = __rest(_a, ["children", "icon", "className", "aria-label", "size"])
  let sharedClasses = ["rounded-full", "!px-0"]
  // handle sizes
  let sizeSm = ["w-8"]
  let sizeMd = ["w-10"]
  let sizeLg = ["w-12"]
  if (size === "sm") {
    sharedClasses = [...sharedClasses, ...sizeSm]
  } else if (size === "md") {
    sharedClasses = [...sharedClasses, ...sizeMd]
  } else if (size === "lg") {
    sharedClasses = [...sharedClasses, ...sizeLg]
  }
  /**
   * Passing the icon as prop or children should work
   */
  const element = icon || children
  const _children = React.isValidElement(element)
    ? React.cloneElement(element, {
        "aria-hidden": true,
        focusable: false,
      })
    : null
  let classes = sharedClasses.join(" ")
  return React.createElement(
    Button,
    Object.assign(
      {
        className: `${classes} ${className}`,
        "aria-label": ariaLabel,
        size: size,
      },
      rest,
      { ref: ref }
    ),
    _children
  )
})
if (__DEV__) {
  IconButton.displayName = "IconButton"
}
