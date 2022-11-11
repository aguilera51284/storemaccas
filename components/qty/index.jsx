import { useState, useEffect } from 'preact/hooks';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

function Qty(props) {
  const { value = 1, adClass = '', max = 10000, changeQty } = props;
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  useEffect(() => {
    changeQty && changeQty(current);
  }, [current]);

  function increment() {
    if (max <= 0 || current >= max) return;
    setCurrent(current + 1);
  }

  function decrement() {
    if (current > 1) {
      setCurrent(current - 1);
    }
  }

  function changeCurrent(e) {
    if (parseInt(e.currentTarget.value) < max) {
      setCurrent(parseInt(e.currentTarget.value));
    }
  }

  return (
    <div className="w-28">
      <div className="relative  flex w-full items-stretch">
        <div className="absolute left-0 top-0 h-full w-8">
          <button
            className="flex h-full w-8 items-center justify-center hover:text-accent-500"
            onClick={decrement}
            type="button"
          >
            <MinusIcon className="h-4 w-4 fill-current" />
          </button>
        </div>
        <input
          type="number"
          className="form-input w-28 appearance-none text-center"
          min="1"
          max={max}
          value={current}
          required
          onChange={changeCurrent}
        />
        <div className="absolute right-0 top-0 h-full w-8">
          <button
            type="button"
            className="flex h-full w-8 items-center justify-center hover:text-accent-500"
            onClick={increment}
          >
            <PlusIcon className="h-4 w-4 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Qty;
