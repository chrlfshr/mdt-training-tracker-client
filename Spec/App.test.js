import App from '../src/App.js';


import { rest } from "nsw/node"
import { setupServer } from "nsw/node"

import { render, screen } from '@testing-library/react';
import PersonList from './PersonList'

const userData = [
{
  crew_id: 2,
  id: 1,
  is_approver: false,
  is_auth: true,
  is_trainer: true,
  name: "Harold H. Hutchins",
  rank: "Sergeant",
  username: "jane.doe.1"
},
{
  crew_id: 1,
  id: 2,
  is_approver: false,
  is_auth: false,
  is_trainer: true,
  name: "Jane A. Doe",
  rank: "Sergeant",
  username: "jane.doe.1"
}]

const server = setupServer(
  rest.get('/users', (request, response, context) => {
    return response(context.json())
  })
)


describe('App', () => {
  it('renders a PersonList', () => {
    const app = render(<App />);
    const childElement = app.getByText("Bob Smith");

    expect(childElement).toBeInTheDocument();
  })
})
