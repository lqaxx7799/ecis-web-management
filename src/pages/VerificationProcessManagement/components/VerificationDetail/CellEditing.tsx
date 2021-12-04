import { useState } from "react";

type Props = {
  value: string;
  onOk: (value: string) => void | Promise<void>;
  onCancel?: () => void;
};

const CellEditing = (props: Props) => {
  // const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  // const edit = () => {
  //   setEditing(true);
  //   setValue(props.value);
  // };

  const submit = async () => {
    const result = props.onOk(value);
    if (result && result.then) {
      await result;
    }
    setValue(props.value);
    // setEditing(false);
  }

  const cancel = () => {
    setValue(props.value ?? '');
    // setEditing(false);
    props.onCancel?.();
  };

  // if (!editing) {
  //   return (
  //     <div onClick={edit}>
  //       {props.value ?? '-'}
  //     </div>
  //   );
  // }
  return (
    <div>
      <textarea
        style={{ width: '120px' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div style={{ marginTop: '8px' }}>
        <button className="btn btn-sm btn-primary" onClick={submit}>
          Lưu
        </button>
        <button className="btn btn-sm" onClick={cancel}>
          Hủy
        </button>
      </div>
    </div>
  );
}

export default CellEditing;
