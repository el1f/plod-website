import styled from 'styled-components/macro';

export const Chip = styled.a`
    display: flex;
    padding: 6px 16px 6px 8px;
    border-radius: 12px;
    color: inherit;
    transition: .1s;

    &:hover {
        background-color: ${({ theme }) => theme.palette.accents_2};
    }
`;

export const Avatar = styled.div`
    height: 24px;
    width: 24px;
    background-color: ${({ theme }) => theme.palette.foreground};
    color: ${({ theme }) => theme.palette.background};
    padding: 4px;
    border-radius: 40%;
    margin-right: 12px;

    svg {
        display: block;
        height: 16px;
        width: 16px;
    }
`;