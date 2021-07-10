import React, {  } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';
import PopupReusable from './PopupReusable';

const CommentButton = ({as, to, post:{id,commentCount}}) => {

    return (
        <PopupReusable content='Comment on post'>
            <Button labelPosition='right' as={as === 'link' ? Link : as} to={to} >
                <Button color='blue' basic>
                    <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left' >
                    { commentCount }
                </Label>
            </Button>
        </PopupReusable>
    )
}

export default CommentButton
