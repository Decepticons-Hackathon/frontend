import "./GradientButton.scss";

interface IProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GradientButton: React.FC<IProps> = (props) => {
  return (
    <button className="gradient_button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default GradientButton;
