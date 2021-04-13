import React  from 'react'
import QrReader from 'react-qr-reader'

function Qrreader(props) {

    return (
        <div>
            <QrReader
        delay={300}
        onError={props.error}
        onScan={props.scan}
        className="scanner"
        />
        {/* <div id="qr-result" hidden="">
          <b>Data:{props.res}</b> 
          <span id="outputData"></span>
            </div> */}
        </div>
    )
}

export default Qrreader
