import styled from 'styled-components';

export const Title = styled.div`
  background: rgba(248, 248, 255, 0.6);
  padding: 5px 0;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid black;
  h3 {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const PostInfo = styled.section`
  margin-top: 10px;
  background: rgba(255, 222, 173);
  padding: 15px 0;
  border: 1px solid black;
  border-radius: 10px;
  strong {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  p {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Comments = styled.div`
  margin-top: 10px;
  a {
    background: #a8a8b3;
    border-radius: 5px;
    margin-top: 15px;
    width: 100%;
    padding: 10px;
    display: block;
    text-decoration: none;
    transition: transform 0.2s;
    display: flex;
    align-items: center;

    & + a {
      margin-top: 10px;
    }

    &:hover {
      background: rgba(255, 222, 173);
      transform: translateX(10px);
    }
    h3 {
      margin-top: 5px;
      flex: 1;
    }
    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 18px;
        color: black;
      }
      p {
        font-size: 15px;
        color: black;
        margin-top: 4px;
      }
    }
  }
`;
