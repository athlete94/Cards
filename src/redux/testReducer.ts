export type TestInitialStateType = typeof TestInitialState
let TestInitialState = {
    displayText: '',
    disabledBtn: false
}


export const testReducer = (state: TestInitialStateType  = TestInitialState, action: AuthActionType): TestInitialStateType => {
    switch (action.type) {
        case 'DISABLED_BUTTON':
            return {
                ...state, disabledBtn: action.disabled
            }
        case 'SET_TEXT':
            return {
                ...state,
                displayText: action.text
            }
    }
    return state
}

export type AuthActionType = DisabledBtnType | SetTextType

export type DisabledBtnType = ReturnType<typeof disabledButton>
export const disabledButton = (disabled: boolean) => {
    return {
        type: 'DISABLED_BUTTON',
        disabled
    }as const
}
type SetTextType = ReturnType<typeof setDisplayText>
export const setDisplayText = (text: string) => {
    return {
        type: 'SET_TEXT',
        text
    }as const
}