import React from "react"
import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <NavLink className='navbar-brand' to="/home">Tech Library</NavLink>
                <button className='navbar-toggler' type='button' data-bs-toggle="collaps" data-bs-target="#navbarNavDropdown" aria-controls='navbarNavDropdown' aria-expanded="false" aria-label='Toggle Navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink to="/home" className='nav-link'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to="/search" className='nav-link'>Search Books</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item m-1'>
                            <a href="#" type='button' className='btn btn-outline-light'>Sign in</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}