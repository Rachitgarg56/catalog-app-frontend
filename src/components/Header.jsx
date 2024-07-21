import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


export default function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b border-solid text-white border-gray-200" style={{background:'#C4C6AF'}}>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="https://cdn-icons-png.flaticon.com/512/9453/9453183.png" className="h-12 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

          <Link to="/" className="text-lg font-semibold leading-6 text-gray-900">
            Home
          </Link>
          <Link to="/favorites" className="text-lg font-semibold leading-6 text-gray-900">
          Favorites
          </Link>
          {
            user?.role === 'admin' &&
            <Link to="/add-book" className="text-lg font-semibold leading-6 text-gray-900">
              Add Book
            </Link>
          }
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link to={'/login'}>
          <button onClick={()=>logout()} className="text-lg font-semibold leading-6 text-gray-900">
            Log out <span aria-hidden="true">&rarr;</span>
          </button>
        </Link>  
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/9453/9453183.png"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to="/favorites"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Favorites
                </Link>
                {
                  user?.role === 'admin' &&
                  <Link to="/add-book" className="text-sm font-semibold leading-6 text-gray-900">
                    Add Book
                  </Link>
                }
              </div>
              <div className="py-6">
                <Link to={'/login'}>
                  <button
                    onClick={()=>logout()}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                    Log out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}