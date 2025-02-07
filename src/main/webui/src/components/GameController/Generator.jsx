import React, { useEffect } from 'react'
import styled from 'styled-components'
import { CLICK_POWER, ENABLE_BLOWING, ENABLE_CLICKING, ENABLE_SWIPING } from '../../Config';
import { sensors } from "../../api";


const GeneratorDiv = styled.div`
  user-select:none;
  svg {
    cursor: pointer;
    height: 400px;
    user-select:none;
  }

  .turbine {
    transform: rotate(90deg);
    transform-origin: 5020px 1250px;
    transition: all 400ms;
    transform: rotate(${props => props.generated * 3}deg);
  }
  
  .turbine-item {
    fill: ${props => props.color};
  }
`

const Generator = (props) => {

    // Volume meter
    if (ENABLE_BLOWING) {
        useEffect(() => {
            const interval = setInterval(() => {
                let volume = sensors.getVolume();
                if(!volume) {
                    return;
                }
                if (volume > 20) {
                    props.generatePower(volume);
                }
            }, 200);
            return () => clearInterval(interval);
        }, []);
    }

    // Swipe
    if (ENABLE_SWIPING) {
        useEffect(() => {
            sensors.startSwipeSensor((d, diff) => {
                const power = Math.min(100, Math.round(Math.abs(diff) / 5));
                props.generatePower(power);
            });
        }, []);
    }

    // Shake
    if (props.shakingEnabled) {
        useEffect(() => {
            sensors.startShakeSensor((magnitude) => {
                const power = Math.min(magnitude, 100);
                props.generatePower(power);
            });
        }, []);
    }

    const onClick = (e) => {
        e.preventDefault();
        // Clicking
        if (ENABLE_CLICKING) {
            props.generatePower(CLICK_POWER, true);
        }
    }


    return (
        <GeneratorDiv generated={props.generated} color={props.color} >
            <svg
                {...props}
                x="0px"
                y="0px"
                viewBox="-50 0 760 980"
                enableBackground="new 0 0 1000 1000"
                xmlSpace="preserve"
                id="generator"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onClick}
            >
                <g id="g409" transform="translate(-171,-10)">
                    <g transform="matrix(0.1,0,0,-0.1,0,511)" id="g407">
                        <path
                            d="m 4892.9,1509.9 c -21.2,-7.7 -63.5,-42.3 -96.2,-76.9 -51.9,-53.9 -57.7,-71.2 -57.7,-192.4 0,-113.5 5.8,-138.5 48.1,-182.8 69.3,-73.1 140.4,-105.8 234.7,-105.8 288.5,0 394.3,386.7 146.2,538.6 -65.4,40.5 -203.9,50.1 -275.1,19.3 z"
                            id="path399"
                        />
                        <path
                            d="m 5142.9,803.9 c -50,-19.2 -111.6,-25 -177,-17.3 -100,11.5 -102,11.5 -152,-63.5 l -50,-76.9 -113.4,-1910.2 c -61.5,-1050.3 -132.7,-2252.6 -157.7,-2670 -25,-417.4 -44.2,-761.7 -42.3,-763.7 1.9,-3.9 71.2,-25 155.8,-46.2 223.1,-61.6 611.7,-61.6 827.1,0 l 155.8,42.3 -7.7,100 c -19.2,257.8 -313.5,5315 -313.5,5372.7 0,73.2 -9.6,75.2 -125.1,32.8 z"
                            id="path405"
                        />
                        <g className="turbine">
                            <path
                                d="m 5039.1,4985.9 c -19.2,-25 -521.3,-2683.5 -521.3,-2768.1 0,-36.6 75,-186.6 232.8,-469.4 l 55.8,-100 82.7,28.9 c 50,17.3 115.4,25 173.1,17.3 l 90.4,-9.6 v 1638.9 c 0,1250.4 -5.8,1646.6 -23.1,1664 -30.8,30.7 -63.5,28.8 -90.4,-2 z"
                                id="path397"
                                className="turbine-item"
                            />
                            <path
                                d="m 5464.2,1138.7 c -11.6,-46.2 -44.2,-115.4 -69.3,-153.9 l -48.1,-71.2 42.3,-26.9 c 23.1,-15.4 263.5,-152 532.9,-305.8 269.3,-152 894.5,-507.9 1388.9,-788.7 509.8,-290.5 911.8,-507.8 927.2,-502.1 34.6,13.5 51.9,57.7 38.5,90.4 -5.8,11.6 -507.9,421.3 -1113.8,908 -1233,988.8 -1084.9,896.4 -1473.5,921.4 l -205.8,11.5 z"
                                id="path401"
                                className="turbine-item"
                            />
                            <path
                                d="M 3132.7,253.8 C 2053.6,-381 1718.9,-586.9 1718.9,-613.8 c 0,-98.1 23.1,-90.4 1381.2,442.4 l 1319.6,517.5 175.1,246.2 177,246.2 -76.9,82.7 c -42.3,46.2 -82.7,102 -90.4,125 -5.8,21.2 -23.1,40.4 -34.6,38.5 -13.7,0.1 -660,-375 -1437.2,-830.9 z"
                                id="path403"
                                className="turbine-item"
                            />
                        </g>

                    </g>
                </g>
            </svg>
        </GeneratorDiv>
    )
}

export default Generator;