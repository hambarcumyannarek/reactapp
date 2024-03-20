import { useState } from 'react';
import '../../style/login.css';
import Form from './component/Form';
import Language from './component/Language';
import RegContent from "./component/LoginContent";
import KeyBoard from './component/KeyBoard';

let id = 0;
class Languages {
    constructor(name, src, hover, checked) {
        this.id = ++id;
        this.name = name;
        this.src = src;
        this.hover = hover;
        this.checked = checked;
    }
}


export const languages = [
      new Languages('English', "http://smarttv.xtream.cloud/assets/images/eng.png", true, true),
      new Languages('Português', "http://smarttv.xtream.cloud/assets/images/brazil.png", false, false),
      new Languages('Español', "http://smarttv.xtream.cloud/assets/images/spain.png", false, false),
      new Languages('Italiano', "http://smarttv.xtream.cloud/assets/images/italy.png", false, false),
      new Languages('Français', "http://smarttv.xtream.cloud/assets/images/france.png", false, false),
      new Languages('German', "http://smarttv.xtream.cloud/assets/images/germany.png", false, false),
      new Languages('Chinese', "http://smarttv.xtream.cloud/assets/images/chinese.png", false, false),
  ];

export default function() {
  const [openLang, setOpenLang] = useState(false);
  const [saveChecked, setSaveChecked] = useState(languages[0]);
  const [nowOpen, setNowOpen] = useState(0);
  const [openKeyBoard, setOpenKeyBoard] = useState(false);
  const [inputDefaultValue, setInputDefaultValue] = useState({});
  const [returnedValue, setreturnedValue] = useState('');

    return (
        <>
        <div className="regsection">
          <div className="container">
            <RegContent />

            <Form isOpen={openLang} toggleLang={() => {
              setOpenLang(true);
            }} chakedItem={saveChecked} againOpen={(id) => {
              setNowOpen(id);
            }} isKeyBoardOpen={openKeyBoard} openKeyBoardF={(thisInputValue) => {
                setOpenKeyBoard(true);
                setInputDefaultValue(thisInputValue)
            }} returnInputText={returnedValue}/>

            {openLang ? <Language data={languages} isOpen={openLang} closeLangD={() => {
              setOpenLang(false);
            }} returnCheckedData={(obj) => {
              setSaveChecked(obj)
            }} nowChackedItem={nowOpen} /> : false}

            {openKeyBoard ? <KeyBoard isActive={openKeyBoard} defaultValue={inputDefaultValue} returnedValue={(text) => {
              setreturnedValue(text)
              }} closeKeyBoard={() => setOpenKeyBoard(false)}/> : false}
          </div>
        </div>
      </>
    );
}