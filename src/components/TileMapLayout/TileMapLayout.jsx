import { useState } from "react";
import ModalGenerate from "../Modal/ModalGenerate";
import TileMap from '../TileMap/TileMap';
import Button from 'react-bootstrap/Button';
import './TileMapLayout.scss';


function TileMapLayout(){
    const [modalShow, setModalShow] = useState(false);
    const [waterLevel, setWaterLevel] = useState(0.0);
    const [forestLevel, setForestLevel] = useState(0.1);
    const [mountainLevel, setMountainLevel] = useState(0.4);
    const [perlinZoom, setPerlinZoom] = useState(10);
    return(  
        <>
            <Button id="generateMenu" variant="primary" onClick={() => setModalShow(true)}>
                Launch demo modal
            </Button>
            <p>WaterLevel: {waterLevel}</p>
            <ModalGenerate    
                show={modalShow}
                onHide={() => setModalShow(false)}
                waterLevel={waterLevel}
                onWaterChange={() => setWaterLevel(1)}
                onForestChange={() => setForestLevel()}
                onMountainChange={() => setMountainLevel()}
                onPerlinSampleChange={() => setPerlinZoom()}
            />
            <TileMap
                waterLvl={waterLevel}
                forestLvl={forestLevel}
                mountainLvl={mountainLevel}
                perlinSample={perlinZoom}
            />
        </>
    );
}

export default TileMapLayout;