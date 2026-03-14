import styled from 'styled-components';

const ComingSoonPage = () => {
  return (
    <Container>
      <Emoji>🚧</Emoji>
      <Title>아직 구현 안되어 있어요</Title>
      <Description>준비 중인 서비스입니다.</Description>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
`;

const Emoji = styled.span`
  font-size: 48px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.labelNormal};
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.labelAlternative};
`;

export default ComingSoonPage;
