import React from 'react'

export default function Link({name, url}: {name: string, url: string}) {

    const copy = () => {
        navigator.clipboard.writeText(url).then(function() {
          console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
    }

    return (
        <div className="link">
            <p>{name}</p>
            <button className="copy-button" onClick={copy}>COPY</button>
        </div>
    )
}
