import React, {  } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react';

const CommentButton = ({post:{id,commentCount}}) => {

    return (
        <Button labelPosition='right' as={Link} to={`/post/${id}`} >
            <Button color='blue' basic>
                <Icon name='comments' />
            </Button>
            <Label basic color='blue' pointing='left' >
                { commentCount }
            </Label>
        </Button>
    )
}

export default CommentButton
