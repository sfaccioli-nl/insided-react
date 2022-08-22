import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../Components/App/App';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

beforeEach(() => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
});

test('Renders the private key input', () => {
  expect(screen.getByLabelText('Private Key')).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Private Key' })).toBeInTheDocument();
});

test('Renders the search commits button', () => {
  const buttonEl = screen.queryByTestId('submit-button') as HTMLButtonElement;

  expect(buttonEl).toBeInTheDocument();
});

test('Test search commits button toggle', () => {
  const inputEl = screen.queryByTestId('private-key') as HTMLInputElement;
  fireEvent.change(inputEl, { target: { value: process.env.PRIVATE_KEY } });

  const buttonEl = screen.queryByTestId('submit-button') as HTMLButtonElement;
  fireEvent.click(buttonEl);

  expect(mockedNavigate).toHaveBeenCalledWith({ pathname: '/commits', search: 'owner=&repo=' });
});
