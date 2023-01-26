import { PrimaryPurple } from '@utils/constant/color';
import React from 'react';
import styled from 'styled-components';
import CurriculumItem from './PlanItem';

const PlanBox = () => {

    const CurriculumData = [
        {
            date: "2월",
            title: "아기사자\n모집",
        },
        {
            date: "3월-7월",
            title: "트랙별\n개별 세션",
        },
        {
            date: "7월-8월",
            title: "아이디어톤\n해커톤",
        },
        {
            date: "방학",
            title: "예정",
        }
    ];

    return (
        <BoxContainer>
            <LineBox>
                {CurriculumData.map((item, i) => (
                    <CurriculumItem key={i} title={item.title} date={item.date} />
                ))}
            </LineBox>
        </BoxContainer>
    );
};

export default PlanBox;

const BoxContainer = styled.div`
    display: flex;
    width: 100%;
    background-color: ${PrimaryPurple.default};
    border-radius: 30px;
    flex-direction: column;
    justify-content: center;
    padding: 107px 100px 87px 100px;
    position: relative;
`;



const LineBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Top = styled.div`
    flex-basis: 45%;
    display: flex;
    width: 100%;
`;

const Bottom = styled(Top)`
    border-top: 2px solid black;
    flex-basis: 55%;
`;