import React, { Fragment, ReactNode, useRef, useState } from 'react'
import LinksPopup from '../Base-Components/LinksPopup';
import ThemeModule from '../Modules/ThemeModule';
import { loadModule, updateModule } from '../Utils/Request';

export default function Main() {
    const [moduleId, setModuleId] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [moduleData, setModuleData] = useState(null);

    const saveData = () => {
        console.log(moduleName, moduleData);
        if(!moduleData || !moduleName)
            return;

        updateModule(moduleName, moduleData, moduleId)
            .then(newId => {
                setModuleId(newId);

            })
            .catch(err => alert(err));
    }

    const loadData = () => {
        if(!moduleId)
            return;


        loadModule(moduleId)
            .then(data => {
                setModuleData(data.data);
                setModuleName(data.module);

                console.log(moduleData);
            });
    }

    const getModuleInputs = (): ReactNode => {
        let moduleInputs = <div>Preview not yet working...</div>;
        switch (moduleName) {
            case 'Theme':
                moduleInputs = <ThemeModule moduleData={moduleData} updateData={data => setModuleData(data)}></ThemeModule>
                break;
        
            default:
                break;
        }

        return moduleInputs;
    }

    const showPopup = () => {
        const popup = document.querySelector('.links-popup');
        if(popup){
            popup.classList.remove('hidden');
        }
    }
    
    return (
        <Fragment>
            <div className="mainPage">
                <div className="main-options">
                    <select name="moduleSelect" value={moduleName} id="moduleSelect" onChange={ele => setModuleName(ele.target.value)}>
                        <option value="">Select Module...</option>
                        <option value="Theme">Theme</option>
                    </select>

                    <div className="module-data-inputs">
                        {getModuleInputs()}
                    </div>

                    <div className="module-save-inputs">
                        <div className="input-group" style={{ minWidth: '260px', flexGrow: 1 }}>
                            <input name="module-id" id="module-id" required value={moduleId} onChange={ele => setModuleId(ele.target.value)} />
                            <label htmlFor="">Module Identifier (Leave empty to create new)</label>
                        </div>
                        <div className="buttons">
                            <button onClick={saveData}>SAVE</button>
                            <button className="dark-light" onClick={loadData}>LOAD</button>
                        </div>
                        <button hidden={!moduleId} onClick={showPopup}>LINKS</button>
                    </div>
                </div>
                <div>
                    <img className="preview-image" src="https://via.placeholder.com/500x500" alt="" />
                </div>
            </div>
            {<LinksPopup moduleData={moduleData} moduleIdWithSecret={moduleId} moduleName={moduleName}></LinksPopup>}
        </Fragment>
    )
}
