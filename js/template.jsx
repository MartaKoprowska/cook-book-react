import React from 'react';

import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

class Template extends React.Component {
    render() {
        return (

            <div className="container">
                <img src="./images/background.png" className="background-photo"></img>
                <nav className="teal lighten-1 navClass">
                    <div className="nav-wrapper">
                        <ul id="nav-mobile" className="left ">
                            <li><Link to="/">Home </Link></li>
                            <li><Link to="/obiad">Obiad </Link></li>
                            <li><Link to="/sniadanie">Śniadanie i kolacja</Link></li>
                            <li><Link to="/deser">Deser </Link></li>
                            <li><Link to="/napoje">Napoje</Link></li>
                            <li><Link to="/dodaj">Dodaj przepis </Link></li>
                        </ul>
                    </div>

                </nav>
                <section className="content">
                    {this.props.children}
                </section>
                <footer >
                    <div className="footer-copyright page-footer teal lighten-1">
                        <div className="container white-text center-align">
                            <p>Copyright © 2017 martakop. All rights reserved.</p>

                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Template;