import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@mui/material/NoSsr';
import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import {Typography} from "@material-ui/core";

type PropsType = {
    packName: string
}

const customTheme = createTheme({
    palette: {
        primary: {
            main: deepPurple[500],
        },
    },
});

const StyleTransformText = styled(Typography)`
  ${({ theme }) => `
  cursor: pointer;
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.badge,
})};
  &:hover {
    transform: scale(1.2);
  }
  `}
`;

export const TransitionText: React.FC<PropsType> = (
    {
        packName,
    }
) => {

return (
        <NoSsr>
            <MuiThemeProvider theme={customTheme}>
                <ThemeProvider theme={customTheme}>
                    <StyleTransformText>{packName}</StyleTransformText>
                </ThemeProvider>
            </MuiThemeProvider>
        </NoSsr>
    );
}