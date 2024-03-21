import { useEffect, useRef } from "react";
import myReducer from "../../../hooks/myReducer";

function reducer(state, action) {
    switch(action.type) {
        case 'hover':
            return state.map(obj => {
                if(obj.id === action.payload.id) {
                    return {...obj, hover: true}
                }
                return {...obj, hover: false};
            })

        case 'down':
            if(action.payload.index + 1 !== state.length) {   
                return state.map((obj, i) => {
                    if(action.payload.index + 1 === i) {
                        return {...obj, hover: true}
                    }
                    return {...obj, hover: false};          
                })
            }
            return state;

        case 'up':
            if(action.payload.index - 1 >= 0) {   
                return state.map((obj, i) => {
                    if(action.payload.index - 1 === i) {
                        return {...obj, hover: true}
                    }
                    return {...obj, hover: false};          
                })
            }
            return state;
            
        case 'enter':
            return state.map((obj, i) => {
                if(action.payload.index === i) {
                    return {...obj, checked: true};
                }
                return {...obj, checked: false};          
            });
    }

}

export function Language({data, isOpen, closeLangD, returnCheckedData, nowChackedItem}) {
    const languages = useRef();
    
    const [state, dispetch] = myReducer(reducer, data.map(obj => {
        if(obj.id === nowChackedItem) {
            return {...obj, hover: true,checked: true};
        }
        return {...obj, hover: false, checked: false};
    }));
    let hoverItem = state.reduce((aggr, val, i) => {
        if(val.hover) {
            return aggr = i;
        }
        return aggr;
    }, 0);

    function clickLangBox() {
        dispetch({
            type: 'enter',
            payload: {
                index: hoverItem
            }
        })
        returnCheckedData(state[hoverItem]);
        window.removeEventListener('keyup', langHover);
        closeLangD();
    }

    function langHover(e) {
        if(e.code === "Backspace") {
            window.removeEventListener('keyup', langHover);
            closeLangD();
        }
        if(e.code === "ArrowDown") {
            dispetch({
                type: 'down',
                payload: {
                    index: hoverItem
                }
            })
        } else if(e.code === "ArrowUp") {
            dispetch({
                type: 'up',
                payload: {
                    index: hoverItem
                }
            })
        } else if(e.code === "Enter") {
            clickLangBox()
        }
    }
    
    useEffect(() => {
        window.addEventListener('keyup', langHover);
        return () => window.removeEventListener('keyup', langHover);
    }, [hoverItem])

    return (
        <div id="lan" className={`language ${isOpen ? 'active' : ''}`} ref={languages} onClick={(e) => {
            if(e.target.id === 'lan') {
                e.target.classList.remove('active')
                closeLangD()
            }
        }}>
            <div className="languageContainer">
                <h2>Choose language</h2>

                <div className="cards">
                    {state.map(lang => {
                        return (
                            <div className={`card ${lang.hover ? 'active' : ''}`} onClick={clickLangBox} data-id={lang.id} key={lang.id} onMouseEnter={(e) => {
                                dispetch({
                                    type: 'hover',
                                    payload: {
                                        id: +e.target.getAttribute('data-id')
                                    }
                                })
                            }} >
                                {lang.checked ? <i className="fa-solid fa-check checkIcon"></i> : ''}
                                <h4>{lang.name}</h4>
                                <img src={lang.src} alt="..." />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}