import { useCallback, useEffect, useRef, useState } from "react"

export default function() {
    const[active, setActive] = useState(false);
    const[inputHover, setInputHover] = useState(0);
    const [elements, setElements] = useState([]);
    const inputs = useRef();
    const checkbox = useRef();
    const subBtn = useRef();
    const lang = useRef();
    const count = useRef();

   
    const keyupfunc = useCallback((e) => {
        console.log("this is a children")
        if(e.code == 'ArrowDown' && inputHover < count.len-1 ){
            setInputHover(inputHover + 1);
        } else if (e.code == 'ArrowUp' && inputHover > 0) {
            setInputHover(inputHover - 1);
        } else if(e.code == 'Enter') {
            // const checkbox = elements[inputHover].className.search('checkbox') !== 1 ? elements[inputHover] : undefined;
            // if(checkbox) {
            //     setActive(!active)
            // }
        }
    })
    useEffect(() => {
        const children = [...inputs.current.children, checkbox.current, subBtn.current, lang.current];
        count.len = children.length;
        // setElements(children)
        for(let i = 0; i < children.length; i++) {
            children[i].classList.remove('active');
        }
        children[inputHover].classList.add('active');

        // children[inputHover].focus();
        // children[inputHover].setAttribute('autoFocus', '')
    }, [inputHover])


    window.addEventListener('keyup', keyupfunc)

    function mosuesEnterInput(e) {
        setInputHover(+e.target.getAttribute('data-num'));
        e.target.classList.add('active');
    }

    return (
        <div className="formBox">
            <div className="logo">
                <img src="http://smarttv.xtream.cloud/assets/images/logo.png" alt="..." />
            </div>

            <form autoComplete="off" onSubmit={e => e.preventDefault()}>

                <div className="inputs" ref={inputs}>
                    <input type="text" data-num="0" placeholder="Provider" onMouseEnter={mosuesEnterInput} name="provider"  readOnly />
                    <input type="text" data-num="1" placeholder="Username" onMouseEnter={mosuesEnterInput}  name="name" value={''} readOnly />
                    <input type={active ? "text" : "password"} data-num="2" onMouseEnter={mosuesEnterInput}  placeholder="password" name="password" readOnly />
                </div>

                <label ref={checkbox} data-num="3" onMouseEnter={mosuesEnterInput} className={`checkbox ${active ? "checked" : ''}`}>
                    <input type="checkbox" onChange={() => {
                       setActive(bool => !bool); 
                    }} onKeyUp={(e) => {
                        if(e.code == "Enter") setActive(bool => !bool); 
                    }}/>
                    <div className="drow"><i className="fa-solid fa-check"></i></div>
                    <span>Show password</span>
                </label>

                <button type="submit" ref={subBtn}  data-num="4" onMouseEnter={mosuesEnterInput}>Login</button>
                
                <div className="language">
                    <div className="btn" ref={lang}  data-num="5" onMouseEnter={mosuesEnterInput} >
                        <img src="http://smarttv.xtream.cloud/assets/images/eng.png" alt="///" />
                        <span>English</span>
                    </div>
                </div>
            </form>
        </div>
    )
}