import React  from "react";

function Header(){
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    const logOut = e => {
		localStorage.removeItem('selectedClient');
		localStorage.removeItem('accessToken');
        localStorage.removeItem('loggedInUser');
        window.location.reload();
	};

    return(
        <header className="header-area">
            <div className="header container">
                <nav className="navbar navbar-expand-lg navbar-light bg-lightt">
                    <a className="navbar-brand float-left" href="/">
                        LOGO
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/fuel-quote">Get Quote</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/profile">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <button className="dropdown-item" type="button" onClick={logOut}>Logout ({user.full_name})</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/fuel-quote">Get Quote</a>
                                    </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/sign-up">Register</a>
                                </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;
