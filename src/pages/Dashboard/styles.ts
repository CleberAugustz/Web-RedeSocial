import styled from 'styled-components';

export const Title = styled.div`
  background: rgba(248, 248, 255, 0.6);
  padding: 5px 0;
  width: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 1px solid black;
  p {
    width: 100%;
    font-size: 22px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Posts = styled.div`
  margin-top: 10px;
  max-width: auto;
  a {
    background: rgba(255, 222, 173);
    border-radius: 5px;
    width: 100%;
    padding: 15px;
    display: block;
    text-decoration: none;
    transition: transform 0.2s;

    display: flex;
    align-items: center;

    & + a {
      margin-top: 10px;
    }

    &:hover {
      background: green;
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        width: 100%;
        margin: 0 auto;
        padding: 0 20px;
        color: black;
        display: flex;
        align-items: center;
      }
      p {
        width: 100%;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        color: black;
        align-items: center;
        justify-content: space-between;
      }
    }

    svg {
      margin-left: auto;
      color: black;
    }
  }
`;
