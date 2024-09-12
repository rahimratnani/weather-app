import Error from "./Error"
import { render, screen } from "@testing-library/react"

describe(`error`, () => {
    it(`should render error message when there's an error`, () => {
        const errorMsg = 'Some error.'

        render(<Error errorMessage={errorMsg} />);

        const errorText = screen.getByTestId('error-message');

        expect(errorText).toBeInTheDocument();
        expect(errorText).not.toBeEmptyDOMElement();
    });
})