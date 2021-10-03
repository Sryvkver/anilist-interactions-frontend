import React, { Fragment, useEffect, useImperativeHandle, useState } from 'react'

export interface IThemeWrapper {
    themes: ITheme[];
    redirect: string;
}

export interface ITheme {
    themeName: string;
    pages: IPage[];
}

export interface IPage {
    name: string;
    url: string;
}

export default function ThemeModule({moduleData, updateData}: {moduleData: any, updateData: (data: any) => void}) {
    const [themeWrapper, setThemeWrapper] = useState<IThemeWrapper>(moduleData || {themes: [], redirect: ''});

    useEffect(() => {
        if(!!moduleData)
            setThemeWrapper(moduleData);
    }, [moduleData])

    useEffect(() => {
        updateData(themeWrapper);
        console.log(themeWrapper);
    }, [themeWrapper]);

    const generateThemePageElements = (themeid: number) => {
        const theme = themeWrapper.themes[themeid];
        const pageElements = [];

        for (let index = 0; index < theme.pages.length; index++) {
            const page = theme.pages[index];
            
            pageElements.push(
                <div className="page" key={"theme-" + themeid + "-page-" + index}>
                    <div className="input-group" style={{ flexGrow: 1 }}>
                        <input name="pagename" required value={page.name} onChange={tre => updatePage('name', index, themeid, tre.target.value)} />
                        <label htmlFor="">Page name</label>
                    </div>
                    <div className="input-group" style={{ flexGrow: 1 }}>
                        <input name="pagename" required value={page.url} onChange={tre => updatePage('url', index, themeid, tre.target.value)} />
                        <label htmlFor="">Image url</label>
                    </div>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                        {index === theme.pages.length-1 ? <button style={{width: '100%'}} onClick={() => addPage()}>Add page</button> : <Fragment></Fragment>}
                        <button style={{width: '100%'}} className="red" onClick={() => removePage(index)}>Delete page</button>
                    </div>
                </div>
            )
        }

        return pageElements;
    }

    const generateThemeElements = () => {
        const themeElements = [];

        for (let index = 0; index < themeWrapper.themes.length; index++) {
            const theme = themeWrapper.themes[index];
            
            themeElements.push(
                <div className="theme" key={"theme-" + index}>
                    <div className="theme-name input-group" style={{flexGrow: 1 }}>
                        <input name="themename" required value={theme.themeName} onChange={ele => updateTheme('name', index, ele.target.value)}/>
                        <label htmlFor="">Theme name</label>
                    </div>
                    <div className="pages">
                        {generateThemePageElements(index)}
                    </div>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button style={{width: '100%'}} className="red" onClick={() => removeTheme(index)}>Delete theme</button>
                    </div>

                </div>
            )
        }

        return themeElements;
    }

    const addPage = () => {
        const oldThemes = {...themeWrapper};

        for (const theme of oldThemes.themes) {
            theme.pages.push({
                name: '',
                url: ''
            })
        }

        setThemeWrapper(oldThemes);
    }

    const removePage = (pageIndex: number) => {
        const oldThemes = {...themeWrapper};

        for (const theme of oldThemes.themes) {
            theme.pages.splice(pageIndex, 1);
            
            if(theme.pages.length === 0){
                oldThemes.themes.splice(0);
                break;
            }
        }

        setThemeWrapper(oldThemes);
    }

    const addTheme = () => {
        const oldThemes = {...themeWrapper};

        let newPages: IPage[] = [{
            name: '',
            url: ''
        }];

        if(oldThemes.themes.length > 0){
            newPages = [];
            for (const page of oldThemes.themes[0].pages) {
                newPages.push({
                    name: page.name,
                    url: ''
                });
            }
        }

        oldThemes.themes.push({
            themeName: '',
            pages: newPages
        });

        setThemeWrapper(oldThemes);
    }

    const removeTheme = (themeIndex: number) => {
        const oldThemes = {...themeWrapper};

        oldThemes.themes.splice(themeIndex, 1);

        setThemeWrapper(oldThemes);
    }

    const updatePage = (type: 'name'|'url', pageIndex: number, themeIndex: number, value: string) => {
        const oldThemes = {...themeWrapper};

        const page = oldThemes.themes[themeIndex].pages[pageIndex];

        switch (type) {
            case 'name':
                for (const theme of oldThemes.themes) {
                    theme.pages[pageIndex].name = value;
                }
                break;

            case 'url':
                page.url = value;
                break;
        
            default:
                break;
        }

        setThemeWrapper(oldThemes);
    }

    const updateTheme = (type: 'name', themeIndex: number, value: string) => {
        const oldThemes = {...themeWrapper};

        const theme = oldThemes.themes[themeIndex];

        switch (type) {
            case 'name':
                theme.themeName = value;
                break;

            default:
                break;
        }

        setThemeWrapper(oldThemes);
    }

    const updateRedirect = (value: string) => {
        const oldWrapper = {...themeWrapper};

        oldWrapper.redirect = value;

        setThemeWrapper(oldWrapper);
    }

    return (
        <Fragment>
            <div className="input-group" style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
                <input name="themename" required value={themeWrapper.redirect} onChange={ele => updateRedirect(ele.target.value)} />
                <label htmlFor="">Redirect (After the theme was set)</label>
            </div>
            <div className="themes">
                {generateThemeElements()}
            </div>
            <button style={{width: '100%'}} onClick={addTheme}>Add theme</button>
        </Fragment>
    )
}
