import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


function ArrayEqual(arrayOne, arrayTwo){
    if (arrayOne.length !== arrayTwo.length){
        return false;
    }
    for(var i = 0; i < arrayOne.length; i++){
        if(arrayOne[i] != arrayTwo[i]){
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
            head:[],
            direction: "right",
        }
         this.moveSnake = this.moveSnake.bind(this);
    }

    getMiddleGrid(gridSize){
        let xSize = gridSize[0];
        let ySize = gridSize[1];

        let xMiddle = parseInt(xSize / 2);
        let yMiddle = parseInt(ySize / 2);
        
        return [xMiddle, yMiddle];
    }    
    moveSnake(){
        let newSnake = [];
        let direction = this.state.direction;
        switch(direction){
            case "up":
                newSnake = [this.state.snake[0], this.state.snake[1] - 1];
                break;
            case "down" :
                newSnake = [this.state.snake[0],this.state.snake[1] + 1];
                break;
            case "right":
                newSnake = [this.state.snake[0] + 1, this.state.snake[1]];
                break;
            case "left":
                newSnake = [this.state.snake[0] - 1, this.state.snake[1]];
                break;
        }
        this.setState({snake: newSnake});            
    }


    componentDidMount(){
        let middleCoordinates = this.getMiddleGrid(this.state.gridSize);
        this.setState({snake: middleCoordinates, food: [5, 3]});
        setInterval(() => this.moveSnake(), 500);
    }

    render(){
        return(
            <>
            <Grid 
                size={this.state.gridSize}
                snake={this.state.snake}
                food={this.state.food}/>
            <Gamebutton moveSnake={this.moveSnake}/>   
            </>
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
                                return( 
                                <Title 
                                X = {xIndex}
                                Y = {yIndex} 
                                snake = {this.props.snake}
                                food = {this.props.food}
                                />
                                );
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
        let isFood = ArrayEqual(this.props.food, [this.props.X, this.props.Y]) ? "food" : "";

        let isSnake = ArrayEqual(this.props.snake, [this.props.X, this.props.Y]) ? "snake" : "";
        let className = `Tile ${isSnake} ${isFood}`  

        return(
            <div className="Title">
                ({` ${this.props.X} | ${this.props.Y}`}) {isSnake ?  "Snake" : ""}
                {isFood ? "Food" : ""}
            </div>
        );
    }
 

}
class Gamebutton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <button id="up" onClick={()=> this.props.moveSnake("up")}> UP!</button>
            <button id="down" onClick={() => this.props.moveSnake("down")}> DOWN!</button>
            <button id="left" onClick={() => this.props.moveSnake("left")}> LEFT!</button>
            <button id="right" onClick={() => this.props.moveSnake("right")}>RIGHT!</button>
            </>
        )
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));