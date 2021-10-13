import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


function ArrayEqual(arrayOne, arrayTwo){
    if (arrayOne.length !== arrayTwo.length){
        return false;
    }
    for(var i = 0; i < arrayOne.length; i++){
        if(arrayOne[i] != arrayTwo){
            return false;
        }
    }
    return true;
}


class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gridSize:[7, 7],
            snake:[],
            food:[],
        }
    }

    getMiddleGrid(gridSize){
        let xSize = gridSize[0];
        let ySize = gridSize[1];

        let xMiddle = parseInt(xSize / 2);
        let yMiddle = parseInt(ySize / 2);
        
        return [xMiddle, yMiddle];
        }

    componentDidMount(){
        let middleCoordinates = this.getMiddleGrid(this.state.gridSize);
        this.setState({snake: middleCoordinates, food: [5, 3]});
    }

    render(){
        return(
            <Grid 
                size={this.state.gridSize}
                snake={this.state.snake}
                food={this.state.food}/>
        );
    }
    
}

class Grid extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const GameGrid = Array(7).fill(Array(7).fill(null));
    
        return(
            <div className="xGrid">
                {GameGrid.map((gridY, yIndex) => {
                    return(
                        <div className="yGrid">
                            {gridY.map((gridX, xIndex) =>{
                                return( <Title X = {xIndex} Y = {yIndex}/>);
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }    
}

class Title extends React.Component{
    constructor(props){
        super(props);
    }
   

    render(){
        let isFood = ArrayEqual(this.props.snake, [this.props.X, this.props.Y]) ? "food" : "";

        let isSnake = ArrayEqual(this.props.snake, [this.props.X, this.props.Y]) ? "snake" : "";
        let className = `tile ${isSnake} ${isFood}`  

        return(
            <div className="Title">
                ({`X ${this.props.X} | Y ${this.props.Y}`}){isSnake ?  "Snake" : ""}
            </div>
        );
    }


}

ReactDOM.render(<Game />, document.getElementById("root"));