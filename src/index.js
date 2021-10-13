import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gridSize:[7, 7],
            snake:[],
            food:[],
        }
    }
    render(){
        return(
            <Grid />
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
        return(
            <div className="Title">
                {`X ${this.props.X} | Y ${this.props.Y}`}
            </div>
        );
    }


}

ReactDOM.render(<Game />, document.getElementById("root"));