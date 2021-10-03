import React, { useRef } from 'react'
import { ITheme, IThemeWrapper } from '../Modules/ThemeModule';
import Link from './Link';

export default function LinksPopup({moduleData, moduleName, moduleIdWithSecret}: {moduleData: any, moduleName: string, moduleIdWithSecret: string}) {
    const popupRef = useRef<HTMLDivElement>(null);

    const generateLinks = () => {
        if(!moduleData || !moduleName || !moduleIdWithSecret) return;
        
        const moduleId = moduleIdWithSecret.split('-')[0];
        let elements = [];

        switch (moduleName) {
            case 'Theme':
                const themeWrapper: IThemeWrapper = moduleData;
                console.log(themeWrapper);
                if((themeWrapper?.themes || []).length === 0) 
                    return [];

                for (let themeIndex = 0; themeIndex < themeWrapper.themes.length; themeIndex++) {
                    const theme = themeWrapper.themes[themeIndex];

                    const name = `Set theme to "${theme.themeName}"`;
                    const url = `${process.env.REACT_APP_BACKEND_URI}set/${moduleId}?theme=${theme.themeName}&dest=${encodeURIComponent(themeWrapper.redirect)}`
                    elements.push(
                        <Link key={"theme-" + themeIndex} name={name} url={url}></Link>
                    )
                }

                for (let pageIndex = 0; pageIndex < themeWrapper.themes[0].pages.length; pageIndex++) {
                    const page = themeWrapper.themes[0].pages[pageIndex];

                    const name = `Get image for page "${page.name}"`;
                    const url = `${process.env.REACT_APP_BACKEND_URI}get/${moduleId}?page=${page.name}`
                    elements.push(
                        <Link key={"page-" + pageIndex} name={name} url={url}></Link>
                    )
                }

                break;
        
            default:
                return []
        }

        return elements;
    }

    const hidePopup = () => {
        if(!!popupRef.current){
            popupRef.current.classList.add('hidden');
        }
    }

    return (
        <div className="popup links-popup hidden" ref={popupRef}>
            <div className="backdrop" onClick={hidePopup}></div>
            <div className="content">
                <div className="links">
                    {generateLinks()}
                </div>
                <button onClick={hidePopup}>CLOSE</button>
            </div>
        </div>
    )
}
