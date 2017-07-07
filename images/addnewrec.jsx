class AddNewRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            type: '',
            products: [],
            image: '',
            description: '',
            newTableWithProducts: []
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
                products: ''


            })

            console.log(this.state.newTableWithProducts)
        }
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
    }



    render() {
        return this.state.newTableWithProducts != [] && (
                <div>
                    <h3>Dodaj swój własny przepis</h3><br/><br/>

                    <div className="row">
                        <form className="col s12 m6">
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <input name="title" value= {this.state.title} onChange={this.changeInput} placeholder="Dodaj tytuł przepisu" type="text" className="validate"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <input name="type" value= {this.state.type} onChange={this.changeInput} placeholder="Dodaj kategorię w jakiej chcesz zamieścić przepis" type="text" className="validate"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <input name="products" value= {this.state.products} onKeyDown={this.handleKeyPress} onChange={this.changeInput} placeholder="Dodaj potrzebne produkty" type="text" className="validate"/>
                                    {this.state.newTableWithProducts.map((item, index) => {
                                        return (
                                            <a className="waves-effect waves-light btn btnProducts" key={index}>{item}</a>
                                        )
                                    })}

                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <input name="image" value= {this.state.image} onChange={this.changeInput} placeholder="Dodaj ścieżkę do zdjęcia" type="text" className="validate"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <textarea name="description" value= {this.state.description} onChange={this.changeInput} placeholder="Dodaj sposób przygotowania" id="textarea1" className="materialize-textarea"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m12">
                                    <a onClick={this.addRecipe} className="waves-effect waves-light btn-large">Dodaj przepis</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
    }
}

