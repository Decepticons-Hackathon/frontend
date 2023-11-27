import './GradientButton.scss';

interface IProps{
  children: React.ReactNode;
}

const GradientButton: React.FC<IProps> = (props) => {
  return <button className='gradient_button'>{props.children}</button>;
}

export default GradientButton;
