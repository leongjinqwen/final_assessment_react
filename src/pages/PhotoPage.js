import React from 'react';
import { Card, Button, CardImg, CardImgOverlay } from 'reactstrap';


export default class PhotoPage extends React.Component {
    state = {
        constraints: { audio: false, video: true },
        filter: 'none',
        width:800,
        height:600,
        images:[],
        success:[],
        errors:[],
        streaming:false
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
        console.log(video.style.width)
        console.log(video.style.height)
        // set canvas props
        canvas.width = width;
        canvas.height = height;
        console.log(canvas.style.width)
        console.log(canvas.style.height)
        // Draw an image of the video on the canvas
        if (filter !== undefined) {
            // Set image filter
            context.filter = filter
            // Create image from the canvas
            context.drawImage(video, 0, 0, width, height);
            // create image url
            const imgUrl = canvas.toDataURL('image/png');
            // Set img src
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
        this.setState({
            filter : e.target.value,
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
                    <div className="embed-responsive embed-responsive-16by9" style={{margin: '10px auto'}} >
                        <video style={{filter:`${this.state.filter}`,width:'100%',height:'100%',maxWidth:'960px'}} ref="myVideo" className="my-video" >Stream not available...</video> 
                    </div>
                        <Button color="dark" onClick={this.takePicture} style={{display:'block',width:'100%',padding:'10px',maxWidth:'960px',margin:'5px 0'}} >
                        Take Photo
                        </Button>
                        <select onChange={this.filterChange} ref="select" style={{height:'40px',background:'#333',color:'#fff',padding:'3px',width:'100%',maxWidth:'960px',border:'1px #666 solid'}} >
                            <option value="none">Normal</option>
                            <option value="grayscale(100%)">Grayscale</option>
                            <option value="sepia(100%)">Sepia</option>
                            <option value="invert(100%)">Invert</option>
                            <option value="hue-rotate(90deg)">Hue</option>
                            <option value="blur(5px)">Blur</option>
                            <option value="contrast(200%)">Contrast</option>
                            <option value="contrast(100%) brightness(150%)">Brightness</option>
                        </select>
                        <Button color="secondary" onClick={this.clearButton} style={{display:'block',width:'100%',padding:'10px',maxWidth:'960px',margin:'5px 0'}}>Clear</Button>
                        <canvas style={{display:'none'}} ref="myCanvas"></canvas>
                    <div className="bottom-container m-auto p-10" style={{maxWidth: '960px'}}>
                        {
                        images.map((images, index) =>(
                            <Card inverse key={index} style={{maxWidth: '425px'}} className="d-inline-block" >
                                <CardImg src={images.imgUrl} alt={images.imgUrl}  />
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

