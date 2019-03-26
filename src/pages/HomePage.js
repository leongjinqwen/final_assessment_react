import React from 'react';
import background from '../components/background-calm-clouds-747964.jpg';
import background2 from '../components/bloom-blooming-blossom.jpg';

export default class HomePage extends React.Component {
    state = {
        filter : 'none'
    }
    filterChange = (e)=> {
        e.preventDefault();
        this.setState({
            filter : e.target.value,
        })
    }

    render() {
        return (
            <>
                <div style={{filter:`${this.state.filter}`,position:'absolute',top:'0',width:'100%',height:'100vh',overflow:'hidden',zIndex:'-2'}}>
                    <img className="img1" src={background} alt="background" style={{backgroundPosition: 'bottom',backgroundSize: 'contain',backgroundRepeat: 'no-repeat'}}/>
                    <img className="img2" src={background2} alt="background" style={{backgroundPosition: 'bottom',backgroundSize: 'contain',backgroundRepeat: 'no-repeat'}}/>
                </div>
                <select id="photo-filter" style={{top:'50%',left:'25%',position:'fixed',width:'50%',height:'40px',background:'#333',color:'#fff',padding:'3px',maxWidth:'960px',border:'1px #666 solid'}} onChange={this.filterChange}>
                    <option value="none">Normal</option>
                    <option value="grayscale(80%)">Grayscale</option>
                    <option value="sepia(80%)">Sepia</option>
                    <option value="invert(100%)">Invert</option>
                    <option value="hue-rotate(60deg)">Hue</option>
                    <option value="blur(2px)">Blur</option>
                    <option value="contrast(180%)">Contrast</option>
                    <option value="brightness(150%)">Brightness</option>
                </select>
            </>
        )
    }
  }