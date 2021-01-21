import { useState } from "react";

function Input() {
  const [hoTen, setHoten] = useState('');

  const onChangeHandler = (event) => {
    setHoten(event.target.value);
  }

  return (
    <div>
      <input
        onChange={ onChangeHandler }
        value={ hoTen }
        type="text"
        name="ho_ten"/>
      <label>Họ Tên: { hoTen }</label>
    </div>
  );
}

export default Input;
