import { useState } from 'react';

function ClickCount() {
  const [count, setCount] = useState(0);

  const onClickHandler = () => setCount(count + 1);

  return (
    <div>
      <button onClick={ onClickHandler }>Click me</button>
      <label>Click { count } times!</label>
    </div>
  );
}

export default ClickCount;
