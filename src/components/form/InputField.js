import PropTypes from "prop-types";
import styles from "./InputField.module.css";

function InputField(props) {
  const { label, id, type, onChange, value } = props;
  return (
    <div className={styles.inputdiv}>
      <label className={styles.inputlabel} htmlFor={id}>
        {label}:
      </label>
      <input
        value={value}
        className={styles.inputfield}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type={type}
        id={id}
        name={id}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  type: "text",
};

export default InputField;
