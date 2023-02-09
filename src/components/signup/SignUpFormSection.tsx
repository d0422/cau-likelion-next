import { RequestSignUpForm } from '@@types/request';
import { TRACK, TRACK_INDEX, TRACK_NAME } from '@utils/constant';
import { Basic } from '@utils/constant/color';
import { isEmptyString } from '@utils/index';
import { accessToken } from '@utils/state';
import router, { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { postSignUpForm } from 'src/apis/account';
import useInput from 'src/hooks/useInput';
import styled from 'styled-components';
import CauMailAuthenticationBox from './component/CauMailAuthenticationBox';
import DropdownMenuBox from './component/DropdownMenuBox';
import FormSendButton from './component/FormSendButton';
import TextInputBox from './component/TextInputBox';
import ToggleBox from './component/ToggleBox';

const SignUpFormSection = () => {
    const track = [TRACK_NAME[TRACK.PM], TRACK_NAME[TRACK.DESIGN], TRACK_NAME[TRACK.FRONTEND], TRACK_NAME[TRACK.BACKEND]];
    const [nameValue, onChangeName, setNameValue] = useInput('');
    const [generationValue, onChangeGeneration, setGenerationValue] = useInput('', /^[0-9]*$/);
    const [emailValue, onChangeEmail, setEmailValue] = useInput('');
    const [emailSecretValue, onChangeEmailSecret, setEmailSecretValue] = useInput('');
    const [toggleIsClicked, setToggleIsClicked] = useState([true, false]);
    const [dropdownValue, setDropdownValue] = useState(track[0]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isFormActivated, setIsFormActivated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isEmptyString(nameValue) && !isEmptyString(generationValue) && !isEmptyString(emailValue) && !isEmptyString(emailSecretValue) && isAuthenticated) setIsFormActivated(true);
        else setIsFormActivated(false);
    }, [nameValue, generationValue, emailValue, emailSecretValue, isAuthenticated]);

    const signUpFormPost = useMutation({
        mutationFn: (form: RequestSignUpForm) => postSignUpForm(form),
        onSuccess: (res) => {
            if (res.status === 200) {
                router.push('/signup/success');
            }
        },
    });

    const handleSubmit = () => {
        if (isFormActivated && router.query.accessToken) {
            signUpFormPost.mutate({
                accessToken: router.query.accessToken,
                name: nameValue,
                generation: Number(generationValue),
                track: TRACK_INDEX[dropdownValue],
                isAdmin: toggleIsClicked[1]
            });
        }
    };

    return (
        <>
            <FormWrapper>
                <TextInputBox
                    title={'이름'}
                    description={'실명으로 입력해주세요.'}
                    placeholder={'중하하'}
                    value={nameValue}
                    onChange={onChangeName} />
                <TextInputBox
                    title={'기수'}
                    description={'마지막 활동 기수를 숫자로 입력해주세요.'}
                    placeholder={'11'}
                    value={generationValue}
                    onChange={onChangeGeneration} />
                <DropdownMenuBox
                    title={'파트'}
                    menu={track}
                    description={'트랙을 선택해주세요'}
                    selectedMenu={dropdownValue}
                    setSelectedMenu={setDropdownValue} />
                <ToggleBox
                    title={'일반회원/운영진'}
                    toggle={toggleIsClicked}
                    setToggle={setToggleIsClicked}
                    description={'현 기수 운영진을 제외한 이전 기수 운영진과 기타 회원은 일반회원을 선택해 주세요.'} />
                <CauMailAuthenticationBox
                    title={'중앙대학교 메일 인증'}
                    emailValue={emailValue}
                    onChangeEmail={onChangeEmail}
                    secretValue={emailSecretValue}
                    onChangeSecret={onChangeEmailSecret}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated} />
            </FormWrapper>
            <FormSendButton isActive={isFormActivated} handleSubmit={handleSubmit} />
        </>

    );
};

export default SignUpFormSection;

const FormWrapper = styled.div`
    margin-top: 60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 2px solid ${Basic.default};
    border-bottom: 2px solid ${Basic.default};
`;