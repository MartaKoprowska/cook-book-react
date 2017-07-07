import React from 'react';

import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

class DessertDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isData: false,
            dessert: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/recipes/' + this.props.params.name).then(resp => {
            return resp.json()
        }).then(data => {
            console.log(data);

            this.setState({
                isData: true,
                dessert: data

            })
        })
    }

    render() {
        return this.state.isData && (
                <div>
                    <div className="row ">
                        <br/>
                        <div className="grid-example col s12 m12 center-align">
                            <h4>{this.state.dessert.title}</h4><br/>
                        </div>
                        <div className="grid-example col s12 m5">
                            <ul className="collection with-header  center-align" >
                                <li className="collection-header"><h5>Składniki</h5></li>
                                {this.state.dessert.products.map((item, index) => {
                                    return <li key={index} className="collection-item">{item}</li>
                                })}
                            </ul>
                        </div>
                        <div className="grid-example col s12 m7">
                            <img className="photoInRecipe" width="100%" src={this.state.dessert.image}/>
                        </div>
                    </div>
                    <div className="row center-align">
                        <div className="grid-example col  m1"></div>
                        <div className="grid-example col m10  howToCook">
                            <h5>Sposób wykonania</h5>
                            <div dangerouslySetInnerHTML={{__html: this.state.dessert.description}}/>
                        </div>
                        <div className="grid-example col  m1 "></div>
                    </div>
                </div>
            )
    }
}


export default DessertDescription;