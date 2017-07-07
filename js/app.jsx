import React from 'react';
import ReactDOM from 'react-dom';
import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';
import AddNewRecipe from "./addNewRecipe.jsx";
import Template from "./template.jsx";
import Dinner from "./dinner.jsx";
import DinnerDescription from "./dinnerDescription.jsx";
import Breakfast from "./breakfast.jsx";
import BreakfastDescription from "./breakfastDescription.jsx";
import Dessert from "./dessert.jsx";
import DessertDescription from "./dessertDescription.jsx";
import Drinks from "./drinks.jsx";
import DrinksDescription from "./drinksDescription.jsx";
import "../sass/sass.scss";


document.addEventListener('DOMContentLoaded', function(){




    class Home extends React.Component {
        render() {
            return (
                <div >
                     <img src="./images/WILDBERRY.png" width="100%"/>
                </div>
            )
        }
    }



    class App extends React.Component {
        render() {
            return (
                <Router history={hashHistory}>
                    <Route path='/' component={Template}>
                        <IndexRoute component={Home} />
                        <Route path='/obiad' component={Dinner}  />
                        <Route path='/obiad/:name' component={DinnerDescription}/>

                        {/*tutaj dodac komponent ktory obsluzy nowy link do danego obiadu- z atrybutem*/}
                        <Route path='/sniadanie' component={Breakfast} />
                        <Route path='/sniadanie/:name1' component={BreakfastDescription} />
                        <Route path='/deser' component={Dessert} />
                        <Route path='/deser/:name' component={DessertDescription} />
                        <Route path='/napoje' component={Drinks} />
                        <Route path='/napoje/:name' component={DrinksDescription} />
                        <Route path='/dodaj' component={AddNewRecipe} />
                    </Route>
                </Router>
            )
        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});