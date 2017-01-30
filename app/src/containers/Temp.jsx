import React, {Component, PropTypes} from 'react';
import Nav from '../components/Nav';
import {RegNavLink} from '../components/NavLink'

export class Temp1 extends Component {
    render() {
        return (
            <aside className="menu">
                <p className="menu-label">
                    Menu
                </p>
                <ul className="menu-list">
                    <li>
                        <a className="is-active">選擇學位</a>
                        <ul>
                            <li>
                                <a>Bachelor</a>
                            </li>
                            <li>
                                <a>Master</a>
                            </li>
                            <li>
                                <a>Doctor</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a>選擇類群</a>
                    </li>
                    <li>
                        <a>選擇科系</a>
                    </li>
                </ul>
            </aside>
        )
    }
}

export class Temp2 extends Component {
    render() {
        return (
            <div>
                <h3 className="title is-5">Location</h3>
                <p className="control">
                    <input className="input is-primary" type="text" placeholder="Location"/>
                </p>
                <h3 className="title is-5">Distance</h3>
                <div className="tabs is-centered is-small is-fullwidth is-toggle">
                    <ul>
                        <li className="is-active">
                            <a>
                                <span>5</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span>10</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span>15</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export class Temp3 extends Component {
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>School</th>
                        <th>GRE</th>
                        <th>TOELF</th>
                        <th>IELTS</th>
                        <th>GMAT</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Rank</th>
                        <th>School</th>
                        <th>GRE</th>
                        <th>TOELF</th>
                        <th>IELTS</th>
                        <th>GMAT</th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr>
                        <th>1</th>
                        <td>Louisiana State University—​Baton Rouge 路易斯安那州立大學巴頓魯治分校</td>
                        <td>500</td>
                        <td>80</td>
                        <td>8</td>
                        <td>500</td>
                    </tr>
                    <tr>
                        <th>1</th>
                        <td>University of California—​San Diego (Jacobs) 加利福尼亚大学圣迭戈分校</td>
                        <td>500</td>
                        <td>80</td>
                        <td>8</td>
                        <td>500</td>
                    </tr>
                    <tr>
                        <th>1</th>
                        <td>Rutgers, The State University of New Jersey—​New Brunswick 罗格斯大学新伯朗士威校区</td>
                        <td>500</td>
                        <td>80</td>
                        <td>8</td>
                        <td>500</td>
                    </tr>
                    <tr>
                        <th>1</th>
                        <td>Virginia Tech -​ Wake Forest University 弗吉尼亚理工-维克森林大学生物医学工程与科学学院</td>
                        <td>500</td>
                        <td>80</td>
                        <td>8</td>
                        <td>500</td>
                    </tr>
                    <tr>
                        <th>1</th>
                        <td>North Carolina State University -​ University of North Carolina—​Chapel Hill 北卡罗来纳大学教堂山分校</td>
                        <td>500</td>
                        <td>80</td>
                        <td>8</td>
                        <td>500</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export class Temp4 extends Component {
    render() {
        return (
            <div>
                {_.times(5, () => (
                    <div className="card block">
                        <div className="card-content">
                            <div className="media">
                                <figure className="media-left">
                                    <p className="image is-128x128">
                                        <img src="https://lh5.googleusercontent.com/-9ZtfI7Iadbo/AAAAAAAAAAI/AAAAAAAAASM/pa_22SDQqFI/s0-c-k-no-ns/photo.jpg"/>
                                    </p>
                                </figure>
                                <div className="media-content">
                                    <p className="title is-4">Leland Stanford Junior University - Wake Forest University</p>
                                    <p className="subtitle is-6">斯坦福大学-维克森林大学生物医学工程与科学学院</p>
                                </div>
                            </div>
                            <nav className="level is-mobile">
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">GRE</p>
                                        <p className="title">500</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">TOELF</p>
                                        <p className="title">80</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">IELTS</p>
                                        <p className="title">8</p>
                                    </div>
                                </div>
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">GMAT</p>
                                        <p className="title">500</p>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

class Pagination extends Component {
    render() {
        return (
            <nav className="pagination is-centered">
                <ul className="pagination-list">
                    <li>
                        <RegNavLink to="/temp-page/1" className="pagination-link" activeClassName="is-current" name="1"/>
                    </li>
                    <li>
                        <RegNavLink to="/temp-page/2" className="pagination-link" activeClassName="is-current" name="2"/>
                    </li>
                    <li>
                        <RegNavLink to="/temp-page/3" className="pagination-link" activeClassName="is-current" name="3"/>
                    </li>
                    <li>
                        <RegNavLink to="/temp-page/4" className="pagination-link" activeClassName="is-current" name="4"/>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default class Temp extends Component {
    constructor(props) {
        super(props)
        this.toNext = this.toNext.bind(this);
    }

    toPrev() {}

    toNext() {}

    render() {
        const {children} = this.props
        return (
            <div>
                <Nav/>
                <section className="section">
                    <div className="container">
                        <div className="tile is-vertical">
                            <div className="tile is-child">
                                <Pagination/>
                            </div>
                            <div className="tile is-child">
                                {children}
                            </div>
                            <div className="tile is-child">
                                <nav className="pagination is-centered">
                                    <a className="pagination-previous" onClick={this.toPrev}>Previous</a>
                                    <a className="pagination-next" onClick={this.toNext}>Next page</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
