import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.li`
    border:solid 1px red;
`;

const NewWatcherBtn = styled.button`
`;

class WatcherItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Wrapper>
                <NewWatcherBtn>new watcher</NewWatcherBtn>
            </Wrapper>
        )   
    }
}


export default WatcherItem;

