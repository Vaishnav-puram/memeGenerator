/* eslint-disable jsx-a11y/alt-text */
import React from "react";
// import memesData from "./memesData";
export default function Form() {
    const [meme,setMeme]=React.useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })
    // const [memeImg,setImg]=React.useState("");
    // function generateMeme(){
    //     const meme=memesData.data.memes;
    //     const index=Math.floor(Math.random()*meme.length);
    //     const url=meme[index].url;
    //     setImg(url);
    // }
    const [allMemeImages, setAllMemeImages] = React.useState([])
    React.useEffect(()=>{
        async function getMemes(){
       const res=await fetch("https://api.imgflip.com/get_memes")
        const data=await res.json()
        setAllMemeImages(data.data.memes)
    }
    getMemes()
    },[])
    
    function generateMeme() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url=allMemeImages[randomNumber].url
        setMeme(allMemeImages=>{
            return{
                ...allMemeImages,
                randomImage:url
            }
        })   
    }
    function handleChange(event){
        const{name,value}=event.target
        setMeme((prevMeme)=>({
           ...prevMeme,
           [name]:value
        }))
    }

    return (
        <div className="main">
            <div className="form">
                <input type="text" placeholder="top text" className="form-input" name="topText" value={meme.topText} onChange={handleChange}/>
                <input type="text" placeholder="bottom text" className="form-input" name="bottomText" value={meme.bottomText} onChange={handleChange}/>
                <button className="button" onClick={generateMeme}>Get a new meme image 🖼</button>
            </div>
            {/* <img src={memeImg} className="meme"/> */}
            <div className="MEME">
            <img src={meme.randomImage} className="meme"/>
            <h2 className="memeText top">{meme.topText}</h2>
            <h2 className="memeText bottom">{meme.bottomText}</h2>
            </div>


        </div>
    )
}