import { PopoverGroup } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogout, setAdminLogout } from '../reduxStore/authSlice'
import { showToastSuccess } from '../toastConfig'

export default function Navbar({page, prev, role}) {

  const user = useSelector((state) => role === 'admin' ? state.auth.admin : state.auth.user )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1);
  }

  const handleLogout = () => {
    dispatch(role === 'admin' ? setAdminLogout() : setLogout())
    navigate(role === 'admin' ? '/admin/login' : '/login')
    showToastSuccess("Logged out successfully")
  }

  return (
    <header className={`${role === 'admin' ? 'bg-black relative' : 'bg-white'}`}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1 z-50">
          { prev ? (
          <button onClick={handleGoBack} className={`text-sm font-semibold ${role === 'admin' ? 'text-white' : 'text-black'}`}>&larr; {prev}</button>
          ) : (
           ""
          )}
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <h1 className={`${role === 'admin' ? 'text-white' : 'text-gray-900'} text-sm/ font-semibold`}>
            {page}
          </h1>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end z-50">
          {user ? (<button onClick={handleLogout} className={`text-sm/6 font-semibold ${role === 'admin' ? 'text-white' : 'text-black'}`}>
            Logout <span aria-hidden="true">&rarr;</span>
          </button>) : ""
          }
        </div>
      </nav>
    </header>
  )
}
