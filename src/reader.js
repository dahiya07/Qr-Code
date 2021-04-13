import React ,{useState,useRef} from 'react'
import jsQR from 'jsqr'

const Reader= () => {

    const [Loading,SetLoading] = useState()
    const canvaRef = useRef();
    const ctx = useRef();
    
    const [showCanvas,setCanvas] = useState(false)
    const [output ,setOutput] = useState('')
    var width = 320
    var height = 480
    var videoRef = document.createElement("video");

    const openScan = () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            videoRef.srcObject = stream;
            videoRef.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
            videoRef.play();
            requestAnimationFrame(tick);
          });
        }
    const tick = () => {
          SetLoading(true)
          if (videoRef.readyState === videoRef.HAVE_ENOUGH_DATA) {
            setCanvas(true);
            canvaRef.current.height = videoRef.videoHeight;
            canvaRef.current.width = videoRef.videoWidth;
            if(canvaRef.current)
            {  const ctxRef = canvaRef.current.getContext("2d")
              ctxRef.drawImage(
              videoRef,
              0,
              0,
            );
            var imageData = ctxRef.getImageData(
              0,
              0,
              width,
              height
            );
            var code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert"
            });
            console.log(code);
            setOutput(code)
            if (code) videoRef.srcObject = null;
            if (code) setCanvas(false);
        }
          }
          requestAnimationFrame(tick);
        }

    return (
        <div>
            <div class="v-body">
                <p>Pure JavaScript QR code decoding library.</p>
                {!showCanvas?<div id="loadingMessage" >"🎥 Unable to access video stream (please make sure you have a webcam enabled)",</div>
                :
                <canvas
                    width="canvasWidth"
                    height="canvasHeight"
                    id="canvas"
                    ref={canvaRef}
                />}
                {!showCanvas 
                    ?
                    <div id="output">
                        {!output
                            ?
                            <div>No QR code detected</div>
                            :
                            <div>
                                <b>Data:</b>
                                <span id="outputData">{{output}}</span>
                            </div>}
                    </div>:null}
                <button onClick={openScan}>Click Me to Scan</button>
            </div>
        </div>
    )
}

export default Reader
