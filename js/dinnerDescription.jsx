import React from 'react';

import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

class DinnerDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isData: false,
            dinner: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/recipes/' + this.props.params.name).then(resp => {
            return resp.json()
        }).then(data => {
            console.log(data);

            this.setState({
                isData: true,
                dinner: data

            })
        })
    }

    render() {
        return this.state.isData && (
                <div>
                    <div className="row ">
                        <br/>
                        <div className="grid-example col s12 m12 center-align">
                            <h4>{this.state.dinner.title}</h4><br/>
                        </div>


                        <div className="grid-example col s12 m5">

                            <ul className="collection with-header  center-align" >
                                <li className="collection-header"><h5>Składniki</h5></li>
                                {this.state.dinner.products.map((item, index) => {
                                    return <li className="collection-item">{item}</li>
                                })}
                            </ul>
                        </div>




                        <div className="grid-example col s12 m7">
                            <img className="photoInRecipe" width="100%" src={this.state.dinner.image}/>
                        </div>
                    </div>



                    <div className="row center-align">
                        <div className="grid-example col  m1"></div>
                        <div className="grid-example col m10  howToCook">
                            <h5>Sposób wykonania</h5>
                            <div dangerouslySetInnerHTML={{__html: this.state.dinner.description}}/>
                        </div>
                        <div className="grid-example col  m1 "></div>
                    </div>

                </div>

            )
    }
}

class Dinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isData: false,
            dinner: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/recipes').then(resp => {
            return resp.json()
        }).then(data => {
            console.log(data);
            this.setState({
                isData: true,
                dinner: data
            })
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <h3>Przepisy na dania obiadowe</h3>
                    </div>
                    <div className="col s12">
                        <div className="collection">
                            <ul className="recipeList">
                                {this.state.dinner.map((item, index) => {
                                    let dot = item.description.indexOf(".");
                                    let firstStr = item.description.slice(0,  dot +1);
                                    let descrStr = item.description.slice(dot + 1);
                                    let secondDot = descrStr.indexOf(".");
                                    let secondStr = descrStr.slice(0, secondDot +1);
                                    let newString = firstStr.concat(secondStr);

                                    if (item.type === "dinner") {
                                        return (
                                            <li className="collection-item " key={index}>
                                                <div className="row">
                                                    <div className="grid-example col s12 m7 ">
                                                        <h5>{item.title}</h5>
                                                        <div dangerouslySetInnerHTML={{__html: newString}}/>
                                                        <Link className="waves-effect waves-light btn" to={"/obiad/"+ item.id}>Zobacz więcej</Link>
                                                    </div>
                                                    <div className="grid-example col s12 m5  photoRecipeList">
                                                        <img  key={index} src={item.image} width="100%"/>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DinnerDescription;
