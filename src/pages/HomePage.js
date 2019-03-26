import React from 'react';
import background from '../components/background-calm-clouds-747964.jpg';

export default class HomePage extends React.Component {
    state = {
        filter : 'none'
    }
    filterChange = (e)=> {
        e.preventDefault();
        console.log(e.target.value)
        const photoFilter = e.target.value
        this.setState({
            filter : photoFilter,
        })
    }

    render() {
        return (
            <>
                <div style={{filter:`${this.state.filter}`,position:'absolute',top:'0',left:'0',width:'100%',height:'100vh',overflow:'hidden',zIndex:'-2'}}>
                    <img  className="m-0" src={background} alt="background" />
                </div>
                <select id="photo-filter" className="select" style={{top:'50%',left:'25%',position:'fixed',width:'50%'}} onChange={this.filterChange}>
                    <option value="none">Normal</option>
                    <option value="grayscale(80%)">Grayscale</option>
                    <option value="sepia(80%)">Sepia</option>
                    <option value="invert(80%)">Invert</option>
                    <option value="hue-rotate(60deg)">Hue</option>
                    <option value="blur(2px)">Blur</option>
                    <option value="contrast(200%)">Contrast</option>
                    <option value="brightness(150%)">Brightness</option>
                </select>
            </>
        )
    }
  }