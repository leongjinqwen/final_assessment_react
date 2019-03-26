import React from 'react';
import { Card, Button, CardImg, CardImgOverlay } from 'reactstrap';


export default class PhotoPage extends React.Component {
    state = {
        constraints: { audio: false, video: { width: 400, height: 300 } },
        filter: 'none',
        width:400,
        height:300,
        images:[],
        success:[],
        errors:[]
    }
        
    componentDidMount(){
        navigator.mediaDevices.getUserMedia(this.state.constraints)
            .then(stream => {
                const video = this.refs.myVideo;            
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log(`Error: ${err}`);
            });
    }

    takePicture = () => {
        const { width,height,filter} = this.state
        // Create canvas
        const canvas = this.refs.myCanvas;
        const video = this.refs.myVideo;  
        const context = canvas.getContext('2d');
        // set canvas props
        canvas.width = width;
        canvas.height = height;
        // Draw an image of the video on the canvas
        if (filter !== undefined) {
            // Set image filter
            context.filter = filter
            // Create image from the canvas
            context.drawImage(video, 0, 0, width, height);
            // create image url
            const imgUrl = canvas.toDataURL('image/png');
            // Set img src
            console.log(imgUrl)
            const image = {imgUrl:imgUrl}
            const album = [...this.state.images]
            // Add image to album
            album.push(image)
            this.setState({
              images: album
            })
        }
    }

    filterChange = (e)=> {
        e.preventDefault();
        console.log(e.target.value)
        const photoFilter = e.target.value
        this.setState({
            filter : photoFilter,
        })
    }

    clearButton =()=>{
        const list = this.refs.select;   
        // Reset select list
        list.selectedIndex = 0;
        // Set video filter
        this.setState({
            // Clear photos
            images:[],
            // Change filter back to none
            filter : 'none'
        })
    }

    

    render() {
        const {images} = this.state
        return (
            <>
                <div className="container">
                    <div className="top-container">
                        <video style={{filter:`${this.state.filter}`}} ref="myVideo" className="my-video">Stream not available...</video> 
                        <Button color="dark" onClick={this.takePicture}>
                        Take Photo
                        </Button>
                        <select className="select" onChange={this.filterChange} ref="select">
                            <option value="none">Normal</option>
                            <option value="grayscale(100%)">Grayscale</option>
                            <option value="sepia(100%)">Sepia</option>
                            <option value="invert(100%)">Invert</option>
                            <option value="hue-rotate(90deg)">Hue</option>
                            <option value="blur(5px)">Blur</option>
                            <option value="contrast(200%)">Contrast</option>
                            <option value="contrast(100%) brightness(150%)">Brightness</option>
                        </select>
                        <Button color="light" onClick={this.clearButton}>Clear</Button>
                        <canvas id="canvas" ref="myCanvas"></canvas>
                    </div>
                    <div className="bottom-container">
                        {
                        images.map((images, index) =>(
                            <Card inverse key={index} style={{width:'50%'}}>
                                <CardImg src={images.imgUrl} alt={images.imgUrl} />
                                <CardImgOverlay className='d-flex align-items-end'>
                                    <a href={images.imgUrl} download><Button color="primary">Download</Button></a>
                                </CardImgOverlay>
                            </Card>
                        )
                        )
                        }
                    </div>
                </div>
            </>
        );
    }
}

