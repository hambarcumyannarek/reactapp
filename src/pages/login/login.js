import { useEffect, useState } from 'react';
import '../../style/login.css';
import { Form } from './component/Form';
import { Language } from './component/Language';
import { LoginContent } from "./component/LoginContent";
import { KeyBoard } from './component/KeyBoard';
import { languages } from '../../datas/languages';

export function Login() {
  const [openLang, setOpenLang] = useState(false);
  const [saveChecked, setSaveChecked] = useState(languages[0]);
  const [nowOpen, setNowOpen] = useState(0);
  const [openKeyBoard, setOpenKeyBoard] = useState(false);
  const [inputDefaultValue, setInputDefaultValue] = useState({});
  const [returnedValue, setreturnedValue] = useState('');

    useEffect(() => {
      fetch('/data').then(info => info.json()).then(i =>  console.log(i))
    }, [])


    return (
        <>
        <div className="regsection">
          <div className="container">
            <LoginContent />

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
              }} closeKeyBoard={() => setOpenKeyBoard(false)} /> : false}
          </div>
        </div>
      </>
    );
}