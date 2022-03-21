
import { findAllByLabelText, fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react'
import Login from '../pages/auth/login'
import { Header } from '../FrontEnd/components/homePage/header'

describe('Header',  () => {
  it('renders a heading', async () => {
    render(
        <Login />
      )
    
    const errMsg = screen.getByText('ff');

    expect(errMsg).toBeInTheDocument();
    const btn = screen.getByText('تسجيل الدّخول');

    /* fireEvent.click(btn) */
    /* const errMsg = await screen.findAllByDisplayValue('املئ الفراغ من فضلك')
    ; */
    
    
  })
})