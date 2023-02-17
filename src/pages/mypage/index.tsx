import { UserAssignment, UserAttendance, UserProfile } from '@@types/request';
import { accessToken } from '@utils/state';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { getUserProfile } from 'src/apis/account';
import NameCard from '@mypage/component/NameCard';
import { getAssignments, getUserAttendance } from 'src/apis/attendance';
import styled from 'styled-components';
import MyAttendanceSection from '@mypage/MyAttendanceSection';
import ProfileCard from '@mypage/component/ProfileCard';
import { GreyScale } from '@utils/constant/color';

const MyPage = () => {
    const tokenState = useRecoilValue(accessToken);
    const [userAssignmentData, setUserAssignmentData] = useState<UserAssignment>({ name: '', lateSubmitted: 0, notSubmitted: 0 });

    const { data: userProfile, isLoading: profileLoading, error: profileError } = useQuery<UserProfile, AxiosError>(
        ['userProfile', tokenState],
        () => getUserProfile(tokenState)
    );

    const { data: userAttendance, isLoading: attendanceLoading, error: attendanceError } = useQuery<UserAttendance, AxiosError>(
        ['userAttendance', userProfile?.name],
        () => getUserAttendance(userProfile!.name),
        {
            enabled: !!userProfile
        }
    );

    const { data: userAssignment, isLoading: assignmentLoading, error: assignmentError } = useQuery(
        ['userAssignment'],
        () => getAssignments().then(res => res.data.filter((d: any) =>
            d['이름'] == userProfile!.name
        )),
        {
            enabled: !!userProfile
        }
    );

    useEffect(() => {
        if (userAssignment) {
            setUserAssignmentData({
                name: userAssignment['이름'],
                lateSubmitted: userAssignment[0]['과제 지각제출'],
                notSubmitted: userAssignment[0]['과제 미제출']
            });
        }
    }, [userAssignment]);

    return (
        <>
            {userProfile && userAttendance && userAssignment &&
                <Wrapper>
                    <Header>
                        <NameCard
                            name={userProfile.name}
                            generation={userProfile?.generation} />
                    </Header>
                    <RowWrapper>
                        <ProfileCard user={userProfile} />
                        <MyAttendanceSection userAttendance={userAttendance} userAssignment={userAssignmentData} />
                    </RowWrapper>
                </Wrapper>
            }
        </>
    );
};

export default MyPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    color: ${GreyScale.default};
`;

const RowWrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 35px;

    @media(max-width: 900px){
        flex-direction: column;
        
    }
`;

