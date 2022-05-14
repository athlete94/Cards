export type TestInitialStateType = typeof TestInitialState
let TestInitialState = {}


export const testReducer = (state: TestInitialStateType  = TestInitialState, action: any): TestInitialStateType => {
    return state
}
