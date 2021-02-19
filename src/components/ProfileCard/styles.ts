import styled from 'styled-components/macro';

export const Card = styled.div`
    margin: 0 auto;
    max-width: 320px;
    background: linear-gradient(135deg, #00ffff 0%, hsl(0, 100%, 47%) 100%);
    padding: 8px;
    border-radius: 16px;
        box-sizing: border-box;

    * {
        box-sizing: border-box;
    }
`;

export const Content = styled.div`
    position: relative;
  overflow: hidden;
  box-shadow: 0px 2px 12px -4px #000000;
  background: linear-gradient(0deg, #111 0%, #000000 100%);
  border-radius: 8px;
  overflow: hidden;
  padding: 40px 16px 32px;
`;

export const Decoration = styled.div`
    position: absolute;
    top: -64px;
    left: -64px;
  width: 256px;
  height: 256px;
  opacity: 0.125;

  img {
    object-fit: contain;
  }
`;

export const Header = styled.div`
    position: relative;

    hgroup {
        margin-top: 24px;
        text-align: center;
        line-height: 1;

        * {
            margin: 0;
        }

        h1 {
        }
    }
`;

export const Groups = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  small {
      display: block;
      margin: 0 4px;
      opacity: .5;
  }
`;

export const PhotoBox = styled.figure`
    position: relative;
    width: 128px;
    height: 128px;
    margin: 0 auto;
`;

export const Avatar = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

export const CrewPic = styled.div`
  height: 40px;
  width: 40px;
  position: absolute;
  bottom: -4px; 
  right: -4px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px black;
`;

export const Handles = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-row-gap: 12px;
  margin-top: 24px;
`;

export const HandleChip = styled.div`
    display: flex;
`;

export const HandleChipAvatar = styled.div`
    height: 24px;
    width: 24px;
    background-color: ${({ theme }) => theme.palette.foreground};
    color: ${({ theme }) => theme.palette.background};
    padding: 4px;
    border-radius: 50%;
    margin-right: 12px;

    svg {
        display: block;
        height: 16px;
        width: 16px;
    }
`;