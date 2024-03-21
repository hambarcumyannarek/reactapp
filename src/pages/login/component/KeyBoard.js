import { useEffect, useRef, useState } from "react";
import myReducer from "../../../hooks/myReducer";
import { cMatric, nMatric } from "../../../datas/matrices";


function reducer(state, action) {
    switch(action.type) {
        case 'giveNumbers': 
            return nMatric.map((column, ci) => {
                return column.map((row, ri) => {
                    if(action.payload.myLocation.ci === ci && action.payload.myLocation.ri === ri) {
                        return {...row, hover: true}
                    }
                    return {...row, hover: false};
                })
            });
        case 'giveText': 
        return cMatric.map((column, ci) => {
            return column.map((row, ri) => {
                if(action.payload.myLocation.ci === ci && action.payload.myLocation.ri === ri) {
                    return {...row, hover: true}
                }
                return {...row, hover: false};
            })
        });
        case 'toUpper': 
            return state.map((column, ci) => {
                return column.map((row, ri) => {
                    if(row.charName.length === 1) {
                        return {...row, charName: row.charName.toUpperCase()}
                    }
                    return row;
                })
            })
        case 'toLow': 
        return state.map((column, ci) => {
            return column.map((row, ri) => {
                if(row.charName.length === 1) {
                    return {...row, charName: row.charName.toLowerCase()}
                }
                return row;
            })
        })
        case 'hover': 
            return state.map((column, ci) => {
                return column.map((row, ri) => {
                    if(action.payload.boxLocation[0] === ci && action.payload.boxLocation[1] === ri) {
                        return {...row, hover: true}
                    }
                    return {...row, hover: false};
                })
            })
        case 'keyup': 
            let nowLocation = action.payload.findActivedLocation;
            if(action.payload.key === 'ArrowRight') {
                return state.map((column, ci) => {
                    return column.map((row, ri) => {
                        if(nowLocation.ri+1 === state[nowLocation.ci].length) {
                            nowLocation = {...nowLocation, ri: -1}
                        }
                        if(nowLocation.ci === ci && nowLocation.ri+1 === ri) {
                            return {...row, hover: true}
                        }
                        return {...row, hover: false}
                    })
                });
            }
            if(action.payload.key === 'ArrowLeft') {
                return state.map((column, ci) => {
                    return column.map((row, ri) => {
                        if(nowLocation.ri-1 === -1) {
                            nowLocation = {...nowLocation, ri: state[nowLocation.ci].length}
                        }
                        if(nowLocation.ci === ci && nowLocation.ri-1 === ri) {
                            return {...row, hover: true}
                        }
                        return {...row, hover: false}
                    })
                })
            };

            if(action.payload.key === 'ArrowDown') {
                if(nowLocation.ci === state.length-2 && nowLocation.ri !== 0 && nowLocation.ri !== state[state.length-2].length-1) {
                    nowLocation = {...nowLocation, ri: 1};
                } else if(state[nowLocation.ci+1] && state[nowLocation.ci+1][nowLocation.ri] === undefined) {
                    nowLocation = {...nowLocation, ri: state[nowLocation.ci+1].length-1};
                }
                return state.map((column, ci) => {
                    return column.map((row, ri) => {
                        if(nowLocation.ci+1 === state.length) {
                            nowLocation = {ci: -1, ri: state[nowLocation.ci][nowLocation.ri].charName === 'underscrore' ? 6 : nowLocation.ri === 2 ? state[0].length-1 : 0};
                        }

                        if(nowLocation.ci+1 === ci && nowLocation.ri === ri) {
                            return {...row, hover: true}
                        } 
                        return {...row, hover: false}
                    })
                })
            };

            if(action.payload.key === 'ArrowUp') {
                if(nowLocation.ci-1 === -1) {
                    if(nowLocation.ri === state[0].length-1) {
                        nowLocation = {ci: state.length, ri: 2}
                    }
                    nowLocation = {...nowLocation, ci: state.length}
                  
                    if(!state[nowLocation.ci-1][nowLocation.ri]) {
                        nowLocation = {...nowLocation, ri: 1}
                    }
                } else if(state[nowLocation.ci][nowLocation.ri+1] === undefined && state[nowLocation.ci].length < state[nowLocation.ci-1].length) {
                    nowLocation = {...nowLocation, ri: state[nowLocation.ci-1].length-1}
                } else if(state[nowLocation.ci][nowLocation.ri].charName === 'underscrore') {
                    nowLocation = {...nowLocation, ri: 6}
                }
                return state.map((column, ci) => {
                    return column.map((row, ri) => {
                        // if(`${nowLocation.ci}_${nowLocation.ri}` === `${ci}_${ri}`) {
                        //     console.log('yey')
                        // }
                        if(nowLocation.ci-1 === ci && nowLocation.ri === ri) {
                            return {...row, hover: true}
                        }
                        return {...row, hover: false}
                    })
                })
            };
        break;
    }
}
export function KeyBoard({isActive, defaultValue, returnedValue, closeKeyBoard}) {

    const [state, dispetch] = myReducer(reducer, cMatric);
    const [value, setValue] = useState(defaultValue);
    const [isUpper, setIsUpper] = useState(false);
    function recursi(element) {
        if(element.tagName === 'DIV') {
            return element;
        }
        return recursi(element.parentElement)
    } 
    function hoverKeys(e) {
        const boxLocation = recursi(e.target).getAttribute('id').split('_').map(i => +i);
        dispetch({
            type: 'hover',
            payload: {
                boxLocation
            }
        })
    }

    useEffect(() => {
        returnedValue(value)
    }, [value]);

    useEffect(() => {
        if(isUpper) {
            return dispetch({
                type: 'toUpper'
            })
        }
        dispetch({
            type: 'toLow'
        })
    }, [isUpper]);

    function closeKB(){
        window.removeEventListener('keyup', moveKeys);
        setTimeout(() => {
            closeKeyBoard();
            setValue(e => {
                return {};
            });
        }, 300)
    }

    async function keyBoardClickable() {
        if(state[findActivedLocation.ci][findActivedLocation.ri].charName === 'done') {
            window.removeEventListener('keyup', moveKeys);
            setValue(e => {
                return {...e, txt: e.txt, done: true};
            });
            return setTimeout(() => {
                closeKeyBoard();
            }, 100);
        } else if(state[findActivedLocation.ci][findActivedLocation.ri].charName === 'clean') {
            return setValue(e => {
                return {...e, txt: ''}
            });
        } else if(state[findActivedLocation.ci][findActivedLocation.ri].charName === 'clear') {
            return setValue(e => {
                return {...e, txt: e.txt.substring(0, e.txt.length-1)}
            });
        } else if(state[findActivedLocation.ci][findActivedLocation.ri].charName === 'underscrore') {
            return setValue(e => {
                return {...e, txt: e.txt+' '}
            });
        } else if(state[findActivedLocation.ci][findActivedLocation.ri].charName === 'big') {
            return setIsUpper(upper => !upper);
        } else if(state[findActivedLocation.ci][findActivedLocation.ri].charName === '123') {
            return dispetch({
                type: 'giveNumbers',
                payload: {
                    myLocation: findActivedLocation
                }
            })
        } else if(state[findActivedLocation.ci][findActivedLocation.ri].charName === 'abc') {
            return dispetch({
                type: 'giveText',
                payload: {
                    myLocation: findActivedLocation
                }
            })
        }
        setValue(e => {
            return {...e, txt: e.txt+state[findActivedLocation.ci][findActivedLocation.ri].charName};
        });
    }

    var findActivedLocation = state.reduce((aggr, val, ci) => {
        val.forEach((obj, ri) => {
           if(obj.hover) {
               aggr.ci = ci;
               aggr.ri = ri;
               return aggr;
           }
       });
       return aggr;
   }, {});
    function moveKeys(e) {
        if(e.code === "Backspace") {
            closeKB();
        }
        if(e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
            dispetch({
                type: "keyup",
                payload: {
                    key: e.code,
                    findActivedLocation
                }
            })       
        } else if(e.code === "Enter") {
            keyBoardClickable();
        }
        
    }
    useEffect(() => {
        window.addEventListener('keyup', moveKeys);
        return () => window.removeEventListener('keyup', moveKeys);
    }, [findActivedLocation]);

    return (
        <div className="clamviaturaSection">
            <div className={`clamviatura ${isActive ? 'active' : ''}`}>
                {state.map((column, ci) => {
                    return (
                        <div className="column" key={ci}>
                            {column.map((row, ri) => {
                                return (
                                    <div id={`${ci}_${ri}`} key={`${ci}_${ri}`} onMouseEnter={hoverKeys} onClick={keyBoardClickable} className={`row ${row.charName} ${row.hover ? ' active' : ''}`}>
                                        <span>{row.charName === 'big' ? <i className="fa-solid fa-up-long"></i> : row.charName === 'clear' ? <i className="fa-solid fa-delete-left"></i> : row.charName === 'underscrore' ? '[ _ ]' : row.charName}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}