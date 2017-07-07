import React from 'react';

import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

class AddNewRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            type: '',
            products: [],
            image: '',
            description: '',
            newTableWithProducts: [],
            errors: [],
            validate: {
                title: true,
                type: true,
                products: true,
                image: true,
                description: true
            },
            switch: false,
            switch1: true
        }
        this.messages = {
            title: 'Tytuł musi zostać uzupełniony',
            type: 'Kategoria musi zostać uzupełniona. Kategorie do wyboru: obiad, śniadanie, kolacja, deser lub napoje',
            products: 'Lista składników zostać uzupełniona',
            image: 'Ścieżka do zdjęcia musi zostać uzupełniona.',
            description: 'Sposób wykonania musi zostać uzupełniony.'
        }
    }

    changeInput = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleKeyPress = (event) => {
        if(event.key == 'Enter'){
            let newTable = this.state.newTableWithProducts;
            newTable.push(this.state.products);

            this.setState({
                newTableWithProducts: newTable,
                products: []


            })


            console.log(this.state.newTableWithProducts)
        }
    }

    deleteProduct = (index) => {
        let deletedProducts = this.state.newTableWithProducts
        deletedProducts.splice(index, 1)
        this.setState({
            newTableWithProducts: deletedProducts
        })
        console.log(index)
        console.log(deletedProducts)
    }

    addRecipe = () => {
        let newRecipe = {
            title: this.state.title,
            type: this.state.type,
            products: this.state.newTableWithProducts,
            image: this.state.image,
            description: this.state.description
        }
        console.log(newRecipe);
        fetch('http://localhost:3000/recipes', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newRecipe )

        });
        console.log(newRecipe);

        this.setState({
            title: '',
            type: '',
            products: [],
            image: '',
            description: '',

        })
    }

    //do wyswietlania bledu
    getMessage = (fieldName) => {
        return this.state.validate[fieldName] ? "" : this.messages[fieldName]
    }



    check = (event) => {
        let newVal = this.state.validate;
        newVal.title = this.state.title.length >0;
        newVal.type = this.state.type.length >0;
        newVal.products = this.state.newTableWithProducts.length >0;
        newVal.image = this.state.image.length >0;
        newVal.description = this.state.description.length >0;

        this.setState({
            validate: newVal
        }, () => {
            let shouldSend = true
            for (let key in this.state.validate) {
                if (this.state.validate[key] == false ) {
                    shouldSend = false
                    break
                }
            }
            if (shouldSend == true) {
                this.addRecipe();
                this.setState({
                    switch: true,
                    switch1: false
                })
            }
        })


        // let newErrors = this.state.errors;
        //
        //
        // if (this.state.title === "") {
        //     newErrors.push('Tytuł musi zostać uzupełniony')
        // }
        // if (this.state.type === "") {
        //     newErrors.push('Kategoria musi zostać uzupełniona. Kategorie do wyboru: obiad, śniadanie, kolacja, deser lub napoje')
        // }
        // if (this.state.products.length < 0) {
        //     newErrors.push('Lista składników zostać uzupełniona')
        // }
        // if (this.state.image === "") {
        //     newErrors.push('Ścieżka do zdjęcia musi zostać uzupełniona.')
        // }
        // if (this.state.description === "") {
        //     newErrors.push('Sposób wykonania musi zostać uzupełniony.')
        // }
        //
        // this.setState({
        //     errors: newErrors
        // }, () => {
        //     if (this.state.errors.length === 0) {
        //         this.addRecipe();
        //     }
        // })

    }


    render() {
        return  (
                <div>
                    <h3>Dodaj swój własny przepis</h3><br/><br/>

                    <div className="row ">
                        <form className="col s12 m7">
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <input name="title" value= {this.state.title} onChange={this.changeInput} placeholder="Dodaj tytuł przepisu" type="text" className="validate "/>
                                </div>
                                <p className="error">{this.getMessage("title")}</p>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <input name="type" value= {this.state.type} onChange={this.changeInput} placeholder="Dodaj kategorię w jakiej chcesz zamieścić przepis" type="text" className="validate"/>
                                </div>
                                <p className="error">{this.getMessage("type")}</p>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <input name="products" value= {this.state.products} onKeyDown={this.handleKeyPress} onChange={this.changeInput} placeholder="Dodaj potrzebne produkty- po wpisaniu każdego produktu naciśnij Enter" type="text" className="validate"/>
                                    {this.state.newTableWithProducts.map((item, index) => {
                                        return (
                                            <a style={{display: this.state.switch1 ? "initial" : "none"}} className="waves-effect waves-light btn btnProducts" onClick={()=> this.deleteProduct(index)}  key={index}>{item}</a>
                                        )
                                    })}
                                </div>
                                <p className="error">{this.getMessage("products")}</p>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <input name="image" value= {this.state.image} onChange={this.changeInput} placeholder="Dodaj ścieżkę do zdjęcia" type="text" className="validate"/>
                                </div>
                                <p className="error">{this.getMessage("image")}</p>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <textarea name="description" value= {this.state.description} onChange={this.changeInput} placeholder="Dodaj sposób przygotowania" id="textarea1" className="materialize-textarea"/>
                                </div>
                                <p className="error">{this.getMessage("description")}</p>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <p style={{display: this.state.switch ? "block" : "none" }} className="correct">Przepis został dodany!</p>
                                    <a onClick={this.check} className="waves-effect waves-light btn-large">Dodaj przepis</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
    }
}

export default AddNewRecipe;