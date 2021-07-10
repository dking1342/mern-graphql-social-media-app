import React from 'react'
import { Popup } from 'semantic-ui-react'

const PopupReusable = ({content,children}) => {
    return (
        <Popup 
            content={content}
            inverted
            trigger={children}
        />
    )
}

export default PopupReusable
