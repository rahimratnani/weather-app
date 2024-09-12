import Title from "./Title"
import { render } from "@testing-library/react";

describe('title with logo', () => {
    it(`should render title and logo`, () => {

        const {container} = render(<Title />)

        expect(container).toMatchSnapshot();
    })
})