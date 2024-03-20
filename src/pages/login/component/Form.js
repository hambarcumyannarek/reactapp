import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function({isOpen, toggleLang, chakedItem, againOpen, openKeyBoardF, isKeyBoardOpen, returnInputText}) {
    const[active, setActive] = useState(false);
    const[inputHover, setInputHover] = useState(0);
  
    const inputs = useRef();
    const checkbox = useRef();
    const subBtn = useRef();
    const lang = useRef();
    const usefullInput2 = useRef();
    let inputElements = [];

    useEffect(() => {
        if(returnInputText.child !== undefined) {
            inputs.current.children[returnInputText.child].value = returnInputText.txt;
        }
    }, [returnInputText.child, returnInputText.txt]);

    function languageBtnF() {
        usefullInput2.current.type = !active ? 'hidden' : 'text';
        toggleLang();
        againOpen(+lang.current.getAttribute('data-id'));
    }
    function openKeyBoard(obj) {
        // usefullInput2.current.type = 'hidden';
        openKeyBoardF(obj);
    }

    const keyupfunc = useCallback((e) => {
        if(e.code === 'ArrowDown' && inputHover < inputElements.length-1){
            setInputHover(inputHover + 1);
        } else if (e.code === 'ArrowUp' && inputHover > 0) {
            setInputHover(inputHover - 1);
        } else if(e.code === 'Enter') {
            const inputValue = inputElements[inputHover].getAttribute('id'); 
            switch(inputValue) {
                case 'checkbox':
                    setActive(bool => !bool);
                break;
                case 'languageBtn':
                    languageBtnF();
                break;
                case 'input1': 
                    openKeyBoard({txt: inputs.current.children[0].value, child: 0});
                break;
                case 'input2': 
                    openKeyBoard({txt: inputs.current.children[1].value, child: 1});
                break;
                case 'input3': 
                    openKeyBoard({txt: inputs.current.children[2].value, child: 2});
                break;
            }
        }
    }, [inputHover])

    useEffect(() => {
        inputElements = [...inputs.current.children, checkbox.current, subBtn.current, lang.current];
        usefullInput2.current.type = !isOpen && !isKeyBoardOpen ? 'text' : 'hidden';
        usefullInput2.current.focus();
        window.addEventListener('click', () => {
            usefullInput2.current.focus();
        })
        // document.addEventListener('keyup', keyupfunc); 
        for(let i = 0; i < inputElements.length; i++) {
            inputElements[i].classList.remove('active');
        }

        inputElements[inputHover].classList.add('active');
        // return () => document.removeEventListener('keyup', keyupfunc); 
    }, [inputHover, toggleLang])


    function mosuesEnterInput(e) {
        setInputHover(+e.target.getAttribute('data-num'));
        e.target.classList.add('active');
    }

    return (
        <div className="formBox"> 
            <div className="logo">
                <img src="http://smarttv.xtream.cloud/assets/images/logo.png" alt="..." />
            </div>
            <input type="text" className="usefullInput" readOnly ref={usefullInput2} onKeyUp={keyupfunc} />

            <form autoComplete="off" onSubmit={e => e.preventDefault()}>

                <div className="inputs" ref={inputs}>
                    <input type="text" data-num="0" placeholder="Provider" id="input1" onMouseEnter={mosuesEnterInput} onClick={(e) => openKeyBoard({txt: e.target.value, child: 0})} name="provider" readOnly />
                    <input type="text" data-num="1" placeholder="Username" id="input2" onMouseEnter={mosuesEnterInput} onClick={(e) => openKeyBoard({txt: e.target.value, child: 1})}  name="name" readOnly />
                    <input type={active ? "text" : "password"} data-num="2" id="input3" onMouseEnter={mosuesEnterInput} onClick={(e) => openKeyBoard({txt: e.target.value, child: 2})}  placeholder="password" name="password" readOnly />
                </div>

                <label ref={checkbox} data-num="3" onMouseEnter={mosuesEnterInput} id="checkbox" className={`checkbox ${active ? "checked" : ''}`}>
                    <input type="checkbox" onChange={() => {
                       setActive(bool => !bool); 
                    }} onKeyUp={(e) => {
                        if(e.code === "Enter") setActive(bool => !bool); 
                    }}/>
                    <div className="drow"><i className="fa-solid fa-check"></i></div>
                    <span>Show password</span>
                </label>

                <button type="submit" ref={subBtn}  data-num="4"  id="login" onMouseEnter={mosuesEnterInput}>Login</button>
                
                <div className="languageBtn">
                    <div  id='languageBtn' data-id={chakedItem.id} className="btn" ref={lang}  data-num="5" onClick={languageBtnF} onMouseEnter={mosuesEnterInput} >
                        <img src={chakedItem.src} alt="///" />
                        <span>{chakedItem.name}</span>
                    </div>
                </div>
            </form>
        </div>
    )
}