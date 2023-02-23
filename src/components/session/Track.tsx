import React from 'react';
import styled from 'styled-components';
import { Primary } from '@utils/constant/color';
import {useState} from 'react';

import {useBodyScrollLock} from './utils/scrollBlock'
import SessionModal from './SessionModal';
import { ArchivingArrayType } from '@@types/request';



type  TrackProps = {
    track: string,
    trackData: { id: number; title: string, category:string, thumbnail:string}[],
};

const Track: React.FC<TrackProps> = ({track, trackData}) => {
    const [visible, setVisible]= useState(false);
    const {lockScroll, openScroll} = useBodyScrollLock();

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void  =>{
        lockScroll();
        setVisible(true);
    }

    const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>): void  =>{
        openScroll();
        setVisible(false);
    }


    return (
        <>
        <StWrapper>
            <a>{track}</a>
            <StShowAll onClick={handleClick}>전체보기 &gt;</StShowAll>
        </StWrapper>

            <SessionModal 
            trackData={trackData}
            trackName={track}
            handleClose={handleClose}
            visible={visible}
            />
        </>

    );
};

export default Track;


const StWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin: 3rem;
width: 100%;

`

const StShowAll = styled.div`
color: #1A21BD;
font-size: 1.4rem;
`
