import React from "react"
import '../styles/Navbar.css'
import { Link } from "react-router-dom"

export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body mb-5" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/">القرآن الكريم بين يديك</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">الرئسية</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">القرآن الكريم مسموع</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/quran"> تصفح القرآن </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}