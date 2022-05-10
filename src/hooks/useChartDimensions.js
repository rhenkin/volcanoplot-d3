import React from "react";
import {ResizeObserver} from "@juggle/resize-observer";

const combineChartDimensions = dimensions => {
    let parsedDimensions = {
      marginTop: 10,
      marginRight: 10,
      marginBottom: 40,
      marginLeft: 40,
      ...dimensions,
    }
  
    return {
      ...parsedDimensions,
      boundedHeight: Math.max(parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom, 0),
      boundedWidth: Math.max(parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight, 0),
    }
  }
  
  export const useChartDimensions = passedSettings => {
    const ref = React.useRef()
    const dimensions = combineChartDimensions(passedSettings)
  
    const [width, changeWidth] = React.useState(0)
    const [height, changeHeight] = React.useState(0)
  
    React.useEffect(() => {
      if (dimensions.width && dimensions.height) return
  
      const element = ref.current
      const resizeObserver = new ResizeObserver(entries => {
        if (!Array.isArray(entries)) return
        if (!entries.length) return
  
        const entry = entries[0]
  
        if (width !== entry.contentRect.width) changeWidth(entry.contentRect.width)
        if (height !== entry.contentRect.height) changeHeight(entry.contentRect.height)
      })
  
      resizeObserver.observe(element)
  
      return () => resizeObserver.unobserve(element)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    const newSettings = combineChartDimensions({
      ...dimensions,
      width: dimensions.width || width,
      height: dimensions.height || height,
    })
  
    return [ref, newSettings]
  }

export default useChartDimensions;