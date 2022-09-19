import React from "react";
import { useEffect} from "react";
import grass from '../../resources/grass.png';
import mount from '../../resources/mount.png';
import water from '../../resources/water.png';
import tree01 from '../../resources/tree01.png';
import tree02 from '../../resources/tree02.png';
import tree03 from '../../resources/tree03.png';
import perlin from '../../logic/perlin';
import './TileMap.scss';


function drawTexture(context, texture, x, y, cellSize) {
    context.drawImage(texture, x * cellSize , y * cellSize, cellSize, cellSize);
}

function updateCanvas(perlin, canvas, props) {
    let context = canvas.current.getContext('2d');
    // Get window size
    const { innerWidth: width, innerHeight: height } = window;
    
    // Load image sprites
    // TODO: Possible ways of optimization are the use of one spritesheet 
    // or dynamic variable naming.
    let grassTex = new Image();
    grassTex.src = grass;
    let waterTex = new Image();
    waterTex.src = water;
    let treeTex1 = new Image();
    treeTex1.src = tree01;
    let treeTex2 = new Image();
    treeTex2.src = tree02;
    let treeTex3 = new Image();
    treeTex3.src = tree03;
    let mountTex = new Image();
    mountTex.src = mount;

    let waterLevelCap = 0;



    // Define the size of the sprites. The .png sources are 32*32px.
    const CELL_SIZE = 32;
    const CELL_NUMBER_X = width / CELL_SIZE;
    const CELL_NUMBER_Y = height / CELL_SIZE;
    
    // When the last image is loaded, render the canvas.
    // FIXME: It checks only one image. 
    mountTex.onload = () => {
        for (let y = 0; y < CELL_NUMBER_Y; y += 1){
            for (let x = 0; x < CELL_NUMBER_X; x += 1){
                let cell = perlin.get(x/10,y/10);
                // This little trick allows generation of a new pseudo random noise with the same sample.
                let isTree = perlin.get(x/10 + 1000,y/10 + 1000);
                if (cell <= waterLevelCap) {
                    drawTexture(context, waterTex, x, y, CELL_SIZE);
                }
                else {
                  if(cell > 0.4) {
                    drawTexture(context, mountTex, x, y, CELL_SIZE);
                    }
                    else {
                        if(isTree > 0 && cell > 0.1) {
                            // Generate a random tree 
                            let treeType = Math.floor(Math.random() * 3);
                            switch(treeType) {
                                case 1:
                                    drawTexture(context, treeTex1, x, y, CELL_SIZE);
                                    break;
                                case 2:
                                    drawTexture(context, treeTex2, x, y, CELL_SIZE);
                                    break;        
                                default:
                                    drawTexture(context, treeTex3, x, y, CELL_SIZE);
                            }
                            
                        }
                        else {
                            drawTexture(context, grassTex, x, y, CELL_SIZE);
                        }
                    }               
                }
            }
        }
    };


}

function TileMap(props) {
    const canvas = React.useRef();
    
    useEffect(() => {
        updateCanvas(perlin, canvas);
    }, [])
    
    
    return(
        <div>
        <canvas ref={canvas} {...props} width={window.innerWidth} height={window.innerHeight}></canvas>
        </div>
    );

}

export default TileMap;
