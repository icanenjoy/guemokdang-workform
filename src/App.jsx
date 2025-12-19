import React from 'react'
import styled from 'styled-components'
import CheckForm from './components/CheckForm'

const vars = {
    bg: '#f3f6fb',
    card: '#ffffff',
    muted: '#6b7280',
    accent: '#1f6feb',
    radius: '12px',
    pad: '20px',
    gap: '24px',
    maxWidth: '1100px',
}

const AppContainer = styled.div`
    min-height: 100vh;
    background: ${vars.bg};
    display: flex;
    justify-content: center;
    padding: 40px 20px;
    box-sizing: border-box;
    font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR',
        'Helvetica Neue', Arial;
`

const Card = styled.div`
    width: 100%;
    max-width: ${vars.maxWidth};
    background: ${vars.card};
    border-radius: ${vars.radius};
    padding: ${vars.pad};
    box-shadow: 0 8px 30px rgba(17, 24, 39, 0.06);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: ${vars.gap};
`

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`

const Title = styled.h1`
    margin: 0;
    font-size: 20px;
    color: #0f172a;
    font-weight: 700;
`

const Subtitle = styled.div`
    font-size: 13px;
    color: ${vars.muted};
`

const Content = styled.main`
    display: block;
`

export default function App() {
    return (
        <AppContainer>
            <Card>
                <Header>
                    <div>
                        <Title>메뉴 피드백</Title>
                        <Subtitle>일별 판매/피드백을 기록하세요</Subtitle>
                    </div>
                </Header>

                <Content>
                    <CheckForm onSubmit={() => {}} />
                </Content>
            </Card>
        </AppContainer>
    )
}
